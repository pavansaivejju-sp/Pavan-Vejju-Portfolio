'use client';

import React, { useEffect } from 'react';
import { calculateExperience } from '../../utils/experience';
import { downloadResumePdf } from '../../utils/downloadResumePdf';
import styles from './ResumeViewerModal.module.css';

interface ResumeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeViewerModal({ isOpen, onClose }: ResumeViewerModalProps) {
  const experience = calculateExperience('2021-04-26');

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.modalBackdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Pavan Sai Vejju Resume Viewer"
    >
      <div className={styles.modalDialog} onClick={(e) => e.stopPropagation()}>
        {/* Top Control Bar */}
        <div className={styles.controlBar}>
          <div className={styles.controlTitleGroup}>
            <span className={styles.documentBadge}>Official PDF Resume</span>
            <span className={styles.documentName}>Pavan_Sai_Vejju_Resume.pdf</span>
            <span className={styles.experienceTag}>⭐ {experience.formatted}</span>
          </div>

          <div className={styles.controlActions}>
            <button
              type="button"
              className={styles.downloadActionBtn}
              onClick={downloadResumePdf}
              title="Download official resume"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Resume</span>
            </button>

            <button
              type="button"
              className={styles.printActionBtn}
              onClick={() => window.print()}
              title="Print document"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              <span>Print</span>
            </button>

            <button
              type="button"
              className={styles.closeActionBtn}
              onClick={onClose}
              aria-label="Close resume viewer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Document Canvas */}
        <div className={styles.scrollCanvas}>
          {/* ========================================================= */}
          {/* PAGE 1 */}
          {/* ========================================================= */}
          <article className={styles.resumeSheet}>
            <div className={styles.pageNumberBadge}>Page 1 of 2</div>

            {/* Header */}
            <header className={styles.resumeHeader}>
              <h1 className={styles.candidateName}>PAVAN SAI VEJJU</h1>

              <div className={styles.subtitleRow}>
                <span>Front-End Developer (React JS) || Work Experience : </span>
                <mark className={styles.yellowHighlight}>{experience.formatted}</mark>
              </div>

              <div className={styles.contactRow}>
                <span>Email: <a href="mailto:pavansaivejju@gmail.com" className={styles.contactLink}>pavansaivejju@gmail.com</a></span>
                <span className={styles.bulletSep}>||</span>
                <span>mobile: <a href="tel:9133953205" className={styles.contactLink}>9133953205</a></span>
                <span className={styles.bulletSep}>||</span>
                <a
                  href="https://www.linkedin.com/in/pavan-sai-vejju-2264231b2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkedinLink}
                >
                  LinkedIn Profile
                </a>
              </div>
            </header>

            {/* Professional Summary */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>Professional Summary</h2>
              <div className={styles.headingDivider} />

              <p className={styles.summaryParagraph}>
                Senior Frontend Engineer with {experience.formatted} of experience building scalable enterprise and responsive web applications in{' '}
                <mark className={styles.yellowHighlight}>React.js, Nextjs ,TypeScript, Redux, Redux-Saga, JavaScript, HTML5, and CSS3,</mark>{' '}
                and modern frontend architecture. Experienced in Micro Frontends, real-time applications, data visualization, and performance optimization. Skilled at state management, API integrations, and real-time data handling, while ensuring cross-browser compatibility, accessibility, and pixel-perfect UI implementation. Proficient in leveraging AI-assisted development tools such as GitHub Copilot, ChatGPT, and Cursor AI to accelerate development, improve code quality, and streamline debugging. Passionate about building intelligent,user-centric applications with clean architecture and maintainable code.
              </p>
            </section>

            {/* Technical Skills */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>Technical Skills</h2>
              <div className={styles.headingDivider} />

              <div className={styles.skillsList}>
                <div className={styles.skillItem}>
                  <strong className={styles.skillCategory}>Frontend Engineering: </strong>
                  <span>React.js, Next.js, TypeScript, JavaScript (ES6+), React Hooks, Redux, Redux toolkit(RTK), Redux Saga, Tailwind CSS, Fluent UI, HTML5, CSS3, SCSS</span>
                </div>

                <div className={styles.skillItem}>
                  <strong className={styles.skillCategory}>API &amp; Integration: </strong>
                  <span>REST APIs, GraphQL, Microsoft SignalR, JWT Authentication, API Integration, Data Handling</span>
                </div>

                <div className={styles.skillItem}>
                  <strong className={styles.skillCategory}>Testing &amp; Quality: </strong>
                  <span>Jest, React Testing Library, Stryker Mutation Testing, Unit Testing, Code Quality Practices</span>
                </div>

                <div className={styles.skillItem}>
                  <strong className={styles.skillCategory}>Architecture: </strong>
                  <span>Micro Frontends, Module Federation, Atomic Design, Component-Based Architecture</span>
                </div>

                <div className={styles.skillItem}>
                  <strong className={styles.skillCategory}>Visualization: </strong>
                  <span>High charts, Recharts, Interactive Dashboards, Data Visualization</span>
                </div>

                <div className={styles.skillItem}>
                  <strong className={styles.skillCategory}>DevOps &amp; Tools: </strong>
                  <span>Git, GitHub, Azure DevOps, CI/CD, npm, pnpm</span>
                </div>

                <div className={styles.skillItem}>
                  <strong className={styles.skillCategory}>AI-Assisted Development: </strong>
                  <span>GitHub Copilot, ChatGPT, Cursor AI, Claude AI, Prompt Engineering, AI-assisted Debugging &amp; Code Optimization</span>
                </div>
              </div>
            </section>

            {/* Projects */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>Projects</h2>
              <div className={styles.headingDivider} />

              {/* FC26 Game Stats Platform */}
              <div className={styles.projectBlock}>
                <h3 className={styles.projectTitle}>
                  FC26 Game Stats Platform - Metaplore - (Client: Electronic Arts) - (contract)
                </h3>

                <div className={styles.projectMetaLine}>
                  <strong className={styles.metaLabel}>Tech: </strong>
                  <span>Next.js | React | TypeScript | Tailwind | Recharts | Jest | Stryker</span>
                </div>

                <div className={styles.projectDescLine}>
                  <strong className={styles.metaLabel}>Description: </strong>
                  <span>Game Stats Platform is an interactive analytics dashboard for EA FC26 that provides players with insights into matches, wins, losses, rankings, and performance trends. </span>
                  <strong className={styles.metaLabel}>Duration: </strong>
                  <span>Jan 2026 – present</span>
                </div>

                <h4 className={styles.rolesHeading}>Roles &amp; Responsibilities</h4>
                <ul className={styles.bulletList}>
                  <li>Developed reusable, responsive UI components and interactive analytics dashboards.</li>
                  <li>Built player statistics modules, performance visualizations, and PNG export functionality.</li>
                  <li>Integrated REST APIs and contributed to a scalable Micro Frontend architecture.</li>
                  <li>Ensured high code quality through Jest unit testing and Stryker mutation testing.</li>
                  <li>Collaborated with cross-functional Agile teams to deliver high-quality features.</li>
                </ul>
              </div>
            </section>
          </article>

          {/* ========================================================= */}
          {/* PAGE 2 */}
          {/* ========================================================= */}
          <article className={styles.resumeSheet}>
            <div className={styles.pageNumberBadge}>Page 2 of 2</div>

            {/* Symphony- Trade-capture */}
            <div className={styles.projectBlock}>
              <h3 className={styles.projectTitle}>
                Symphony- Trade-capture - Amphora Software (contract)
              </h3>

              <div className={styles.projectMetaLine}>
                <strong className={styles.metaLabel}>Tech: </strong>
                <span>React.js, React Hooks, Redux, Redux-Saga, TypeScript, HTML, CSS, JavaScript, Tan stack</span>
              </div>

              <div className={styles.projectMetaLine}>
                <strong className={styles.metaLabel}>Duration : </strong>
                <span>October 2025 – December 2025</span>
              </div>

              <div className={styles.projectDescLine}>
                <strong className={styles.metaLabel}>Description: </strong>
                <span>Symphony Trade Capture is a core module of Amphora&apos;s ETRM platform that streamlines energy trade capture, validation, pricing, and position management.</span>
              </div>

              <h4 className={styles.rolesHeading}>Responsibilities:</h4>
              <ul className={styles.bulletList}>
                <li>Built dynamic and responsive forms using TanStack Form, with field-level validation and optimized state handling.</li>
                <li>Integrated GraphQL APIs for fetching and submitting trade data, ensuring efficient schema-based communication.</li>
                <li>Performed UI design, code refactoring, and performance improvements, adhering to clean and scalable coding standards.</li>
                <li>Developed reusable common components and implemented unit testing using Jest and React Testing Library to ensure reliability and maintainability.</li>
              </ul>
            </div>

            {/* UGL CMS & PMS */}
            <div className={styles.projectBlock}>
              <h3 className={styles.projectTitle}>
                UGL CMS &amp; PMS - Techwave
              </h3>

              <div className={styles.projectMetaLine}>
                <strong className={styles.metaLabel}>Tech Stack: </strong>
                <span>React.js | TypeScript | Redux |Redux toolkit(RTK)| Redux Saga | Fluent UI | Microsoft SignalR | Highcharts | REST APIs | Jest|Azure DevOps </span>
                <strong className={styles.metaLabel}>Duration: </strong>
                <span>January 2022 – October -2025</span>
              </div>

              <div className={styles.projectDescLine}>
                <strong className={styles.metaLabel}>Description: </strong>
                <span>UGL CMS &amp; PMS are enterprise railway asset monitoring and performance management applications that provide real-time train condition monitoring, asset health insights, operational reporting, and maintenance planning.</span>
              </div>

              <h4 className={styles.rolesHeading}>Roles &amp; Responsibilities:</h4>
              <ul className={styles.bulletList}>
                <li>Developed scalable and reusable UI components using React.js, TypeScript, and Fluent UI.</li>
                <li>Built interactive dashboards and data visualizations using Highcharts for asset monitoring and performance analysis.</li>
                <li>Implemented real-time data updates using Microsoft SignalR and integrated REST APIs for backend communication.</li>
                <li>Managed complex application state using Redux and Redux Saga with optimized frontend architecture.</li>
                <li>Improved application performance through reusable components, code optimization, and responsive design practices.</li>
                <li>Supported CI/CD deployments using Azure DevOps and collaborated with Agile teams for feature delivery</li>
              </ul>
            </div>

            {/* Aman Travels */}
            <div className={styles.projectBlock}>
              <h3 className={styles.projectTitle}>
                Aman Travels
              </h3>

              <div className={styles.projectMetaLine}>
                <strong className={styles.metaLabel}>Tech Stack: </strong>
                <span>React.js | Redux | Ant Design | GraphQL | HTML | CSS | Jest|JavaScript</span>
              </div>

              <div className={styles.projectMetaLine}>
                <strong className={styles.metaLabel}>Duration: </strong>
                <span>April 2021 – December 2021</span>
              </div>

              <div className={styles.projectDescLine}>
                <strong className={styles.metaLabel}>Description: </strong>
                <span>Multilingual travel management application providing booking services for hotels, transportation, apartments, and railway services through a responsive web platform.</span>
              </div>

              <h4 className={styles.rolesHeading}>Roles &amp; Responsibilities:</h4>
              <ul className={styles.bulletList}>
                <li>Developed reusable React components and responsive UI screens using Ant Design.</li>
                <li>Integrated GraphQL APIs and Redux for efficient data management.</li>
                <li>Improved frontend performance using code optimization and modern React practices.</li>
              </ul>
            </div>

            {/* Education */}
            <section className={styles.section}>
              <h2 className={styles.educationHeading}>Education</h2>
              <div className={styles.headingDivider} />

              <p className={styles.educationContent}>
                Bachelor of Technology (B.Tech), Jawaharlal Nehru Technological University, Kakinada - 2019
              </p>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
