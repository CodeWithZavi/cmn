import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';


// Pages
import Home from './pages/Home';
import Contact from './pages/Contact';

// Components
import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #000000;
  color: #ffffff;
`;

function App() {
  return (
    <AppContainer>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </AppContainer>
  );
}

export default App;
