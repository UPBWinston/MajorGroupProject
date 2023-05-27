import React from 'react';
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions} from "../lib/session";
import {Container, NextUIProvider, Button, Text, Card} from "@nextui-org/react";
import {getApiCallOptions} from "./api/utils";


async function handleLogout(event){
    const response = await fetch('/api/logout', getApiCallOptions( "GET", {}))
    if(response.status === 200){
        alert("Successfully logged out");
    } else {
        alert("Error occured");
    }
}

const PrivatePage = ({ username }) => (
    <NextUIProvider>
        <Container>
            <Card css={{ $$cardColor: '$colors$default' }}>
                <Card.Body>
                    <Text h6 size={25} color="white" css={{ m: 0 }}> User: {username}</Text>
                    <Button onClick={handleLogout}>Log Out</Button>
                </Card.Body>
            </Card>
        </Container>
    </NextUIProvider>

);

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

export default PrivatePage;