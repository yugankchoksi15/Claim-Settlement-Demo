// pages/HomePage.tsx
'use client';

import Header from './components/Header/Header';
import ListClaim from './components/ListClaim/ListClaim';
import useAuth from './components/UserAuthCheck/useAuth';

export default function HomePage() {
  useAuth();

  return (
    <div>
      <Header />
      <ListClaim />
    </div>
  );
}
