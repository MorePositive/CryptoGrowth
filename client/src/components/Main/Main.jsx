import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Components
import { TopCoins } from '../TopCoins/TopCoins';

export const Main = () => {

  const [coinValue, setCoinValue] = useState('');
  const [amountValue, setAmountValue] = useState('');
  const [dateValue, setDateValue] = useState('');


  const isAllDone = coinValue && amountValue && dateValue;

  return (
    <main className="highlight">
      <Container>
        <Row className="justify-content-md-between">
          <Col md={4}>
            <div className="block block-search container">
              <Col>Enter name of the coin</Col>
              <Col><input type="search" value={coinValue} href="#search" className="search" onChange={(e) => setCoinValue(e.target.value)}></input></Col>
             </div>
             <div className="block block-search container">
              <Col>Enter investments amount</Col>
              <Col><input type="text" value={amountValue} href="#amount" className="amount" onChange={(e) => setAmountValue(e.target.value)}></input></Col>
             </div>
             <div className="block block-search container">
              <Col>Select date</Col>
              <Col><input type="date" value={dateValue} href="#date" className="date" onChange={(e) => setDateValue(e.target.value)}></input></Col>
             </div>
             <button className="btn btn-primary mt-3 w25">{isAllDone ? 'Submit' : 'Next'}</button>
          </Col>
        </Row>
      </Container>
      <Container>
        <TopCoins />
      </Container>
    </main>
  )
};
