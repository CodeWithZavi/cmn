import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const ContentCard = ({ position, rotation, title, image, onClick, price }) => {
    const meshRef = useRef();
    const hovered = useRef(false);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(image || '/placeholder.jpg');

    // Animate on hover and rotate slightly
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = THREE.MathUtils.lerp(
                meshRef.current.rotation.y,
                hovered.current ? rotation[1] + 0.2 : rotation[1],
                0.1
            );

            meshRef.current.position.y = THREE.MathUtils.lerp(
                meshRef.current.position.y,
                hovered.current ? position[1] + 0.1 : position[1],
                0.1
            );
        }
    });

    return (
        <group
            position={position}
            rotation={rotation}
            onClick={onClick}
            onPointerOver={() => (hovered.current = true)}
            onPointerOut={() => (hovered.current = false)}
        >
            <RoundedBox
                ref={meshRef}
                args={[2, 3, 0.1]}
                radius={0.1}
                smoothness={4}
            >
                <meshStandardMaterial
                    map={texture}
                    metalness={0.4}
                    roughness={0.2}
                    envMapIntensity={1}
                    emissive="#ffffff"
                    emissiveIntensity={0.05}
                />
            </RoundedBox>

            {/* Title at the bottom of the card */}
            <Text
                position={[0, -1.6, 0.06]}
                fontSize={0.2}
                color="#ffffff"
                maxWidth={1.8}
                textAlign="center"
            >
                {title || "Content Title"}
            </Text>

            {/* Price tag */}
            {price && (
                <RoundedBox
                    position={[0.8, 1.3, 0.06]}
                    args={[0.6, 0.3, 0.05]}
                    radius={0.05}
                    smoothness={4}
                >
                    <meshStandardMaterial color="#67e8f9" />
                    <Text
                        position={[0, 0, 0.03]}
                        fontSize={0.15}
                        color="#0f0f1e"
                    >
                        ${price}
                    </Text>
                </RoundedBox>
            )}

            {/* Glow effect */}
            <mesh position={[0, 0, -0.05]}>
                <planeGeometry args={[2.2, 3.2]} />
                <meshBasicMaterial
                    color="#67e8f9"
                    transparent={true}
                    opacity={0.1}
                />
            </mesh>
        </group>
    );
};

export default ContentCard; 