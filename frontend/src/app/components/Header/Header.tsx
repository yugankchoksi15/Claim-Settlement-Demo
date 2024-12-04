'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // htmlFor Next.js 13+ routing
import '@/lib/env';


export default function Header() {

  return (
<>
<header>
    <nav className="border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800" style={{backgroundColor: "#0A172B"}}>
        <div className="flex flex-wrap justify-between items-center mx-auto">
            <a href="https://flowbite.com" className="flex items-center">
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white text-yellow-400">Claim</span>
            </a>
            <div className="flex items-center lg:order-2">
                <a href="#" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Log out</a>
            </div>
        </div>
    </nav>
</header>
</>

  );
}
