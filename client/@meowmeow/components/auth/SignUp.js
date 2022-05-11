import React, { useState } from 'react';
import Link from "next/link";
import Auth from "../Layout/Auth";
import toast from 'react-hot-toast';
import IntlMessages from '../../utils/IntlMessages';
import { useAuth } from '../../authentication';

export default function Login() {
    const { userSignup } = useAuth();
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [rePassword, setRePassword] = useState(null);
    const onsignup = () => {
        if (password === null || rePassword === null || name === null || email === null)
            toast.error(<IntlMessages id="noti.password.notMatch" />);
        else {
            if (password === rePassword)
                userSignup({ email, password, name })
            else
                toast.error(<IntlMessages id="noti.password.notMatch" />);
        }

    };

    return (
        <>
            <Auth>
                <div className="container h-full w-full mr-0">
                    <div className="flex justify-center items-center py-20 p-3">
                        <div className="w-full lg:w-4/12 mt-0">
                            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
                                <div className="flex-auto px-4 lg:px-10 py-10 pt-3">
                                    <form>
                                        <div className="relative w-full mb-3">
                                            <h3 className="text-3xl font-normal leading-normal mt-6 mb-2">
                                                <IntlMessages id="signup.signup" />
                                            </h3>
                                        </div>
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block mb-2"
                                                htmlFor="grid-password"
                                            >
                                                <IntlMessages id="profile.name" />
                                            </label>
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder=""
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block mb-2"
                                                htmlFor="grid-password"
                                            >
                                                <IntlMessages id="profile.email" />
                                            </label>
                                            <input
                                                type="email"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Email"
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block mb-2"
                                                htmlFor="grid-password"
                                            >
                                                <IntlMessages id="profile.password" />
                                            </label>
                                            <input
                                                type="password"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Password"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block mb-2"
                                                htmlFor="grid-password"
                                            >
                                                <IntlMessages id="profile.repassword" />
                                            </label>
                                            <input
                                                type="password"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Password"
                                                onChange={(e) => setRePassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="text-center mt-6">
                                            <button
                                                className="bg-primary text-white font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => onsignup()}
                                            >
                                                <IntlMessages id="signup.btnSignup" />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Auth>
        </>
    );
}
