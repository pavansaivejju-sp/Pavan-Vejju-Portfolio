'use client';

import React from 'react';
import PersonalDetails from './tabs/PersonalDetails';
import Projects from './tabs/Projects';
import styles from './Body.module.css';

export default function Body() {
  return (
    <main className={styles.body}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Top: Name, Role, Contact, and Tech Stack */}
          <PersonalDetails />

          {/* Bottom: Project Cards */}
          <Projects />
        </div>
      </div>
    </main>
  );
}
