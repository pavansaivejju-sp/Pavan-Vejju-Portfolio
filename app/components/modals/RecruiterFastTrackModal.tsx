'use client';

import React, { useState } from 'react';
import personalData from '../../data/personal.json';
import styles from './RecruiterFastTrackModal.module.css';

interface RecruiterFastTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChatbot?: () => void;
  onOpenResume?: () => void;
}

export default function RecruiterFastTrackModal({
  isOpen,
  onClose,
  onOpenChatbot,
  onOpenResume,
}: RecruiterFastTrackModalProps) {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  const candidatePitch = `Pavan Sai Vejju is a Senior Front-End Specialist & React Architect with 5.5+ years of enterprise experience building mission-critical platforms for Electronic Arts (EA Sports FC26), Amphora Software (Symphony ETRM), and UGL Rail Transport (Real-time Train Telemetry CMS). Core expertise includes React 19/18, Next.js, TypeScript, Micro-Frontends, SignalR WebSockets, Highcharts/Recharts, TanStack Form, Redux-Saga, and Stryker Mutation Testing (85%+ score). Available immediately / 30 days for Senior/Lead roles.`;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>EXECUTIVE RECRUITER FAST-TRACK</span>
            <h3 className={styles.title}>Candidate Screening Snapshot</h3>
            <p className={styles.subtitle}>
              Key facts, production credibility, and contact details for technical recruiters and hiring managers.
            </p>
          </div>
          <button className={styles.closeBtn} onClick={onClose} type="button" aria-label="Close modal">
            &times;
          </button>
        </div>

        {/* Content Body */}
        <div className={styles.body}>
          {/* Quick Pitch for Hiring Manager */}
          <div className={styles.pitchCard}>
            <div className={styles.pitchHeader}>
              <span className={styles.pitchLabel}>HIRING MANAGER 30-SECOND PITCH</span>
              <button
                type="button"
                className={styles.copyBtn}
                onClick={() => handleCopy(candidatePitch, 'pitch')}
              >
                {copiedType === 'pitch' ? '✓ Copied Pitch' : '📋 Copy Pitch for Hiring Manager'}
              </button>
            </div>
            <p className={styles.pitchText}>{candidatePitch}</p>
          </div>

          {/* Screening Matrix Grid */}
          <div className={styles.grid}>
            <div className={styles.gridItem}>
              <span className={styles.itemLabel}>CANDIDATE NAME</span>
              <span className={styles.itemValue}>{personalData.name}</span>
            </div>

            <div className={styles.gridItem}>
              <span className={styles.itemLabel}>TARGET ROLES</span>
              <span className={styles.itemValue}>Senior Front-End Developer / Lead React Engineer / UI Architect</span>
            </div>

            <div className={styles.gridItem}>
              <span className={styles.itemLabel}>PRODUCTION EXPERIENCE</span>
              <span className={styles.itemValueHighlight}>5.5+ Years (Enterprise Systems)</span>
            </div>

            <div className={styles.gridItem}>
              <span className={styles.itemLabel}>AVAILABILITY / NOTICE PERIOD</span>
              <span className={styles.itemValueAvailable}>
                <span className={styles.pulseDot} /> Immediate to 30 Days
              </span>
            </div>

            <div className={styles.gridItem}>
              <span className={styles.itemLabel}>CURRENT LOCATION &amp; PREFERENCE</span>
              <span className={styles.itemValue}>Bangalore / Hyderabad • Open to Remote (US/UK/APAC hours) or Relocation</span>
            </div>

            <div className={styles.gridItem}>
              <span className={styles.itemLabel}>PROVEN ENTERPRISE CLIENTS</span>
              <span className={styles.itemValue}>Electronic Arts (EA), Amphora Software, UGL &amp; Pacific National</span>
            </div>
          </div>

          {/* Core Technical Highlights */}
          <div className={styles.techSection}>
            <span className={styles.techSectionLabel}>CORE ARCHITECTURAL COMPETENCIES</span>
            <div className={styles.techPills}>
              <span className={styles.techPill}>React 19 / 18</span>
              <span className={styles.techPill}>Next.js 16/15 (App Router)</span>
              <span className={styles.techPill}>TypeScript Strict Mode</span>
              <span className={styles.techPill}>Micro-Frontends &amp; Module Federation</span>
              <span className={styles.techPill}>Microsoft SignalR WebSockets</span>
              <span className={styles.techPill}>Highcharts &amp; Recharts</span>
              <span className={styles.techPill}>TanStack Form &amp; React Hook Form</span>
              <span className={styles.techPill}>Redux-Saga</span>
              <span className={styles.techPill}>Jest &amp; React Testing Library</span>
              <span className={styles.techPill}>Stryker Mutation Testing (85%+ Score)</span>
              <span className={styles.techPill}>Azure DevOps CI/CD</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className={styles.footer}>
          <div className={styles.contactActions}>
            <button
              type="button"
              className={styles.contactBtn}
              onClick={() => handleCopy(personalData.email, 'email')}
            >
              {copiedType === 'email' ? '✓ Copied Email' : `📧 ${personalData.email}`}
            </button>
            <button
              type="button"
              className={styles.contactBtn}
              onClick={() => handleCopy(personalData.mobile, 'phone')}
            >
              {copiedType === 'phone' ? '✓ Copied Phone' : `📞 +91 ${personalData.mobile}`}
            </button>
            <a
              href={personalData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactBtn}
            >
              🔗 LinkedIn Profile
            </a>
          </div>

          <div className={styles.primaryActions}>
            {onOpenResume && (
              <button
                type="button"
                className={styles.resumeActionBtn}
                onClick={() => {
                  onClose();
                  onOpenResume();
                }}
              >
                📄 ATS Resume
              </button>
            )}
            {onOpenChatbot && (
              <button
                type="button"
                className={styles.chatActionBtn}
                onClick={() => {
                  onClose();
                  onOpenChatbot();
                }}
              >
                💬 Ask AI Assistant
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
