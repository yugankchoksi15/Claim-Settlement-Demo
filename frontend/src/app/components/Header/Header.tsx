'use client';

import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { FaMapMarkerAlt, FaPhone, FaCity, FaBuilding } from 'react-icons/fa';
import ClaimInfo from '../Step1/ClaimInfo';



export default function Header() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [fileNames, setFileNames] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [selectedRepairCenter, setSelectedRepairCenter] = useState<any>(null);

    // Sample repair centers
    const repairCenters = [
        { id: 1, name: 'Repair Center 1', city: 'New York', address: '123 Main St', contact: '123-456-7890' },
        { id: 2, name: 'Repair Center 2', city: 'Los Angeles', address: '456 Elm St', contact: '987-654-3210' },
        { id: 3, name: 'Repair Center 1', city: 'New York', address: '123 Main St', contact: '123-456-7890' },
        { id: 4, name: 'Repair Center 2', city: 'Los Angeles', address: '456 Elm St', contact: '987-654-3210' },
        { id: 5, name: 'Repair Center 1', city: 'New York', address: '123 Main St', contact: '123-456-7890' },
        { id: 6, name: 'Repair Center 2', city: 'Los Angeles', address: '456 Elm St', contact: '987-654-3210' },
        { id: 7, name: 'Repair Center 1', city: 'New York', address: '123 Main St', contact: '123-456-7890' },
        { id: 8, name: 'Repair Center 2', city: 'Los Angeles', address: '456 Elm St', contact: '987-654-3210' },
        { id: 9, name: 'Repair Center 1', city: 'New York', address: '123 Main St', contact: '123-456-7890' },
        { id: 10, name: 'Repair Center 2', city: 'Los Angeles', address: '456 Elm St', contact: '987-654-3210' },
    ];

    const handleRepairCenterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        if (selectedId) {
            const selectedCenter = repairCenters.find(center => center.id === parseInt(selectedId));
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
            console.log('Selected files:', fileList);
        }
    };

    const removeFile = (index: number) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
        setFileNames(updatedFiles.map((file) => file.name));
    };

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    return (
        <>
            <header>
                <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <div className="flex items-center lg:order-2">
                            <button
                                onClick={openDialog}
                                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
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
                                        className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                                        aria-current="page"
                                    >
                                        Home
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
                                    className={`w-1/3 text-center border-b-2 ${currentStep >= 1 ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-500'
                                        }`}
                                >
                                    Step 1
                                </div>
                                <div
                                    className={`w-1/3 text-center border-b-2 ${currentStep >= 2 ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-500'
                                        }`}
                                >
                                    Step 2
                                </div>
                                <div
                                    className={`w-1/3 text-center border-b-2 ${currentStep >= 3 ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-500'
                                        }`}
                                >
                                    Step 3
                                </div>
                            </div>

                            {/* Step 1 - Claim Info and Vehicle Info */}
                            {currentStep === 1 && (
                                <Formik
                                    initialValues={{
                                        issueDescription: '',
                                        company: '',
                                        model: '',
                                        year: '',
                                        vehicleNumber: '',
                                    }}
                                    onSubmit={(values) => {
                                        console.log(values);
                                        nextStep();
                                    }}
                                >
                                    {({ handleSubmit }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <div className="mb-4 flex space-x-8">
                                            <ClaimInfo issueDescriptionName="issueDescription" />

                                                {/* Claim Info Section */}
                                                {/* <div className="w-1/2">
                                                    <h4 className="font-semibold mb-2">Claim Info</h4>
                                                    <div className="mb-4">
                                                        <label
                                                            htmlFor="issueDescription"
                                                            className="block text-sm font-medium text-gray-700 mb-2 p-1"
                                                        >
                                                            Issue Description
                                                        </label>
                                                        <Field
                                                            as="textarea"
                                                            id="issueDescription"
                                                            name="issueDescription"
                                                            placeholder="Enter issue description"
                                                            className="w-full border rounded-lg p-2"
                                                            rows="13"
                                                        />
                                                    </div>
                                                </div> */}

                                                {/* Vehicle Info Section */}
                                                <div className="w-1/2">
                                                    <h4 className="font-semibold mb-2">Vehicle Info</h4>

                                                    <div className="mb-4">
                                                        <label
                                                            htmlFor="company"
                                                            className="block text-sm font-medium text-gray-700 mb-2 p-1"
                                                        >
                                                            Company
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            id="company"
                                                            name="company"
                                                            placeholder="Enter company name"
                                                            className="w-full border rounded-lg p-2"
                                                        />
                                                    </div>

                                                    <div className="mb-4">
                                                        <label
                                                            htmlFor="model"
                                                            className="block text-sm font-medium text-gray-700 mb-2 p-1"
                                                        >
                                                            Model
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            id="model"
                                                            name="model"
                                                            placeholder="Enter model"
                                                            className="w-full border rounded-lg p-2"
                                                        />
                                                    </div>

                                                    <div className="mb-4">
                                                        <label
                                                            htmlFor="year"
                                                            className="block text-sm font-medium text-gray-700 mb-2 p-1"
                                                        >
                                                            Year of Manufacturing
                                                        </label>
                                                        <Field
                                                            type="date"
                                                            id="year"
                                                            name="year"
                                                            placeholder="Enter manufacturing year"
                                                            className="w-full border rounded-lg p-2"
                                                        />
                                                    </div>

                                                    <div className="mb-4">
                                                        <label
                                                            htmlFor="vehicleNumber"
                                                            className="block text-sm font-medium text-gray-700 mb-2 p-1"
                                                        >
                                                            Vehicle Number
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            id="vehicleNumber"
                                                            name="vehicleNumber"
                                                            placeholder="Enter vehicle number"
                                                            className="w-full border rounded-lg p-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            )}

                            {/* Step 2 - Upload Claim Documents */}
                            {currentStep === 2 && (
                                <Formik
                                    initialValues={{
                                        documents: null,
                                    }}
                                    onSubmit={(values) => {
                                        console.log(values);
                                        // Add your next step functionality here
                                    }}
                                >
                                    {({ setFieldValue, handleSubmit }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <div className="mb-4">
                                                <label
                                                    htmlFor="documents"
                                                    className="block text-sm font-medium text-gray-700 mb-2 p-1"
                                                >
                                                    Upload Claim Document
                                                </label>
                                                <div className="relative flex flex-col p-4 text-gray-400 border border-gray-200 rounded">
                                                    <div
                                                        className="relative flex flex-col text-gray-400 border border-gray-200 border-dashed rounded cursor-pointer"
                                                        onDragOver={(e) => e.preventDefault()}
                                                        onDrop={(e) => {
                                                            e.preventDefault();
                                                            const droppedFiles = e.dataTransfer.files;
                                                            handleFileChange({ target: { files: droppedFiles } } as React.ChangeEvent<HTMLInputElement>);
                                                        }}
                                                    >
                                                        <input
                                                            type="file"
                                                            id="documents"
                                                            name="documents"
                                                            onChange={(event) => {
                                                                handleFileChange(event);
                                                                setFieldValue('documents', event.target.files);
                                                            }}
                                                            className="absolute inset-0 w-full h-full p-0 m-0 opacity-0 cursor-pointer"
                                                            multiple
                                                        />
                                                        <div className="flex flex-col items-center justify-center py-10 text-center">
                                                            <svg
                                                                className="w-6 h-6 mr-1 text-current-50"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                />
                                                            </svg>
                                                            <p>Drag your files here or click in this area.</p>
                                                        </div>
                                                    </div>

                                                    {/* Display the selected files */}
                                                    {files.length > 0 && (
                                                        <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-6">
                                                            {files.map((file, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="relative flex flex-col items-center overflow-hidden text-center bg-gray-100 border rounded cursor-move select-none"
                                                                    style={{ paddingTop: '100%' }}
                                                                >
                                                                    <button
                                                                        className="absolute top-0 right-0 z-50 p-1 bg-white rounded-bl focus:outline-none"
                                                                        type="button"
                                                                        onClick={() => removeFile(index)}
                                                                    >
                                                                        <svg
                                                                            className="w-4 h-4 text-gray-700"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            stroke="currentColor"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth="2"
                                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                            />
                                                                        </svg>
                                                                    </button>
                                                                    {file.type.includes('image/') && (
                                                                        <img
                                                                            className="absolute inset-0 z-0 object-cover w-full h-full border-4 border-white preview"
                                                                            src={URL.createObjectURL(file)}
                                                                            alt={file.name}
                                                                        />
                                                                    )}
                                                                    {file.type.includes('video/') && (
                                                                        <video
                                                                            className="absolute inset-0 object-cover w-full h-full border-4 border-white"
                                                                            controls
                                                                        >
                                                                            <source src={URL.createObjectURL(file)} type="video/mp4" />
                                                                        </video>
                                                                    )}
                                                                    <div className="absolute bottom-0 left-0 right-0 flex flex-col p-2 text-xs bg-white bg-opacity-50">
                                                                        <span className="w-full font-bold text-gray-900 truncate">{file.name}</span>
                                                                        <span className="text-xs text-gray-900">
                                                                            {Math.round(file.size / 1024)} KB
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            )}

                            {/* Step 3 - Select Repair Center */}
                            {currentStep === 3 && (
                                <Formik
                                    initialValues={{
                                        repairCenter: '',
                                    }}
                                    onSubmit={(values) => {
                                        console.log(values);
                                    }}
                                >
                                    {({ handleSubmit }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <div className="mb-4">
                                                <label
                                                    htmlFor="repairCenter"
                                                    className="block text-sm font-medium text-gray-700 mb-2 p-1"
                                                >
                                                    Select Repair Center
                                                </label>
                                                <Field
                                                    as="select"
                                                    id="repairCenter"
                                                    name="repairCenter"
                                                    className="w-full border rounded-lg p-2"
                                                    onChange={handleRepairCenterChange}
                                                >
                                                    <option value="">Select a repair center</option>
                                                    {repairCenters.map((center) => (
                                                        <option key={center.id} value={center.id}>
                                                            {center.name} - {center.city}
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>

                                            {selectedRepairCenter && (
                                                <div className="mt-6 mb-[25px]">
                                                    <div className="max-w-[22rem] mx-auto bg-white p-6 rounded-lg shadow-lg">
                                                        <div className="flex items-center mb-4">
                                                            <FaBuilding className="text-blue-500 mr-3" />
                                                            <p className="text-lg font-semibold text-gray-800">{selectedRepairCenter.name}</p>
                                                        </div>
                                                        <div className="flex items-center mb-4">
                                                            <FaCity className="text-blue-500 mr-3" />
                                                            <p className="text-gray-700">{selectedRepairCenter.city}</p>
                                                        </div>
                                                        <div className="flex items-center mb-4">
                                                            <FaMapMarkerAlt className="text-blue-500 mr-3" />
                                                            <p className="text-gray-700">{selectedRepairCenter.address}</p>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <FaPhone className="text-blue-500 mr-3" />
                                                            <p className="text-gray-700">{selectedRepairCenter.contact}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Form>
                                    )}
                                </Formik>
                            )}

                            {/* Step Navigation */}
                            <div className="p-4 border-t flex justify-between">
                                <button
                                    onClick={prevStep}
                                    disabled={currentStep === 1}
                                    className={`px-4 py-2 rounded-lg ${currentStep === 1
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
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
                                        className={`px-4 py-2 rounded-lg ${currentStep === 3
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                                            }`}
                                    >
                                        Next
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}