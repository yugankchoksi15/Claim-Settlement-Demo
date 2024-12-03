// app/signup/page.js
import Head from 'next/head';
import React from 'react';

export default function SignUpPage() {
  return (
    <main>
      <Head>
        <title>Sign Up</title>
      </Head>
      <section className="bg-white">
        <div className="layout flex min-h-screen flex-col items-center justify-center py-12 text-center">
          <h1 className="mt-4 text-3xl">Sign Up</h1>
          <form className="mt-6">
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded-md mb-4"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-2 rounded-md mb-4"
              required
            />
          </form>
        </div>
      </section>
    </main>
  );
}
