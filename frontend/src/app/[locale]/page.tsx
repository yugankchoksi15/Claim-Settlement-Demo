// pages/HomePage.tsx
'use client';

import { useState } from 'react';

import useAuth from '../components/UserAuthCheck/useAuth';
import Header from '../components/Header/Header';
import ListClaim from '../components/ListClaim/ListClaim';

export default function HomePage() {
  const [count, setCount] = useState(0);


  useAuth();

  return (
    <div>
      <Header setCount={setCount}/>
      <ListClaim count={count} setCount={setCount}/>
    </div>
  );
}