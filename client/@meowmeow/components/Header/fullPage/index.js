import IntlMessages from '../../../utils/IntlMessages';
import { MenuSecond, MenuPublic } from '../Menu';
import LanguageSwitcher from '../../LanguageSwitcher';
import ProfileGroup from '../../ProfileGroup';
import { loggedIn } from '../../../authentication';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header({ children }) {
    const authUser = loggedIn();
    const router = useRouter();
    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col bg-sky-100">
                {/* Navbar */}
                <div className="w-full navbar bg-slate-100 navbar-custom drop-shadow w-48 p-0 px-2">
                    <div className="flex-none md:hidden">
                        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost text-gray">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </label>
                    </div>
                    <div className="flex-1 p-1">
                        <a href="/">
                            <div className="flex flex-nowrap gap-2">
                                <img className="h-9" src="/image/tutorcatlogo.png" alt="Tutor Cat logo" />
                                <a className="hidden md:block text-2xl font-bold leading-relaxed inline-block whitespace-nowrap uppercase text-primary px-1"><IntlMessages id="config.projectName" /></a>
                            </div>
                        </a>
                        <div className="flex hidden md:block lg:block xl:block justify-start ml-5">
                            <MenuSecond />
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <LanguageSwitcher />
                    </div>
                    <div className="mr-1">
                        {authUser ? <ProfileGroup /> : <>
                            <Link href="/account/signin">
                                <label className="btn btn-sm btn-primary">
                                    <IntlMessages id="signin.btnSignin" />
                                </label>
                            </Link>
                            <Link href="/account/signup">
                                <label className="btn btn-sm btn-primary btn-outline ml-1">
                                    <IntlMessages id="signup.btnSignup" />
                                </label>
                            </Link>
                        </>
                        }
                    </div>
                </div>
                {/* Page content here */}
                <div className="flex justify-center">
                    {children}
                </div>
            </div>
            <div className="drawer-side md:hidden">
                <label htmlFor="my-drawer-3" className="drawer-overlay" />
                <ul className="menu p-4 overflow-y-auto w-56 bg-white">
                    <label htmlFor="my-drawer-3" className="btn btn-sm btn-primary text-gray align-end mb-5">
                        <IntlMessages id="sidebar.back" />
                    </label>
                    <div className="divider m-0"></div>
                    <div className="grid grid-cols-2 gap-2 mt-2 content-center place-content-center">
                        <div className="col-span-1">
                            <LanguageSwitcher />
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    );
}

// import IntlMessages from '../../../utils/IntlMessages';
// import { MenuSecond, MenuPublic } from '../Menu';
// import LanguageSwitcher from '../../LanguageSwitcher';
// import ProfileGroup from '../../ProfileGroup';
// import { loggedIn } from '../../../authentication';
// import Link from 'next/link';
// import { useRouter } from 'next/router';

// export default function Header({ children }) {
//     const authUser = loggedIn();
//     const router = useRouter();
//     return (
//         <div className="drawer">
//             <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
//             <div className="drawer-content flex flex-col bg-white">
//                 {/* Navbar */}
//                 <div className="w-full navbar bg-slate-100 navbar-custom drop-shadow">
//                     <div className="flex-none md:hidden">
//                         <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost text-gray">
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
//                         </label>
//                     </div>
//                     <div className="flex-1 p-1">
//                         <a href="/">
//                             <a className="text-2xl font-bold leading-relaxed inline-block whitespace-nowrap uppercase text-primary px-1"><IntlMessages id="config.projectName" /></a>
//                         </a>
//                         <div className="flex hidden md:block lg:block xl:block justify-start ml-5">
//                             <MenuSecond />
//                         </div>
//                     </div>
//                     <div className="hidden md:block">
//                         <LanguageSwitcher />
//                     </div>
//                     <div className="mr-1">
//                         {authUser ? <ProfileGroup /> : <>
//                             <Link href="/account/signin" replace>
//                                 <label className={
//                                     (-1 != router.pathname.search("/account/signin")) ? "hidden" : "btn btn-sm btn-primary mx-2"
//                                 }>
//                                     <IntlMessages id="signin.btnSignin" />
//                                 </label>
//                             </Link>
//                             <Link href="/account/signup" replace>
//                                 <label className={
//                                     (-1 != router.pathname.search("/account/signup")) ? "hidden" : "btn btn-sm btn-primary btn-outline"
//                                 }>
//                                     <IntlMessages id="signup.btnSignup" />
//                                 </label>
//                             </Link>
//                         </>
//                         }
//                     </div>
//                 </div>
//                 {/* Page content here */}
//                 <div className="flex justify-center">
//                     {children}
//                 </div>
//             </div>
//             <div className="drawer-side md:hidden">
//                 <label htmlFor="my-drawer-3" className="drawer-overlay" />
//                 <ul className="menu p-4 overflow-y-auto w-56 bg-white">
//                     <label htmlFor="my-drawer-3" className="btn btn-sm btn-primary text-gray align-end mb-5">
//                         <IntlMessages id="sidebar.back" />
//                     </label>
//                     <div className="divider m-0"></div>
//                     <div className="grid grid-cols-2 gap-2 mt-2 content-center place-content-center">
//                         <div className="col-span-1">
//                             <LanguageSwitcher />
//                         </div>
//                     </div>
//                 </ul>
//             </div>
//         </div>
//     );
// }