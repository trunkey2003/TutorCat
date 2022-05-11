import React, { useState } from 'react';
import Link from "next/link";
import Auth from "../Layout/Auth";
import IntlMessages from '../../utils/IntlMessages';
import { useAuth } from '../../authentication';

export default function Login() {
    const { userLogin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSignin = () => {
        userLogin({ email, password }, true);
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
                                                <IntlMessages id="signin.signin" />
                                            </h3>
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
                                                placeholder="abc@domain.xyz"
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
                                        <div>
                                            <label className="inline-flex items-center cursor-pointer hidden">
                                                <input
                                                    id="customCheckLogin"
                                                    type="checkbox"
                                                    className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                                />
                                                <span className="ml-2 text-sm">
                                                    <IntlMessages id="signin.rememberMe" />
                                                </span>
                                            </label>
                                        </div>

                                        <div className="text-center mt-6">
                                            <button
                                                className="bg-primary text-white font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => onSignin()}
                                            >
                                                <IntlMessages id="signin.btnSignin" />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="flex flex-wrap mt-6 relative hidden">
                                <div className="w-1/2">
                                    <a
                                        href=""
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <small>
                                            <IntlMessages id="signin.forgetPass" />
                                        </small>
                                    </a>
                                </div>
                                <div className="w-1/2 text-right">
                                    <a href="/account/signup">
                                        <small>
                                            <IntlMessages id="signin.newAccount" />
                                        </small>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Auth>
        </>
    );
}
