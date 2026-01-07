"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrailPoint {
    id: number;
    x: number;
    y: number;
    rotation: number;
    side: number; // -1 for left, 1 for right
}

export default function PawCursor() {
    const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
    const [trail, setTrail] = useState<TrailPoint[]>([]);
    const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
    const [nextSide, setNextSide] = useState(1);
    const [isClicked, setIsClicked] = useState(false);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const { clientX: x, clientY: y } = e;
        setMousePos({ x, y });

        const dist = Math.hypot(x - lastPos.x, y - lastPos.y);

        if (dist > 35) {
            const angle = Math.atan2(y - lastPos.y, x - lastPos.x); // Keep in radians for offset
            const rotationAngle = (angle * 180 / Math.PI) + 90;

            // Calculate perpendicular offset for alternating steps
            const offsetDist = 12;
            const offsetX = Math.cos(angle + Math.PI / 2) * offsetDist * nextSide;
            const offsetY = Math.sin(angle + Math.PI / 2) * offsetDist * nextSide;

            const newPoint: TrailPoint = {
                id: Date.now() + Math.random(),
                x: x + offsetX,
                y: y + offsetY,
                rotation: rotationAngle,
                side: nextSide
            };

            setTrail((prev) => [...prev.slice(-25), newPoint]);
            setLastPos({ x, y });
            setNextSide(prev => -prev); // Switch side

            setTimeout(() => {
                setTrail((prev) => prev.filter((p) => p.id !== newPoint.id));
            }, 2000);
        }
    }, [lastPos, nextSide]);

    useEffect(() => {
        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            {/* Trail Footprints */}
            <AnimatePresence>
                {trail.map((point) => (
                    <motion.div
                        key={point.id}
                        initial={{ opacity: 0, scale: 0.3 }}
                        animate={{ opacity: 0.25, scale: 0.7 }}
                        exit={{ opacity: 0, scale: 0.2, filter: "blur(4px)", transition: { duration: 1.5 } }}
                        transition={{
                            duration: 0.5
                        }}
                        style={{
                            position: 'absolute',
                            left: point.x - 12,
                            top: point.y - 12,
                            rotate: point.rotation,
                        }}
                    >
                        <img src="/paw1.svg" alt="Paw Print" width="24" height="24" />
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Main Cursor Paw */}
            <motion.div
                animate={{
                    x: mousePos.x - 16,
                    y: mousePos.y - 16,
                    scale: isClicked ? 0.8 : 1,
                }}
                transition={{
                    type: "spring",
                    damping: 35,
                    stiffness: 300,
                    mass: 0.4
                }}
                className="absolute"
            >
                <motion.div
                    animate={{
                        scale: isClicked ? 1 : [1, 1.1, 1],
                        rotate: [0, 2, -2, 0]
                    }}
                    transition={{
                        duration: isClicked ? 0.1 : 3,
                        repeat: isClicked ? 0 : Infinity,
                        ease: "linear"
                    }}
                >
                    <img src="/paw1.svg" alt="Paw Cursor" width="32" height="32" />
                </motion.div>
            </motion.div>
        </div>
    );
}
