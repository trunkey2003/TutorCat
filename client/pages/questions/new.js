import Forum from '../../@meowmeow/components/Layout/Forum'
import PageLoader from '../../@meowmeow/components/PageComponents/PageLoader'
import SecurePage from '../../@meowmeow/authentication/auth-page-wrappers/SecurePage'
import dynamic from 'next/dynamic';

const QuestionNew = dynamic(() => import('../../@meowmeow/components/QuestionNew'), {
    loading: () => <PageLoader />,
});

const questionNewPage = () => {
    return (
        <Forum>
            <SecurePage>
                <QuestionNew />
            </SecurePage>
        </Forum>
    )
}

export default questionNewPage;