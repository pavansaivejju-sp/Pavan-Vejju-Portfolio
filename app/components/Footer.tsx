'use client';

import React from 'react';
import Link from 'next/link';
import personalData from '../data/personal.json';
import addressData from '../data/address.json';
import { calculateExperience } from '../utils/experience';
import styles from './Footer.module.css';

export default function Footer() {
  const experience = calculateExperience('2021-04-26');

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.topDividerGlow} />

      <div className={styles.container}>
        <div className={styles.footerGrid}>
          {/* Col 1: Brand & Profile */}
          <div className={styles.brandCol}>
            <div className={styles.brandRow}>
              <span className={styles.monogram}>
                PV<span className={styles.brandDot}>.</span>
              </span>
              <span className={styles.nameTitle}>
                <strong>{personalData.name}</strong>
              </span>
            </div>
            <p className={styles.bioText}>
              Senior Frontend Engineer specializing in React.js, Next.js, and TypeScript architectures. Building scalable, accessible, and high-performance enterprise applications.
            </p>
            <div className={styles.expBadge}>
              ⭐ <strong>{experience.formatted} Production Experience</strong>
            </div>
          </div>

          {/* Col 2: Location & Address (Hyderabad, Kondapur, 500084) */}
          <div className={styles.locationCol}>
            <span className={styles.colEyebrow}>LOCATION &amp; RESIDENCE</span>
            <div className={styles.locationCard}>
              <div className={styles.pinHeader}>
                <span className={styles.pinIcon}>📍</span>
                <span className={styles.locationCity}>{addressData.location}</span>
              </div>

              <div className={styles.addressBlock}>
                <div className={styles.addressLine}>
                  <span className={styles.addressLabel}>Address:</span>
                  <span className={styles.addressValue}>{addressData.address}</span>
                </div>
                <div className={styles.addressLine}>
                  <span className={styles.addressLabel}>Area:</span>
                  <span className={styles.addressValue}>{addressData.area} (Near HITEC City)</span>
                </div>
                <div className={styles.addressLine}>
                  <span className={styles.addressLabel}>Pincode:</span>
                  <span className={styles.pincodeBadge}>{addressData.pincode}</span>
                </div>
                <div className={styles.addressLine}>
                  <span className={styles.addressLabel}>State / Country:</span>
                  <span className={styles.addressValue}>{addressData.state}, {addressData.country}</span>
                </div>
              </div>

              <div className={styles.availabilityRow}>
                <span className={styles.livePulse} />
                <span>Open for Local, Hybrid &amp; Global Remote</span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation & Quick Links */}
          <div className={styles.navCol}>
            <span className={styles.colEyebrow}>EXPLORE</span>
            <ul className={styles.linkList}>
              <li>
                <Link href="/#about" className={styles.footerLink}>
                  About &amp; Overview
                </Link>
              </li>
              <li>
                <Link href="/#tech-stack" className={styles.footerLink}>
                  Tech Stack
                </Link>
              </li>
              <li>
                <Link href="/#projects" className={styles.footerLink}>
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link href="/projects/fc26-game-stats-platform" className={styles.footerLink}>
                  FC 26 Case Study
                </Link>
              </li>
              <li>
                <Link href="/projects/symphony-trade-capture" className={styles.footerLink}>
                  Symphony Trade Capture
                </Link>
              </li>
              <li>
                <Link href="/projects/aman-travels" className={styles.footerLink}>
                  Aman Travels
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Connect & Direct Contact */}
          <div className={styles.contactCol}>
            <span className={styles.colEyebrow}>CONNECT DIRECTLY</span>
            <div className={styles.contactList}>
              <a href={`mailto:${personalData.email}`} className={styles.contactItem} title="Send Email">
                <span className={styles.contactIcon}>✉</span>
                <span className={styles.contactText}>{personalData.email}</span>
              </a>

              <a href={`tel:${personalData.mobile}`} className={styles.contactItem} title="Call Phone">
                <span className={styles.contactIcon}>📞</span>
                <span className={styles.contactText}>+91 {personalData.mobile}</span>
              </a>

              <a
                href={personalData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactItem}
                title="LinkedIn Profile"
              >
                <span className={styles.contactIcon}>🔗</span>
                <span className={styles.contactText}>LinkedIn Profile ↗</span>
              </a>

              <a
                href="https://wa.me/919133953205?text=Hi%20Pavan%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you%20regarding%20an%20exciting%20frontend%20opportunity."
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.contactItem} ${styles.whatsappContactItem}`}
                title="Chat on WhatsApp"
              >
                <svg className={styles.waIcon} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span className={styles.contactText}>WhatsApp Direct Chat ↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <button
            type="button"
            onClick={handleScrollToTop}
            className={styles.backToTopBtn}
            title="Scroll back to top"
          >
            <span>Back to top</span>
            <span className={styles.topArrow}>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
