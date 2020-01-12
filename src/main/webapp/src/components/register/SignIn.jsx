import React, {Component, Fragment} from 'react';
import NavBar from "../navigation/NavBar";
import Knapsack from "../algorithms/Knapsack";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import styles from "../../static/signup.module.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import {Redirect} from "react-router";
const axios = require('axios');

export class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePostChange = this.handlePostChange.bind(this);
    }

    componentDidMount() {
        document.body.style.background = "#E5E9F2";
    }

    handleSubmit (event) {
        event.preventDefault();
        axios.post(SERVICE_URL + '/login', {
            "username": this.state.username,
            "password": this.state.password
        }).then((response) => {
            console.log("loggedIn");
            console.log(response.headers.authorization);
            localStorage.setItem('authorization', response.headers.authorization);
            this.setState({"redirect": true});
        }, (error) => {
            console.log(error);
        });
    }

    handlePostChange(event) {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
        console.log(this.state);
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/app/homepage'/>;
        }

        return (
            <Fragment>
                <div></div>
                <NavBar/>
                <Container>
                    <Row className={styles.formMargin}>
                        <Col xs={0} sm={0} md={2} lg={3}></Col>
                        <Col xs={12} sm={12} md={8} lg={6}>
                            <Jumbotron className={styles.jumbotronStyle}>
                                <Form>
                                    <h1 className="text-center">Sign In</h1>
                                    <Form.Group>
                                        <Form.Label className={styles.formFont}>Username</Form.Label>
                                        <Form.Control placeholder="Enter username" onChange={this.handlePostChange} name="username"></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className={styles.formFont}>Password</Form.Label>
                                        <Form.Control placeholder="Enter password" onChange={this.handlePostChange} name="password" type="password"></Form.Control>
                                    </Form.Group>
                                    <Button onClick={this.handleSubmit} variant="secondary" type="submit" block>
                                        Sign In
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

export default SignIn;