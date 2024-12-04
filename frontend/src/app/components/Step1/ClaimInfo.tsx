// ClaimInfo.jsx
import React from "react";
import { Field } from "formik";

const ClaimInfo = ({ issueDescriptionName }: any) => {
  return (
    <>
      <div className="w-1/2">
        <h4 className="font-semibold mb-2">Claim Info</h4>
        <div className="mb-4">
          <label
            htmlFor={issueDescriptionName}
            className="block text-sm font-medium text-gray-700 mb-2 p-1"
          >
            Issue Description
          </label>
          <Field
            as="textarea"
            id={issueDescriptionName}
            name={issueDescriptionName}
            placeholder="Enter issue description"
            className="w-full border rounded-lg p-2"
            rows="13"
          />
        </div>
      </div>
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
    </>
  );
};

export default ClaimInfo;
