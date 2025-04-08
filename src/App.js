import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

// Pages
import Home from './pages/Home';
import Contact from './pages/Contact';
// Add imports for the missing page components
import CreatorSpace from './pages/CreatorSpace';
import ContentRoom from './pages/ContentRoom';
import Subscription from './pages/Subscription';

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
          {/* Add routes for the missing pages */}
          <Route path="/creator/:id" element={<CreatorSpace />} />
          <Route path="/room/:id" element={<ContentRoom />} />
          <Route path="/subscribe/:id" element={<Subscription />} />
        </Routes>
        <Footer />
      </Router>
    </AppContainer>
  );
}

export default App;
