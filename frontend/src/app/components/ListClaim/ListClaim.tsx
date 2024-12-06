"use client";

import { useEffect, useState } from "react";
import { getClaimAPI } from "@/app/api/ApiConfig/api";
import Pagination from "../pagination";
import Feedback from "../Feedback/feedback";
import RepairCenterDialog from "../RepairCenterDialog/RepairCenterDialog";
import CancelDialog from "./DialogStatus/CancelDialog";
import ApealDialog from "./DialogStatus/ApealDialog";
import { useTranslations } from "next-intl";

export default function ListClaim({count, setCount}:any) {
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

  const t = useTranslations('HomePage');

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
  };

  const handleAppealClaim = (claimId: string) => {
    // Implement appeal logic here
    setApealDialogOpen(true);
    setSelectedClaimForRepair(claimId);
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
                      {t('MODEL')}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t('Company')}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t ('VEHICLE NUMBER')}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t('YEAR OF MANUFACTURING')}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t('STATUS')}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t('VIEW DOCUMENT')}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t('ACTIONS')}
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
                              <span className="text-yellow-500">{t('View')}</span>
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
                             {t('Cancel')}
                              </button>
                            ) : claim.status === "Accepted" ? (
                              <button
                                onClick={() =>
                                  openRepairCenterDialog(claim._id)
                                }
                                className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white"
                              > 
                                {t('Select Repair Center')}
                              </button>
                            ) : claim.status === "Rejected" ? (
                              <button
                                onClick={() => handleAppealClaim(claim._id)}
                                className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white"
                              >
                               {t('Appeal')}
                              </button>
                            ) : claim.status === "Repaired" ? (
                              <button
                                onClick={() => openFeedbackDialog(claim._id)}
                                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
                              >
                               {t('Feedback')}
                              </button>
                            ) : null}
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
            setCount={setCount}
          />
          {/* Repair Center Dialog Component */}
          <RepairCenterDialog
            isOpen={isRepairCenterDialogOpen}
            onClose={closeRepairCenterDialog}
            claimId={selectedClaimForRepair}
            setCount={setCount}
          />
          <CancelDialog
            isOpen={cancelDialogOpen}
            claimId={selectedClaimForRepair}
            onClose={closeRepairCenterDialog}
            setCount={setCount}
          />
          <ApealDialog
            isOpen={ApealDialogOpen}
            claimId={selectedClaimForRepair}
            onClose={closeRepairCenterDialog}
            setCount={setCount}
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
