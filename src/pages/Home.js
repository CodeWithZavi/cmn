import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled components
const HomeContainer = styled.div`
  width: 100%;
  padding-top: 5rem;
`;

const HeroSection = styled.div`
  width: 100%;
  height: 90vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #000000 0%, #1a0e0a 100%);
  overflow: hidden;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(233, 75, 39, 0.1) 0%, transparent 20%),
    radial-gradient(circle at 80% 70%, rgba(233, 75, 39, 0.15) 0%, transparent 20%);
  z-index: 1;
`;

const HeroContent = styled.div`
  text-align: center;
  width: 80%;
  max-width: 1200px;
  z-index: 10;
  
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const LogoContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
`;

const HeroLogo = styled.div`
  width: 100%;
  max-width: 500px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 0 15px rgba(233, 75, 39, 0.5));
`;

const LogoM = styled.span`
  font-size: 4.5rem;
  font-weight: bold;
  color: #ffffff;
`;

const LogoDiamond = styled.div`
  width: 35px;
  height: 35px;
  background-color: #e94b27;
  transform: rotate(45deg);
  margin: 0 8px;
  position: relative;
  top: 2px;
  border-radius: 2px;
`;

const LogoText = styled.span`
  font-size: 4.5rem;
  font-weight: bold;
  color: #ffffff;
  letter-spacing: 0.05em;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #e94b27, #ff8c00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(233, 75, 39, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CTAButton = styled(Link)`
  background: linear-gradient(90deg, #e94b27, #ff8c00);
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-weight: bold;
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  display: inline-block;
  box-shadow: 0 0 20px rgba(233, 75, 39, 0.5);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 30px rgba(233, 75, 39, 0.8);
  }
`;

const FeaturesSection = styled.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #e94b27;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ContactSection = styled.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const ContactCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ContactCard = styled.div`
  background: rgba(25, 25, 25, 0.5);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2), 0 0 20px rgba(233, 75, 39, 0.1);
  border: 1px solid rgba(233, 75, 39, 0.2);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3), 0 0 30px rgba(233, 75, 39, 0.2);
  }
`;

const ContactIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e94b27, #ff8c00);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  
  svg {
    width: 30px;
    height: 30px;
    color: white;
  }
`;

const ContactTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #e94b27;
`;

const ContactInfo = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 0.5rem;
`;

const ContactLink = styled.a`
  color: #e94b27;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ff8c00;
    text-decoration: underline;
  }
`;

const FeatureCard = styled.div`
  background: rgba(25, 25, 25, 0.5);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2), 0 0 20px rgba(233, 75, 39, 0.1);
  border: 1px solid rgba(233, 75, 39, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3), 0 0 30px rgba(233, 75, 39, 0.2);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #e94b27;
`;

const FeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
`;

// Main component
const Home = () => {
  // Set page title
  useEffect(() => {
    document.title = "MonetizeIt | Content Monetization Platform";
  }, []);

  const features = [
    {
      title: "Interactive Platform",
      description: "Experience content in an immersive environment that brings your brand to life."
    },
    {
      title: "Dynamic Content Spaces",
      description: "Create personalized, interactive spaces that act as content hubs for your exclusive content."
    },
    {
      title: "Multiple Monetization Options",
      description: "Offer subscriptions, pay-per-view content, and exclusive experiences all in one platform."
    },
    {
      title: "Real-Time Engagement",
      description: "Interact with your audience in real-time within stunning environments."
    },
    {
      title: "Customizable Spaces",
      description: "Create unique spaces that reflect your brand and engage your audience."
    },
    {
      title: "Analytics & Insights",
      description: "Track performance with comprehensive analytics on content engagement and revenue."
    }
  ];

  return (
    <HomeContainer>
      <HeroSection>
        <HeroBackground />
        <HeroContent>
          <LogoContainer>
            <HeroLogo>
              <LogoM>m</LogoM>
              <LogoDiamond />
              <LogoText>onetize</LogoText>
              <LogoText>it</LogoText>
            </HeroLogo>
          </LogoContainer>
          <HeroTitle>Content Monetization Platform</HeroTitle>
          <HeroSubtitle>Redefining Digital Interaction Through Immersive Experiences</HeroSubtitle>
          <CTAButton to="/creator/1">Start Monetizing</CTAButton>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <SectionTitle>Why Choose MonetizeIt?</SectionTitle>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeaturesSection>

      <ContactSection>
        <SectionTitle>Get In Touch</SectionTitle>
        <ContactCards>
          <ContactCard>
            <ContactIcon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </ContactIcon>
            <ContactTitle>Email</ContactTitle>
            <ContactInfo>For general inquiries:</ContactInfo>
            <ContactLink href="mailto:Hassan@monitizeit.co">Hassan@monitizeit.co</ContactLink>
            <ContactInfo style={{ marginTop: '1rem' }}>For support:</ContactInfo>
            <ContactLink href="mailto:Hassan@monitizeit.co">Hassan@monitizeit.co</ContactLink>
          </ContactCard>

          <ContactCard>
            <ContactIcon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </ContactIcon>
            <ContactTitle>Phone</ContactTitle>
            <ContactInfo>Main Line:</ContactInfo>
            <ContactLink href="tel:+923124740492">+92 312 4740492</ContactLink>
            <ContactInfo style={{ marginTop: '1rem' }}>Support Line:</ContactInfo>
            <ContactLink href="tel:+923124740492">+92 312 4740492</ContactLink>
          </ContactCard>

          <ContactCard>
            <ContactIcon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </ContactIcon>
            <ContactTitle>Location</ContactTitle>
            <ContactInfo>Bahawalpur</ContactInfo>
            <ContactInfo>Pakistan</ContactInfo>
            <ContactLink href="https://maps.google.com" target="_blank" rel="noopener noreferrer" style={{ marginTop: '0.5rem' }}>View on Map</ContactLink>
          </ContactCard>
        </ContactCards>
      </ContactSection>
    </HomeContainer>
  );
};

export default Home;