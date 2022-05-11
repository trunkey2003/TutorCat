import Forum from '../../@meowmeow/components/Layout/Forum'
import QuestionOverview from '../../@meowmeow/components/QuestionOverview'
import { Axios } from '../../@meowmeow/modules/apiService/config'
import { Heading } from '../../@meowmeow/modules'

const questionPage = ({ qAll }) => {
    return (
        <>
            <Heading title1="config.projectName" title2="questions.allQuestion" description="landingpage.slogan"/>
            <Forum>
                <QuestionOverview data={qAll} />
            </Forum>
        </>
    )
}

export async function getServerSideProps() {
    let data = await Axios
        .get(`/question/`)
        .then((res) => {
            let data = res.data.data
            return data
        })
        .catch(() => {
            return null
        }
        )
    return {
        props: { 
            qAll: data || null,
        }
    }
}

export default questionPage;