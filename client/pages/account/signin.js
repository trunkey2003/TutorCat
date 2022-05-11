import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@meowmeow/components/PageComponents/PageLoader';
import AuthPage from '../../@meowmeow/authentication/auth-page-wrappers/AuthPage';
import { Heading } from '../../@meowmeow/modules'

const SignIn = dynamic(() => import('../../@meowmeow/components/auth/SignIn'), {
  loading: () => <PageLoader />,
});

const SignInPage = () => (
    <AuthPage>
      <Heading title1="config.projectName" title2="signin.signin" description="landingpage.slogan"/>
      <SignIn/>
    </AuthPage>
);

export default SignInPage;