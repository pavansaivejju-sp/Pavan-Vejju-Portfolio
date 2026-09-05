'use client';

import React, { useState, useEffect } from 'react';
import personalData from '../data/personal.json';
import styles from './Header.module.css';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenChatbot: () => void;
  onOpenRecruiterModal?: () => void;
}

export default function Header({
  activeTab,
  onTabChange,
  onOpenChatbot,
  onOpenRecruiterModal,
}: HeaderProps) {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { id: 'personal', num: '01', label: 'Overview' },
    { id: 'projects', num: '02', label: 'Selected Works' },
    { id: 'telemetry', num: '03', label: 'Telemetry Lab' },
    { id: 'tech-stack', num: '04', label: 'Tech Matrix' },
    { id: 'education', num: '05', label: 'Education' },
    { id: 'address', num: '06', label: 'Contact' },
  ];

  // Prevent scrolling when mobile drawer navigation is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handlePrint = () => {
    window.print();
  };

  const handleMenuSelect = (tabId: string) => {
    setIsMenuOpen(false);
    onTabChange(tabId);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Brand identity */}
        <div className={styles.brand}>
          <button
            type="button"
            onClick={() => onTabChange('personal')}
            className={styles.brandButton}
          >
            <span className={styles.brandName}>{personalData.name}</span>
            <span className={styles.brandDivider}>/</span>
            <span className={styles.brandRole}>Senior Front-End Specialist</span>
          </button>
        </div>

        {/* Clean Center Navigation Bar */}
        <nav className={styles.navBar} aria-label="Developer navigation">
          <div className={styles.navList}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`${styles.navTab} ${activeTab === tab.id ? styles.activeNavTab : ''}`}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Right Actions */}
        <div className={styles.actions}>
          <button
            type="button"
            onClick={() => setShowResumeModal(true)}
            className={styles.resumeBtn}
            title="Preview ATS-Optimized Resume"
          >
            📄 Resume
          </button>

          {onOpenRecruiterModal && (
            <button
              type="button"
              onClick={onOpenRecruiterModal}
              className={styles.fastTrackBtn}
              title="Fast Candidate Screening for Technical Recruiters"
            >
              ⚡ Fast-Track
            </button>
          )}

          <button
            type="button"
            onClick={onOpenChatbot}
            className={styles.hireBtn}
            title="Chat with AI Recruiter Assistant"
          >
            💬 Let&apos;s Talk
          </button>

          {/* Clean Circular Burger Toggle */}
          <button
            type="button"
            className={`${styles.burgerToggle} ${isMenuOpen ? styles.burgerOpen : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
          >
            <div className={styles.burgerLines}>
              <span className={styles.burgerLine} />
              <span className={styles.burgerLine} />
              <span className={styles.burgerLine} />
            </div>
          </button>
        </div>
      </div>

      {/* Signature Fullscreen Circular Clip-Path Overlay Navigation */}
      <div className={`${styles.menuOverlay} ${isMenuOpen ? styles.menuOverlayActive : ''}`}>
        <div className={styles.overlayContent}>
          <div className={styles.overlayHeader}>
            <span className={styles.overlayBrand}>NAVIGATION MENU</span>
            <span className={styles.overlayCloseTip}>ESC or Click Toggle to Close</span>
          </div>

          <ul className={styles.menuList}>
            {tabs.map((tab) => (
              <li key={tab.id} className={styles.menuItem}>
                <button
                  type="button"
                  onClick={() => handleMenuSelect(tab.id)}
                  className={styles.menuLink}
                >
                  <span className={styles.menuNumber}>{tab.num}</span>
                  <span className={styles.menuText}>{tab.label}</span>
                </button>
              </li>
            ))}
            <li className={styles.menuItem}>
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  setShowResumeModal(true);
                }}
                className={styles.menuLink}
              >
                <span className={styles.menuNumber}>07</span>
                <span className={styles.menuText}>📄 ATS Resume Preview</span>
              </button>
            </li>
            {onOpenRecruiterModal && (
              <li className={styles.menuItem}>
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenRecruiterModal();
                  }}
                  className={`${styles.menuLink} ${styles.menuLinkHighlight}`}
                >
                  <span className={styles.menuNumber}>08</span>
                  <span className={styles.menuText}>⚡ Recruiter Fast-Track (30s)</span>
                </button>
              </li>
            )}
            <li className={styles.menuItem}>
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenChatbot();
                }}
                className={`${styles.menuLink} ${styles.menuLinkAccent}`}
              >
                <span className={styles.menuNumber}>09</span>
                <span className={styles.menuText}>💬 Let&apos;s Talk / Chatbot</span>
              </button>
            </li>
          </ul>

          <div className={styles.overlayFooter}>
            <div>
              <span>Email: </span>
              <a href={`mailto:${personalData.email}`}>{personalData.email}</a>
            </div>
            <div>
              <span>Phone: </span>
              <a href={`tel:${personalData.mobile}`}>+91 {personalData.mobile}</a>
            </div>
          </div>
        </div>
      </div>

      {/* Recruiter ATS Resume Modal */}
      {showResumeModal && (
        <div className={styles.modalOverlay} onClick={() => setShowResumeModal(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3 className={styles.modalTitle}>Executive ATS Resume</h3>
                <p className={styles.modalSub}>{personalData.name} • {personalData.title}</p>
              </div>
              <button
                className={styles.closeBtn}
                onClick={() => setShowResumeModal(false)}
                type="button"
              >
                &times;
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.resumeSection}>
                <h4>Direct Contact &amp; Links</h4>
                <p>Email: {personalData.email} | Mobile: +91 {personalData.mobile}</p>
                <p>LinkedIn: <a href={personalData.linkedin} target="_blank" rel="noreferrer">{personalData.linkedin}</a></p>
              </div>

              <div className={styles.resumeSection}>
                <h4>Professional Summary</h4>
                <p>{personalData.summary}</p>
              </div>

              <div className={styles.resumeSection}>
                <h4>Core Tech Stack &amp; Architecture</h4>
                <p><strong>Frontend:</strong> React.js, Next.js, TypeScript, JavaScript (ES6+), React Hooks, Redux, Redux-Saga, Tailwind CSS, Fluent UI, HTML5, CSS3, SCSS.</p>
                <p><strong>Architecture &amp; Real-Time:</strong> Micro Frontends, Module Federation, Microsoft SignalR, REST APIs, GraphQL, Atomic Design.</p>
                <p><strong>Testing &amp; Quality:</strong> Jest, React Testing Library, Stryker Mutation Testing, Code Quality Best Practices.</p>
                <p><strong>Visualization &amp; DevOps:</strong> Highcharts, Recharts, Interactive Telemetry, Git, Azure DevOps CI/CD.</p>
              </div>

              <div className={styles.resumeSection}>
                <h4>Employment &amp; Project Engagements</h4>
                <p>• <strong>FC26 Game Stats Platform - Metaplore / Electronic Arts</strong> (Jan 2026 - Present)</p>
                <p>• <strong>Symphony Trade Capture - Amphora Software</strong> (Oct 2025 - Dec 2025)</p>
                <p>• <strong>UGL CMS - Techwave / Pacific National</strong> (Oct 2023 - Present)</p>
                <p>• <strong>UGL PMS - Techwave / Pacific National</strong> (Dec 2022 - Sep 2023)</p>
                <p>• <strong>Aman Travels</strong> (Apr 2021 - Dec 2021)</p>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.printBtn}
                onClick={handlePrint}
              >
                🖨️ Print / Save as PDF
              </button>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => setShowResumeModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
