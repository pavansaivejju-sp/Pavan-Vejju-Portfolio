'use client';

import React from 'react';
import PersonalDetails from './tabs/PersonalDetails';
import TechStack from './tabs/TechStack';
import Projects from './tabs/Projects';
import EducationDetails from './tabs/EducationDetails';
import Address from './tabs/Address';
import TelemetryDashboard from './dashboard/TelemetryDashboard';
import styles from './Body.module.css';

interface BodyProps {
  activeTab: string;
  onOpenRecruiterModal?: () => void;
  onOpenResumeModal?: () => void;
}

export default function Body({ activeTab, onOpenRecruiterModal, onOpenResumeModal }: BodyProps) {
  return (
    <main className={styles.body}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.dashboardSections}>
            {/* 01: Executive Hero & Value Proposition */}
            <section id="personal" className={styles.dashboardSection}>
              <PersonalDetails
                onOpenRecruiterModal={onOpenRecruiterModal}
                onOpenResumeModal={onOpenResumeModal}
              />
            </section>

            {/* 02: Flagship Enterprise Case Studies */}
            <section id="projects" className={styles.dashboardSection}>
              <Projects />
            </section>

            {/* 03: Interactive Telemetry & Engineering Proof Lab */}
            <section id="telemetry" className={styles.dashboardSection}>
              <TelemetryDashboard />
            </section>

            {/* 04: Technical Competency & Tooling Matrix */}
            <section id="tech-stack" className={styles.dashboardSection}>
              <TechStack />
            </section>

            {/* 05: Academic Foundation & Credentials */}
            <section id="education" className={styles.dashboardSection}>
              <EducationDetails />
            </section>

            {/* 06: Work Preferences & Contact */}
            <section id="address" className={styles.dashboardSection}>
              <Address />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
