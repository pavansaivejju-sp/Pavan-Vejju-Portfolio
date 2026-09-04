'use client';

import React from 'react';
import addressData from '../../data/address.json';
import personalData from '../../data/personal.json';
import styles from './Address.module.css';

export default function Address() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.tag}>LOCATION &amp; RELOCATION</span>
        <h2 className={styles.title}>Location &amp; Work Preferences</h2>
      </div>

      <div className={styles.card}>
        <div className={styles.statusRow}>
          <span className={styles.onlineDot} />
          <span className={styles.locationTitle}>Open to Remote, Hybrid &amp; On-Site Opportunities</span>
        </div>

        <p className={styles.desc}>
          {addressData.message}
        </p>

        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>PRIMARY TIMEZONE</span>
            <span className={styles.detailValue}>IST (UTC +5:30) • Flexible for US / UK / APAC overlaps</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>WORK MODALITY</span>
            <span className={styles.detailValue}>Full-time Remote, Hybrid, or Contract</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>DIRECT CONTACT</span>
            <span className={styles.detailValue}>
              <a href={`mailto:${personalData.email}`}>{personalData.email}</a> • <a href={`tel:${personalData.mobile}`}>+91 {personalData.mobile}</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
