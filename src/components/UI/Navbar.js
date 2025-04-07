import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 0 30px rgba(233, 75, 39, 0.1);
  border-bottom: 1px solid rgba(233, 75, 39, 0.2);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  filter: drop-shadow(0 0 5px rgba(233, 75, 39, 0.3));
`;

const LogoM = styled.span`
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
`;

const LogoDiamond = styled.div`
  width: 18px;
  height: 18px;
  background-color: #e94b27;
  transform: rotate(45deg);
  margin: 0 6px;
  position: relative;
  top: 0px;
`;

const LogoText = styled.span`
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  letter-spacing: 1px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  position: relative;
  padding: 0.5rem 0;

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background: linear-gradient(90deg, #e94b27, #ff8c00);
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const Navbar = () => {
  return (
    <NavContainer>
      <LogoContainer>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <Logo>
            <LogoM>m</LogoM>
            <LogoDiamond />
            <LogoText>onetize</LogoText>
            <LogoText>it</LogoText>
          </Logo>
        </Link>
      </LogoContainer>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar; 