import React, {Component, Fragment} from 'react';
import Knapsack from "../algorithms/Knapsack";
import {Container, Col, Row, Form, Button} from 'react-bootstrap';
import NavBar from "../navigation/NavBar";
import Jumbotron from "react-bootstrap/Jumbotron";
import styles from '../../static/signup.module.css';
import {Redirect} from "react-router";
const axios = require('axios');

export class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            reRender: false,
            redirect: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePostChange = this.handlePostChange.bind(this);
    }

    componentDidMount() {
        document.body.style.background = "#E5E9F2";
        console.log(SERVICE_URL);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("handle submit");
        axios.post(
            SERVICE_URL + '/users/signup', {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        })
        .then((response) => {
            console.log(response);
            console.log(response.config.data);
            axios.post(SERVICE_URL + '/login', response.config.data).then((response) => {
                console.log("loggedIn");
                console.log(response);
                localStorage.setItem('authorization', response.headers.authorization);
                this.setState({"redirect": true});
            }, (error) => {
               console.log(error);
            });
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
                                    <h1 className="text-center">Sign Up</h1>
                                    <h6 className="text-center">Sign up to visualize and experiment with
                                        various <br></br> algorithms.</h6>
                                    <Form.Group>
                                        <Form.Label className={styles.formFont}>Username</Form.Label>
                                        <Form.Control placeholder="Enter username" onChange={this.handlePostChange} name="username"></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className={styles.formFont}>Email</Form.Label>
                                        <Form.Control placeholder="Enter email" onChange={this.handlePostChange} name="email"></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className={styles.formFont}>Password</Form.Label>
                                        <Form.Control placeholder="Enter password" onChange={this.handlePostChange} name="password"></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className={styles.formFont}>Repeat Password</Form.Label>
                                        <Form.Control placeholder="Repeat Password"></Form.Control>
                                    </Form.Group>
                                    <Button onClick={this.handleSubmit} variant="secondary" type="submit" block>
                                        Sign Up
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