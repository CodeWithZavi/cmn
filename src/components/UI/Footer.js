import React, { useState } from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: 2rem;
  background: linear-gradient(0deg, #000000, rgba(15, 15, 15, 0.9));
  color: rgba(255, 255, 255, 0.7);
  border-top: 1px solid rgba(233, 75, 39, 0.2);
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.3);
  margin-top: 3rem;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 200px;
  margin-right: 2rem;
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const LogoM = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
`;

const LogoDiamond = styled.div`
  width: 12px;
  height: 12px;
  background-color: #e94b27;
  transform: rotate(45deg);
  margin: 0 4px;
`;

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 1px;
`;

const FooterTitle = styled.h3`
  color: #e94b27;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const FormInput = styled.input`
  padding: 0.8rem;
  background: rgba(15, 15, 15, 0.5);
  border: 1px solid rgba(233, 75, 39, 0.3);
  border-radius: 5px;
  color: white;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #e94b27;
    box-shadow: 0 0 10px rgba(233, 75, 39, 0.3);
  }
`;

const FormTextarea = styled.textarea`
  padding: 0.8rem;
  background: rgba(15, 15, 15, 0.5);
  border: 1px solid rgba(233, 75, 39, 0.3);
  border-radius: 5px;
  color: white;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #e94b27;
    box-shadow: 0 0 10px rgba(233, 75, 39, 0.3);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(90deg, #e94b27, #ff8c00);
  color: #ffffff;
  border: none;
  padding: 0.8rem;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(233, 75, 39, 0.5);
  }
`;

const SuccessMessage = styled.div`
  color: #e94b27;
  background: rgba(233, 75, 39, 0.1);
  padding: 1rem;
  border-radius: 5px;
  margin-top: 1rem;
  text-align: center;
`;

const ContactInfo = styled.div`
  margin-top: 1rem;
  
  p {
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 0.5rem;
    }
  }
`;

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);

    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });

    // Hide success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterLogo>
            <LogoM>m</LogoM>
            <LogoDiamond />
            <LogoText>onetize</LogoText>
            <LogoText>it</LogoText>
          </FooterLogo>
          <p>Redefining Digital Interaction through immersive content monetization experiences.</p>

          <ContactInfo>
            <p>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4L7.5 8.5L13 4" stroke="#e94b27" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="2" y="2" width="12" height="12" rx="1" stroke="#e94b27" strokeWidth="1.5" />
              </svg>
              Hassan@monitizeit.co
            </p>
            <p>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 11.3333V13.3333C14 13.687 13.8595 14.0261 13.6095 14.2761C13.3594 14.5262 13.0203 14.6667 12.6667 14.6667C10.6454 14.5429 8.68736 13.8519 6.96667 12.6667C5.36892 11.5816 4.0512 10.2639 2.96666 8.66669C1.77499 6.93979 1.0833 4.97449 0.966663 2.94669C0.966663 2.59387 1.10701 2.25552 1.35617 2.00547C1.60533 1.75542 1.94323 1.61463 2.29666 1.61336H4.29666C4.92894 1.6074 5.4672 2.05255 5.56666 2.67669C5.65484 3.41799 5.82301 4.14795 6.06666 4.85336C6.23577 5.30124 6.13421 5.80473 5.81333 6.14669L4.97333 6.98669C5.98633 8.64174 7.35829 10.0137 9.01333 11.0267L9.85333 10.1867C10.1953 9.86583 10.6988 9.76428 11.1467 9.93336C11.8521 10.177 12.582 10.3452 13.3233 10.4333C13.9531 10.5339 14.4005 11.0792 14.3867 11.72L14 11.3333Z" stroke="#e94b27" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              +92 312 4740492
            </p>
            <p>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 6.5C12.5 10.5 8 14 8 14C8 14 3.5 10.5 3.5 6.5C3.5 3.46243 5.46243 1.5 8 1.5C10.5376 1.5 12.5 3.46243 12.5 6.5Z" stroke="#e94b27" strokeWidth="1.5" />
                <circle cx="8" cy="6.5" r="2" stroke="#e94b27" strokeWidth="1.5" />
              </svg>
              Bahawalpur
            </p>
          </ContactInfo>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Contact Us</FooterTitle>
          <ContactForm onSubmit={handleSubmit}>
            <FormInput
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <FormInput
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <FormTextarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <SubmitButton type="submit">Send Message</SubmitButton>
          </ContactForm>
          {submitted && (
            <SuccessMessage>
              Thank you for your message! We'll get back to you soon.
            </SuccessMessage>
          )}
        </FooterSection>
      </FooterContent>

      <Copyright>
        &copy; {new Date().getFullYear()} MonetizeIt. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 