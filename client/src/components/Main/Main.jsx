import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Select from 'react-select/async';
import { Steps } from 'rsuite';
import { getHistorical } from '../../api/coingecko';

// Components
import { TopCoins } from '../TopCoins/TopCoins';

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.selectProps.menuColor,
    padding: 20,
  })
};

export const Main = ({ coins }) => {
  const [coinValue, setCoinValue] = useState('');
  const [amountValue, setAmountValue] = useState(0);
  const [dateValue, setDateValue] = useState('');
  const [pastData, setPastData] = useState(null);
  const [missedAmount, setMissedAmount] = useState('');
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const isAllDone = coinValue && amountValue && dateValue;
  //pull options real time from "

  useEffect(() => {
    if (pastData) calculateMissedAmount();
  }, [pastData])

  const onSearch = (input, cb) => {
    fetch('/api/search/' + input.trim())
      .then(res => res.json())
      .then(data => {
        let options = data?.results?.map((coin, i) => {
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

  const validateInputs = () => {
    if ((step === 0 && !coinValue) || 
        (step === 1 && !amountValue) || 
        (step === 2 && !dateValue)) {
      return false;
    }
    return true;
  }

  const generateFirstStep = () => {
    return (
      <>
        <Col>Enter name of the coin</Col>
        <Select
          className="coins-search"
          styles={customStyles}
          menuColor="grey"
          isSearchable={true}
          onChange={e => setCoinValue(e.value)}
          loadOptions={onSearch}
          loadingMessage={loadingMessage}
          noOptionsMessage={noOptions}
        />
      </>
    )
  }

  const generateSecondStep = () => {
    return (
      <>
        <Col>Enter investments amount</Col>
        <Col>
        <input 
          type="text" 
          value={amountValue} 
          href="#amount" 
          className="amount" 
          onChange={(e) => setAmountValue(e.target.value)} 
        />
        </Col>
      </>
    )
  }

  const generateThirdStep = () => {
    return (
      <>
        <Col>Select date</Col>
        <Col>
        <input 
          type="date" 
          value={dateValue} 
          href="#date" 
          className="date" 
          onChange={(e) => setDateValue(e.target.value)} 
        />
        </Col>
      </>
    )
  }

  const calculateMissedAmount = () => {
    const selectedCoinCurrentPrice = coins.find(({ id }) => id === coinValue).current_price;
    const selectedCoinPastPrice = pastData.market_data.current_price.usd;
    const missed = Number(amountValue) / selectedCoinPastPrice * selectedCoinCurrentPrice;
    setLoading(false);
    setMissedAmount(missed);
  }

  const onHandleClick = () => {
    const isValid = validateInputs();
    if (!isValid) return;
    setStep(step => step + 1);
    if (isAllDone) {
      setLoading(true);
      const pastDate = dateValue.split('-').reverse().join('-');
      getHistorical(coinValue, pastDate, (data) => setPastData(data));
    }
  }

  const steps = {
    0: generateFirstStep(),
    1: generateSecondStep(),
    2: generateThirdStep()
  }

  return (
    <main className="highlight">
      <Container>
        <Row className="justify-content-md-between">
          <Col>
            <div className="mt-4 block-search d-flex justify-content-center container">
              <Steps current={step}>
                <Steps.Item title="Choose Coin" />
                <Steps.Item title="Enter Amount" />
                <Steps.Item title="Select Date" />
              </Steps>
            </div>
            <div className="block-search container">
              { steps[step] }
              { missedAmount && `${missedAmount.toFixed(0)}$` }
              { loading && <div className="loader"><div className="loader_logo"></div></div> }
             </div>
             { step < 3 && <button className="btn btn-primary mt-3 w25" onClick={onHandleClick}>{isAllDone ? 'Submit' : 'Next'}</button> }
          </Col>
          <Col md={{ span: 4, offset: 2 }}>
            <TopCoins coins={coins} />
          </Col>
        </Row>
      </Container>
    </main>
  )
};
