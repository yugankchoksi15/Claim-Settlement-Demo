"use client";

import { useEffect, useState } from "react";
import { getClaimAPI } from "@/app/api/ApiConfig/api";
import Pagination from "../pagination";
import Feedback from "../Feedback/feedback";
import RepairCenterDialog from "../RepairCenterDialog/RepairCenterDialog";


export default function ListClaim() {
  const [claimData, setClaimData] = useState([]);
  const [page, setPage] = useState(1);
  const [claimTotal, setCliamTotal] = useState(0);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);
  const [isRepairCenterDialogOpen, setIsRepairCenterDialogOpen] = useState(false);
  const [selectedClaimForRepair, setSelectedClaimForRepair] = useState<string | null>(null);


  const getClaimData = async () => {
    try {
      const resp = await getClaimAPI(page);
      setClaimData(resp.data);
      setCliamTotal(resp.total);
    } catch (error) {
      console.error("Error fetching claim data:", error);
    }
  };

  useEffect(() => {
    getClaimData();
  }, [page]);

  const handlePageNext = () => {
    setPage((prev) => prev + 1);
  };

  const handlePagePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const openFeedbackDialog = (claimId: string) => {
    setSelectedClaimId(claimId);
    setIsFeedbackOpen(true);
  };

  const closeFeedbackDialog = () => {
    setIsFeedbackOpen(false);
    setSelectedClaimId(null);
  };

  const openRepairCenterDialog = (claimId: string) => {
    setSelectedClaimForRepair(claimId);
    setIsRepairCenterDialogOpen(true);
  };

  const closeRepairCenterDialog = () => {
    setIsRepairCenterDialogOpen(false);
    setSelectedClaimForRepair(null);
  };

  const handleCancelClaim = (claimId: string) => {
    // Implement cancel logic here
    console.log(`Cancel claim with ID: ${claimId}`);
  };

  const handleAppealClaim = (claimId: string) => {
    // Implement appeal logic here
    console.log(`Appeal claim with ID: ${claimId}`);
  };

  return (
    <>
      {claimData.length ? (
        <>
          {" "}
          <div className="mt-5 h-[70vh]">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Model</th>
                  <th scope="col" className="px-6 py-3">Company</th>
                  <th scope="col" className="px-6 py-3">Vehicle Number</th>
                  <th scope="col" className="px-6 py-3">Year Of Manufacturing</th>
                  <th scope="col" className="px-6 py-3">Issue Description</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {claimData.map((claim: any, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">{claim.model}</td>
                    <td className="px-6 py-4">{claim.company}</td>
                    <td className="px-6 py-4">{claim.vehicleNumber}</td>
                    <td className="px-6 py-4">{claim.yearOfManufacturing}</td>
                    <td className="px-6 py-4">{claim.status}</td>
                    <td className="px-6 py-4">
                      {claim.status === "Pending" ? (
                        <button
                          onClick={() => handleCancelClaim(claim._id)}
                          className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
                        >
                          Cancel
                        </button>
                      ) : claim.status === "Accepted" ? (
                        <button
                          onClick={() => openRepairCenterDialog(claim._id)}
                          className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white"
                        >
                          Select Repair Center
                        </button>
                      ) : claim.status === "Rejected" ? (
                        <button
                          onClick={() => handleAppealClaim(claim._id)}
                          className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white"
                        >
                          Appeal
                        </button>
                      ) : claim.status === "Repaired" ? (
                        <button
                          onClick={() => openFeedbackDialog(claim._id)}
                          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          Feedback
                        </button>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
          <div className="relative">
            {/* Other Content */}
            <Pagination
              page={page}
              claimTotal={claimTotal}
              handlePagePrev={handlePagePrev}
              handlePageNext={handlePageNext}
            />
          </div>
          <Feedback
            isOpen={isFeedbackOpen}
            onClose={closeFeedbackDialog}
            claimId={selectedClaimId}
          />
          {/* Repair Center Dialog Component */}
          <RepairCenterDialog
            isOpen={isRepairCenterDialogOpen}
            onClose={closeRepairCenterDialog}
            claimId={selectedClaimForRepair}
          />

        </>
      ) : (
        <div className="flex justify-center items-center h-auto">
          <img src="/images/no_data_found.webp" alt="No data found" />
        </div>
      )}
    </>
  );
}
