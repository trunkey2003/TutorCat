import Forum from '../../../@meowmeow/components/Layout/Forum'
import QuestionEdit from '../../../@meowmeow/components/QuestionEdit'
import { Axios } from '../../../@meowmeow/modules/apiService/config'
import Error from '../../_error'
import { Heading } from '../../../@meowmeow/modules'
import { loggedIn } from '../../../@meowmeow/authentication'
import SignInPage from '../../account/signin';
import { getLocalStorage, setLocalStorage } from "../../../@meowmeow/modules"

const questionEditPage = ({ qDetail }) => {
    const authUser = loggedIn()
    let user = JSON.parse(getLocalStorage("user", true, null))
    return (
        <>
            <Heading title1="config.projectName" title2="questions.editQuestion" description="landingpage.slogan"/>
            {(qDetail === undefined || qDetail === null) ?
                <Error statusCode={404} /> :
                authUser ?
                    ((user._id === qDetail.userID._id)
                        ? (<Forum>
                            <QuestionEdit data={qDetail} />
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
        .get(`/question/${params.qid}/detail`)
        .then(res => {
            let data = res.data.data
            return data
        })
        .catch(() => {
            return null
        }
        )
    let qDetail = data
    return {
        props: {
            qDetail: qDetail || null,
        }
    }
}

export default questionEditPage;