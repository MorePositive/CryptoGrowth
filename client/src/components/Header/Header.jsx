import { HEADING } from '../../constants/header';
import { Container, Row, Col } from 'react-bootstrap';
import './header.scss';

export const Header = () => {
  return (
    <header className="header">
      <Container>
        <Row>
          <Col xs={{ span: 4, offset: 2 }}>
            <a href="/">
              <div className="logo"></div>
              <h1 className="header_title">{ HEADING.TITLE }</h1>
            </a>
          </Col>
          <Col xs={4}>
            <p className="header_description">{ HEADING.DESCRIPTION }</p>
          </Col>
        </Row>
      </Container>
    </header>
  )
};
