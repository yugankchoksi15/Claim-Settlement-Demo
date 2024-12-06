'use client';

import { useTranslations } from "next-intl";
import React from "react";

const Pagination = ({
  page,
  claimTotal,
  handlePagePrev,
  handlePageNext,
}: any) => {

  const t = useTranslations('HomePage');

  return (
    <div className="flex flex-col items-end mr-6 absolute  right-2">
      <span className="text-sm text-gray-700 dark:text-gray-400">
      {t('Showing')} {" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {page}
        </span>{" "}
       {t('to')} {" "}
        <span className="font-semibold text-gray-900 dark:text-white">10</span>{" "}
        {t('of')} {" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {claimTotal}
        </span>{" "}
         {t('Entries')}
      </span>

      <div className="inline-flex mt-2 xs:mt-0">
        <button
          onClick={handlePagePrev}
          className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-yellow-500 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
           {t('Prev')}
        </button>
        <button
          onClick={handlePageNext}
          className={`flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-yellow-500 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
            page * 10 >= claimTotal ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={page * 10 >= claimTotal}
        >
           {t('Next')}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
