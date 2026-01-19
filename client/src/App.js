import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import About from './components/About/About';
import Support from './components/Support/Support';
import Footer from './components/Footer/Footer';

const App = () => {
  const [loading, setLoading] = useState();

  useEffect(() => {
    new Promise(function(resolve) { 
      setTimeout(resolve.bind(null), 1000)
    })
    .then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
      <div className={'loader ' + (loading ? 'loading' : 'loaded')}><div className="loader_logo"></div></div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Main loader={setLoading}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
