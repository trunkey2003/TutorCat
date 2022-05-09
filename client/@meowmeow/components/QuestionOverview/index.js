import React, { Component, useState, useEffect } from 'react'
import IntlMessages from '../../utils/IntlMessages'
import Link from 'next/link'

const QuestionOverview = ({ data }) => {
    console.log(data)
    return (
        <>
            <div className="container">
                <div className="grid grid-cols-2">
                    <h1 className="text-2xl"><IntlMessages id="questions.allQuestion" /></h1>
                    <div className="justify-self-end">
                        <a href="/questions/new">
                            <label className="btn btn-sm btn-primary w"><IntlMessages id="questions.new" /></label>
                        </a>
                    </div>
                </div>
                <h2 className="text-md">{data.length} {(data.length > 1) ? <IntlMessages id="questions.questions" /> : <IntlMessages id="questions.question" />}</h2>
                <div className="container">
                    {data.map((data) => (
                        <>
                            <Link href={`/questions/${data._id}`}>
                                <div className="grid grid-rows-auto my-3 py-2 m-pointer">
                                    <h2 className="text-xl">{data.title}</h2>
                                    <div className="flex-row w-15 mr-3 justify-start">
                                        <p className="text-sm text-gray-500"><IntlMessages id="questions.vote" />: {data.numUpVote + data.numDownVote}</p>
                                    </div>
                                </div>
                            </Link>
                            <div className="divider my-1"></div>
                        </>
                    ))}
                </div>

            </div>
        </>
    )
}

export default QuestionOverview;