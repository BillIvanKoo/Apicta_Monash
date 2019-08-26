import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import axios from "axios";

import { URL } from "./helper/constants";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state= {
            username: "",
            password: "",
            segmentId: 0,
        }
    }

    handleLogin() {
        axios.post(`${URL}/users/signin`, this.state)
        .then(res => {
            localStorage.setItem("token", res.data)
            this.props.history.push("/")
        })
    }

    render() {
        return (
            <Container>
                <Row style={{alignSelf: "center"}}>
                    <Col md={{span: 4, offset: 4}}>
                        <Card style={{padding: "5vh 5vw", margin: "15vh 0"}}>
                        <Form>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" onChange={e=>{this.setState({username: e.target.value})}}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={e=>{this.setState({password: e.target.value})}}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Segment ID</Form.Label>
                                <Form.Control type="number" placeholder="Segment ID" onChange={e=>{this.setState({segmentId: e.target.value})}}/>
                            </Form.Group>
                            <Button onClick={()=>{this.handleLogin()}}>
                                Login
                            </Button>
                        </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default LoginPage