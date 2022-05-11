import Forum from '../../@meowmeow/components/Layout/Forum'
import PageLoader from '../../@meowmeow/components/PageComponents/PageLoader'
import SecurePage from '../../@meowmeow/authentication/auth-page-wrappers/SecurePage'
import { loggedIn } from '../../@meowmeow/authentication'
import dynamic from 'next/dynamic';
import SignInPage from '../account/signin';
import { Heading } from '../../@meowmeow/modules'

const QuestionNew = dynamic(() => import('../../@meowmeow/components/QuestionNew'), {
    loading: () => <PageLoader />,
});

const QuestionNewPage = () => {
    const authUser = loggedIn();
    return (
        <>
            {authUser ? <>
                <Heading title1="config.projectName" title2="questions.new" description="landingpage.slogan" />
                < Forum >
                    <QuestionNew />
                </Forum >
            </> : <SignInPage />}
        </>
    )
}

export default QuestionNewPage;