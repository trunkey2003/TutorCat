import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../index';
import PageLoader from '../../components/PageComponents/PageLoader';

// eslint-disable-next-line react/prop-types
const AuthPage = ({ children }) => {
  const { loadingAuthUser, authUser, setError } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loadingAuthUser && authUser) {
      router.push('/').then((r) => r);
    }

    return () => setError('');
  }, [authUser, loadingAuthUser]);

  return authUser && loadingAuthUser ? <PageLoader /> : children;
};

export default AuthPage;
