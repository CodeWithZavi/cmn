import React, { useEffect, useState, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, RoundedBox, Float, Environment, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const SubscriptionContainer = styled.div`
  width: 100%;
  padding-top: 5rem;
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #67e8f9, #c084fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const PlansContainer = styled.div`
  height: 70vh;
  margin: 0 auto;
  max-width: 1200px;
`;

const BackButton = styled.button`
  background: transparent;
  border: 1px solid rgba(103, 232, 249, 0.5);
  color: #67e8f9;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  margin-bottom: 2rem;
  
  &:hover {
    background: rgba(15, 15, 30, 0.3);
    box-shadow: 0 0 15px rgba(103, 232, 249, 0.3);
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

// 3D Subscription Plan Component
const SubscriptionPlan = ({ position, tier, price, features, onClick, hovered, setHovered }) => {
    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <group
                position={position}
                rotation={[0, 0, 0]}
                onClick={onClick}
                onPointerOver={() => setHovered(tier)}
                onPointerOut={() => setHovered(null)}
            >
                <RoundedBox
                    args={[3, 4, 0.2]}
                    radius={0.1}
                    smoothness={4}
                    position={[0, 0, 0]}
                >
                    <meshStandardMaterial
                        color={hovered === tier ? "#67e8f9" : "#1a1a2e"}
                        metalness={0.8}
                        roughness={0.2}
                        emissive={hovered === tier ? "#67e8f9" : "#1a1a2e"}
                        emissiveIntensity={0.2}
                    />
                </RoundedBox>

                {/* Tier Name */}
                <Text
                    position={[0, 1.5, 0.11]}
                    fontSize={0.3}
                    color="#ffffff"
                    maxWidth={2.5}
                    textAlign="center"
                >
                    {tier}
                </Text>

                {/* Price */}
                <Text
                    position={[0, 0.8, 0.11]}
                    fontSize={0.5}
                    color="#67e8f9"
                >
                    ${price}
                </Text>

                {/* "per month" */}
                <Text
                    position={[0, 0.4, 0.11]}
                    fontSize={0.2}
                    color="#999999"
                >
                    per month
                </Text>

                {/* Features */}
                <group position={[0, -0.5, 0.11]}>
                    {features.map((feature, index) => (
                        <Text
                            key={index}
                            position={[0, -index * 0.4, 0]}
                            fontSize={0.15}
                            color="#ffffff"
                            maxWidth={2.5}
                            textAlign="center"
                        >
                            {feature}
                        </Text>
                    ))}
                </group>

                {/* Subscribe Button */}
                <RoundedBox
                    args={[2, 0.5, 0.1]}
                    radius={0.1}
                    smoothness={4}
                    position={[0, -1.5, 0.15]}
                >
                    <meshStandardMaterial
                        color="#67e8f9"
                        metalness={0.5}
                        roughness={0.3}
                    />
                </RoundedBox>

                <Text
                    position={[0, -1.5, 0.21]}
                    fontSize={0.2}
                    color="#0f0f1e"
                >
                    Subscribe
                </Text>
            </group>
        </Float>
    );
};

// 3D Scene Component
const SubscriptionPlans3D = ({ plans, onSubscribe }) => {
    const [hoveredTier, setHoveredTier] = useState(null);

    // Position plans in 3D space
    const positions = [];
    const plansCount = plans.length;

    for (let i = 0; i < plansCount; i++) {
        const xPos = (i - (plansCount - 1) / 2) * 4; // Spread them horizontally
        positions.push([xPos, 0, 0]);
    }

    return (
        <Canvas>
            <Suspense fallback={null}>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 2.5}
                    rotateSpeed={0.5}
                />

                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                {plans.map((plan, index) => (
                    <SubscriptionPlan
                        key={plan.tier}
                        position={positions[index]}
                        tier={plan.tier}
                        price={plan.price}
                        features={plan.features}
                        onClick={() => onSubscribe(plan)}
                        hovered={hoveredTier}
                        setHovered={setHoveredTier}
                    />
                ))}

                <Environment preset="night" />
                <EffectComposer>
                    <Bloom luminanceThreshold={0.2} intensity={0.7} />
                </EffectComposer>
            </Suspense>
        </Canvas>
    );
};

// Mock data - in a real app, this would come from an API
const MOCK_CREATOR = {
    id: '1',
    name: 'Creative Visionary',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80',
};

const Subscription = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [creator, setCreator] = useState(null);

    // Subscription plans data
    const subscriptionPlans = [
        {
            tier: 'Basic',
            price: 9.99,
            features: [
                'Access to basic content',
                'Early preview access',
                'Monthly Q&A sessions'
            ]
        },
        {
            tier: 'Premium',
            price: 19.99,
            features: [
                'All Basic features',
                'Access to premium content',
                'Weekly private streams',
                'Exclusive 3D content rooms'
            ]
        },
        {
            tier: 'VIP',
            price: 49.99,
            features: [
                'All Premium features',
                'One-on-one mentoring',
                'Private 3D content space',
                'Custom creator NFTs',
                'Lifetime access to archives'
            ]
        }
    ];

    // In a real app, fetch creator data based on ID
    useEffect(() => {
        // Mock API call
        setTimeout(() => {
            setCreator(MOCK_CREATOR);
        }, 500);
    }, [id]);

    const handleBack = () => {
        navigate(`/creator/${id}`);
    };

    const handleSubscribe = (plan) => {
        // In a real app, this would handle subscription process
        alert(`Subscribing to ${plan.tier} plan for $${plan.price}/month`);
    };

    if (!creator) {
        return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
    }

    return (
        <SubscriptionContainer>
            <Header>
                <BackButton onClick={handleBack}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 8H4M4 8L8 4M4 8L8 12" stroke="#67E8F9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back to Profile
                </BackButton>
                <Title>Choose Your Subscription Plan</Title>
                <Subtitle>
                    Subscribe to {creator.name}'s content and get access to exclusive 3D interactive content, premium videos, and more.
                </Subtitle>
            </Header>

            <PlansContainer>
                <SubscriptionPlans3D plans={subscriptionPlans} onSubscribe={handleSubscribe} />
            </PlansContainer>
        </SubscriptionContainer>
    );
};

export default Subscription; 