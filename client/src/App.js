import React from 'react';
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

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
