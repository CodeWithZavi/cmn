import React, { useState, useRef, Suspense, useEffect } from 'react';
import styled from 'styled-components';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, PerspectiveCamera, Float, OrbitControls, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const ContactContainer = styled.div`
  width: 100%;
  padding: 7rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ContactHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #e94b27, #ff8c00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(233, 75, 39, 0.3);
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.2rem;
  line-height: 1.6;
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: rgba(15, 15, 15, 0.5);
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid rgba(233, 75, 39, 0.2);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  color: #e94b27;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormLabel = styled.label`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
`;

const FormInput = styled.input`
  padding: 1rem;
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
  padding: 1rem;
  background: rgba(15, 15, 15, 0.5);
  border: 1px solid rgba(233, 75, 39, 0.3);
  border-radius: 5px;
  color: white;
  font-family: inherit;
  resize: vertical;
  min-height: 150px;

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
  padding: 1rem;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(233, 75, 39, 0.5);
  }
`;

const ContactCard = styled.div`
  background: rgba(15, 15, 15, 0.5);
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid rgba(233, 75, 39, 0.2);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  color: #e94b27;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.8rem;
  }
`;

const CardText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  padding-left: 2.2rem;
`;

const FounderSection = styled.div`
  margin-top: 4rem;
  background: rgba(15, 15, 15, 0.5);
  border-radius: 10px;
  border: 1px solid rgba(233, 75, 39, 0.2);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const FounderTitle = styled.h2`
  font-size: 2rem;
  color: #e94b27;
  margin-bottom: 2rem;
`;

const FounderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FounderAvatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #e94b27;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 0 15px rgba(233, 75, 39, 0.3);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FounderDetails = styled.div`
  text-align: left;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const FounderName = styled.h3`
  font-size: 1.8rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const FounderRole = styled.p`
  font-size: 1.2rem;
  color: #e94b27;
  margin-bottom: 1rem;
`;

const FounderBio = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  line-height: 1.6;
  max-width: 600px;
`;

const SuccessMessage = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(15, 15, 15, 0.8);
  color: #e94b27;
  padding: 1rem 2rem;
  border-radius: 5px;
  border: 1px solid rgba(233, 75, 39, 0.5);
  backdrop-filter: blur(5px);
  animation: fadeIn 0.3s ease, fadeOut 0.3s ease 4.7s forwards;
  z-index: 1000;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-20px); }
  }
`;

// 3D Contact Text Component
const ContactText3D = () => {
  const group = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t / 4) / 6;
    group.current.position.y = Math.sin(t / 2) / 4;
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          position={[0, 0, 0]}
          fontSize={1.5}
          color="#67e8f9"
          textAlign="center"
          maxWidth={200}
        >
          Get In Touch
        </Text>

        <Text
          position={[0, -1.2, 0]}
          fontSize={0.5}
          color="#ffffff"
          textAlign="center"
          maxWidth={200}
        >
          We'd love to hear from you
        </Text>
      </Float>
    </group>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Contact Us | MonetizeIt";
  }, []);

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
      subject: '',
      message: ''
    });

    // Hide success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <ContactContainer>
      <ContactHeader>
        <Title>Contact Us</Title>
        <Subtitle>
          Have questions about MonetizeIt? Want to join our platform?
          We're here to help you navigate the world of content monetization.
        </Subtitle>
      </ContactHeader>

      <ContactContent>
        <ContactInfo>
          <ContactCard>
            <CardTitle>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#e94b27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 6L12 13L2 6" stroke="#e94b27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Email Us
            </CardTitle>
            <CardText>Hassan@monitizeit.co</CardText>
          </ContactCard>

          <ContactCard>
            <CardTitle>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92V19.92C22 20.4704 21.7893 20.9987 21.4142 21.3738C21.0391 21.7489 20.5109 21.96 19.96 21.96C16.4947 21.427 13.1884 19.9649 10.4 17.72C7.77362 15.6345 5.72549 12.9634 4.52 9.91997C3.32 7.12857 1.86 3.82097 1.32 0.399974C1.31531 0.127944 1.37445 -0.140513 1.49143 -0.383402C1.60841 -0.626291 1.77886 -0.837201 1.98959 -0.997836C2.20032 -1.15847 2.44558 -1.26349 2.70557 -1.30192C2.96556 -1.34035 3.23049 -1.31061 3.47 -1.21997H6.47C7.69731 -1.2346 8.76845 -0.257774 9 0.959974C9.08 1.45997 9.18 1.94997 9.29 2.41997C9.5299 3.39043 9.35404 4.42101 8.81 5.21997L7.46 6.57997C8.58809 9.24077 10.7592 11.4119 13.42 12.54L14.78 11.19C15.5799 10.6449 16.6111 10.469 17.58 10.71C18.05 10.82 18.54 10.92 19.04 11C20.2648 11.2331 21.2348 12.3158 21.22 13.54L22 16.92Z" stroke="#e94b27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Call Us
            </CardTitle>
            <CardText>+92 312 4740492</CardText>
          </ContactCard>

          <ContactCard>
            <CardTitle>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#e94b27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#e94b27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Location
            </CardTitle>
            <CardText>Bahawalpur, Pakistan</CardText>
          </ContactCard>
        </ContactInfo>

        <ContactForm onSubmit={handleSubmit}>
          <FormTitle>Send Us a Message</FormTitle>

          <FormGroup>
            <FormLabel>Your Name</FormLabel>
            <FormInput
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Your Email</FormLabel>
            <FormInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Subject</FormLabel>
            <FormInput
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Message</FormLabel>
            <FormTextarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <SubmitButton type="submit">Send Message</SubmitButton>
        </ContactForm>
      </ContactContent>

      <FounderSection>
        <FounderTitle>Meet Our Founder</FounderTitle>
        <FounderInfo>
          <FounderAvatar>
            <img src="/profile.jpg" alt="M Hassan" />
          </FounderAvatar>
          <FounderDetails>
            <FounderName>M Hassan</FounderName>
            <FounderRole>Founder & CEO</FounderRole>
            <FounderBio>
              With a vision to revolutionize content monetization, M Hassan founded MonetizeIt to empower creators worldwide.
              Bringing extensive experience in digital platforms and content strategy, Hassan leads our team in building
              innovative solutions that help creators maximize their revenue potential while delivering exceptional experiences to their audiences.
            </FounderBio>
          </FounderDetails>
        </FounderInfo>
      </FounderSection>

      {submitted && (
        <SuccessMessage>
          Thank you for your message! We'll get back to you soon.
        </SuccessMessage>
      )}
    </ContactContainer>
  );
};

export default Contact; 