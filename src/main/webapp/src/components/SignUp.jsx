import React, {Component, Fragment} from 'react';
import Knapsack from "./Knapsack";
import {Container, Col, Row, Form, Button} from 'react-bootstrap';
import NavBar from "./NavBar";
export class SignUp extends Component {
    render() {
        return (
            <Fragment>
                <NavBar/>
                <Container>
                    <Row>
                        <Col></Col>
                        <Col>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control placeholder="Enter username"></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control placeholder="Enter password"></Form.Control>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default SignUp;