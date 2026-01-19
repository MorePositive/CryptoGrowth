import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import Timeline from './components/Timeline/Timeline';
import About from './components/About/About';
import Support from './components/Support/Support';

ReactGA.initialize('G-CRGYNB410N');

const App = () => {

  const location = useLocation();
  useEffect(() => {
      ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
