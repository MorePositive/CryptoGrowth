import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select/async';
import { Steps } from 'rsuite';
import { getHistorical } from '../../api/coingecko';
import './main.scss';

// Components
import { TopCoins } from '../TopCoins/TopCoins';

const customStyles = {
  control: (styles) => ({
    ...styles,
    padding: '6px 10px',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: 'rgba(255,255,255,0.5)',
    boxShadow: '#5481e6 5px 5px'
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: 'rgba(255,255,255,0.6)',
      color: '#000',
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':hover': {
        ...styles[':hover'],
        backgroundColor: '#ddd',
        cursor: 'pointer'
      }
    };
  },
  input: (styles) => ({ ...styles, color: '#fff' }),
  placeholder: (styles) => ({ ...styles, color: '#ccc', fontWeight: 'normal' }),
  singleValue: (styles, { data }) => ({ ...styles, color: '#fff' })  
}

export const Main = ({ coins, loader }) => {
  const setLoading = (state) => {
    loader(state);
  };

  var oldDate = new Date();
  oldDate.setFullYear(oldDate.getFullYear()-5);

  const [coinValue, setCoinValue] = useState('');
  const [amountValue, setAmountValue] = useState(1000);
  const [dateValue, setDateValue] = useState(oldDate.toLocaleDateString('en-CA'));
  const [pastData, setPastData] = useState(null);
  const [step, setStep] = useState(0);

  var priceFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

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

  const renderStep = () => {
    return [
      renderSearchStep,
      renderAmountStep,
      renderDateStep,
      renderResults
    ][step]()
  }

  const renderSearchStep = () => {
    return (
      <div className="search">
        <Col className="label">Choose crypto asset: </Col>
        <Select
          styles={customStyles}
          menuColor="grey"
          isSearchable={true}
          onChange={e => setCoinValue(e.value)}
          loadOptions={onSearch}
          loadingMessage={loadingMessage}
          noOptionsMessage={noOptions}
          escapeClearsValue={false}
        />
      </div>
    )
  }

  const renderAmountStep = () => {
    return (
      <div className="amount">
        <Col className="label">Your investment: </Col>
        <Col className="field">
          <div className="input">
            <input 
              type="text" 
              value={amountValue} 
              href="#amount" 
              className="amount" 
              onChange={(e) => setAmountValue(e.target.value)} 
            />
          </div>
        </Col>
      </div>
    )
  }

  const renderDateStep = () => {
    return (
      <div className="date">
        <Col className="label">From date: </Col>
        <Col className="field">
          <input 
            type="date" 
            value={dateValue} 
            href="#date" 
            className="date" 
            onChange={(e) => setDateValue(e.target.value)} 
          />
        </Col>
      </div>
    )
  }

  const renderResults = () => {
    var missedAmount, percentIncrease;
    if(pastData) {
      const currentPrice = coins.find(({ id }) => id === coinValue).current_price;
      const pastPrice = pastData.market_data.current_price.usd;
      missedAmount = Number(amountValue) / pastPrice * currentPrice;
      percentIncrease = missedAmount / amountValue * 100;
    }
    return (
      <div className="result">
        <p>If you would have invested {priceFormat.format(amountValue)} starting on {dateValue}, you would have had today...</p>
        <div className="missed">{ missedAmount
        ? priceFormat.format(missedAmount)
        : "calculating result..." }</div>
        <p className="mt-2">That is a {percentIncrease.toFixed(2)}% increase (or {((percentIncrease/100)-1).toFixed(0)}X returns) on your initial investment!</p>
      </div>
    )
  }

  const nextStep = () => {
    const isValid = validateInputs();
    if (!isValid) return;
    setStep(step => {
      if (step === 2) {
        setLoading(true);
        const pastDate = dateValue.split('-').reverse().join('-');
        getHistorical(coinValue, pastDate, (data) => {
          setPastData(data);
          setLoading(false);
        });
      }
      return step + 1;
    });
  }

  const startOver = () => {
    setCoinValue('');
    setStep(0);
  }

  return (
    <main className="highlight">
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={{ span: 4, offset: 1 }} className="start-form">
            <Steps current={step}>
              <Steps.Item title="Choose asset" />
              <Steps.Item title="Investment" />
              <Steps.Item title="Select Date" />
            </Steps>
            { renderStep() }
            { step < 3
              ? <Button onClick={nextStep}>{step < 2 ? 'Next' : 'Submit'}</Button>
              : <Button onClick={startOver}>Start over</Button> }
          </Col>
          <Col xs={{ span: 4, offset: 1 }}>
            <TopCoins coins={coins} />
          </Col>
        </Row>
      </Container>
    </main>
  )
};
