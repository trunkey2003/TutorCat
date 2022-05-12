import React, { useState, Component, useEffect } from 'react'
import 'react-quill/dist/quill.snow.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/base16/solarized-light.css'
import parse from 'html-react-parser'
import Vote from '../Vote'
import { date2local, getLocalStorage } from '../../../modules'
import IntlMessages from '../../../utils/IntlMessages'
import { loggedIn } from '../../../authentication/index'
import toast from 'react-hot-toast'
import {CopyToClipboard} from 'react-copy-to-clipboard';

hljs.configure({
    languages: ['javascript', 'ruby', 'python', 'rust', 'c++', 'undefined'],
})

class Quill2Html extends Component {
    constructor({ detail }) {
        super({ detail })
        this.detail = detail
        this.updateCodeSyntaxHighlighting = this.updateCodeSyntaxHighlighting.bind(this)
    }

    componentDidMount() {
        this.updateCodeSyntaxHighlighting();
    }

    componentDidUpdate() {
        this.updateCodeSyntaxHighlighting();
    }

    updateCodeSyntaxHighlighting = () => {
        document.querySelectorAll("pre").forEach(block => {
            hljs.highlightBlock(block);
        });
    };

    render() {

        return (
            <>
                <div className="m-txt2html text-base">
                    {parse(this.detail)}
                </div>
            </>
        )
    }
}

const Share = ({questionId}) => {
    const copied = () => {
        toast.success(<IntlMessages id="noti.copied" />)
    }
    let url = window.location.protocol + "//" + window.location.host +"/questions/" + questionId;
    return (
        <CopyToClipboard text={url}
          onCopy={() => copied()}>
           <a className="text-primary text-sm m-pointer"><IntlMessages id="questions.share" /></a>
        </CopyToClipboard>
    )
}

const Detail = ({ detail, voteIndex, time, id, questionId, user, question }) => {
    const authUser = loggedIn()
    let userDetail = JSON.parse(getLocalStorage("user", true, null))
    const edit = ({question, id, questionId}) => {
        if (authUser){
            if (user._id === userDetail._id)
            {
                const url = question ? `/questions/edit/${questionId}`: `/questions/${questionId}/answers/edit/${id}`
                window.location.href = url
            }
            else toast.error(<IntlMessages id="noti.edit.nopermission" />)
        }
        else toast.error(<IntlMessages id="noti.signin.required" />)
    }
    return (
        <>
            <div className="flex flex-row">
                <div className="flex-none w-10 mr-3">
                    <Vote voteIndex={voteIndex} questionId={id} question={question}/>
                </div>
                <div className="grow">
                    <div className="grid grid-cols-1 mb-5">
                        <Quill2Html detail={detail} />
                    </div>
                    <div className="flex flex-nowrap gap-3 items-center my-3">
                        <div className="avatar">
                            <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={`https://ui-avatars.com/api/?name=${user.name}`} alt={user.name}/>
                            </div>
                        </div>
                        <div className="grid grid-rows-2 gap-0 ">
                            <p className="text-sm text-gray-500 font-bold">{user.name}</p>
                            <div className="flex flex-nowrap gap-1 items-center">
                                <p className="text-sm text-gray-500 lowercase"><IntlMessages id="questions.dateCreated" /></p>
                                <p className="text-sm text-gray-500">{date2local(time)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-flow-col gap-0">
                        <div className="flex flex-nowrap gap-2">
                        {question ?<Share questionId={questionId}/>: <></>}
                            <a className="text-primary text-sm m-pointer"
                            onClick={() => edit({question, id, questionId})}
                            >
                                <IntlMessages id="questions.edit" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )}

export default Detail
