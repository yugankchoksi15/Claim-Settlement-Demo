import React from "react";
import { Field } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslations } from "next-intl";

const ClaimInfo = ({ issueDescriptionName, errors, touched }: any) => {
  const currentYear = new Date().getFullYear();

  const t = useTranslations('HomePage');
  
  return (
    <>
      <div className="w-1/2">
        <h4 className="font-semibold mb-2">{t('Claim Info')}</h4>
        <div className="mb-4">
          <label
            htmlFor={issueDescriptionName}
            className="block text-sm font-medium text-gray-700 mb-2 p-1"
          >
            {t('Issue Description')}
          </label>
          <Field
            as="textarea"
            id={issueDescriptionName}
            name={issueDescriptionName}
            placeholder={t('Enter Issue Description')}
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
        <h4 className="font-semibold mb-2"> {t('Vehicle Info')}</h4>

        <div className="mb-4">
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 mb-2 p-1"
          >
            {t('Company')}
          </label>
          <Field
            type="text"
            id="company"
            name="company"
            placeholder={t('Enter company name')}
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
             {t('Model')}
          </label>
          <Field
            type="text"
            id="model"
            name="model"
            placeholder={t('Enter model')}
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
            {t('Year of Manufacturing')}
          </label>

          <Field
            name="yearOfManufacturing"
            className="w-full border rounded-lg p-2"
            render={({ field, form }: any) => (
              <DatePicker
                {...field}
                selected={field.value ? new Date(field.value, 0) : null} // Convert year to Date object
                onChange={(date) =>
                  form.setFieldValue(
                    "yearOfManufacturing",
                    date ? date.getFullYear() : ""
                  )
                }
                showYearPicker
                dateFormat="yyyy"
                placeholderText= {t('Enter manufacturing year')}
                maxDate={new Date(currentYear, 0)} // Disable future years
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
            {t('Vehicle Number')}
          </label>
          <Field
            type="text"
            id="vehicleNumber"
            name="vehicleNumber"
            placeholder= {t('Enter vehicle number')}
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
