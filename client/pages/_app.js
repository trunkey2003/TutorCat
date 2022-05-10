import React, { useState, useEffect } from 'react';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import Head from 'next/head';
import '../@meowmeow/styles/global.css';
import "../@meowmeow/styles/style.css";
import { AuthProvider } from '../@meowmeow/authentication';
import LangConfig from '../@meowmeow/utils/LangConfig';
import { persistor, store } from "../@meowmeow/redux/configureStore";
import toast, { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
    return (
        <React.Fragment>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Head>
                        <title>Tutor Cat || The first realtime Q&A platform</title>
                        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                    </Head>
                    <LangConfig>
                        <Toaster
                            position="bottom-center"
                            reverseOrder={true}
                            toastOptions={{
                                duration: 5000,
                                className: 'm-toast',
                                success: {
                                    style: {
                                      background: '#23d959',
                                      color: '#fff'
                                    },
                                  },
                                  error: {
                                    style: {
                                      background: '#ff2e2e',
                                      color: '#fff'
                                    },
                                }
                            }}
                        />
                        <AuthProvider>
                            <Component {...pageProps} />
                        </AuthProvider>
                    </LangConfig>
                </PersistGate>
            </Provider>
        </React.Fragment>
    );
}

export default MyApp

