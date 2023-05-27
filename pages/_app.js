import '../globalStyles.css'

import React, {useEffect} from 'react';

import Nav from '../shared/components/Nav';
import {SessionProvider} from 'next-auth/react';

import '../styles/globals.scss';

function MyApp({Component, pageProps}) {
    useEffect(() => {
        if (!localStorage.getItem('theme')) {
            if (
                window.matchMedia &&
                window.matchMedia('(prefers-color-scheme: dark)').matches
            ) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        }

        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark');
        }
    }, []);

    return (
        <React.Fragment>
            <Nav/>
            <SessionProvider session={pageProps.session}>
                    <Component {...pageProps} />
            </SessionProvider>
        </React.Fragment>
    )
        ;
}

export default MyApp;

