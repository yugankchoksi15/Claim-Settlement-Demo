// pages/HomePage.tsx
'use client';

import ListClaim from './components/ListClaim/ListClaim';
import useAuth from './components/UserAuthCheck/useAuth';

export default function HomePage() {
  useAuth();

  return (
    <div>
      <ListClaim />
    </div>
  );
}
