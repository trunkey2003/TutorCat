import React, { useState, Component, useEffect } from 'react'
import 'react-quill/dist/quill.snow.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/base16/solarized-light.css'
import parse from 'html-react-parser'
import Vote from '../Vote'
import { date2local } from '../../../modules'
import IntlMessages from '../../../utils/IntlMessages'

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

const Detail = ({ detail, voteIndex, time, id, user, question }) => {
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
                                <img src={`https://ui-avatars.com/api/?name=${user.name}`} />
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
                            <a className="text-primary text-sm m-pointer"><IntlMessages id="questions.share" /></a>
                            <a className="text-primary text-sm m-pointer"><IntlMessages id="questions.edit" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Detail
