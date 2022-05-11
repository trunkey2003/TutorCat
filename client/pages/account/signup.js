import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@meowmeow/components/PageComponents/PageLoader';
import AuthPage from '../../@meowmeow/authentication/auth-page-wrappers/AuthPage';
import { Heading } from '../../@meowmeow/modules'

const SignUp = dynamic(() => import('../../@meowmeow/components/auth/SignUp'), {
  loading: () => <PageLoader />,
});

const SignUpPage = () => (
    <AuthPage>
      <Heading title1="config.projectName" title2="signup.signup" description="landingpage.slogan"/>
      <SignUp/>
    </AuthPage>
);

export default SignUpPage;