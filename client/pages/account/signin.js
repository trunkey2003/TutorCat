import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@meowmeow/components/PageComponents/PageLoader';
import AuthPage from '../../@meowmeow/authentication/auth-page-wrappers/AuthPage';

const SignIn = dynamic(() => import('../../@meowmeow/components/auth/SignIn'), {
  loading: () => <PageLoader />,
});

const SignInPage = () => (
    <AuthPage>
      <SignIn/>
    </AuthPage>
);

export default SignInPage;