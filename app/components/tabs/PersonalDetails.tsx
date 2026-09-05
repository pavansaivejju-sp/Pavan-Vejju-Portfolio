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
      {/* 0-Scroll Recruiter Impact Hero */}
      <section className={styles.heroSection}>
        {/* Eyebrow & Status Row */}
        <div className={styles.heroTopMeta}>
          <span className={styles.heroTagBadge}>✦ SENIOR FRONT-END SPECIALIST ✦</span>
          <span className={styles.experienceHighlight}>
            <span className={styles.expIcon}>🏆</span>
            <strong>5.5+ Years</strong> Production Experience
          </span>
          <span className={styles.availabilityBadge}>
            <span className={styles.pulseDot} />
            Available for Senior / Lead Roles
          </span>
        </div>

        {/* Name & Headline */}
        <div className={styles.heroIntro}>
          <h1 className={styles.heroName}>
            Hi, I am <span className="outline-text">Pavan Sai Vejju</span>
          </h1>
          <p className={styles.heroHeadline}>
            Senior React &amp; Next.js Engineer architecting high-scale enterprise platforms,
            real-time telemetry pipelines, and responsive micro-frontend systems.
          </p>
        </div>

        {/* Agenda Item 1: What Tech Stack I Worked On (Prominent Grid) */}
        <div className={styles.heroTechSection}>
          <div className={styles.heroSectionLabel}>
            <span>WHAT TECH STACK I WORKED ON</span>
            <span className={styles.heroLabelHint}>(Core Production Competencies)</span>
          </div>
          <div className={styles.heroTechGrid}>
            <div className={styles.techCategoryCol}>
              <span className={styles.categoryName}>Core &amp; Frameworks</span>
              <div className={styles.techBadgeRow}>
                <span className={styles.heroTechPill}>⚡ React 19 / 18</span>
                <span className={styles.heroTechPill}>▲ Next.js 16/15</span>
                <span className={styles.heroTechPill}>📘 TypeScript</span>
                <span className={styles.heroTechPill}>🟨 JavaScript (ES6+)</span>
                <span className={styles.heroTechPill}>🎨 Tailwind CSS</span>
              </div>
            </div>

            <div className={styles.techCategoryCol}>
              <span className={styles.categoryName}>Architecture &amp; Real-Time</span>
              <div className={styles.techBadgeRow}>
                <span className={styles.heroTechPill}>🧩 Micro Frontends</span>
                <span className={styles.heroTechPill}>📡 SignalR WebSockets</span>
                <span className={styles.heroTechPill}>📊 Highcharts &amp; Recharts</span>
                <span className={styles.heroTechPill}>📋 TanStack Form</span>
                <span className={styles.heroTechPill}>🔄 Redux Saga</span>
              </div>
            </div>

            <div className={styles.techCategoryCol}>
              <span className={styles.categoryName}>State, APIs &amp; Testing</span>
              <div className={styles.techBadgeRow}>
                <span className={styles.heroTechPill}>🌐 GraphQL &amp; REST</span>
                <span className={styles.heroTechPill}>🧪 Jest &amp; RTL</span>
                <span className={styles.heroTechPill}>🛡️ Stryker Mutation</span>
                <span className={styles.heroTechPill}>⚙️ Azure DevOps CI/CD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Agenda Item 2: My Select Work (Instant 3-Card Strip Above the Fold) */}
        <div className={styles.heroSelectWork}>
          <div className={styles.heroSectionLabel}>
            <span>MY SELECT WORK</span>
            <span className={styles.heroLabelHint}>(Enterprise Platforms Delivered)</span>
          </div>
          <div className={styles.selectWorkGrid}>
            <div className={styles.selectWorkCard}>
              <div className={styles.workCardTop}>
                <span className={styles.workIndex}>01</span>
                <span className={styles.workCompany}>Electronic Arts (EA)</span>
              </div>
              <h4 className={styles.workTitle}>FC26 Stats Analytics Platform</h4>
              <p className={styles.workDesc}>
                High-scale gaming analytics dashboard with micro-frontends, Recharts, and Stryker testing.
              </p>
              <div className={styles.workTechTags}>
                <span>React 19</span>
                <span>Next.js</span>
                <span>Recharts</span>
                <span>Stryker</span>
              </div>
            </div>

            <div className={styles.selectWorkCard}>
              <div className={styles.workCardTop}>
                <span className={styles.workIndex}>02</span>
                <span className={styles.workCompany}>Amphora Software</span>
              </div>
              <h4 className={styles.workTitle}>Symphony Trade Capture</h4>
              <p className={styles.workDesc}>
                Real-time energy trading deal capture with dynamic TanStack Forms and GraphQL pipelines.
              </p>
              <div className={styles.workTechTags}>
                <span>React</span>
                <span>TanStack Form</span>
                <span>GraphQL</span>
                <span>Redux-Saga</span>
              </div>
            </div>

            <div className={styles.selectWorkCard}>
              <div className={styles.workCardTop}>
                <span className={styles.workIndex}>03</span>
                <span className={styles.workCompany}>UGL &amp; Pacific National</span>
              </div>
              <h4 className={styles.workTitle}>Locomotive Telemetry CMS</h4>
              <p className={styles.workDesc}>
                Real-time SignalR train vibration monitoring, Highcharts heatmaps, and Fluent UI controls.
              </p>
              <div className={styles.workTechTags}>
                <span>React</span>
                <span>SignalR</span>
                <span>Highcharts</span>
                <span>Fluent UI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Action CTAs */}
        <div className={styles.heroActionsRow}>
          <a href="#projects" className="explore-btn">
            <span className="circle" aria-hidden="true">
              <svg className="arrow-icon" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
            <span className="button-text">Explore All Projects</span>
          </a>

          <a href="#telemetry" className={styles.secondaryCtaBtn}>
            <span>Launch Telemetry Lab ⟶</span>
          </a>

          <a href="#tech-stack" className={styles.tertiaryCtaBtn}>
            <span>View Full Tech Matrix ⟶</span>
          </a>
        </div>
      </section>

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

