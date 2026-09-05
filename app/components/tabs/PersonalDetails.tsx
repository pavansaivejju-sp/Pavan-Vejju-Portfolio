'use client';

import React, { useState } from 'react';
import personalData from '../../data/personal.json';
import styles from './PersonalDetails.module.css';

interface PersonalDetailsProps {
  onOpenRecruiterModal?: () => void;
  onOpenResumeModal?: () => void;
}

export default function PersonalDetails({
  onOpenRecruiterModal,
  onOpenResumeModal,
}: PersonalDetailsProps) {
  const [activeTimelineYear, setActiveTimelineYear] = useState<string>('2026');

  const careerTimeline = [
    {
      year: '2026',
      period: 'Jan 2026 - Present',
      role: 'Senior Front-End Developer',
      company: 'Metaplore / Electronic Arts',
      project: 'FC26 Game Stats Platform',
      highlight: 'Interactive sports analytics dashboard with Recharts, micro-frontend architecture, Jest testing, and Stryker mutation score optimization.',
      tech: ['Next.js', 'React 19', 'TypeScript', 'Tailwind', 'Recharts', 'Jest', 'Stryker'],
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
      {/* 0-Scroll Recruiter Impact Hero */}
      <section className={styles.heroSection}>
        {/* Eyebrow & Status Row */}
        <div className={styles.heroTopMeta}>
          <span className={styles.heroTagBadge}>✦ SENIOR FRONT-END SPECIALIST &amp; REACT ARCHITECT ✦</span>
          <span className={styles.experienceHighlight}>
            <span className={styles.expIcon}>🏆</span>
            <strong>5.5+ Years</strong> Production Experience
          </span>
          <span className={styles.availabilityBadge}>
            <span className={styles.pulseDot} />
            Available for Senior / Lead Roles
          </span>
          <span className={styles.locationBadge}>
            📍 Bangalore / Remote Open
          </span>
        </div>

        {/* Name & Headline */}
        <div className={styles.heroIntro}>
          <h1 className={styles.heroName}>
            Architecting High-Scale Enterprise Frontends &amp; Real-Time Telemetry Systems.
          </h1>
          <p className={styles.heroHeadline}>
            I am <strong>Pavan Sai Vejju</strong>, a Senior React &amp; Next.js Engineer with <strong>5.5+ years</strong> delivering mission-critical applications for <strong>Electronic Arts (EA Sports)</strong>, <strong>Amphora Software</strong>, and <strong>UGL Rail &amp; Pacific National</strong>. Specialized in high-frequency SignalR WebSockets, micro-frontends, dynamic TanStack form state, and 85%+ Stryker mutation-tested quality.
          </p>
        </div>

        {/* Fast Action CTAs */}
        <div className={styles.heroActionsRow}>
          {onOpenResumeModal ? (
            <button type="button" onClick={onOpenResumeModal} className={styles.primaryResumeBtn}>
              <span>📄 Download ATS Resume (PDF)</span>
            </button>
          ) : (
            <a href="#contact" className={styles.primaryResumeBtn}>
              <span>📄 Download ATS Resume</span>
            </a>
          )}

          {onOpenRecruiterModal && (
            <button
              type="button"
              onClick={onOpenRecruiterModal}
              className={styles.recruiterFastTrackBtn}
            >
              <span>⚡ Recruiter Fast-Track (30s)</span>
            </button>
          )}

          <a href="#projects" className={styles.secondaryCtaBtn}>
            <span>View Case Studies ⟶</span>
          </a>

          <a href="#telemetry" className={styles.tertiaryCtaBtn}>
            <span>Launch Telemetry Lab ⟶</span>
          </a>
        </div>

        {/* Executive Proof Metrics (The 4 Pillars of Credibility) */}
        <div className={styles.kpiGrid}>
          <div className={styles.kpiCard}>
            <span className={styles.kpiNumber}>5.5+</span>
            <span className={styles.kpiLabel}>Years Enterprise Experience</span>
            <span className={styles.kpiSub}>React 19, Next.js, TypeScript</span>
          </div>
          <div className={styles.kpiCard}>
            <span className={styles.kpiNumber}>3</span>
            <span className={styles.kpiLabel}>Global Industry Leaders</span>
            <span className={styles.kpiSub}>Electronic Arts • Amphora • UGL Rail</span>
          </div>
          <div className={styles.kpiCard}>
            <span className={styles.kpiNumber}>60 FPS</span>
            <span className={styles.kpiLabel}>Real-Time Telemetry Streaming</span>
            <span className={styles.kpiSub}>SignalR WebSockets &amp; Highcharts</span>
          </div>
          <div className={styles.kpiCard}>
            <span className={styles.kpiNumber}>85%+</span>
            <span className={styles.kpiLabel}>Stryker Mutation Quality</span>
            <span className={styles.kpiSub}>Resilient, bug-resistant test suites</span>
          </div>
        </div>

        {/* Enterprise Provenance Showcase (Above the Fold) */}
        <div className={styles.provenanceShowcase}>
          <div className={styles.provenanceHeader}>
            <span className={styles.provenanceTag}>ENTERPRISE TRACK RECORD &amp; PROVEN PRODUCTION STACK</span>
          </div>

          <div className={styles.selectWorkGrid}>
            <a href="#projects" className={styles.selectWorkCard}>
              <div className={styles.workCardTop}>
                <span className={styles.workIndex}>01</span>
                <span className={styles.workCompany}>ELECTRONIC ARTS (EA)</span>
              </div>
              <h4 className={styles.workTitle}>FC26 Stats Analytics Platform</h4>
              <p className={styles.workDesc}>
                High-scale competitive gaming analytics dashboard with micro-frontends, Recharts, and Stryker mutation testing.
              </p>
              <div className={styles.workTechTags}>
                <span>React 19</span>
                <span>Next.js</span>
                <span>Micro-Frontends</span>
                <span>Recharts</span>
                <span>Stryker</span>
              </div>
            </a>

            <a href="#projects" className={styles.selectWorkCard}>
              <div className={styles.workCardTop}>
                <span className={styles.workIndex}>02</span>
                <span className={styles.workCompany}>AMPHORA SOFTWARE</span>
              </div>
              <h4 className={styles.workTitle}>Symphony Trade Capture</h4>
              <p className={styles.workDesc}>
                Real-time energy trading deal capture, pricing, and risk management with dynamic TanStack Forms &amp; GraphQL pipelines.
              </p>
              <div className={styles.workTechTags}>
                <span>React.js</span>
                <span>TanStack Form</span>
                <span>GraphQL</span>
                <span>Redux-Saga</span>
              </div>
            </a>

            <a href="#projects" className={styles.selectWorkCard}>
              <div className={styles.workCardTop}>
                <span className={styles.workIndex}>03</span>
                <span className={styles.workCompany}>UGL &amp; PACIFIC NATIONAL</span>
              </div>
              <h4 className={styles.workTitle}>Locomotive Telemetry CMS</h4>
              <p className={styles.workDesc}>
                Real-time SignalR train vibration monitoring, Highcharts heatmaps, and Fluent UI mission-critical controls.
              </p>
              <div className={styles.workTechTags}>
                <span>React.js</span>
                <span>SignalR</span>
                <span>Highcharts</span>
                <span>Fluent UI</span>
              </div>
            </a>
          </div>

          {/* Core Production Stack Strip */}
          <div className={styles.coreStackStrip}>
            <span className={styles.coreStackLabel}>CORE STACK:</span>
            <div className={styles.coreStackPills}>
              <span className={styles.corePill}>React 19 / 18</span>
              <span className={styles.corePill}>Next.js 16/15</span>
              <span className={styles.corePill}>TypeScript Strict</span>
              <span className={styles.corePill}>Micro-Frontends</span>
              <span className={styles.corePill}>SignalR WebSockets</span>
              <span className={styles.corePill}>Highcharts &amp; Recharts</span>
              <span className={styles.corePill}>TanStack Form</span>
              <span className={styles.corePill}>Redux-Saga</span>
              <span className={styles.corePill}>Jest &amp; RTL</span>
              <span className={styles.corePill}>Stryker Mutation</span>
              <span className={styles.corePill}>Azure DevOps CI/CD</span>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Philosophy Bar */}
      <div className={styles.philosophySection}>
        <div className={styles.philosophyTag}>ENGINEERING PRINCIPLE</div>
        <blockquote className={styles.philosophyQuote}>
          &ldquo;Engineering robust, deterministic user interfaces with zero-drift state management, predictable rendering lifecycles, and resilient mutation-tested test suites.&rdquo;
        </blockquote>
      </div>

      {/* Profile Snapshot & Pillars */}
      <div className={styles.profileCard}>
        <div className={styles.cardHeader}>
          <span className={styles.tag}>TECHNICAL ARCHITECTURE SPECIFICATION</span>
          <span className={styles.experienceBadge}>Production Ready</span>
        </div>

        <h3 className={styles.headline}>
          Specialized in high-scale front-end architectures that perform reliably under heavy concurrent load.
        </h3>

        {/* Core Architectural Pillars */}
        <div className={styles.pillarsGrid}>
          <div className={styles.pillar}>
            <span className={styles.pillarIcon}>⚛️</span>
            <div>
              <h5>React 19 &amp; Next.js Modern Stack</h5>
              <p>TypeScript strict mode, React Server &amp; Client components, custom hooks, atomic design, and Turbopack optimization.</p>
            </div>
          </div>
          <div className={styles.pillar}>
            <span className={styles.pillarIcon}>📡</span>
            <div>
              <h5>Real-Time Telemetry &amp; Streaming</h5>
              <p>Bidirectional Microsoft SignalR WebSockets, REST, GraphQL, and high-frequency real-time data ingestion at 60 FPS.</p>
            </div>
          </div>
          <div className={styles.pillar}>
            <span className={styles.pillarIcon}>🧩</span>
            <div>
              <h5>Micro Frontends &amp; Module Federation</h5>
              <p>Independent module deployment, shared design systems (Fluent UI, Tailwind CSS), and decoupled architectures.</p>
            </div>
          </div>
          <div className={styles.pillar}>
            <span className={styles.pillarIcon}>🛡️</span>
            <div>
              <h5>Mutation &amp; Quality Engineering</h5>
              <p>Jest unit tests, React Testing Library, and Stryker Mutation Testing to verify code resilience under unexpected edge cases.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Career Progression Timeline */}
      <div className={styles.timelineSection}>
        <div className={styles.timelineHeader}>
          <div>
            <span className={styles.tag}>PROFESSIONAL TIMELINE</span>
            <h3 className={styles.timelineTitle}>5.5+ Years Career Trajectory</h3>
            <p className={styles.timelineSub}>
              Select a milestone year to inspect enterprise roles, delivered platforms, and architectural contributions.
            </p>
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
