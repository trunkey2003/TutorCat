import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../index';
import PageLoader from '../../components/PageComponents/PageLoader';

// eslint-disable-next-line react/prop-types
const SecurePage = ({ children }) => {
  const { loadingAuthUser, authUser, setError } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loadingAuthUser && !authUser) {
      router.push('/account/signin').then((r) => r);
    }

    return () => setError('');
  }, [authUser, loadingAuthUser]);

  return authUser && !loadingAuthUser ? children : <PageLoader />;
};

export default SecurePage;
