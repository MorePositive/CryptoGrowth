import React from 'react';
import { Link } from 'react-router-dom';
import { HEADING } from '../../constants/header';
import { Container, Row, Col } from 'react-bootstrap';
import './header.scss';

const Header = () => {
  return (
    <header className="header">
      <Container>
        <Row className="align-items-center">
          <Col lg={{ span: 3, offset: 2 }}>
            <Link to="/" className="logo">
              <div className="icon"></div>
              <h1 className="header_title">{ HEADING.TITLE }</h1>
            </Link>
          </Col>
          <Col lg={4} className="header_description">{ HEADING.DESCRIPTION }</Col>
          <ul className="col-lg-1 menu">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/support">Support</Link></li>
          </ul>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
