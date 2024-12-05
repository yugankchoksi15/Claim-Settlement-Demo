"use client";

import { useEffect, useRef, useState } from "react";
import { getClaimAPI } from "@/app/api/ApiConfig/api";
import Pagination from "../pagination";

export default function ListClaim() {
  const [claimData, setClaimData] = useState([]);
  const [page, setPage] = useState(1);
  const [claimTotal, setCliamTotal] = useState(0);

  const getClaimData = async () => {
    try {
      const resp = await getClaimAPI(page); // Call the API
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
      setPage((prev) => prev - 1); // Go back to the previous step
    }
  };

  return (
    <>
      {claimData.length ? (
        <>
          {" "}
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
                    Action
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
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} claimTotal={claimTotal} handlePagePrev={handlePagePrev} handlePageNext={handlePageNext}/>
        </>
      ) : (
        <>
          <div className="flex justify-center items-center h-auto">
            <img src="/images/no_data_found.webp" alt="No data found" />
          </div>
        </>
      )}
    </>
  );
}
