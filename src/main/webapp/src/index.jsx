import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from './components/HelloWorld';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';
import './styles/app.scss';
import {Container, Row, Col} from 'react-bootstrap';

ReactDOM.render(
  <Container>
    <Row>
      <Col>
        <HelloWorld />
      </Col>
      <Col>2 of 3</Col>
    </Row>
  </Container>,
  document.getElementById('app')
);
