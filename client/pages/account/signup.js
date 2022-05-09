import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@meowmeow/components/PageComponents/PageLoader';
import AuthPage from '../../@meowmeow/authentication/auth-page-wrappers/AuthPage';

const SignUp = dynamic(() => import('../../@meowmeow/components/auth/SignUp'), {
  loading: () => <PageLoader />,
});

const SignUpPage = () => (
    <AuthPage>
      <SignUp/>
    </AuthPage>
);

export default SignUpPage;