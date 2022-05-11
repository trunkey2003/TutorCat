import Forum from '../../../../../@meowmeow/components/Layout/Forum'
import AnswerEdit from '../../../../../@meowmeow/components/AnswerEdit'
import { Axios } from '../../../../../@meowmeow/modules/apiService/config'
import Error from '../../../../_error'
import Head from 'next/head'
import IntlMessages from '../../../../../@meowmeow/utils/IntlMessages';
import SignInPage from '../../../../account/signin';
import { loggedIn } from '../../../../../@meowmeow/authentication'
import { getLocalStorage, setLocalStorage } from "../../../../../@meowmeow/modules"
import { Heading } from '../../../../../@meowmeow/modules'

const answerEditPage = ({ aDetail, questionId }) => {
    const authUser = loggedIn()
    let user = JSON.parse(getLocalStorage("user", true, null))
    return (
        <>
            <Heading title1="config.projectName" title2="questions.editAnswer" description="landingpage.slogan"/>
            {(aDetail === undefined || aDetail === null) ?
                <Error statusCode={404} /> :
                authUser ?
                    ((user._id === aDetail.userID._id)
                        ? (<Forum>
                            <AnswerEdit data={aDetail} questionId={questionId}/>
                        </Forum>)
                        : <Error statusCode={406} />)
                    : <SignInPage />}
        </>
    )
}

// export async function getStaticPaths() {
//     let data = await Axios
//         .get(`/question/`)
//         .then(res => {
//             let data = res.data.data
//             return data
//         })
//         .catch(() => {
//             return []
//         }
//         )
//     const paths = data.map(question => ({
//         params: { qid: question._id },
//     }));
//     return {
//         paths,
//         fallback: 'blocking' // false or 'blocking'
//     };
// }

export async function getServerSideProps({ params }) {
    let data = await Axios
        .get(`/question/${params.qid}/reply`)
        .then(res => {
            let data = res.data.data
            return data
        })
        .catch(() => {
            return null
        }
        )
    let aDetail = data.find(reply => reply._id === params.aid)
    return {
        props: {
            aDetail: aDetail || null,
            questionId: params.qid || null,
        }
    }
}

export default answerEditPage;