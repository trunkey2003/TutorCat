import Forum from '../../@meowmeow/components/Layout/Forum'
import QuestionOverview from '../../@meowmeow/components/QuestionOverview'
import { Axios } from '../../@meowmeow/modules/apiService/config'
import Error from 'next/error'
import Head from 'next/head'
import IntlMessages from '../../@meowmeow/utils/IntlMessages';

const questionPage = ({ qAll }) => {
    return (
        <>
            <Forum>
                <QuestionOverview data={qAll} />
            </Forum>
        </>
    )
}


export async function getStaticProps() {
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
    return {
        props: { 
            qAll: data || null,
        }
    }
}

export default questionPage;