import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin'); // Redirect to signin page if token doesn't exist
    }
  }, [router]);
};

export default useAuth;
