"use client";

import { useEffect, useState } from "react";
import { getClaimAPI } from "@/app/api/ApiConfig/api";
import Pagination from "../pagination";
import Feedback from "../Feedback/feedback";
import RepairCenterDialog from "../RepairCenterDialog/RepairCenterDialog";
import CancelDialog from "./DialogStatus/CancelDialog";
import ApealDialog from "./DialogStatus/ApealDialog";

export default function ListClaim() {
  const [claimData, setClaimData] = useState([]);
  const [page, setPage] = useState(1);
  const [claimTotal, setCliamTotal] = useState(0);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);
  const [isRepairCenterDialogOpen, setIsRepairCenterDialogOpen] =
    useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [ApealDialogOpen, setApealDialogOpen] = useState(false);
  const [selectedClaimForRepair, setSelectedClaimForRepair] = useState<
    string | null
  >(null);

  const initialCount = localStorage.getItem("count")
    ? parseInt(localStorage.getItem("count")!)
    : 0;
  const [count, setCount] = useState<number>(initialCount);

  const getCount = localStorage.getItem("count");

  useEffect(() => {
    // Listen for changes in localStorage across tabs
    const handleStorageChange = () => {
      const updatedCount: any = localStorage.getItem("count");
      setCount(parseInt(updatedCount));
    };

    // Attach event listener
    window.addEventListener("storage", handleStorageChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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
  }, [page, count]);

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
    setCancelDialogOpen(false);
    setApealDialogOpen(false);
  };

  const handleCancelClaim = (claimId: string) => {
    // Implement cancel logic here
    setCancelDialogOpen(true);
    setSelectedClaimForRepair(claimId);
    console.log(`Cancel claim with ID: ${claimId}`);
  };

  const handleAppealClaim = (claimId: string) => {
    // Implement appeal logic here
    setApealDialogOpen(true);
    setSelectedClaimForRepair(claimId);
    console.log(`Appeal claim with ID: ${claimId}`);
  };

  return (
    <>
      {claimData.length ? (
        <>
          {" "}
          <div className="mt-5">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Model
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Company
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Vehicle Number
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Year Of Manufacturing
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Issue Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                      View Document
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
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
                        <div>
                          {claim.documents[0] &&
                            Object.keys(claim.documents[0]).length > 0 ? (
                            <a
                              href={`${process.env.NEXT_PUBLIC_API_URL}${claim.documents[0]}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="text-yellow-500">View</span>
                            </a>
                          ) : (
                            <span className="text-gray-500">

                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-4">
                          <div>
                            {claim.status === "Pending" ? (
                              <button
                                onClick={() => handleCancelClaim(claim._id)}
                                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
                              >
                                Cancel
                              </button>
                            ) : claim.status === "Accepted" ? (
                              <button
                                onClick={() =>
                                  openRepairCenterDialog(claim._id)
                                }
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
                          </div>
                          <div>
                            {claim.documents[0] &&
                            Object.keys(claim.documents[0]).length > 0 ? (
                              <a
                                href={`${process.env.NEXT_PUBLIC_API_URL}${claim.documents[0]}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <span className="text-yellow-500">View</span>
                              </a>
                            ) : (
                              <span className="text-gray-500"></span>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="relative mt-3">
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
          <CancelDialog
            isOpen={cancelDialogOpen}
            claimId={selectedClaimForRepair}
            onClose={closeRepairCenterDialog}
          />
          <ApealDialog
            isOpen={ApealDialogOpen}
            claimId={selectedClaimForRepair}
            onClose={closeRepairCenterDialog}
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
