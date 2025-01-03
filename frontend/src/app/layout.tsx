"use client";
import * as React from "react";
import Head from "next/head";
import "@/styles/globals.css";
import "@/styles/colors.css";
import { defaultMetadata } from "@/constant/metadata"; // Import the metadata
import Header from "./components/Header/Header";
import Footer from "./components/footer/footer";
import useAuth from "./components/UserAuthCheck/useAuth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  useAuth();
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(token ? true : false); // Set `isLoggedIn` to true if token exists
  }, []); // Run only once on mount

  return (
    <html>
      <body className="min-h-screen flex flex-col">
        <Head>
          <title>{defaultMetadata.title}</title>{" "}
          {/* Use the title from the metadata */}
          <meta name="description" content={defaultMetadata.description} />
          <meta name="keywords" content={defaultMetadata.keywords} />
          <meta name="author" content={defaultMetadata.author} />
        </Head>
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
