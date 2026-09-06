'use client';

import React, { useState, useEffect } from 'react';
import personalData from '../data/personal.json';
import { calculateExperience } from '../utils/experience';
import { downloadResumePdf } from '../utils/downloadResumePdf';
import ResumeViewerModal from './modals/ResumeViewerModal';
import styles from './Header.module.css';

interface HeaderProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function Header({ activeTab = 'home', onTabChange }: HeaderProps) {
  const experience = calculateExperience('2021-04-26');
  const [currentSection, setCurrentSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'tech-stack', label: 'Tech Stack' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  // Smart selection with IntersectionObserver
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < 150) {
        setCurrentSection('home');
        return;
      }

      const sections = navItems
        .filter((item) => item.id !== 'home')
        .map((item) => document.getElementById(item.id));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollY + 180) {
          setCurrentSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setCurrentSection(id);
    setIsMenuOpen(false);
    if (onTabChange) onTabChange(id);

    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Left: Brand Monogram (as in reference image "DR.") */}
        <div className={styles.brand}>
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className={styles.brandButton}
            title={personalData.name}
          >
            <span className={styles.monogram}>PV<span className={styles.dot}>.</span></span>
          </button>
        </div>

        {/* Right Section: Smart Right-Aligned Nav & Experience Badge */}
        <div className={styles.navRightWrapper}>
          <nav className={styles.navBar} aria-label="Main Navigation">
            <div className={styles.navList}>
              {navItems.map((item) => {
                const isActive = currentSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`${styles.navItem} ${isActive ? styles.activeNavItem : ''}`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className={styles.activeSketchLine} />}
                  </button>
                );
              })}
            </div>
          </nav>

          <span className={styles.headerExpBadge} title="Total Professional Experience">
            ⭐ {experience.formatted}
          </span>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className={`${styles.mobileToggle} ${isMenuOpen ? styles.toggleActive : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Navigation"
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`${styles.mobileMenuItem} ${currentSection === item.id ? styles.mobileActiveItem : ''}`}
            >
              {item.label}
            </button>
          ))}
          <div className={styles.mobileActionGroup}>
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                setShowResumeModal(true);
              }}
              className={styles.mobileResumeBtn}
            >
              View Resume 📄
            </button>

            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                downloadResumePdf();
              }}
              className={styles.mobileDownloadBtn}
            >
              Download Resume ⬇
            </button>
          </div>
        </div>
      )}

      {/* Full 2-Page Resume Viewer Modal Matching Attached PDF */}
      <ResumeViewerModal
        isOpen={showResumeModal}
        onClose={() => setShowResumeModal(false)}
      />
    </header>
  );
}
