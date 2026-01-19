import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import {mock} from '../../mock';

// Components
import { TopCoins } from '../TopCoins/TopCoins';

export const Main = () => {

  const [coinValue, setCoinValue] = useState('');
  const [amountValue, setAmountValue] = useState('');
  const [dateValue, setDateValue] = useState('');

  const isAllDone = coinValue && amountValue && dateValue;

  const onHandleChange = (e) => {
    setCoinValue(e.value);
  };

  const onHandleClick = () => {
    // if (isAllDone) {
    //   //getMissedAmount
    //   // dd-mm-yyyy eg. 30-12-2017
    //   //const selectedCoinCurrentPrice = coins.find(({ value }) => value === coinValue).price;
    //   fetch('https://api.coingecko.com/api/v3/coins/bitcoin/history?date=30-12-2021&localization=false')
    //   .then(response => response.json())
    //   .then(data => console.log('data', data))
    // }
  }

  return (
    <main className="highlight">
      <Container>
        <Row className="justify-content-md-between">
          <Col>
            <div className="block block-search container">
              <Col>Enter name of the coin</Col>
              <Select
                isSearchable={true}
                onChange={onHandleChange}
                options={mock}
              />
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
          <Col md={{ span: 4, offset: 2 }}>
            <TopCoins />
          </Col>
        </Row>
      </Container>
    </main>
  )
};
