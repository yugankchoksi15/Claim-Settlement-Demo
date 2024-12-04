"use client";

import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { FaMapMarkerAlt, FaPhone, FaCity, FaBuilding } from "react-icons/fa";
import ClaimInfo from "../Step1/ClaimInfo";
import UploadDocument from "../Step2/UploadDocument";
import RepairCenter from "../Step3/RepairCenter";

export default function Header() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedRepairCenter, setSelectedRepairCenter] = useState<any>(null);

  // Sample repair centers
  const repairCenters = [
    {
      id: 1,
      name: "Repair Center 1",
      city: "New York",
      address: "123 Main St",
      contact: "123-456-7890",
    },
    {
      id: 2,
      name: "Repair Center 2",
      city: "Los Angeles",
      address: "456 Elm St",
      contact: "987-654-3210",
    },
    {
      id: 3,
      name: "Repair Center 1",
      city: "New York",
      address: "123 Main St",
      contact: "123-456-7890",
    },
    {
      id: 4,
      name: "Repair Center 2",
      city: "Los Angeles",
      address: "456 Elm St",
      contact: "987-654-3210",
    },
    {
      id: 5,
      name: "Repair Center 1",
      city: "New York",
      address: "123 Main St",
      contact: "123-456-7890",
    },
    {
      id: 6,
      name: "Repair Center 2",
      city: "Los Angeles",
      address: "456 Elm St",
      contact: "987-654-3210",
    },
    {
      id: 7,
      name: "Repair Center 1",
      city: "New York",
      address: "123 Main St",
      contact: "123-456-7890",
    },
    {
      id: 8,
      name: "Repair Center 2",
      city: "Los Angeles",
      address: "456 Elm St",
      contact: "987-654-3210",
    },
    {
      id: 9,
      name: "Repair Center 1",
      city: "New York",
      address: "123 Main St",
      contact: "123-456-7890",
    },
    {
      id: 10,
      name: "Repair Center 2",
      city: "Los Angeles",
      address: "456 Elm St",
      contact: "987-654-3210",
    },
  ];

  const handleRepairCenterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = event.target.value;
    if (selectedId) {
      const selectedCenter = repairCenters.find(
        (center) => center.id === parseInt(selectedId)
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

  const nextStep = () => currentStep == 3 ? null : setCurrentStep((prev) => prev + 1);
  const prevStep = () => currentStep == 1 ? null : setCurrentStep((prev) => prev - 1);
  console.log('currentStep', currentStep)
  return (
    <>
      <header>
        <nav
          className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800"
          style={{ backgroundColor: "#0A172B" }}
        >
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <div className="flex items-center lg:order-2">
              <button
                onClick={openDialog}
                className="text-white bg-yellow-500 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                Claim
              </button>
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
                  year: "",
                  vehicleNumber: "",
                  documents: null,
                  repairCenter: "",
                }}
                onSubmit={(values, setSubmitting: any) => {
                  console.log(values);

                }}
              >
                {({ setFieldValue, handleSubmit, setSubmitting }) => (
                  <Form onSubmit={handleSubmit}>
                    {currentStep === 1 && (
                      <div className="mb-4 flex space-x-8">
                        <ClaimInfo issueDescriptionName="issueDescription" />
                      </div>
                    )}

                    {currentStep === 2 && (
                      <UploadDocument
                        setFieldValue={setFieldValue}
                        handleFileChange={handleFileChange}
                        files={files}
                        removeFile={removeFile}
                      />
                    )}

                    {currentStep === 3 && (
                      <RepairCenter
                        handleRepairCenterChange={handleRepairCenterChange}
                        repairCenters={repairCenters}
                        selectedRepairCenter={selectedRepairCenter}
                      />
                    )}

                    <div className="p-4 border-t flex justify-between">
                      <button
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className={`px-4 py-2 rounded-lg ${
                          currentStep === 1
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        }`}
                      >
                        Back
                      </button>
                      {currentStep === 3 ? (
                        <button
                          type="submit"
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                          Submit
                        </button>
                      ) : (
                        <button
                          onClick={nextStep}
                          disabled={currentStep === 3}
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
