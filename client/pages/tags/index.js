import Forum from '../../@meowmeow/components/Layout/Forum'
import PageLoader from '../../@meowmeow/components/PageComponents/PageLoader'
import dynamic from 'next/dynamic';
import { Heading } from '../../@meowmeow/modules'

const TagsOverview = dynamic(() => import('../../@meowmeow/components/TagsOverview'), {
    loading: () => <PageLoader />,
});

const questionNewPage = () => {
    return (
        <>
            <Heading title1="config.projectName" title2="tags.tag" description="landingpage.slogan" />
            <Forum>
                <TagsOverview />
            </Forum>
        </>

    )
}

export default questionNewPage;