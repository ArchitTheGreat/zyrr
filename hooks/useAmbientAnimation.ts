"use client";

import { useEffect, useRef, useState } from "react";

interface UseAmbientAnimationProps {
  enabled?: boolean;
  intensity?: number;
  speed?: number;
}

export function useAmbientAnimation({ 
  enabled = true, 
  intensity = 1, 
  speed = 1 
}: UseAmbientAnimationProps = {}) {
  const [animationValues, setAnimationValues] = useState({
    float: 0,
    pulse: 0,
    drift: 0
  });
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      // Float animation (subtle up/down movement)
      const float = Math.sin(currentTime * 0.001 * speed) * intensity * 0.5;

      // Pulse animation (subtle scaling)
      const pulse = Math.sin(currentTime * 0.002 * speed) * intensity * 0.02;

      // Drift animation (side-to-side movement)
      const drift = Math.cos(currentTime * 0.0005 * speed) * intensity * 0.3;

      setAnimationValues({ float, pulse, drift });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [enabled, intensity, speed]);

  return animationValues;
}

interface UseParticleAnimationProps {
  count?: number;
  enabled?: boolean;
  speed?: number;
}

export function useParticleAnimation({ 
  count = 20, 
  enabled = true, 
  speed = 1 
}: UseParticleAnimationProps = {}) {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    speed: number;
    direction: number;
  }>>([]);

  useEffect(() => {
    if (!enabled) return;

    const initialParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.5 + 0.1,
      direction: Math.random() * Math.PI * 2
    }));

    setParticles(initialParticles);
  }, [count, enabled]);

  useEffect(() => {
    if (!enabled || particles.length === 0) return;

    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => ({
          ...particle,
          x: (particle.x + Math.cos(particle.direction) * particle.speed * speed + 100) % 100,
          y: (particle.y + Math.sin(particle.direction) * particle.speed * speed + 100) % 100,
          opacity: particle.opacity + (Math.random() - 0.5) * 0.01
        }))
      );
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, [particles.length, enabled, speed]);

  return particles;
}