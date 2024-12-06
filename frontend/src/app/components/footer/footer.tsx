"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // htmlFor Next.js 13+ routing
import "@/lib/env";

export default function Footer() {
  return (
    <>
      <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-yellow-500 sm:text-center">
            © 2024{" "}
            <a href="/" className="hover:underline">
              claim
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}
