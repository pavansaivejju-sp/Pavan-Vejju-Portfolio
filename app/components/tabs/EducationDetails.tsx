'use client';

import React from 'react';
import educationData from '../../data/education.json';
import styles from './EducationDetails.module.css';

export default function EducationDetails() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.tag}>ACADEMIC FOUNDATION</span>
        <h2 className={styles.title}>Education &amp; Credentials</h2>
      </div>

      <div className={styles.list}>
        {educationData.map((education) => (
          <article key={`${education.degree}-${education.year}`} className={styles.card}>
            <div className={styles.cardLeft}>
              <span className={styles.gradIcon}>🎓</span>
              <div>
                <h3 className={styles.degree}>{education.degree}</h3>
                <p className={styles.institution}>{education.institution}</p>
              </div>
            </div>
            <span className={styles.yearBadge}>Graduated {education.year}</span>
          </article>
        ))}
      </div>
    </div>
  );
}
