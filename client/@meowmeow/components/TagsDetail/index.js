import React, { Component, useState, useEffect } from 'react'
import IntlMessages from '../../utils/IntlMessages'
import toast from 'react-hot-toast'
import Link from 'next/link'

const TagsDetail = ({ data, name }) => {
    // console.log(data)
    return (
        <>
            <div className="container">
                <div className="grid grid-cols-2">
                    <h1 className="text-2xl"> <IntlMessages id="tags.tag" /></h1>
                    <div className="justify-self-end">
                        <a href="/questions/new">
                            <label className="btn btn-sm btn-primary w"><IntlMessages id="questions.new" /></label>
                        </a>
                    </div>
                </div>
                <h2 className="text-4xl text-primary">
                    {name}
                </h2>
                <p className="text-sm my-2">
                    <IntlMessages id={`tags.${name}.description`} />
                </p>
                <h2 className="text-md mb-8">{data.length} {(data.length > 1) ? <IntlMessages id="questions.questions" /> : <IntlMessages id="questions.question" />}</h2>
                <div className="container">
                    {data.map((data) => (
                        <>
                            <a href={`/questions/${data._id}`} onClick={() =>{toast.loading(<IntlMessages id="modal.loading" />)}}>
                                <div className="grid grid-rows-auto my-3 py-2 m-pointer">
                                    <h2 className="text-xl">{data.title}</h2>
                                    <div className="flex-row w-15 mr-3 justify-start">
                                        <p className="text-sm text-gray-500"><IntlMessages id="questions.vote" />: {data.numUpVote + data.numDownVote}</p>
                                    </div>
                                </div>
                            </a>
                            <div className="divider my-1"></div>
                        </>
                    ))}
                </div>

            </div>
        </>
    )
}

export default TagsDetail;