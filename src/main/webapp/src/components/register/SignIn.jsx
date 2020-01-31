import React, {Component, Fragment} from 'react';
import NavBar from "../navigation/NavBar";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import styles from "../../static/signup.module.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import {FormError} from "../errors/FormError";
const axios = require('axios');

export class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: false,
            formError: false
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
            console.log(response);
            console.log(this.state.username);
            localStorage.setItem('authorization', response.headers.authorization);
            localStorage.setItem('username_info', this.state.username);
            this.setState({"redirect": true});
        }, (error) => {
            console.log(error);
            this.setState({"formError": true});
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
                                <Form>
                                    <h1 className="text-center">Sign In</h1>
                                    <Form.Group>
                                        <Form.Label className={styles.formFont}>Username</Form.Label>
                                        <Form.Control placeholder="Enter username" onChange={this.handlePostChange} name="username"></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className={styles.formFont}>Password</Form.Label>
                                        <Form.Control placeholder="Enter password" onChange={this.handlePostChange} name="password" type="password"></Form.Control>
                                        <FormError formError={this.state.formError == true ? "Wrong username or password." : ""}/>
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