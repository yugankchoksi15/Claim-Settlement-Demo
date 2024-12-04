import { Field } from "formik";
import React from "react";
import { FaBuilding, FaCity, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export default function RepairCenter({
  handleRepairCenterChange,
  repairCenters,
  selectedRepairCenter,
}: any) {
  return (
    <>
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
          {repairCenters.map((center: any) => (
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
              <p className="text-gray-700">{selectedRepairCenter.contact}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
  