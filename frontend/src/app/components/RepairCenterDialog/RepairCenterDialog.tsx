import { claimAppealApi, getRepairecenterApi } from "@/app/api/ApiConfig/api";
import React, { useState, useEffect } from "react";
import {
  FaTimes,
  FaBuilding,
  FaCity,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";

interface RepairCenterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  claimId: string | null;
}

const RepairCenterDialog: React.FC<RepairCenterDialogProps> = ({
  isOpen,
  onClose,
  claimId,
}) => {
  const [repairCenters, setRepairCenters] = useState([]);
  const [selectedRepairCenter, setSelectedRepairCenter] = useState<any>(null);

  const getRepaireCenterData = async () => {
    try {
      const resp = await getRepairecenterApi();
      setRepairCenters(resp);
    } catch (error) {
      console.error("Error fetching repair center data:", error); // Log the error
    }
  };

  useEffect(() => {
    if (isOpen) {
      getRepaireCenterData();
    }
  }, [isOpen]);

  const handleRepairCenterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = event.target.value;
    if (selectedId) {
      const selectedCenter: any = repairCenters?.find(
        (center: any) => center._id === selectedId
      );
      setSelectedRepairCenter(selectedCenter);
    } else {
      setSelectedRepairCenter(null);
    }
  };

  const handleClaimAppeal = async () => {
    try {
      const param = {
        status: "Accepted",
        repairCenter: selectedRepairCenter._id,
      };
  
      // Make the API call
      const resp = await claimAppealApi(claimId, param);
      onClose()
      
    } catch (error) {
      console.error('Error while appealing claim:', error);
    }
  };
  

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${isOpen ? "block" : "hidden"}`}
    >
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={24} />
        </button>

        <h3 className="text-xl font-semibold mb-4">Select Repair Center</h3>

        <div className="mb-4">
          <select
            onChange={(e) => handleRepairCenterChange(e)} // Pass the full event object
            className="w-full border rounded-lg p-2"
          >
            <option value="">Select a repair center</option>
            {repairCenters.map((center: any) => (
              <option key={center._id} value={center._id}>
                {center.name} - {center.city}
              </option>
            ))}
          </select>
        </div>

        {selectedRepairCenter && (
          <div className="mt-4 bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <FaBuilding className="text-blue-500 mr-2" />
              <p className="font-semibold">{selectedRepairCenter.name}</p>
            </div>
            <div className="flex items-center mb-2">
              <FaCity className="text-blue-500 mr-2" />
              <p>{selectedRepairCenter.city}</p>
            </div>
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="text-blue-500 mr-2" />
              <p>{selectedRepairCenter.address}</p>
            </div>
            <div className="flex items-center">
              <FaPhone className="text-blue-500 mr-2" />
              <p>{selectedRepairCenter.contactNumber}</p>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleClaimAppeal}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RepairCenterDialog;
