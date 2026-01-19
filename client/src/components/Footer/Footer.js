import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col>Footer left part</Col>
          <Col>
            <Col>
              <Link to="/about" >ABOUT</Link>
            </Col>
            Footer right part
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;