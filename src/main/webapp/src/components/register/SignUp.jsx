import React, {Component, Fragment} from 'react';
import Knapsack from "../algorithms/Knapsack";
import {Container, Col, Row, Form, Button} from 'react-bootstrap';
import NavBar from "../navigation/NavBar";
import Jumbotron from "react-bootstrap/Jumbotron";
import styles from '../../static/signup.module.css';
import {Redirect} from "react-router";
import {FormError} from "../errors/FormError";
import {Homepage} from "../pages/Homepage";
import {IndexPage} from "./IndexPage";
import Link from "@material-ui/core/Link";
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
            redirect: false,
            usernameFound: false,
            validated: false,
            repeatPassword: '',
            passwordMatches: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePostChange = this.handlePostChange.bind(this);
        this.checkNullOrUndefined = this.checkNullOrUndefined.bind(this);
    }

    componentDidMount() {
        document.body.style.background = "#E5E9F2";
        console.log(SERVICE_URL);
    }

    checkNullOrUndefined(event) {
        console.log("hello");
        event.preventDefault();
        if(this.state.username === '' || this.state.password === '' || this.state.email === '' || this.state.firstname === '' || this.state.lastname === '')
            this.setState({"validated": true});
        else
            this.setState({"validated": false});

        if(this.state.password === this.state.repeatPassword) {
            console.log("Password Matches.");
            this.setState({"passwordMatches": false});
        } else {
            console.log("Password does not match.");
            this.setState({"passwordMatches": true});
        }

    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post(
            SERVICE_URL + '/users/signup', {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email, firstname: this.state.firstname, lastname: this.state.lastname
        })
        .then((response) => {
            console.log(response);
            console.log(response.config.data);
            axios.post(SERVICE_URL + '/login', response.config.data).then((response) => {
                console.log("loggedIn");
                console.log(response);
                localStorage.setItem('authorization', response.headers.authorization);
                localStorage.setItem('username_info', this.state.username);
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
        if(nam === 'username') {
            axios.get(SERVICE_URL + '/users/exists/' + val).then((response) => {
                console.log(response.data.result);
                this.setState({"usernameFound": response.data.result});
            }, (error) => {

            });
        }
        this.setState({[nam]: val});
        console.log(this.state);
    }

    render() {
        if (this.state.redirect) {
            this.props.history.push("/");
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
                                <Form onMouseEnter={this.checkNullOrUndefined}>
                                    <h1 className="text-center">Sign Up</h1>
                                    <h6 className="text-center">Sign up to visualize and experiment with
                                        various <br></br> algorithms.</h6>
                                    <Form.Group>
                                        <Form.Label className={styles.formFont}>Username</Form.Label>
                                        <Form.Control placeholder="Enter username" onChange={this.handlePostChange} name="username" required></Form.Control>
                                        <FormError formError={this.state.usernameFound == true ? "Username already used" : ""}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Row>
                                            <Col>
                                                <Form.Label className={styles.formFont}>Firstname</Form.Label>
                                                <Form.Control placeholder="First name" onChange={this.handlePostChange} name="firstname" />
                                            </Col>
                                            <Col>
                                                <Form.Label className={styles.formFont}>Lastname</Form.Label>
                                                <Form.Control placeholder="Last name" onChange={this.handlePostChange} name="lastname" />
                                            </Col>
                                        </Form.Row>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className={styles.formFont}>Email</Form.Label>
                                        <Form.Control placeholder="Enter email" onChange={this.handlePostChange} name="email" required></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className={styles.formFont}>Password</Form.Label>
                                        <Form.Control placeholder="Enter password" onChange={this.handlePostChange} name="password" type="password" required></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className={styles.formFont}>Repeat Password</Form.Label>
                                        <Form.Control required placeholder="Repeat Password" onChange={this.handlePostChange} name="repeatPassword" type="password" onMouseOut={this.checkNullOrUndefined}></Form.Control>
                                        <FormError formError={this.state.passwordMatches == true ? "Password does not match." : ""}/>
                                    </Form.Group>
                                    <Button disabled={this.state.usernameFound || this.state.validated || this.state.passwordMatches} onClick={this.handleSubmit} onMouseEnter={this.checkNullOrUndefined} variant="secondary" type="submit" block>
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