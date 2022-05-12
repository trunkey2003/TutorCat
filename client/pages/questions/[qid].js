import Forum from '../../@meowmeow/components/Layout/Forum'
import PageLoader from '../../@meowmeow/components/PageComponents/PageLoader'
import dynamic from 'next/dynamic';
import QuestionDetail from '../../@meowmeow/components/QuestionDetail'
import { Axios } from '../../@meowmeow/modules/apiService/config'
import Error from '../_error'
import { Heading } from "../../@meowmeow/modules"
import Head from "next/head"

const questionDetailPage = ({ qDetail, qReply }) => {
    const { convert } = require('html-to-text');
    const content = convert(qDetail.content, {
        selectors: [ { selector: 'img', format: 'skip' } ]
    })
    return (
        <>
            {(qDetail !== undefined && qDetail !== null) ?
                <>
                    <Head>
                        <title>{qDetail.categories[0] !== undefined ? qDetail.categories[0].category:""} - {qDetail.title}</title>
                        <meta name="description" content={content}/>
                    </Head>
                </>
                :
                <></>}
                {(qDetail === undefined || qDetail === null) ? <Error statusCode="404" /> : <Forum><QuestionDetail data={qDetail} answer={qReply}/></Forum>}
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
        .get(`/question/`)
        .then(res => {
            let data = res.data.data
            return data
        })
        .catch(() => {
            return null
        }
        )
    let qDetail = data.find(question => question._id === params.qid);
    let qReply = await Axios
        .get(`/question/${params.qid}/reply/`)
        .then(res => {
            let data = res.data.data
            return data
        })
        .catch(() => {
            return null
        }
        )
    return {
        props: { 
            qDetail: qDetail || null,
            qReply: qReply || null
        }
    }
}

export default questionDetailPage;