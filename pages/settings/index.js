import Head from 'next/head';

import SettingsItem from '../../shared/components/SettingsItems/SettingsItem';
import {withIronSessionSsr} from "../iron-session/next/index";
import {sessionOptions} from "../../lib/session";

export default function Settings({username}) {
    return (
        <div>
            <Head>
                <title>calorie tracker - settings</title>
                <meta name="description" content="calorie tracker - settings" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container">
                <div className="mx-15">
                    <h1 className="mt-1">settings</h1>

                    <SettingsItem text="data" link="/settings/data" />
                    <SettingsItem
                        text="user settings"
                        link="/settings/user_settings"
                    />
                    <SettingsItem
                        text="food dictionary"
                        link="/settings/food_dictionary"
                    />
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps = withIronSessionSsr(
    async ({req, res}) => {
        const username = req.session.username;

        if(!username) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/login",
                },
            }
        }

        return {
            props: { username }
        }
    },
    sessionOptions
);
