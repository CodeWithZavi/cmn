import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ContentRoomScene from '../components/3D/ContentRoomScene';

const RoomContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1000;
  background: rgba(15, 15, 30, 0.7);
  border: 1px solid rgba(103, 232, 249, 0.5);
  color: #67e8f9;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  backdrop-filter: blur(5px);
  
  &:hover {
    background: rgba(15, 15, 30, 0.9);
    box-shadow: 0 0 15px rgba(103, 232, 249, 0.3);
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

const InfoPanel = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background: rgba(15, 15, 30, 0.7);
  border: 1px solid rgba(103, 232, 249, 0.5);
  border-radius: 10px;
  padding: 1rem;
  color: white;
  max-width: 300px;
  backdrop-filter: blur(5px);
`;

const CreatorName = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, #67e8f9, #c084fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ControlsTip = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background: rgba(15, 15, 30, 0.7);
  border: 1px solid rgba(103, 232, 249, 0.5);
  border-radius: 20px;
  padding: 0.5rem 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  backdrop-filter: blur(5px);
  text-align: center;
  animation: fadeOut 3s forwards;
  animation-delay: 5s;
  
  @keyframes fadeOut {
    to {
      opacity: 0;
      visibility: hidden;
    }
  }
`;

// Mock data - in a real app, this would come from an API
const MOCK_CREATOR = {
    id: '1',
    name: 'Creative Visionary',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80',
    bio: 'Digital creator specializing in immersive 3D content experiences. Join me on this journey through the digital universe as we explore new ways to connect through content.',
    subscribers: 5820,
    content: [
        { id: 1, title: 'Exclusive Tutorial', image: 'https://images.unsplash.com/photo-1618609255910-d9a7e0f1f20c?auto=format&fit=crop&w=1480&q=80', price: 9.99 },
        { id: 2, title: 'Premium Course', image: 'https://images.unsplash.com/photo-1624322464567-1acff8010e2e?auto=format&fit=crop&w=1480&q=80', price: 49.99 },
        { id: 3, title: 'Behind The Scenes', image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1480&q=80', price: 4.99 },
        { id: 4, title: 'Live Workshop', image: 'https://images.unsplash.com/photo-1633496695789-15280ce9c92e?auto=format&fit=crop&w=1480&q=80', price: 29.99 },
        { id: 5, title: 'Membership Content', image: 'https://images.unsplash.com/photo-1563484249558-30fa696eb4c8?auto=format&fit=crop&w=1480&q=80', price: 19.99 }
    ]
};

const ContentRoom = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [creator, setCreator] = useState(null);
    const [showTips, setShowTips] = useState(true);

    // In a real app, fetch creator data based on ID
    useEffect(() => {
        // Mock API call
        setTimeout(() => {
            setCreator(MOCK_CREATOR);
        }, 500);

        // Hide tips after 8 seconds
        const timer = setTimeout(() => {
            setShowTips(false);
        }, 8000);

        return () => clearTimeout(timer);
    }, [id]);

    const handleBack = () => {
        navigate(`/creator/${id}`);
    };

    if (!creator) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#0f0f1e',
                color: '#67e8f9'
            }}>
                Loading 3D Environment...
            </div>
        );
    }

    return (
        <RoomContainer>
            <BackButton onClick={handleBack}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8H4M4 8L8 4M4 8L8 12" stroke="#67E8F9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to Profile
            </BackButton>

            <InfoPanel>
                <CreatorName>{creator.name}'s Space</CreatorName>
                <p>Explore this interactive 3D content space. Click on content cards to preview or purchase exclusive content.</p>
            </InfoPanel>

            {showTips && (
                <ControlsTip>
                    Use mouse to rotate • Scroll to zoom • Click cards to interact
                </ControlsTip>
            )}

            <ContentRoomScene creator={creator} contentItems={creator.content} />
        </RoomContainer>
    );
};

export default ContentRoom; 