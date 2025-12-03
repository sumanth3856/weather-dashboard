/* eslint-disable react-hooks/purity */
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Cloud, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const Rain = ({ count = 1000 }) => {
    const mesh = useRef();

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            temp.push({ t, speed, xFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    useFrame(() => {
        particles.forEach((particle, i) => {
            let { t, speed, xFactor, zFactor } = particle;
            t = particle.t += speed / 2;
            const s = Math.cos(t);

            // Rain motion: falling down
            particle.my -= speed * 10;
            if (particle.my < -50) particle.my = 50;

            dummy.position.set(
                xFactor,
                particle.my,
                zFactor
            );
            dummy.scale.set(0.1, 2, 0.1); // Elongated drops
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <boxGeometry args={[0.2, 1, 0.2]} />
            <meshBasicMaterial color="#a5b4fc" transparent opacity={0.6} />
        </instancedMesh>
    );
};

const Sun = () => {
    return (
        <mesh position={[15, 12, -20]}>
            <sphereGeometry args={[2, 32, 32]} />
            <meshStandardMaterial color="#fcd34d" emissive="#f59e0b" emissiveIntensity={2} />
            <pointLight intensity={2} distance={100} decay={2} color="#fcd34d" />
        </mesh>
    );
};

const Moon = () => {
    return (
        <mesh position={[20, 5, -20]}>
            <sphereGeometry args={[1.5, 32, 32]} />
            <meshStandardMaterial color="#e2e8f0" emissive="#cbd5e1" emissiveIntensity={0.5} />
            <pointLight intensity={0.5} distance={100} decay={2} color="#f8fafc" />
        </mesh>
    );
};

const SceneContent = ({ weatherCondition, isDay }) => {
    const condition = weatherCondition?.toLowerCase() || 'clear';
    const isRaining = condition.includes('rain') || condition.includes('drizzle');
    const isCloudy = condition.includes('cloud');

    // Common elements
    const stars = <Stars radius={100} depth={50} count={isDay ? 1000 : 5000} factor={4} saturation={0} fade speed={1} />;

    if (isRaining) {
        return (
            <>
                <ambientLight intensity={isDay ? 0.3 : 0.1} />
                <pointLight position={[10, 10, 10]} intensity={isDay ? 0.5 : 0.2} />
                <Cloud opacity={0.8} speed={0.4} width={10} depth={1.5} segments={20} position={[0, 5, -10]} color={isDay ? "#64748b" : "#1e293b"} />
                <Rain count={2000} />
                {!isDay && stars}
            </>
        );
    }

    if (isCloudy) {
        return (
            <>
                <ambientLight intensity={isDay ? 0.6 : 0.2} />
                <pointLight position={[10, 10, 10]} intensity={isDay ? 1 : 0.3} />
                <Cloud opacity={0.7} speed={0.2} width={20} depth={2} segments={30} position={[0, 0, -15]} color={isDay ? "white" : "#475569"} />
                {stars}
            </>
        );
    }

    // Clear / Sunny / Clear Night
    return (
        <>
            <ambientLight intensity={isDay ? 0.8 : 0.2} />
            <pointLight position={[10, 10, 10]} intensity={isDay ? 1.5 : 0.5} />
            {isDay ? <Sun /> : <Moon />}
            <Cloud opacity={isDay ? 0.3 : 0.1} speed={0.1} width={10} depth={1.5} segments={10} position={[-10, 0, -20]} color={isDay ? "white" : "#334155"} />
            {isDay && <Sparkles count={100} scale={12} size={4} speed={0.4} opacity={0.5} color="#fcd34d" />}
            {stars}
        </>
    );
};

const WeatherScene = ({ weatherCondition, isDay = true }) => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                <SceneContent weatherCondition={weatherCondition} isDay={isDay} />
            </Canvas>
        </div>
    );
};

export default WeatherScene;
