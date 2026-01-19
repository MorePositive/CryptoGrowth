import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Select from 'react-select/async';

// Components
import { TopCoins } from '../TopCoins/TopCoins';
//import { getHistorical } from '../../api/coingecko';

export const Main = () => {
  const [coinValue, setCoinValue] = useState('');
  const [amountValue, setAmountValue] = useState('');
  const [dateValue, setDateValue] = useState('');

  const isAllDone = coinValue && amountValue && dateValue;
  //pull options real time from "
  const onHandleChange = (e) => {
    setCoinValue(e.value);
  };
  const onSearch = (input, cb) => {
    fetch('/api/search/' + input.trim())
      .then(res => res.json())
      .then(data => {
        let options = data.results.map((coin, i) => {
          return { label:coin.name, value:coin.id };
        });
        cb(options || []);
      });
  }
  const noOptions = (input) => {
    return 'Nothing found ' + (input ? 'for "' + input.inputValue + '"' : '') + ', try entering something else';
  }
  const loadingMessage = (input) => {
    return 'Searching...';
  }

  const onHandleClick = () => {
    // if (isAllDone) {
    //   //getMissedAmount
    //   // dd-mm-yyyy eg. 30-12-2017
    //   //const selectedCoinCurrentPrice = coins.find(({ value }) => value === coinValue).price;
    //   getHistorical('bitcoin', '30-12-2021', data => console.log('data', data))
    // }
  }

  return (
    <main className="highlight">
      <Container>
        <Row className="justify-content-md-between">
          <Col>
            <div className="block-search container">
              <Col>Enter name of the coin</Col>
              <Select
                className="coins-search"
                isSearchable={true}
                onChange={onHandleChange}
                loadOptions={onSearch}
                loadingMessage={loadingMessage}
                noOptionsMessage={noOptions}
              />
             </div>
             <div className="block-search container">
              <Col>Enter investments amount</Col>
              <Col><input type="text" value={amountValue} href="#amount" className="amount" onChange={(e) => setAmountValue(e.target.value)}></input></Col>
             </div>
             <div className="block-search container">
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
