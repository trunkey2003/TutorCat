import React, { useState } from 'react'
import { useAuth } from '../../../authentication/index'
import toast from 'react-hot-toast'
import IntlMessages from '../../../utils/IntlMessages'
import {Axios} from '../../../modules/apiService/config'

const Vote = ({ questionId, voteIndex, question, id }) => {
    // console.log(questionId)
    const [vote, setVote] = useState(voteIndex);
    const { authUser } = useAuth();

    const upVote = async () => {
        if (authUser){
            if (question) {
                let res = await Axios
                    .post(`/question/${questionId}/up-vote/`)
                    .then(({data}) => {
                        if (data.statusCode == 200)
                            setVote(data.data)
                        else toast.error(<IntlMessages id="noti.vote.error.upvoted" />)
                    })
                    .catch((error) => {
                        toast.error(<IntlMessages id="noti.vote.error.upvoted" />)
                    }
                    )
            } else {
                let res = await Axios
                    .post(`/question/reply/${id}/up-vote`)
                    .then(({data}) => {
                        if (data.statusCode == 200)
                            setVote(data.data)
                        else toast.error(<IntlMessages id="noti.vote.error.upvoted" />)
                    })
                    .catch((error) => {
                        toast.error(<IntlMessages id="noti.vote.error.upvoted" />)
                    }
                    )
            }
        } else {
            toast.error(<IntlMessages id="noti.signin.required" />)
        }
    }

    const downVote = async () => {
        if (authUser){
            if (question) {
                let res = await Axios
                    .post(`/question/${questionId}/down-vote`)
                    .then(({data}) => {
                        if (data.statusCode == 200)
                            setVote(data.data)
                        else toast.error(<IntlMessages id="noti.vote.error.downvoted" />)
                    })
                    .catch((error) => {
                        toast.error(<IntlMessages id="noti.vote.error.upvoted" />)
                    }
                    )
            } else {
                let res = await Axios
                    .post(`/question/reply/${id}/down-vote`)
                    .then(({data}) => {
                        if (data.statusCode == 200)
                            setVote(data.data)
                        else toast.error(<IntlMessages id="noti.vote.error.downvoted" />)
                    })
                    .catch((error) => {
                        toast.error(<IntlMessages id="noti.vote.error.upvoted" />)
                    }
                    )
            }
        } else {
            toast.error(<IntlMessages id="noti.signin.required" />)
        }
    }

    return (
        <div className="flex m-vote items-center">
            <svg aria-hidden="true" className="m-btnVote fill-gray-400" width="36" height="36" viewBox="0 0 36 36" onClick={() => upVote()}>
                <path d="M2 25h32L18 9 2 25Z"></path>
            </svg>
            <p className="text-2xl text-gray-400">{vote}</p>
            <svg aria-hidden="true" className="m-btnVote fill-gray-400" width="36" height="36" viewBox="0 0 36 36" onClick={() => downVote()}>
                <path d="M2 11h32L18 27 2 11Z"></path>
            </svg>
        </div>
    );
}

export default Vote;