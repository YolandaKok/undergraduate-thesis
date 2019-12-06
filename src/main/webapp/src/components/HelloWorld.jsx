import React, { Component } from 'react';
const axios = require('axios');


export class HelloWorld extends Component {

  componentDidMount() {
    console.log('Component DID MOUNT!');
    axios.get('http://localhost:8080/test/hello', {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  }

  render() {
    return (
      <div className="hello-world">
        <h1>Hello World</h1>
      </div>
    );
  }

}

export default HelloWorld;
