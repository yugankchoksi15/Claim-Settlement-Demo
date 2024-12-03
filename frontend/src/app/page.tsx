// pages/HomePage.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ListClaim from './components/ListClaim/ListClaim';
import Header from './components/Header/Header';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Check if there's a token in localStorage
    const token = localStorage.getItem('token');

    // Redirect based on the presence of the token
    if (!token) {
      router.push('/signin'); // Redirect to the sign-in page
    } else {
      router.push('/'); // Redirect to the homepage/dashboard
    }
  }, [router]);

  return (
    <div>
      <Header />
      <div className='mt-5'>
      <ListClaim />
      </div>
    </div>
  );
}
