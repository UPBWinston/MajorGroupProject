import { useRouter } from 'next/router'
import { NextUIProvider, Container, Card, Row, Text, Col, Spacer, Input, Button } from "@nextui-org/react";

export default function Home({ data }) {
    const router = useRouter()


    // Handle the submit for the form
    async function handleSubmit(event) {

        alert("The form was submitted");
        event.preventDefault();
        const name = event.target.username.value;
        const password = event.target.password.value;
        const phoneNumber = event.target.phoneNumber.value;


        // Get data from the form.
        const data = {
            username: name,
            password: password,
            address: event.target.address.value,
            phoneNumber: phoneNumber
        }

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)

        // API endpoint where we send form data.
        const endpoint = '/api/register'

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }

        if (!name) {
            alert("no username entered");
            return;
        }
        else if (name.length < 5 || name.length > 25) {
            alert("username must exceed 4 characters and mo more than 25 ")
            return;
        }

        if (!password) {
            alert("no password entered");
            return;
        }
        else if (password.length < 5 || password.length > 25) {
            alert("password must exceed 4 characters and mo more than 25 ")
            return;
        }
        if (!phoneNumber) {
            alert("no phone number entered");
            return;
        }

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json()
        alert(`server result: ${result}`)

        // redirect based on the result
        if (result.includes("ok")) {
            router.push("/login");
        }

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
                                    Register
                                </Text>

                                <Spacer y={2} />


                                <form onSubmit={handleSubmit}>

                                    <Input type="text" id="username" clearable bordered labelPlaceholder="UserName"
                                        initialValue="" />
                                    <Spacer y={1.5} />

                                    <Input type="text" id="password" clearable bordered labelPlaceholder="Password"
                                        initialValue="" />
                                    <Spacer y={1.5} />

                                    <Input type="text" id="address" clearable bordered labelPlaceholder="Address"
                                        initialValue="" />
                                    <Spacer y={1.5} />

                                    <Input type="text" id="phoneNumber" clearable bordered
                                        labelPlaceholder="Phone Number" initialValue="" pattern="[0-9]{3}[ -]{0,1}[0-9]{3}[ -]{0,1}[0-9]{3}[ -]{0,1}" title="xxx-xxx-xxx format" />
                                    <Spacer y={1.5} />

                                    <Button type="submit" color="secondary" auto>
                                        Register
                                    </Button>

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



