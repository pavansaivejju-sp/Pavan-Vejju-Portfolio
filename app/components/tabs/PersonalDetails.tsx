'use client';

import React, { useState, useEffect } from 'react';
import personalData from '../../data/personal.json';
import { calculateExperience } from '../../utils/experience';
import { downloadResumePdf } from '../../utils/downloadResumePdf';
import ResumeViewerModal from '../modals/ResumeViewerModal';
import styles from './PersonalDetails.module.css';

interface PersonalDetailsProps {
  onOpenResumeModal?: () => void;
}

export default function PersonalDetails({ onOpenResumeModal }: PersonalDetailsProps) {
  const experience = calculateExperience('2021-04-26');
  const [showResumeModal, setShowResumeModal] = useState(false);

  // Typing animation phrases
  const roles = [
    'React Developer',
    'Next.js Specialist',
    'TypeScript Engineer',
    'Front-End Specialist',
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText.length + 1 === fullText.length) {
          // Pause at full text
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, roles]);

  const techStack = [
    'React.js',
    'Next.js',
    'TypeScript',
    'JavaScript (ES6+)',
    'Redux & Redux-Saga',
    'Tailwind CSS',
    'Microsoft SignalR',
    'Highcharts & Recharts',
    'TanStack Form',
    'REST APIs & GraphQL',
    'Jest & RTL',
    'Git & Azure DevOps',
  ];

  const handleScrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={styles.container}>
      {/* Centered Hero matching itomdev sketchbook aesthetic */}
      <section id="about" className={styles.heroSection}>
        {/* Ambient Top Glow */}
        <div className={styles.heroGlow} />

        {/* Top Eyebrow Badge - Highlighting Experience at the top */}
        <div className={styles.badgeWrapper}>
          <div className={styles.statusPill}>
            <span className={styles.statusPulse} />
            <span className={styles.badgeText}>Senior Frontend Developer</span>
            <span className={styles.badgeDot}>•</span>
            <strong className={styles.topExpHighlight}>⭐ {experience.formatted} Experience</strong>
          </div>
        </div>

        {/* Radiant Headline for Pavan Sai Vejju */}
        <h1 className={styles.nameHeadline}>
          <span className={styles.nameFirst}>Pavan Sai </span>
          <span className={styles.nameLast}>Vejju</span>
        </h1>

        {/* Modern Dynamic Typing Row */}
        <div className={styles.typingRow}>
          <span className={styles.typingStatic}>Specializing in </span>
          <span className={styles.typingDynamic}>{currentText}</span>
          <span className={styles.cursor}>|</span>
        </div>

        {/* Sleek Enterprise Tagline */}
        <div className={styles.taglineBadge}>
          <span className={styles.taglineIcon}>✨</span>
          <span>Scalable Web Engineering &amp; High-Performance Enterprise UI</span>
        </div>

        {/* Clean Paragraph Description with Dynamically Highlighted Experience */}
        <p className={styles.bioText}>
          Building high-performance, accessible, and scalable web experiences with{' '}
          <strong className={styles.accentText}>{experience.formatted}</strong> of dedicated production expertise in React, Next.js, and TypeScript ecosystems.
        </p>

        {/* Action Buttons: View Projects, View Resume, Download Resume */}
        <div className={styles.ctaRow}>
          <button
            type="button"
            onClick={handleScrollToProjects}
            className={styles.primaryBtn}
          >
            <span>Explore Projects</span>
            <span className={styles.arrowIcon}>↗</span>
          </button>

          <button
            type="button"
            onClick={() => setShowResumeModal(true)}
            className={styles.secondaryBtn}
            title="View detailed interactive resume"
          >
            <span className={styles.resumeIcon}>📄</span>
            <span>View Resume</span>
          </button>

          <button
            type="button"
            onClick={downloadResumePdf}
            className={styles.downloadPdfBtn}
            title="Download official resume"
          >
            <span className={styles.downloadIcon}>⬇</span>
            <span>Download Resume</span>
          </button>
        </div>

        {/* Contact Links Row (Email | LinkedIn | Mobile | WhatsApp) */}
        <div id="contact" className={styles.contactRow}>
          <a href={`mailto:${personalData.email}`} className={styles.contactLink} title="Send Email">
            <span className={styles.linkIcon}>✉</span>
            <span>Email</span>
          </a>
          <span className={styles.divider}>•</span>
          <a
            href={personalData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
            title="LinkedIn Profile"
          >
            <span className={styles.linkIcon}>🔗</span>
            <span>LinkedIn</span>
          </a>
          <span className={styles.divider}>•</span>
          <a href={`tel:${personalData.mobile}`} className={styles.contactLink} title="Call Phone">
            <span className={styles.linkIcon}>📞</span>
            <span>+91 {personalData.mobile}</span>
          </a>
          <span className={styles.divider}>•</span>
          <a
            href="https://wa.me/919133953205?text=Hi%20Pavan%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you%20regarding%20an%20exciting%20frontend%20opportunity."
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.contactLink} ${styles.whatsappLink}`}
            aria-label="Chat on WhatsApp with Pavan"
          >
            <svg
              className={styles.whatsappIcon}
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className={styles.scrollIndicator} onClick={handleScrollToProjects}>
          <span className={styles.scrollText}>SCROLL TO EXHIBITION</span>
          <span className={styles.scrollArrow}>↓</span>
        </div>
      </section>

      {/* Clean Tech Stack Strip */}
      <section id="tech-stack" className={styles.techSection}>
        <div className={styles.techHeader}>
          <span className={styles.techEyebrow}>TECHNOLOGIES</span>
          <h3 className={styles.techTitle}>Core Production Stack</h3>
        </div>
        <div className={styles.techList}>
          {techStack.map((tech) => (
            <span key={tech} className={styles.techPill}>
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Full Resume Viewer Modal matching exact attached PDF */}
      <ResumeViewerModal
        isOpen={showResumeModal}
        onClose={() => setShowResumeModal(false)}
      />
    </div>
  );
}
