import React, { Component } from 'react';
import { Container, Form } from 'react-bootstrap';

class LandingPage extends Component {
    render() {
        return (
            <Container>
                <Form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="text" placeholder="Password"/>
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}

export default LandingPage