import {useRouter} from 'next/router'
import { Link, Navbar, Input, Button, Grid, Card, Row, Text,Container,Col,Spacer} from "@nextui-org/react";
import styles from '../customer.module.css'
import {withIronSessionSsr} from "iron-session/next";
import {sessionOptions} from "../lib/session";

export default function Customer({username}) {
  const router = useRouter()

  
  return (
   <>
   <p>Welcome to Customer Page</p>


   <Container gap={0}>
      <Row gap={1}>
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
              <img className={styles.image3CSS} src = "./image.jpg"></img></Text>
              BundleOne<Input id="bundleOneQty"></Input>
             
             
          </Card.Body> 
          </Card>
        </Col>
        <Col>
          <Card css={{ $$cardColor: '$colors$primary' }}>
            <Card.Body>
            <Text h6 size={15}  css={{ m: 0 , }}>
            Lift today, shape tomorrow
              <img className={styles.image4CSS} src = "./image2.jpg"></img>

              BundleTwo<Input id="bundleTwoQty"></Input>

              </Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
   </>
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


