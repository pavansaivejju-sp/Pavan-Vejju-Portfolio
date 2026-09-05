'use client';

import personalData from '../data/personal.json';
import styles from './Header.module.css';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  const tabs = [
    { id: 'personal', label: 'Personal Details' },
    { id: 'tech-stack', label: 'Tech Stack' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education Details' },
    { id: 'address', label: 'Address' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div className={styles.profileBlock}>
            <div className={styles.identity}>
              <h1 className={styles.name}>{personalData.name}</h1>
              <p className={styles.role}>
                {personalData.title} <span className={styles.divider}>||</span>{' '}
                {personalData.experience}
              </p>
            </div>
            <div className={styles.contact}>
              <a className={styles.contactLink} href={`mailto:${personalData.email}`}>
                {personalData.email}
              </a>
              <a className={styles.contactLink} href={`tel:${personalData.mobile}`}>
                {personalData.mobile}
              </a>
              <a
                className={`${styles.contactLink} ${styles.linkedin}`}
                href={personalData.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <nav className={styles.navigation} aria-label="Portfolio sections">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
