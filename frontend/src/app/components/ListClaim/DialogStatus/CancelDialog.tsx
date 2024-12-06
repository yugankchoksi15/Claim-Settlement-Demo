import { claimAppealApi } from "@/app/api/ApiConfig/api";
import React from "react";
import { FaTimes } from "react-icons/fa";

const CancelDialog = ({ isOpen, claimId, onClose }: any) => {
  const handleClaimAppeal = async () => {
    try {
      const param = {
        status: "Canceled",
      };
      const resp = await claimAppealApi(claimId, param);
      if (resp) {
        onClose();
      }
    } catch (error) {
      console.error("Error while appealing claim:", error);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${isOpen ? "block" : "hidden"}`}
    >
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <h3 className="text-xl font-semibold text-center mb-4">
          Are you sure you want to cancel?
        </h3>
        <div className="mt-6 flex justify-around">
          <button
            onClick={handleClaimAppeal} // You should define this function to handle the claim appeal action
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            onClick={onClose} // Close the modal if cancel is clicked
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelDialog;
