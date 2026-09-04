'use client';

import React, { useState } from 'react';
import personalData from '../../data/personal.json';
import styles from './TechStack.module.css';

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const categories = Object.keys(personalData.skills);

  // Map of skills to projects where Pavan applied them
  const skillProjectMap: Record<string, string[]> = {
    'React.js': ['FC26 Game Stats Platform', 'Symphony Trade Capture', 'UGL CMS', 'UGL PMS', 'Aman Travels'],
    'Next.js': ['FC26 Game Stats Platform'],
    'TypeScript': ['FC26 Game Stats Platform', 'Symphony Trade Capture', 'UGL CMS', 'UGL PMS'],
    'Microsoft SignalR': ['UGL CMS (Real-time train telemetry)', 'UGL PMS (Live alerts)'],
    'Highcharts': ['UGL CMS (Heatmaps & Splines)', 'UGL PMS (Data charts)'],
    'Recharts': ['FC26 Game Stats Platform (Performance metrics)'],
    'Stryker Mutation Testing': ['FC26 Game Stats Platform (Quality assurance)'],
    'TanStack': ['Symphony Trade Capture (Form validation & state)'],
    'GraphQL': ['Symphony Trade Capture', 'Aman Travels'],
    'Redux Saga': ['Symphony Trade Capture', 'UGL CMS', 'UGL PMS'],
    'Fluent UI': ['UGL CMS', 'UGL PMS'],
    'Tailwind CSS': ['FC26 Game Stats Platform'],
    'Azure DevOps': ['UGL CMS', 'UGL PMS'],
    'Micro Frontends': ['FC26 Game Stats Platform (Modular dashboard architecture)'],
  };

  const filteredCategories = Object.entries(personalData.skills).filter(([category, skills]) => {
    if (activeCategory !== 'all' && category !== activeCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchCat = category.toLowerCase().includes(q);
      const matchSkill = skills.some((s) => s.toLowerCase().includes(q));
      return matchCat || matchSkill;
    }
    return true;
  });

  const totalSkillsCount = Object.values(personalData.skills).reduce((acc, curr) => acc + curr.length, 0);

  return (
    <section className={styles.container}>
      <div className={styles.headerRow}>
        <div>
          <span className={styles.tag}>ENGINEERING MATRIX</span>
          <h2 className={styles.title}>Technical Stack &amp; Tooling</h2>
          <p className={styles.subtitle}>
            Core competencies across modern frontend architecture, state orchestration, testing, and real-time visualization ({totalSkillsCount} total competencies).
          </p>
        </div>

        {/* Search Input */}
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search skills (e.g. SignalR, Next.js, Jest)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className={styles.clearBtn}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className={styles.categoryPills}>
        <button
          type="button"
          className={`${styles.pillBtn} ${activeCategory === 'all' ? styles.activePill : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          All Categories ({categories.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`${styles.pillBtn} ${activeCategory === cat ? styles.activePill : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat.replace(/([A-Z])/g, ' $1').trim()}
          </button>
        ))}
      </div>

      {/* Selected Skill Connected Project Banner */}
      {selectedSkill && skillProjectMap[selectedSkill] && (
        <div className={styles.skillConnectionBanner}>
          <div className={styles.connectionHeader}>
            <span className={styles.connectionIcon}>🔗</span>
            <span>
              Production Usage for <strong>{selectedSkill}</strong>:
            </span>
            <button
              type="button"
              className={styles.closeConnectionBtn}
              onClick={() => setSelectedSkill(null)}
            >
              ✕
            </button>
          </div>
          <div className={styles.connectedProjectsList}>
            {skillProjectMap[selectedSkill].map((proj) => (
              <span key={proj} className={styles.connectedProjectChip}>
                ✓ {proj}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Skills Grid */}
      <div className={styles.skillGrid}>
        {filteredCategories.map(([category, skills]) => (
          <article key={category} className={styles.skillCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.categoryTitle}>
                {category.replace(/([A-Z])/g, ' $1')}
              </h3>
              <span className={styles.skillCountBadge}>
                {skills.length} skills
              </span>
            </div>

            <div className={styles.skillList}>
              {skills.map((skill) => {
                const hasProjects = !!skillProjectMap[skill];
                const isSelected = selectedSkill === skill;

                return (
                  <button
                    key={skill}
                    type="button"
                    className={`${styles.skillChip} ${hasProjects ? styles.interactiveChip : ''} ${isSelected ? styles.selectedChip : ''}`}
                    onClick={() => {
                      if (hasProjects) {
                        setSelectedSkill(isSelected ? null : skill);
                      }
                    }}
                    title={hasProjects ? `Click to view projects using ${skill}` : undefined}
                  >
                    {skill}
                    {hasProjects && <span className={styles.linkDot}>•</span>}
                  </button>
                );
              })}
            </div>
          </article>
        ))}
      </div>

      <p className={styles.matrixHint}>
        💡 <em>Tip: Technologies marked with a dot (•) can be clicked to inspect which enterprise projects utilized them in production.</em>
      </p>
    </section>
  );
}
