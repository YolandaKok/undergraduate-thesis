import React, {Component, Fragment} from 'react';
import Knapsack from "../algorithms/Knapsack";
import {Container, Col, Row, Form, Button} from 'react-bootstrap';
import NavBar from "../navigation/NavBar";
import Jumbotron from "react-bootstrap/Jumbotron";
import styles from '../../static/signup.module.css';

export class SignUp extends Component {
    constructor(props) {
        super(props);
        
    }

    componentDidMount() {
        document.body.style.background = "#E5E9F2";
    }

    render() {
        return (
            <Fragment>
                <NavBar/>
                <Container>
                    <Row className={styles.formMargin}>
                        <Col xs={0} sm={0} md={2} lg={3}></Col>
                        <Col xs={12} sm={12} md={8} lg={6}>
                            <Jumbotron className={styles.jumbotronStyle}>
                                <Form>
                                    <h1 className="text-center">Sign Up</h1>
                                    <h6 className="text-center">Sign up to visualize and experiment with
                                        various <br></br> algorithms.</h6>
                                    <Form.Group>
                                        <Form.Label className={styles.formFont}>Username</Form.Label>
                                        <Form.Control placeholder="Enter username"></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control placeholder="Enter email"></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control placeholder="Enter password"></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Repeat Password</Form.Label>
                                        <Form.Control placeholder="Repeat Password"></Form.Control>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" block>
                                        Submit
                                    </Button>
                                </Form>
                            </Jumbotron>
                        </Col>
                        <Col xs={0} sm={0} md={2} lg={3}></Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default SignUp;