'use client';

import React, { useState, useEffect } from 'react';
import { calculateExperience } from '../../utils/experience';
import styles from './DoorEntrance.module.css';

interface DoorEntranceProps {
  onDoorsOpened?: () => void;
}

export default function DoorEntrance({ onDoorsOpened }: DoorEntranceProps) {
  const experience = calculateExperience('2021-04-26');
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(true);

  // Listen for custom trigger to replay entrance animation
  useEffect(() => {
    const handleReplay = () => {
      setIsRendered(true);
      setIsOpen(false);
    };

    window.addEventListener('replay-doors', handleReplay);
    return () => window.removeEventListener('replay-doors', handleReplay);
  }, []);

  const handleOpenDoors = () => {
    if (isOpen) return;
    setIsOpen(true);

    if (onDoorsOpened) {
      setTimeout(onDoorsOpened, 600);
    }

    // Hide component from DOM after animation completes
    setTimeout(() => {
      setIsRendered(false);
    }, 1400);
  };

  if (!isRendered) return null;

  return (
    <div 
      className={`${styles.entranceContainer} ${isOpen ? styles.doorsOpen : ''}`}
      onClick={handleOpenDoors}
      aria-label="Click to open entrance doors"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleOpenDoors();
        }
      }}
    >
      {/* 3D Perspective Stage */}
      <div className={styles.stage}>
        {/* Left Double Door */}
        <div className={`${styles.door} ${styles.leftDoor}`}>
          <div className={styles.doorSurface}>
            {/* Top Inset Panel */}
            <div className={styles.doorPanel}>
              <div className={styles.panelSketchLine} />
            </div>
            
            {/* Bottom Inset Panel */}
            <div className={styles.doorPanel}>
              <div className={styles.panelSketchLine} />
            </div>

            {/* Brass / Ink Door Knob & Plate */}
            <div className={styles.knobWrapperRight}>
              <div className={styles.doorKnobPlate}>
                <div className={styles.doorKnob} />
                <div className={styles.keyhole} />
              </div>
            </div>

            {/* Hand-drawn wood/paper grain lines */}
            <div className={styles.sketchWoodGrain} />
          </div>
          <div className={styles.doorHingeTop} />
          <div className={styles.doorHingeBottom} />
        </div>

        {/* Right Double Door */}
        <div className={`${styles.door} ${styles.rightDoor}`}>
          <div className={styles.doorSurface}>
            {/* Top Inset Panel */}
            <div className={styles.doorPanel}>
              <div className={styles.panelSketchLine} />
            </div>
            
            {/* Bottom Inset Panel */}
            <div className={styles.doorPanel}>
              <div className={styles.panelSketchLine} />
            </div>

            {/* Brass / Ink Door Knob & Plate */}
            <div className={styles.knobWrapperLeft}>
              <div className={styles.doorKnobPlate}>
                <div className={styles.doorKnob} />
                <div className={styles.keyhole} />
              </div>
            </div>

            {/* Hand-drawn wood/paper grain lines */}
            <div className={styles.sketchWoodGrain} />
          </div>
          <div className={styles.doorHingeTop} />
          <div className={styles.doorHingeBottom} />
        </div>

        {/* Center Glass Plaque Bridging the Doors */}
        <div className={`${styles.entrancePlaque} ${isOpen ? styles.plaqueFade : ''}`}>
          <div className={styles.plaqueGlowBorder} />
          
          <div className={styles.plaqueContent}>
            <div className={styles.plaqueEyebrow}>
              <span className={styles.sparkleIcon}>✦</span>
              <span>EXCLUSIVE PORTFOLIO EXHIBITION</span>
              <span className={styles.sparkleIcon}>✦</span>
            </div>

            <h1 className={styles.plaqueTitle}>
              <span className={styles.titleGradient}>Pavan Sai Vejju</span>
            </h1>

            <p className={styles.plaqueRole}>
              Senior Frontend Engineer • React &amp; Next.js Ecosystems
            </p>

            <div className={styles.expStamp}>
              ⭐ <strong>{experience.formatted} Production Mastery</strong>
            </div>

            {/* Pulsing Luminous Prompt Button */}
            <div className={styles.promptButton}>
              <span className={styles.doorIcon}>🚪</span>
              <span className={styles.promptText}>CLICK TO OPEN DOORS &amp; ENTER</span>
              <span className={styles.bounceArrow}>➔</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
