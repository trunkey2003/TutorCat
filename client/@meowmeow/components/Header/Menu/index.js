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
        <>
            <a href="/live" className="pl-4 my-2 font-bold">
                Live Tutor
            </a>
            <a href="/questions" className="pl-4 my-2 font-bold">
                <IntlMessages id="sidebar.explorer" />
            </a>
        </>

    );
}

const MenuPublic = (props) => {
    const router = useRouter();
    return (
        <ul className="menu menu-vertical menu-compact text-gray md:mt-5">
            <li className="menu-title section uppercase" key={<IntlMessages id="sidebar.public" />}>
                <span ><IntlMessages id="sidebar.public" /></span>
            </li>
            {
                PublicMenu.map((row, index) => (
                    <li key={index}
                        className={
                            (-1 != router.pathname.search(row.link)) ? "border-r-4 border-primary" : ""
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