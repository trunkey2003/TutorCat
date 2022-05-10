import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import { menu } from "./config";
import IntlMessages from '../../../utils/IntlMessages';
import { getLocalStorage, setLocalStorage } from "../../../modules"
import { useAuth } from '../../../authentication/index'

const Menu = (props) => {
    const { userSignOut } = useAuth();
    let user = JSON.parse(getLocalStorage("user", true, null))
    // console.log(user)
    const router = useRouter();
    let name = (user === undefined || user === null) ? "" : user.name
    return (
        <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-white drop-shadow mt-1 w-48">
            <div className="container p-4">
                <div tabIndex="0" className="avatar">
                    <div className="w-12 rounded">
                        <img src={`https://ui-avatars.com/api/?name=${name}`} />
                    </div>
                </div>
                <p><IntlMessages id="sidebar.hello" /><b>{name}</b></p>
            </div>
            <div className="divider m-0"></div>
            {
                menu.map((row) => (
                    <li key={row.name}>
                        <Link href={row.link}>
                            <a className={{
                                "active": "-1" != router.pathname.search(row.link),
                            }}>
                                {row.name}
                            </a>
                        </Link>
                    </li>
                ))
            }
            <li key="signout">
                <a onClick={() => userSignOut()}>
                    <IntlMessages id="navmenu.profile.signout" />
                </a>
            </li>
        </ul>
    );
}

export {
    Menu
};