// pages/HomePage.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ListClaim from './components/ListClaim/ListClaim';
import Header from './components/Header/Header';
import useAuth from './components/useAuth';

export default function HomePage() {
  useAuth();

  return (
    <div>
      {/* <Header /> */}
      <ListClaim />
    </div>
  );
}
