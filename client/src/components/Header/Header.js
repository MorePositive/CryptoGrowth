import React from 'react';
import { Link } from 'react-router-dom';
import { HEADING } from '../../constants/header';
import { Container, Row, Col } from 'react-bootstrap';
import './header.scss';

const Header = () => {
  return (
    <header className="header">
      <Container>
        <Row>
          <Col lg={{ span: 4, offset: 2 }} className="align-self-center">
            <Link to="/" className="logo">
              <div className="icon"></div>
              <h1 className="header_title">{ HEADING.TITLE }</h1>
            </Link>
          </Col>
          <Col lg={4}>
            <Container>
              <Row>
                <div className="col header_description">{ HEADING.DESCRIPTION }</div>
                <ul className="col menu">
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/support">Support</Link></li>
                </ul>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
