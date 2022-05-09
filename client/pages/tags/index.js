import Forum from '../../@meowmeow/components/Layout/Forum'
import PageLoader from '../../@meowmeow/components/PageComponents/PageLoader'
import dynamic from 'next/dynamic';

const TagsOverview = dynamic(() => import('../../@meowmeow/components/TagsOverview'), {
    loading: () => <PageLoader />,
});

const questionNewPage = () => {
    return (
        <Forum>
            <TagsOverview />
        </Forum>
    )
}

export default questionNewPage;