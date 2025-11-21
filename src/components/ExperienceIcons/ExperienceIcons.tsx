"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./ExperienceIcons.module.css";
import * as Icons from "simple-icons";

// TypeScript Interfaces
interface IconState {
    x: number;
    y: number;
    vx: number;
    vy: number;
    originalX: number;
    originalY: number;
}

export default function ExperienceIcons() {
    // Configuration State Variables
    const [minVelocity, setMinVelocity] = useState<number>(0.3);
    const [maxVelocity, setMaxVelocity] = useState<number>(1.5);
    const [directionChangeRate, setDirectionChangeRate] = useState<number>(0.002);
    const [directionChangeAmount, setDirectionChangeAmount] = useState<number>(0.1);
    const [returnSpeed, setReturnSpeed] = useState<number>(0.15);
    const [animationEnabled, setAnimationEnabled] = useState<boolean>(true);
    const [configPanelOpen, setConfigPanelOpen] = useState<boolean>(false);

    // State Management
    const [iconStates, setIconStates] = useState<IconState[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number | null>(null);
    const iconRefsArray = useRef<(HTMLDivElement | null)[]>([]);

    const experience = [
        Icons.siTypescript,
        Icons.siJavascript,
        Icons.siReact,
        Icons.siVuedotjs,
        Icons.siNodedotjs,
        Icons.siDocker,
        Icons.siGithub,
        Icons.siGitlab,
        Icons.siDotnet,
        Icons.siGithubactions,
        Icons.siPython,
        Icons.siRuff,
        Icons.siUv,
        Icons.siJekyll,
        Icons.siGithubcopilot,
        Icons.siJenkins,
        Icons.siJinja,
        Icons.siUbuntu,
        Icons.siDebian,
        Icons.siLinux,
        Icons.siNextdotjs
        // don't exist yet, TODO: create custom icons
        // Icons.siAzurepipelines,
        // Icons.siMkdocs,
        // Icons.siCsharp,
        // Icons.siAzuredevops,
        // Icons.siVisualstudiocode,
        // Icons.siVisualstudio,
        // Icons.siMcp,
        // Icons.siCodex
    ];

    // Initialization Effect
    useEffect(() => {
        const initializePositions = () => {
            if (!containerRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const padding = containerRect.width * 0.03;
            const containerWidth = containerRect.width - (padding * 2);

            const cols = 7;
            const gap = containerWidth * 0.02;
            const cellWidth = (containerWidth - gap * (cols - 1)) / cols;
            const cellHeight = cellWidth; // Keep square cells

            // Calculate the actual grid height based on number of rows
            const rows = Math.ceil(experience.length / cols);
            const gridHeight = rows * cellHeight + (rows - 1) * gap;

            const initialStates: IconState[] = experience.map((_, index) => {
                const row = Math.floor(index / cols);
                const col = index % cols;

                const originalX = col * (cellWidth + gap) + cellWidth / 2 + padding;
                const originalY = row * (cellHeight + gap) + cellHeight / 2 + padding;

                // Generate random velocity
                const speed = minVelocity + Math.random() * (maxVelocity - minVelocity);
                const angle = Math.random() * Math.PI * 2;
                const vx = Math.cos(angle) * speed;
                const vy = Math.sin(angle) * speed;

                return {
                    x: originalX,
                    y: originalY,
                    vx,
                    vy,
                    originalX,
                    originalY,
                };
            });

            setIconStates(initialStates);
            setIsAnimating(animationEnabled);
        };

        initializePositions();

        const handleResize = () => {
            initializePositions();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [minVelocity, maxVelocity, animationEnabled]);

    // Animation Loop
    useEffect(() => {
        const animate = () => {
            if (!isAnimating || !animationEnabled) return;

            setIconStates((prevStates) => {
                if (!containerRef.current) return prevStates;

                const containerRect = containerRef.current.getBoundingClientRect();
                const padding = containerRect.width * 0.03;
                const containerWidth = containerRect.width - (padding * 2);

                // Calculate the actual grid height based on number of rows
                const cols = 7;
                const gap = containerWidth * 0.02;
                const cellWidth = (containerWidth - gap * (cols - 1)) / cols;
                const cellHeight = cellWidth;
                const rows = Math.ceil(experience.length / cols);
                const containerHeight = rows * cellHeight + (rows - 1) * gap;

                return prevStates.map((state, index) => {
                    const iconRef = iconRefsArray.current[index];
                    const iconWidth = iconRef ? iconRef.offsetWidth : 32;
                    const iconHeight = iconRef ? iconRef.offsetHeight : 32;

                    if (hoveredIndex !== null) {
                        if (index === hoveredIndex) {
                            return state;
                        } else {
                            // Lerp back to original position
                            const newX = state.x + (state.originalX - state.x) * returnSpeed;
                            const newY = state.y + (state.originalY - state.y) * returnSpeed;
                            return { ...state, x: newX, y: newY };
                        }
                    } else {
                        // Normal floating mode
                        let newX = state.x + state.vx;
                        let newY = state.y + state.vy;
                        let newVx = state.vx;
                        let newVy = state.vy;

                        // Boundary collision detection
                        const minX = padding + iconWidth / 2;
                        const maxX = padding + containerWidth - iconWidth / 2;
                        const minY = padding + iconHeight / 2;
                        const maxY = padding + containerHeight - iconHeight / 2;

                        if (newX <= minX || newX >= maxX) {
                            newVx = -newVx;
                            newX = state.x + newVx;
                        }
                        if (newY <= minY || newY >= maxY) {
                            newVy = -newVy;
                            newY = state.y + newVy;
                        }

                        // Random direction change
                        if (Math.random() < directionChangeRate) {
                            const currentAngle = Math.atan2(newVy, newVx);
                            const angleChange = (Math.random() - 0.5) * 2 * directionChangeAmount;
                            const newAngle = currentAngle + angleChange;
                            const speed = Math.sqrt(newVx * newVx + newVy * newVy);
                            newVx = Math.cos(newAngle) * speed;
                            newVy = Math.sin(newAngle) * speed;
                        }

                        return { ...state, x: newX, y: newY, vx: newVx, vy: newVy };
                    }
                });
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isAnimating, hoveredIndex, animationEnabled, returnSpeed, directionChangeRate, directionChangeAmount]);

    // Hover Handlers
    const handleMouseEnter = (index: number) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <div ref={containerRef} className="bg-light p-[3%] rounded-3xl shadow-lg" style={{ position: 'relative' }}>
            {/* Settings Button */}
            {/* <button
                className={`${styles.settingsButton} absolute top-4 right-4 z-10 cursor-pointer text-heading hover:text-primary transition-colors`}
                onClick={() => setConfigPanelOpen(!configPanelOpen)}
                aria-label="Toggle configuration panel"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                    <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.488.488 0 0 0 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65z"/>
                </svg>
            </button> */}

            {/* Configuration Panel */}
            {configPanelOpen && (
                <div className={`${styles.configPanel} absolute top-14 right-4 z-10 bg-light p-4 rounded-xl shadow-lg border border-gray-700 w-72 transition-all duration-300`}>
                    {/* Animation Enable/Disable Toggle */}
                    <div className="mb-4">
                        <label className="text-sm text-heading font-medium mb-1 flex justify-between items-center">
                            <span>Animation Enabled</span>
                            <input
                                type="checkbox"
                                checked={animationEnabled}
                                onChange={(e) => {
                                    setAnimationEnabled(e.target.checked);
                                    setIsAnimating(e.target.checked);
                                }}
                                className="ml-2"
                                aria-label="Enable or disable animation"
                            />
                        </label>
                    </div>

                    {/* Min Velocity Slider */}
                    <div className="mb-4">
                        <label className="text-sm text-heading font-medium mb-1 flex justify-between">
                            <span>Min Velocity</span>
                            <span className="text-primary text-xs">{minVelocity.toFixed(1)}</span>
                        </label>
                        <input
                            type="range"
                            min="0.1"
                            max="2"
                            step="0.1"
                            value={minVelocity}
                            onChange={(e) => {
                                const val = parseFloat(e.target.value);
                                setMinVelocity(val);
                                if (val > maxVelocity) setMaxVelocity(val);
                            }}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                            aria-label="Minimum velocity"
                        />
                    </div>

                    {/* Max Velocity Slider */}
                    <div className="mb-4">
                        <label className="text-sm text-heading font-medium mb-1 flex justify-between">
                            <span>Max Velocity</span>
                            <span className="text-primary text-xs">{maxVelocity.toFixed(1)}</span>
                        </label>
                        <input
                            type="range"
                            min="0.5"
                            max="5"
                            step="0.1"
                            value={maxVelocity}
                            onChange={(e) => {
                                const val = parseFloat(e.target.value);
                                if (val >= minVelocity) {
                                    setMaxVelocity(val);
                                }
                            }}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                            aria-label="Maximum velocity"
                        />
                    </div>

                    {/* Direction Change Rate Slider */}
                    <div className="mb-4">
                        <label className="text-sm text-heading font-medium mb-1 flex justify-between">
                            <span>Direction Change Rate</span>
                            <span className="text-primary text-xs">{directionChangeRate.toFixed(3)}</span>
                        </label>
                        <input
                            type="range"
                            min="0.001"
                            max="0.01"
                            step="0.001"
                            value={directionChangeRate}
                            onChange={(e) => setDirectionChangeRate(parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                            aria-label="Direction change rate"
                        />
                    </div>

                    {/* Direction Change Amount Slider */}
                    <div className="mb-4">
                        <label className="text-sm text-heading font-medium mb-1 flex justify-between">
                            <span>Direction Change Amount</span>
                            <span className="text-primary text-xs">{directionChangeAmount.toFixed(2)}</span>
                        </label>
                        <input
                            type="range"
                            min="0.05"
                            max="0.5"
                            step="0.05"
                            value={directionChangeAmount}
                            onChange={(e) => setDirectionChangeAmount(parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                            aria-label="Direction change amount"
                        />
                    </div>

                    {/* Return Speed Slider */}
                    <div className="mb-4">
                        <label className="text-sm text-heading font-medium mb-1 flex justify-between">
                            <span>Return Speed</span>
                            <span className="text-primary text-xs">{returnSpeed.toFixed(2)}</span>
                        </label>
                        <input
                            type="range"
                            min="0.05"
                            max="0.5"
                            step="0.05"
                            value={returnSpeed}
                            onChange={(e) => setReturnSpeed(parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                            aria-label="Return speed when hovering"
                        />
                    </div>
                </div>
            )}

            <div style={{ position: 'relative' }}>
                {iconStates.length > 0 && experience.map((item, i) => (
                    <div
                        key={i}
                        ref={(el) => { iconRefsArray.current[i] = el; }}
                        className={styles.icon}
                        style={{
                            position: 'absolute',
                            left: `${iconStates[i]?.x ?? 0}px`,
                            top: `${iconStates[i]?.y ?? 0}px`,
                            transform: 'translate(-50%, -50%)',
                            ['--color' as any]: "#" + item.hex,
                        }}
                        onMouseEnter={() => handleMouseEnter(i)}
                        onMouseLeave={handleMouseLeave}
                        dangerouslySetInnerHTML={{ __html: item.svg }}
                    />
                ))}
            </div>
        </div>
    );
}
