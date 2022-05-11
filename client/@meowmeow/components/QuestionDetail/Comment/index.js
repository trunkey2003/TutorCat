import React, { Component, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import CommentBox from '../CommentBox'
import Detail from '../Detail'
import IntlMessages from '../../../utils/IntlMessages'
import { loggedIn } from '../../../authentication/index'
import { Axios } from '../../../modules/apiService/config'

const Comment = ({ qDetail, qAnswer }) => {
    const authUser = loggedIn();
    const [comments, setComments] = useState(qAnswer)
    const update = (qDetail) => {
        Axios
            .get(`/question/${qDetail._id}/reply`)
            .then(({ data }) => {
                setComments(data.data)
                toast.success(<IntlMessages id="noti.answer.addSuccess"/>)
            })
            .catch(() => {
                console.log(null)
            }
            )
    }
    return (
        <>
            {authUser ? <CommentBox questionId={qDetail._id} updateComment={() => update(qDetail)} /> : <></>}
            <div className="container a-content-container">
                <h3 className="text-xl mb-5">{comments.length} {(comments.length > 1) ? <IntlMessages id="questions.answers" /> : <IntlMessages id="questions.answer" />}</h3>
                {comments.map((comment) => (
                    <>
                        <Detail user={comment.userID} detail={comment.content} voteIndex={comment.numUpVote - comment.numDownVote} time={comment.dateCreated} question={false} questionId={qDetail._id} id={comment._id} />
                        <div className="divider my-1"></div>
                    </>
                )
                )}
            </div>
        </>
    )
}

export default Comment
