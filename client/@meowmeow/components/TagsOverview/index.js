import React, { Component, useState, useEffect } from 'react'
import Card from '../Card'
import IntlMessages from '../../utils/IntlMessages'
import categories from '../Tags/catatogies'

const TagsOverview = () => {
    return (
        <>
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {categories.map((tag) => (
                    <>
                        <a href={`/tags/${encodeURIComponent(tag)}`}>
                            <div className="p-2 ">
                                <Card
                                    title={<IntlMessages id={"tags." + tag + ".title"} />}
                                    content={<IntlMessages id={"tags." + tag + ".description"} />}
                                    styleContent="text-sm" />
                            </div>
                        </a>
                    </>
                )
                )}
            </div>
            <div className="grid justify-items-stretch my-2">
                <p className="text-md justify-self-center font-bold"><IntlMessages id="tags.context.andMore" /></p>
            </div>

        </>
    )
}

export default TagsOverview;