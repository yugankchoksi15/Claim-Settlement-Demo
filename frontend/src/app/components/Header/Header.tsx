"use client";

import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { FaMapMarkerAlt, FaPhone, FaCity, FaBuilding } from "react-icons/fa";
import ClaimInfo from "../ListClaim/addClaim/Step1/ClaimInfo";
import UploadDocument from "../ListClaim/addClaim/Step2/UploadDocument";
import RepairCenter from "../ListClaim/addClaim/Step3/RepairCenter";
import { createClaim, getRepairecenterApi } from "@/app/api/ApiConfig/api";
import SmallLoadingSpinner from "../loader";

export default function Header() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedRepairCenter, setSelectedRepairCenter] = useState<any>(null);
  const [repaireCenter, setRepaireCenter] = useState<any>([]);
  const [loading, setloading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Logic for logging out (e.g., clearing tokens, redirecting, etc.)
    console.log("Logging out...");
    localStorage.clear();
    location.reload()
  };


  const getRepaireCenterData = async () => {
    try {
      const resp = await getRepairecenterApi();
      setRepaireCenter(resp);
    } catch (error) {
      console.error("Error fetching repair center data:", error); // Log the error
    }
  };

  useEffect(() => {
    if (isDialogOpen) {
      getRepaireCenterData();
    }
  }, [isDialogOpen]);

  const handleSubmitClaim = async (values: any) => {
    setloading(true);
    try {
      const resp = await createClaim(values); // Make API call
      setloading(false);
      setCurrentStep(1);
      setIsDialogOpen(false);
    } catch (error: any) {
      setloading(false);
      console.error("Error submitting claim:", error.message || error);
    }
  };

  const handleRepairCenterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = event.target.value;
    if (selectedId) {
      const selectedCenter = repaireCenter?.find(
        (center: any) => center._id === selectedId
      );
      setSelectedRepairCenter(selectedCenter);
    } else {
      setSelectedRepairCenter(null);
    }
  };

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => {
    setIsDialogOpen(false);
    setCurrentStep(1);
  };
  // Handle file selection and show file names
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const fileList = Array.from(selectedFiles);
      setFiles(fileList);
      setFileNames(fileList.map((file) => file.name));
      console.log("Selected files:", fileList);
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    setFileNames(updatedFiles.map((file) => file.name));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1); // Proceed to the next step
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1); // Go back to the previous step
    }
  };

  // Define validation schemas for different steps
  const getValidationSchema = (currentStep: any) => {
    if (currentStep === 3) {
      return Yup.object({
        repairCenter: Yup.string().required("Please select a repair center"),
      });
    }

    return Yup.object({
      issueDescription: Yup.string().required("Issue Description is required"),
      company: Yup.string().required("Company is required"),
      model: Yup.string().required("Model is required"),
      yearOfManufacturing: Yup.date()
        .required("Manufacturing year is required")
        .nullable(),
      vehicleNumber: Yup.string().required("Vehicle number is required"),
    });
  };

  return (
    <>
      <header>
        <nav
          className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800"
          style={{ backgroundColor: "#0A172B" }}
        >
          <div className="flex flex-wrap justify-between items-center mx-auto">
            <div className="flex items-center lg:order-2">
              <button
                onClick={openDialog}
                className="text-white bg-yellow-500 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                Claim
              </button>
              <div className="relative">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500 cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="text-white font-semibold">U</span>{" "}
                  {/* Replace with icon if needed */}
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg border w-48 z-50">
                    <ul className="py-2">
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <a
                    href="#"
                    className="block py-2 text-yellow-600 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                    aria-current="page"
                  >
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white text-yellow-400">
                      Claim
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            {/* User Icon and Dropdown */}
          </div>
        </nav>
      </header>

      {/* Dialog Box */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-[55rem]">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Claim Process</h2>
              <button
                onClick={closeDialog}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-[2.5rem]">
              <div className="mb-4 flex items-center justify-between">
                <div
                  className={`w-1/3 text-center border-b-2 ${
                    currentStep >= 1
                      ? "border-blue-500 text-blue-500"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  Step 1
                </div>
                <div
                  className={`w-1/3 text-center border-b-2 ${
                    currentStep >= 2
                      ? "border-blue-500 text-blue-500"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  Step 2
                </div>
                <div
                  className={`w-1/3 text-center border-b-2 ${
                    currentStep >= 3
                      ? "border-blue-500 text-blue-500"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  Step 3
                </div>
              </div>

              {/* Step 1 - Claim Info and Vehicle Info */}
              <Formik
                initialValues={{
                  issueDescription: "",
                  company: "",
                  model: "",
                  yearOfManufacturing: "",
                  vehicleNumber: "",
                  documents: [], // Add documents field here
                  repairCenter: "",
                }}
                validationSchema={getValidationSchema(currentStep)} // Dynamically get validation schema
                onSubmit={(values, { setSubmitting }) => {
                  console.log("valuesvaluesvaluesvalues", values);
                  nextStep(); // Proceed to next step
                }}
              >
                {({ values, setFieldValue, handleSubmit, errors, touched }) => (
                  <Form onSubmit={handleSubmit}>
                    {currentStep === 1 && (
                      <div className="mb-4 flex space-x-8">
                        <ClaimInfo
                          issueDescriptionName="issueDescription"
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                    )}

                    {currentStep === 2 && (
                      <UploadDocument
                        setFieldValue={setFieldValue}
                        handleFileChange={handleFileChange}
                        files={files}
                        removeFile={removeFile}
                        errors={errors}
                        touched={touched}
                      />
                    )}

                    {currentStep === 3 && (
                      <RepairCenter
                        handleRepairCenterChange={handleRepairCenterChange}
                        selectedRepairCenter={selectedRepairCenter}
                        errors={errors}
                        touched={touched}
                        repaireCenter={repaireCenter}
                        setFieldValue={setFieldValue}
                      />
                    )}

                    <div className="p-4 border-t flex justify-between">
                      {/* Back button */}
                      <button
                        type="button"
                        onClick={prevStep}
                        disabled={currentStep === 1} // Disable when on the first step
                        className={`px-4 py-2 rounded-lg ${
                          currentStep === 1
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        }`}
                      >
                        Back
                      </button>

                      {/* Next/Submit button */}
                      {currentStep === 3 ? (
                        <button
                          type="submit"
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                          onClick={() => handleSubmitClaim(values)}
                        >
                          {loading ? <SmallLoadingSpinner /> : "Submit"}
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className={`px-4 py-2 rounded-lg ${
                            currentStep === 3
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-blue-500 hover:bg-blue-600 text-white"
                          }`}
                        >
                          Next
                        </button>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>

              {/* Step Navigation */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
