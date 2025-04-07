import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import ContentRoomScene from '../components/3D/ContentRoomScene';

const CreatorSpaceContainer = styled.div`
  width: 100%;
  padding-top: 5rem;
`;

const CreatorHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(90deg, rgba(103, 232, 249, 0.2), rgba(192, 132, 252, 0.2));
    z-index: -1;
  }
`;

const CreatorAvatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(103, 232, 249, 0.5);
  border: 3px solid #67e8f9;
  margin-bottom: 1.5rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CreatorName = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, #67e8f9, #c084fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CreatorBio = styled.p`
  color: rgba(255, 255, 255, 0.8);
  max-width: 700px;
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const SubscribeButton = styled(Link)`
  background: linear-gradient(90deg, #67e8f9, #c084fc);
  color: #0f0f1e;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
  box-shadow: 0 0 20px rgba(103, 232, 249, 0.3);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 25px rgba(103, 232, 249, 0.5);
  }
`;

const ContentSection = styled.section`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: #67e8f9;
  text-align: center;
`;

const TabNav = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(103, 232, 249, 0.2);
`;

const Tab = styled.button`
  background: transparent;
  color: ${props => props.active ? '#67e8f9' : 'rgba(255, 255, 255, 0.7)'};
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  cursor: pointer;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background: linear-gradient(90deg, #67e8f9, #c084fc);
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const Scene3DContainer = styled.div`
  height: 80vh;
  margin: 2rem 0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 30px rgba(103, 232, 249, 0.2);
`;

const EnterRoomButton = styled(Link)`
  display: block;
  background: linear-gradient(90deg, #67e8f9, #c084fc);
  color: #0f0f1e;
  padding: 1rem;
  border-radius: 10px;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
  max-width: 300px;
  margin: 2rem auto;
  box-shadow: 0 0 20px rgba(103, 232, 249, 0.3);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 25px rgba(103, 232, 249, 0.5);
  }
`;

// Mock data
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

const CreatorSpace = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('content');
    const [creator, setCreator] = useState(null);

    // In a real app, fetch creator data based on ID
    useEffect(() => {
        // Mock API call
        setTimeout(() => {
            setCreator(MOCK_CREATOR);
        }, 500);
    }, [id]);

    if (!creator) {
        return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
    }

    return (
        <CreatorSpaceContainer>
            <CreatorHeader>
                <CreatorAvatar>
                    <img src={creator.avatar} alt={creator.name} />
                </CreatorAvatar>
                <CreatorName>{creator.name}</CreatorName>
                <CreatorBio>{creator.bio}</CreatorBio>
                <SubscribeButton to={`/subscribe/${creator.id}`}>Subscribe</SubscribeButton>
            </CreatorHeader>

            <ContentSection>
                <TabNav>
                    <Tab
                        active={activeTab === 'content'}
                        onClick={() => setActiveTab('content')}
                    >
                        Content
                    </Tab>
                    <Tab
                        active={activeTab === '3d-room'}
                        onClick={() => setActiveTab('3d-room')}
                    >
                        3D Content Room
                    </Tab>
                </TabNav>

                {activeTab === 'content' ? (
                    <>
                        <SectionTitle>Premium Content</SectionTitle>
                        <EnterRoomButton to={`/room/${creator.id}`}>
                            Enter Interactive 3D Content Room
                        </EnterRoomButton>
                    </>
                ) : (
                    <>
                        <SectionTitle>Interactive 3D Content Room Preview</SectionTitle>
                        <Scene3DContainer>
                            <ContentRoomScene creator={creator} contentItems={creator.content} />
                        </Scene3DContainer>
                        <EnterRoomButton to={`/room/${creator.id}`}>
                            Enter Full 3D Experience
                        </EnterRoomButton>
                    </>
                )}
            </ContentSection>
        </CreatorSpaceContainer>
    );
};

export default CreatorSpace; 