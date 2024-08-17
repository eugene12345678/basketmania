import App1 from './components/App1'
import TeamLogoSlider from './components/TeamLogoSlider'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx';
import About from './components/About.jsx'
import SignInModal from './components/SignInModal';
import Fixtures from './components/Fixtures.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignInModal />} />
        </Routes>
    </Router>
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <TeamLogoSlider />
        <Fixtures />
          </div>
          {/* <Fixtures />
          <TeamLogoSlider /> */}
          
    <App1/>
    <Footer/>
</>
  );}

export default App;
