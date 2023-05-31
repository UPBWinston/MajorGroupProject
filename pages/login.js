
import {useRouter} from 'next/router'
import {getApiCallOptions} from "./api/utils";
import {NextUIProvider, Container, Card, Row, Text, Col, Spacer,Input,Button  } from "@nextui-org/react";
import {signIn, signOut, useSession } from "next-auth/react";




export default function Home({data}) {
  const router = useRouter()

  // Handle the submit for the form
  async function handleSubmit(event) {
       alert("The form was submitted");
       event.preventDefault();
    
       // grab the variables from the form.
       const name = document.querySelector('#username').value
       const pass = document.querySelector('#password').value

       // basic checks
       if(!name){
        alert("no username");
       }
       if(name.length<5){
        alert("username to short")
       }

       // library based checks
       var validator = require('validator');

       var checkIfEmpty = validator.isEmpty(name);

       console.log("checkIfEmpty" + checkIfEmpty);

       if(checkIfEmpty === true){
        alert("please enter a username!")
        return false;
       }
       console.log("checkifempity" + checkIfEmpty);


       var cleaned = validator.escape(name);
       console.log("cleaned " + cleaned);

       var xss = require("xss");

       var  cleanedXss = xss(pass)
       console.log(cleanedXss);   

        // Get data from the form.
        const data = {
          username: event.target.username.value,
          password: event.target.password.value,
        }

        const response = await fetch('/api/login', getApiCallOptions( "POST", data))

        const result = await response.json()

      if(result.includes("customer")){
        router.push("/index_calculator");
      }
      else if(result.includes("manager")){
        router.push("/checkout");
      }
    
  }

  function goToRegister(){
    router.push("/register");
  }
  
  
  return (

    <NextUIProvider>

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
          <Card css={{ $$cardColor: '$colors$default' }}>
            <Card.Body>
              <Text h6 size={15} color="white" css={{ m: 0 }}>
                
              </Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card css={{ $$cardColor: '$colors$primary' }}>
            <Card.Body>
              <Text h6 size={15} color="white" css={{ m: 0 }}>
                Login
              </Text>

              <Spacer y={2} />


              <form onSubmit={handleSubmit}>

              <Input id="username" clearable bordered labelPlaceholder="Username" initialValue="" />
              <Spacer y={1.5} />
              <Input id="password" clearable bordered labelPlaceholder="Password" initialValue="" />
              <Spacer y={1.5} />
              <Button type ="submit" color="secondary" auto>
          Login
        </Button>
            <Button color="secondary" onClick={signIn} className="width-33-percent">Sign in with Google</Button>
            <Button onClick={goToRegister} color="secondary" className="width-33-percent">Register new user</Button>
          </form>
           

            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card css={{ $$cardColor: '$colors$default' }}>
            <Card.Body>
              <Text h6 size={15} color="white" css={{ m: 0 }}>
               
              </Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
 </NextUIProvider>
   
  )
}


