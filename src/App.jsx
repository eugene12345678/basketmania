import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import SignInModal from './components/SignInModal';
import TeamLogoSlider from './components/TeamLogoSlider';
import Fixtures from './components/Fixtures.jsx';
import Footer from './components/Footer.jsx';
import App1 from './components/App1';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignInModal />} />
      </Routes>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <TeamLogoSlider />
        <Fixtures />
      </div>
      <App1 />
      <Footer />
    </Router>
  );
}

export default App;
