import Link from "next/link";
import { NavMenu, PublicMenu } from "./config";
import { useRouter } from 'next/router';
import IntlMessages from '../../../utils/IntlMessages';

const MenuSecond = (props) => {
    const router = useRouter();
    return (
        // <ul className="menu menu-vertical md:menu-horizontal menu-compact text-gray ">
        //     {
        //         NavMenu.map((row, index) => (
        //             <li key={index}>
        //                 <Link href={row.link}>
        //                     <a className={
        //                         (-1 != router.pathname.search(row.link))?"bordered":""
        //                     }>
        //                         {row.name}
        //                     </a>
        //                 </Link>
        //             </li>
        //         ))
        //     }

        // </ul>
        <a href="/live" className="ml-5 font-bold">
            Live Tutor
        </a>
    );
}

const MenuPublic = (props) => {
    const router = useRouter();
    return (
        <ul className="menu menu-vertical menu-compact text-gray md:mt-5">
            <li key="999"
            className={
                (-1 != router.pathname.search("/explorer"))?"active":""
            }>
                <Link href="/explorer">
                    <a >
                        <IntlMessages id="sidebar.explorer" />
                    </a>
                </Link>
            </li>
            <li className="menu-title section uppercase" key={<IntlMessages id="sidebar.public" />}>
                <span ><IntlMessages id="sidebar.public" /></span>
            </li>
            {
                PublicMenu.map((row, index) => (
                    <li key={index}
                    className={
                        (-1 != router.pathname.search(row.link))?"border-r-4 border-primary":""
                    }>
                        <Link href={row.link}>
                            <a >
                                {row.name}
                            </a>
                        </Link>
                    </li>
                ))
            }

        </ul>
    );
}

export {
    MenuSecond,
    MenuPublic
};