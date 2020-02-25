import React, {Component, Fragment} from 'react';
import {Container, Col, Row, Form, Button} from 'react-bootstrap';
import NavBar from "../navigation/NavBar";
import Jumbotron from "react-bootstrap/Jumbotron";
import styles from '../../static/signup.module.css';
import {FormError} from "../errors/FormError";
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
            usernameFound: null,
            validated: false,
            repeatPassword: '',
            passwordMatches: null,
            passwordRegularExpression: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            checkRegular: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePostChange = this.handlePostChange.bind(this);
        this.checkNullOrUndefined = this.checkNullOrUndefined.bind(this);
    }

    checkNullOrUndefined(event) {
        event.preventDefault();
        if(this.state.username === '' || this.state.password === '' || this.state.email === '' || this.state.firstname === '' || this.state.lastname === '')
            this.setState({"validated": true});
        else
            this.setState({"validated": false});

        if(this.state.password !== '') {
            if(this.state.repeatPassword !== '') {
                if(this.state.password === this.state.repeatPassword) {
                    this.setState({"passwordMatches": false});
                } else {
                    this.setState({"passwordMatches": true});
                }
                // Password test regular expression.
            }
            this.setState({"checkRegular": this.state.passwordRegularExpression.test(this.state.password)});
        }
    }

    handlePostChange(event) {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
        if(nam === 'username') {
            axios.get(SERVICE_URL + '/users/exists/' + val).then((response) => {
                this.setState({"usernameFound": response.data.result});
            }, (error) => {

            });
        }
        if(nam === 'password' || nam === 'repeatPassword') {
            this.checkNullOrUndefined(event);
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

    render() {
        if (this.state.redirect) {
            this.props.history.push("/");
        }

        return (
            <Fragment>
                <Container>
                    <Row className={styles.formMargin}>
                        <Col xs={0} sm={0} md={2} lg={3}></Col>
                        <Col xs={12} sm={12} md={8} lg={6}>
                            <Jumbotron className={styles.jumbotronStyle}>
                                <Form onKeyUp={this.checkNullOrUndefined} onMouseOver={this.checkNullOrUndefined}>
                                    <h1 className="text-center">Sign Up</h1>
                                    <h6 className="text-center">Sign up to visualize and experiment with
                                        various <br></br> algorithms.</h6>
                                    <Form.Group>
                                        <Form.Label className={styles.formFont}>Username</Form.Label>
                                        <Form.Control className={this.state.usernameFound != null ? (this.state.usernameFound == true ? styles.styleInputError : styles.styleInputSuccess) : ''} placeholder="Enter username" onKeyUp={this.handlePostChange} name="username" required></Form.Control>
                                        <FormError formError={this.state.usernameFound == true ? "Username already used" : ""}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Row>
                                            <Col>
                                                <Form.Label className={styles.formFont}>Firstname</Form.Label>
                                                <Form.Control placeholder="First name" onKeyUp={this.handlePostChange} name="firstname" />
                                            </Col>
                                            <Col>
                                                <Form.Label className={styles.formFont}>Lastname</Form.Label>
                                                <Form.Control placeholder="Last name" onKeyUp={this.handlePostChange} name="lastname" />
                                            </Col>
                                        </Form.Row>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className={styles.formFont}>Email</Form.Label>
                                        <Form.Control placeholder="Enter email" onKeyUp={this.handlePostChange} name="email" required></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className={styles.formFont}>Password</Form.Label>
                                        <Form.Text>Password must contain at least one uppercase, one lowercase and one special character. At least 8 characters long.</Form.Text>
                                        <Form.Control className={this.state.passwordMatches != null ? (this.state.passwordMatches || !this.state.checkRegular ? styles.styleInputError : styles.styleInputSuccess) : ''} placeholder="Enter password" onKeyUp={this.handlePostChange} name="password" type="password" required></Form.Control>
                                        <FormError formError={this.state.checkRegular != null ? (!this.state.checkRegular ? "Check password validity." : "") : ""}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className={styles.formFont}>Repeat Password</Form.Label>
                                        <Form.Control className={this.state.passwordMatches != null ? (this.state.passwordMatches || !this.state.checkRegular ? styles.styleInputError : styles.styleInputSuccess) : ''} required placeholder="Repeat Password" onKeyUp={this.handlePostChange} name="repeatPassword" type="password"></Form.Control>
                                        <FormError formError={this.state.passwordMatches == true ? "Password does not match." : ""}/>
                                    </Form.Group>
                                    <Button disabled={this.state.usernameFound || this.state.validated || this.state.passwordMatches || !this.state.checkRegular} onClick={this.handleSubmit} variant="secondary" type="submit" block>
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