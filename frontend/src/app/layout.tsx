"use client";
import * as React from "react";
import Head from "next/head";

import "@/styles/globals.css";
import "@/styles/colors.css";

import { siteConfig } from "@/constant/config";
import Header from "./components/Header/Header";
import Footer from "./components/footer/footer";

// Server-side metadata export (no 'use client' directive here)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  const token = localStorage.getItem("token");

  return (
    <html>
      <body>
        <Head>
          <title>Default Title</title>
        </Head>
        {token ? (
          <>
            <Header />
            {children}
            <Footer />
          </>
        ) : (
          <>{children}</>
        )}
      </body>
    </html>
  );
}
