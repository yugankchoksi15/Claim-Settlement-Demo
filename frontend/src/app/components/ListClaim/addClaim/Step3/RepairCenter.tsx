import { Field } from "formik";
import { useTranslations } from "next-intl";
import React from "react";
import { FaBuilding, FaCity, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export default function RepairCenter({
  handleRepairCenterChange,
  selectedRepairCenter,
  errors,
  touched,
  repaireCenter,
  setFieldValue, // Pass setFieldValue from Formik props
}: any) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setFieldValue("repairCenter", selectedId); // Update Formik's state
    handleRepairCenterChange(event); // Call additional handler if needed
  };

  const t = useTranslations('HomePage');

  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="repairCenter"
          className="block text-sm font-medium text-gray-700 mb-2 p-1"
        >
          {t("Select Repair Center")}
        </label>
        <Field
          as="select"
          id="repairCenter"
          name="repairCenter"
          className="w-full border rounded-lg p-2"
          onChange={handleChange} // Use the modified handleChange
        >
          <option value="">{t("Select Repair Center")}</option>
          {repaireCenter?.map((center: any) => (
            <option key={center._id} value={center._id}>
              {center.name} - {center.city}
            </option>
          ))}
        </Field>

        {/* Display error message */}
        {errors.repairCenter && touched.repairCenter && (
          <div className="text-sm text-red-600 mt-1">{errors.repairCenter}</div>
        )}
      </div>

      {selectedRepairCenter && (
        <div className="mt-6 mb-[25px]">
          <div className="max-w-[22rem] mx-auto bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <FaBuilding className="text-blue-500 mr-3" />
              <p className="text-lg font-semibold text-gray-800">
                {selectedRepairCenter.name}
              </p>
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
              <p className="text-gray-700">
                {selectedRepairCenter.contactNumber}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
