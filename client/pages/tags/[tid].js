import Forum from '../../@meowmeow/components/Layout/Forum'
import { Heading } from '../../@meowmeow/modules'
import TagsDetail from '../../@meowmeow/components/TagsDetail'
import { Axios } from '../../@meowmeow/modules/apiService/config'
import Error from '../_error'
import Head from 'next/head'
import IntlMessages from '../../@meowmeow/utils/IntlMessages';
import categories from '../../@meowmeow/components/Tags/catatogies';

const tagsDetailPage = ({ tQues, tName }) => {
    if (categories.includes(tName))
        return (
            <>
                {(tQues !== undefined && tQues !== null) ?
                    <>
                        <Head>
                            <title>TutorCat - {tName !== undefined ? tName : ""}</title>
                            <meta name="description" content={tName !== undefined ? tName.category : ""}></meta>
                        </Head>
                    </>
                    :
                        <Heading title1="config.projectName" title2="config.error.questionNotFound" description="landingpage.slogan"/>}

                {(tQues === undefined || tQues === null) ? <Error statusCode={404} /> : <Forum><TagsDetail data={tQues} name={tName} /></Forum>}

            </>
        )
    else
        return (
            <>
                <Error statusCode={404} />
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
    let tQues = await Axios
        .get(`/question/catalogue/${params.tid}`)
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
            tQues: tQues || null,
            tName: params.tid || null
        }
    }
}

export default tagsDetailPage;