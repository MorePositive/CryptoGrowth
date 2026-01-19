import React, { useState } from 'react';
import Select from 'react-select/async';
import { Steps } from 'rsuite';
import { priceFormat } from '../../helpers';
import { Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getHistoricalValue } from '../../api/coingecko';
import './hero.scss';

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
  option: (styles, { isDisabled }) => {
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
  singleValue: (styles) => ({ ...styles, color: '#fff' })  
};

const Hero = ({ coins }) => {
  const oldDate = new Date();
  oldDate.setFullYear(oldDate.getFullYear()-5);

  const [loading, setLoading] = useState(false);
  const [coinValue, setCoinValue] = useState(null);
  const [amountValue, setAmountValue] = useState(1000);
  const [dateValue, setDateValue] = useState(oldDate.toLocaleDateString('en-CA'));
  const [pastData, setPastData] = useState(null);
  const [step, setStep] = useState(0);
  
  const onSearch = (input, cb) => {
    fetch('/api/search/' + input.trim())
      .then(res => res.json())
      .then(data => {
        let options = data?.results?.map((coin, i) => {
          return { label:coin.name, value:coin.id };
        });
        cb(options || []);
      });
  };

  const noOptions = (input) => {
    return 'Nothing found ' + (input ? 'for "' + input.inputValue + '"' : '') + ', try entering something else';
  };

  const loadingMessage = (input) => {
    return 'Searching...';
  };

  const validateInputs = () => {
    if ((step === 0 && !coinValue) || 
        (step === 1 && !amountValue) || 
        (step === 2 && !dateValue)) {
      return false;
    }
    return true;
  };

  const renderStep = () => {
    return [
      renderSearchStep,
      renderAmountStep,
      renderDateStep,
      renderResults
    ][step]();
  };

  const renderSearchStep = () => {
    return (
      <div className="search">
        <Col className="label">Choose crypto asset: </Col>
        <Select
          styles={customStyles}
          isSearchable={true}
          onChange={e => setCoinValue(coins.find(({ id }) => id === e.value))}
          loadOptions={onSearch}
          loadingMessage={loadingMessage}
          noOptionsMessage={noOptions}
          escapeClearsValue={false}
        />
      </div>
    );
  };
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
    );
  };
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
    );
  };
  const renderResults = () => {
    let missedAmount;
    let percentIncrease;
    let isProfitableInvestment;
    if (pastData) {
      try {
        const currentPrice = coinValue.current_price;
        const pastPrice = pastData.market_data.current_price.usd;
        missedAmount = Number(amountValue) / pastPrice * currentPrice;
        percentIncrease = missedAmount / amountValue * 100;
        isProfitableInvestment = percentIncrease > 100;
      } catch (err) {
        console.log(err);
      }
    }
    return (
      <div className="result">
        <p>If you would have invested {priceFormat.format(amountValue)} in {coinValue.name} starting on {dateValue}, you would have had today...</p>
        <div className="missed">
          <div className={loading ? 'spinner' : ''}></div>
          <div>{ missedAmount ? priceFormat.format(missedAmount) : 'calculating result...' }</div>
        </div>
        { missedAmount && !loading ?
          (percentIncrease && isProfitableInvestment
            ? <p className="mt-2">That is a {percentIncrease.toFixed(2) - 100}% increase (or {((percentIncrease/100)).toFixed(1)}X returns) on your initial investment!</p>
            : <p className="mt-2">That is a -{(100 - percentIncrease).toFixed(2)}% loss on your initial investment {':('}</p>
          ) : ''
        }
        { missedAmount && isProfitableInvestment &&
          <div className="animation">
            <div className="firework"><i></i></div>
            <div className="firework one"><i></i></div>
            <div className="firework two"><i></i></div>
          </div>
        }
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
        getHistoricalValue(coinValue.id, pastDate, (data) => {
          setTimeout(() => {
            setPastData(data);
            setLoading(false);
          }, 1000);
        });
      }
      return step + 1;
    });
  }

  const startOver = () => {
    setCoinValue(null);
    setStep(0);
  }

  return (
    <div className="start-form">
      <Steps current={step}>
      <Steps.Item title="Choose asset" />
      <Steps.Item title="Investment" />
      <Steps.Item title="Select Date" />
      </Steps>
      { renderStep() }
      { step < 3
      ? <Button className="submit arrowed" onClick={nextStep}>{step < 2 ? 'Next' : 'Submit'}</Button>
      : <>
          <Button onClick={startOver}>Start over</Button>
          <Link className="btn btn-secondary breakdown arrowed" to={{ pathname: '/timeline', search: `?coin=${coinValue.id}&from=${dateValue}&amount=${amountValue}` }}>Breakdown chart</Link>
        </> }
    </div>
  );
};

export default Hero;
