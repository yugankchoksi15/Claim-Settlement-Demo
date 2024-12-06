'use client'

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';


const useAuth = () => {
  const path = usePathname();
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      const locale = path.split('/')[1];
      router.push(`/${locale}/signin`);
    }
  }, [router]);
};

export default useAuth;