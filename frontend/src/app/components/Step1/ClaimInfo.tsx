import React from "react";
import { Field } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ClaimInfo = ({ issueDescriptionName, errors, touched }: any) => {
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
          {errors.issueDescription && touched.issueDescription && (
            <div className="text-red-500 text-sm">
              {errors.issueDescription}
            </div>
          )}
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
          {errors.company && touched.company && (
            <div className="text-red-500 text-sm">{errors.company}</div>
          )}
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
          {errors.model && touched.model && (
            <div className="text-red-500 text-sm">{errors.model}</div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700 mb-2 p-1"
          >
            Year of Manufacturing
          </label>
          <Field
            name="yearOfManufacturing"
            className="w-full border rounded-lg p-2"
            render={({ field, form }: any) => (
              <DatePicker
                {...field}
                selected={
                  field.value ? new Date(field.value, 0) : null // Convert year to Date object
                }
                onChange={(date) =>
                  form.setFieldValue(
                    "yearOfManufacturing",
                    date ? date.getFullYear() : ""
                  )
                }
                showYearPicker
                dateFormat="yyyy"
                placeholderText="Enter manufacturing year"
                className="w-full border rounded-lg p-2"
              />
            )}
          />

          {errors.yearOfManufacturing && touched.yearOfManufacturing && (
            <div className="text-red-500 text-sm">
              {errors.yearOfManufacturing}
            </div>
          )}
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
          {errors.vehicleNumber && touched.vehicleNumber && (
            <div className="text-red-500 text-sm">{errors.vehicleNumber}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ClaimInfo;
