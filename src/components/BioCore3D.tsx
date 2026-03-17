import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Core() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            {/* Outer Wireframe shell */}
            <Sphere args={[1.6, 16, 16]} ref={meshRef}>
                <meshStandardMaterial color="#0de2f2" wireframe transparent opacity={0.15} />
            </Sphere>

            {/* Inner pulsating core */}
            <Sphere args={[1.1, 64, 64]}>
                <MeshDistortMaterial
                    color="#101922"
                    emissive="#0de2f2"
                    emissiveIntensity={0.5}
                    envMapIntensity={1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    metalness={0.8}
                    roughness={0.2}
                    distort={0.4}
                    speed={3}
                />
            </Sphere>

            {/* Energy particles around */}
            <mesh>
                <sphereGeometry args={[2.5, 32, 32]} />
                <pointsMaterial color="#f2a00d" size={0.05} />
            </mesh>
        </Float>
    );
}

export default function BioCore3D() {
    return (
        <div className="w-full h-full min-h-[160px] relative pointer-events-auto">
            <div className="absolute inset-0 bg-primary/10 blur-[50px] rounded-full pointer-events-none" />
            <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#0de2f2" />
                <directionalLight position={[-10, -10, -5]} intensity={1} color="#f2a00d" />
                <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" distance={5} />
                <Core />
            </Canvas>
        </div>
    );
}
