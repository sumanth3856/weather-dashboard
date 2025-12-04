/* eslint-disable react-hooks/purity */
import React, { useMemo, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Cloud, Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("WeatherScene 3D Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return null;
        }
        return this.props.children;
    }
}

const Sun = React.memo(({ isMobile }) => {
    const position = isMobile ? [0, 8, -20] : [15, 12, -20];
    return (
        <group position={position}>
            <mesh>
                <sphereGeometry args={[2.5, 32, 32]} />
                <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={2} />
            </mesh>
            {/* Sun Glow */}
            <mesh>
                <sphereGeometry args={[4, 32, 32]} />
                <meshBasicMaterial color="#fcd34d" transparent opacity={0.2} side={THREE.BackSide} />
            </mesh>
            <pointLight intensity={3} distance={100} decay={2} color="#fcd34d" />
        </group>
    );
});

const DaySky = React.memo(() => (
    <mesh position={[0, 0, -50]}>
        <planeGeometry args={[200, 100]} />
        <meshBasicMaterial color="#38bdf8" /> {/* Sky Blue */}
    </mesh>
));

const Moon = React.memo(({ isMobile }) => {
    const meshRef = useRef();
    const position = isMobile ? [5, 8, -20] : [20, 5, -20];

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
            meshRef.current.rotation.x += 0.001;
        }
    });

    return (
        <group position={position}>
            {/* Main Moon Body */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshStandardMaterial
                    color="#fcd34d"
                    emissive="#f59e0b"
                    emissiveIntensity={0.5}
                    roughness={0.8}
                />
            </mesh>
            <pointLight intensity={0.8} distance={100} decay={2} color="#fcd34d" />
        </group>
    );
});

const RealisticClouds = React.memo(({ isDay, isMobile }) => {
    // Generate random cloud configurations
    const clouds = useMemo(() => {
        const count = isMobile ? 3 : 6; // Fewer clouds on mobile
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp.push({
                x: (Math.random() - 0.5) * (isMobile ? 15 : 35), // Tighter spread on mobile
                y: (Math.random() - 0.5) * 10 + (isMobile ? 5 : 2), // Higher up on mobile
                z: -15 - Math.random() * 10, // Depth variation
                speed: 0.1 + Math.random() * 0.1, // Random slow speeds
                opacity: (isDay ? 0.6 : 0.5) + Math.random() * 0.2, // Random opacity
                width: 10 + Math.random() * 10, // Random width
            });
        }
        return temp;
    }, [isDay, isMobile]);

    return (
        <>
            {clouds.map((cloud, i) => (
                <Cloud
                    key={i}
                    opacity={cloud.opacity}
                    speed={cloud.speed}
                    width={cloud.width}
                    depth={1.5}
                    segments={10}
                    position={[cloud.x, cloud.y, cloud.z]}
                    color="white"
                />
            ))}
        </>
    );
});

const SceneContent = ({ weatherCondition, isDay }) => {
    const { viewport } = useThree();
    const isMobile = viewport.width < 10;

    // Memoize configurations to prevent re-renders
    const yellowStars = useMemo(() => (
        <Sparkles
            count={isMobile ? 50 : 150}
            scale={12}
            size={isMobile ? 4 : 6}
            speed={0.2}
            opacity={0.8}
            color="#fcd34d"
        />
    ), [isMobile]);

    const backgroundStars = useMemo(() => (
        <Stars
            radius={100}
            depth={50}
            count={500}
            factor={4}
            saturation={0}
            fade
            speed={0.5}
        />
    ), []);

    return (
        <>
            <ambientLight intensity={isDay ? 0.8 : 0.2} />
            <pointLight position={[10, 10, 10]} intensity={isDay ? 1.5 : 0.5} />

            {isDay ? (
                <>
                    <Sun isMobile={isMobile} />
                    <DaySky />
                </>
            ) : (
                <Moon isMobile={isMobile} />
            )}

            {/* Realistic Cloud System */}
            <RealisticClouds isDay={isDay} isMobile={isMobile} />

            {!isDay && (
                <>
                    {yellowStars}
                    {backgroundStars}
                </>
            )}
        </>
    );
};

const WeatherScene = ({ weatherCondition, isDay = true }) => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                <ErrorBoundary>
                    <SceneContent weatherCondition={weatherCondition} isDay={isDay} />
                </ErrorBoundary>
            </Canvas>
        </div>
    );
};

export default WeatherScene;
