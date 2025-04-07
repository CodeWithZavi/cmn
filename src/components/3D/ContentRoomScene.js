import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
    OrbitControls,
    Environment,
    PerspectiveCamera,
    RoundedBox,
    Text
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import ContentCard from './ContentCard';
import * as THREE from 'three';

// Room Component
const Room = ({ creator, contentItems }) => {
    const roomRef = useRef();

    // Rotate the room slowly
    useFrame(() => {
        if (roomRef.current) {
            roomRef.current.rotation.y += 0.001;
        }
    });

    // Position cards in a circular pattern
    const cardPositions = [];
    const cardCount = contentItems?.length || 5;
    const radius = 6;

    for (let i = 0; i < cardCount; i++) {
        const angle = (i / cardCount) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        cardPositions.push([x, 0, z]);
    }

    return (
        <group ref={roomRef}>
            {/* Room "floor" */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
                <circleGeometry args={[10, 64]} />
                <meshStandardMaterial
                    color="#1a1a2e"
                    metalness={0.8}
                    roughness={0.2}
                    emissive="#67e8f9"
                    emissiveIntensity={0.05}
                />
            </mesh>

            {/* Creator pedestal in center */}
            <group position={[0, -1, 0]}>
                <RoundedBox
                    args={[2, 1, 2]}
                    radius={0.2}
                    smoothness={4}
                    position={[0, 0, 0]}
                >
                    <meshStandardMaterial
                        color="#67e8f9"
                        metalness={0.9}
                        roughness={0.1}
                        emissive="#67e8f9"
                        emissiveIntensity={0.2}
                    />
                </RoundedBox>

                {/* Creator name */}
                <Text
                    position={[0, 1.3, 0]}
                    fontSize={0.5}
                    color="#ffffff"
                    maxWidth={10}
                    textAlign="center"
                >
                    {creator?.name || "Creator Name"}
                </Text>

                {/* Creator avatar placeholder */}
                <mesh position={[0, 2, 0]}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial
                        color="#ffffff"
                        metalness={0.1}
                        roughness={0.3}
                        emissive="#ffffff"
                        emissiveIntensity={0.1}
                    />
                </mesh>
            </group>

            {/* Content cards arranged in a circle */}
            {cardPositions.map((position, index) => (
                <ContentCard
                    key={index}
                    position={position}
                    rotation={[0, Math.atan2(position[0], position[2]) + Math.PI, 0]}
                    title={contentItems?.[index]?.title || `Content ${index + 1}`}
                    image={contentItems?.[index]?.image}
                    price={contentItems?.[index]?.price}
                    onClick={() => console.log('Clicked content card', index)}
                />
            ))}

            {/* Ambient light */}
            <ambientLight intensity={0.5} />

            {/* Spotlight from above */}
            <spotLight
                position={[0, 10, 0]}
                angle={0.3}
                penumbra={0.8}
                intensity={2}
                color="#ffffff"
                castShadow
            />

            {/* Rim light */}
            <pointLight position={[-10, 0, -10]} intensity={1} color="#67e8f9" />
            <pointLight position={[10, 0, 10]} intensity={1} color="#c084fc" />
        </group>
    );
};

// Main 3D content room component
const ContentRoomScene = ({ creator, contentItems }) => {
    return (
        <Canvas style={{ height: '100vh', background: '#0f0f1e' }}>
            <Suspense fallback={null}>
                <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={50} near={0.1} far={100} />
                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI / 2}
                    minDistance={5}
                    maxDistance={15}
                />
                <Room creator={creator} contentItems={contentItems} />
                <Environment preset="night" />

                {/* Post processing effects */}
                <EffectComposer>
                    <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={0.8} />
                    <Vignette darkness={0.5} offset={0.1} />
                </EffectComposer>
            </Suspense>
        </Canvas>
    );
};

export default ContentRoomScene;