'use client';

import React, { useState } from 'react';
import personalData from '../../data/personal.json';
import styles from './PersonalDetails.module.css';

export default function PersonalDetails() {
  const [activeTimelineYear, setActiveTimelineYear] = useState<string>('2026');

  const careerTimeline = [
    {
      year: '2026',
      period: 'Jan 2026 - Present',
      role: 'Senior Front-End Developer',
      company: 'Metaplore / Electronic Arts',
      project: 'FC26 Game Stats Platform',
      highlight: 'Interactive sports analytics dashboard with Recharts, micro-frontend architecture, Jest testing, and Stryker mutation score optimization.',
      tech: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Recharts', 'Jest', 'Stryker'],
    },
    {
      year: '2025',
      period: 'Oct 2025 - Dec 2025',
      role: 'Front-End Developer (Contract)',
      company: 'Amphora Software',
      project: 'Symphony Trade Capture',
      highlight: 'Energy trade capture, validation, pricing & position management workflow using dynamic TanStack Forms and GraphQL pipelines.',
      tech: ['React.js', 'Redux-Saga', 'TanStack Form', 'GraphQL', 'TypeScript'],
    },
    {
      year: '2024',
      period: 'Oct 2023 - Present',
      role: 'Senior React Developer',
      company: 'Techwave / UGL & Pacific National',
      project: 'UGL CMS (Conditional Monitoring)',
      highlight: 'Real-time train telemetry streaming across South Wales locomotives using Microsoft SignalR and high-frequency Highcharts heatmaps.',
      tech: ['React.js', 'Microsoft SignalR', 'Fluent UI', 'Highcharts', 'Azure DevOps'],
    },
    {
      year: '2023',
      period: 'Dec 2022 - Sep 2023',
      role: 'Front-End Developer',
      company: 'Techwave / UGL',
      project: 'UGL PMS (Performance Management)',
      highlight: 'Asset performance monitoring, live service availability, SAP integration, and complex Redux-Saga asynchronous event management.',
      tech: ['React.js', 'Redux', 'Redux Saga', 'Fluent UI', 'SignalR', 'REST APIs'],
    },
    {
      year: '2021',
      period: 'Apr 2021 - Dec 2021',
      role: 'Front-End Developer',
      company: 'Aman Travels',
      project: 'Aman Travels Multilingual Platform',
      highlight: 'Multilingual travel booking platform for hotels, transport, and railways with Ant Design and GraphQL state management.',
      tech: ['React.js', 'Redux', 'Ant Design', 'GraphQL'],
    },
  ];

  return (
    <div className={styles.container}>
      {/* Signature Hero Section (inspired by just-a-web-developer.com) */}
      <div className={styles.heroSection}>
        <div className={styles.heroTagBadge}>SENIOR FRONT-END SPECIALIST</div>

        <h1 className={styles.heroPunchline}>
          Built for scale. <br />
          Designed for <span className={styles.punchlineEmphasis}>impact<span className={styles.redDot}>.</span></span>
        </h1>

        <div className={styles.heroIntroRow}>
          <div className={styles.heroIntroDivider} />
          <h2 className={styles.heroName}>
            Hi, I am <span className="outline-text">Pavan</span>
          </h2>
        </div>

        <p className={styles.heroRole}>
          Senior Front-End Developer <span className={styles.heroRoleDivider}>|</span> React 19 &amp; Next.js <span className={styles.heroRoleDivider}>|</span> Real-Time Telemetry Specialist
        </p>

        <div className={styles.heroActions}>
          <a href="#projects" className="explore-btn">
            <span className="circle" aria-hidden="true">
              <svg className="arrow-icon" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
            <span className="button-text">Explore my work</span>
          </a>
        </div>
      </div>

      {/* Signature Statement Banner (inspired by Christoph Nagel's red section) */}
      <div className={styles.statementSection}>
        <div className={styles.statementTop}>Coding is more than just a job</div>
        <div className={styles.statementBottom}>
          Coding is <span className="outline-white">PASSION</span>
        </div>
      </div>

      {/* Profile Snapshot Console */}
      <div className={styles.profileCard}>
        <div className={styles.cardHeader}>
          <span className={styles.tag}>ENGINEER PROFILE CONSOLE</span>
          <span className={styles.experienceBadge}>5.5+ Years Experience</span>
        </div>

        <h3 className={styles.headline}>
          Building high-scale, responsive enterprise platforms with modern frontend architecture.
        </h3>

        <p className={styles.summaryText}>
          {personalData.summary}
        </p>

        {/* Core Architectural Pillars */}
        <div className={styles.pillarsGrid}>
          <div className={styles.pillar}>
            <span className={styles.pillarIcon}>⚛️</span>
            <div>
              <h5>React 19 &amp; Next.js Ecosystem</h5>
              <p>TypeScript strict mode, React Server &amp; Client components, custom hooks, atomic design principles.</p>
            </div>
          </div>
          <div className={styles.pillar}>
            <span className={styles.pillarIcon}>📡</span>
            <div>
              <h5>Real-Time Telemetry &amp; APIs</h5>
              <p>Bidirectional Microsoft SignalR WebSockets, REST, GraphQL, and high-frequency data ingestion.</p>
            </div>
          </div>
          <div className={styles.pillar}>
            <span className={styles.pillarIcon}>🧩</span>
            <div>
              <h5>Micro Frontends &amp; Federation</h5>
              <p>Independent module deployment, shared design systems (Fluent UI, Tailwind CSS), and decoupled architectures.</p>
            </div>
          </div>
          <div className={styles.pillar}>
            <span className={styles.pillarIcon}>🛡️</span>
            <div>
              <h5>Mutation &amp; Quality Testing</h5>
              <p>Jest unit tests, React Testing Library, and Stryker Mutation Testing to verify code resilience under edge cases.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Production KPIs */}
      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <span className={styles.kpiNumber}>5.5+</span>
          <span className={styles.kpiLabel}>Years Frontend Engineering</span>
          <span className={styles.kpiSub}>React, Next.js, TypeScript</span>
        </div>
        <div className={styles.kpiCard}>
          <span className={styles.kpiNumber}>40+</span>
          <span className={styles.kpiLabel}>Agile Team Members</span>
          <span className={styles.kpiSub}>Cross-functional collaborative delivery</span>
        </div>
        <div className={styles.kpiCard}>
          <span className={styles.kpiNumber}>99.8%</span>
          <span className={styles.kpiLabel}>Telemetry Stream Uptime</span>
          <span className={styles.kpiSub}>Highcharts &amp; SignalR train telemetry</span>
        </div>
        <div className={styles.kpiCard}>
          <span className={styles.kpiNumber}>86%</span>
          <span className={styles.kpiLabel}>Stryker Mutation Score</span>
          <span className={styles.kpiSub}>High-confidence unit &amp; integration tests</span>
        </div>
      </div>

      {/* Interactive Career Progression Timeline */}
      <div className={styles.timelineSection}>
        <div className={styles.timelineHeader}>
          <div>
            <span className={styles.tag}>CAREER PROGRESSION</span>
            <h3 className={styles.timelineTitle}>5.5+ Years Journey</h3>
          </div>
          <div className={styles.yearPills}>
            {careerTimeline.map((item) => (
              <button
                key={item.year}
                type="button"
                className={`${styles.yearBtn} ${activeTimelineYear === item.year ? styles.activeYearBtn : ''}`}
                onClick={() => setActiveTimelineYear(item.year)}
              >
                {item.year}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.timelineList}>
          {careerTimeline
            .filter((item) => activeTimelineYear === 'all' || item.year === activeTimelineYear)
            .map((item) => (
              <div key={item.project} className={styles.timelineItem}>
                <div className={styles.timelinePeriodBadge}>{item.period}</div>
                <div className={styles.timelineContent}>
                  <div className={styles.roleLine}>
                    <h4 className={styles.timelineRole}>{item.role}</h4>
                    <span className={styles.companyTag}>{item.company}</span>
                  </div>
                  <h5 className={styles.projectName}>{item.project}</h5>
                  <p className={styles.highlightText}>{item.highlight}</p>
                  <div className={styles.techPills}>
                    {item.tech.map((t) => (
                      <span key={t} className={styles.techPill}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

