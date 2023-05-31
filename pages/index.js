//import Link from 'next/link'

import {useRouter} from 'next/router'
import { NextUIProvider } from '@nextui-org/react';
import { Input } from "@nextui-org/react";
import { Container, Card, Row, Text, Col, Spacer } from "@nextui-org/react";
import { NavButton,Navbar, Grid, Button, Link } from "@nextui-org/react";
import styles from '../index.module.css'
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Calender from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {withIronSessionSsr} from "iron-session/next";
import {sessionOptions} from "../lib/session";

export default function Home({ username }) {
  const router = useRouter()

    return (
      <NextUIProvider>

        <Navbar className={styles.navBar} isBordered variant="sticky">
          <Navbar.Content>
         
          <Navbar.Item>
               <button type ="button" className={styles.button1CSS} onClick={() => router.push('/login')}>Login</button>
            </Navbar.Item>
            
          
            <Navbar.Item>
              <button  type ="button" className={styles.button2CSS} onClick={() => router.push('/register')}>Register</button>
            </Navbar.Item>

          </Navbar.Content>
        </Navbar>
      

        <Container gap={0}>
      <Row gap={0}>
        <Col>
          <Card css={{ $$cardColor: '$colors$default' }}>
            <Card.Body>
              <Text h6 size={25} color="white" css={{ m: 0 }}>
                
              </Text>
            </Card.Body>
          </Card>
        </Col>
        
      </Row>
      <Spacer y={1} />
      <Row gap={1}>
        <Col>
          <Card css={{ $$cardColor: '$colors$primary' }}>
            <Card.Body>
            <Text h6 size={15}  css={{ m: 0 , }}>
               Eat Sleep, Gym, and Repeat.
              <img className={styles.image1CSS} 
              src = "./i5.jpg">
               
                
              </img>
            </Text>
             
          </Card.Body> 
          </Card>
        </Col>
       
      </Row>
    </Container>

  </NextUIProvider>
    )
    
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