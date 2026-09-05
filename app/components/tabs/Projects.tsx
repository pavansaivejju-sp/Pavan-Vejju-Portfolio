'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import projectsData from '../../data/projects.json';
import { projectImageMap } from '../../data/projectImages';
import styles from './Projects.module.css';

interface ProjectVisualProps {
  imageIds: string[];
  projectName: string;
  index: number;
}

function ProjectVisual({ imageIds, projectName, index }: ProjectVisualProps) {
  const images = imageIds.map((imageId) => projectImageMap[imageId]).filter(Boolean);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (images.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActiveImage((currentImage) => (currentImage + 1) % images.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [images.length]);

  if (!images.length) {
    return (
      <div className={`${styles.visual} ${styles.fallbackVisual}`}>
        <span className={styles.fallbackNumber}>0{index + 1}</span>
        <span className={styles.fallbackTitle}>{projectName}</span>
      </div>
    );
  }

  return (
    <div className={styles.visual}>
      <Image
        key={images[activeImage].src}
        className={styles.projectImage}
        src={images[activeImage]}
        alt={`${projectName} preview`}
        fill
        sizes="220px"
        priority={index === 0}
      />
      <div className={styles.imageShade} />
      <div className={styles.imageLabel}>0{index + 1}</div>
      <div className={styles.carouselControls}>
        {images.map((image, imageIndex) => (
          <button
            key={image.src}
            className={`${styles.carouselDot} ${imageIndex === activeImage ? styles.activeDot : ''}`}
            type="button"
            aria-label={`Slide ${imageIndex + 1}`}
            onClick={() => setActiveImage(imageIndex)}
          />
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});

  const toggleExpand = (slug: string) => {
    setExpandedProjects((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const categories = [
    { id: 'all', label: 'All Projects (5)' },
    { id: 'analytics', label: 'Sports & Analytics (EA)' },
    { id: 'telemetry', label: 'Rail Telemetry & IoT (UGL)' },
    { id: 'trading', label: 'ETRM & Trading (Amphora)' },
  ];

  const filteredProjects = projectsData.filter((project) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'analytics') return project.slug.includes('fc26');
    if (selectedCategory === 'telemetry') return project.slug.includes('ugl');
    if (selectedCategory === 'trading') return project.slug.includes('symphony');
    return true;
  });

  const getArchitectureHighlight = (slug: string) => {
    switch (slug) {
      case 'fc26-game-stats-platform':
        return 'Micro Frontend architecture with Stryker mutation testing, Recharts dashboards, and PNG export pipeline.';
      case 'ugl-cms':
        return 'Microsoft SignalR live bidirectional telemetry streaming with Highcharts real-time heatmaps & splines.';
      case 'symphony-trade-capture':
        return 'TanStack Form state engine with dynamic field-level validation and GraphQL API queries.';
      case 'ugl-pms':
        return 'Redux-Saga asynchronous event loop with SAP telemetry synchronization and automated reporting.';
      case 'aman-travels':
        return 'Multilingual booking workflows with Ant Design component architecture and GraphQL integration.';
      default:
        return null;
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.headerRow}>
        <div>
          <span className={styles.tag}>ENTERPRISE PORTFOLIO</span>
          <h2 className={styles.title}>
            Flagship Enterprise Case Studies
          </h2>
          <p className={styles.subtitle}>
            A deep-dive into enterprise platforms, sports analytics, and real-time conditional telemetry systems built over 5.5+ years.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className={styles.filterPills}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`${styles.filterBtn} ${selectedCategory === cat.id ? styles.activeFilterBtn : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className={styles.projectList}>
        {filteredProjects.map((project, index) => {
          const isExpanded = !!expandedProjects[project.slug];
          const archHighlight = getArchitectureHighlight(project.slug);

          return (
            <article key={project.name} className={styles.projectCard}>
              <div className={styles.cardMain}>
                <ProjectVisual
                  imageIds={project.images}
                  projectName={project.name}
                  index={index}
                />

                <div className={styles.projectDetails}>
                  <div className={styles.metaRow}>
                    <span className={styles.categoryBadge}>{project.category}</span>
                    <span className={styles.durationBadge}>{project.duration}</span>
                    {project.teamSize && (
                      <span className={styles.teamBadge}>👥 Team: {project.teamSize}</span>
                    )}
                  </div>

                  <h3 className={styles.projectName}>{project.name}</h3>

                  {(project.company || project.client) && (
                    <p className={styles.companyLine}>
                      Client: <strong>{project.client || project.company}</strong>
                      {project.company && project.client ? ` (via ${project.company})` : ''}
                    </p>
                  )}

                  <p className={styles.overviewText}>{project.overview}</p>

                  {/* Architecture Impact Snippet */}
                  {archHighlight && (
                    <div className={styles.archImpactBox}>
                      <span className={styles.archIcon}>⚡</span>
                      <p className={styles.archDesc}>
                        <strong>Architecture Focus:</strong> {archHighlight}
                      </p>
                    </div>
                  )}

                  {/* Technology Tags */}
                  <div className={styles.techList}>
                    {project.technology.map((tech) => (
                      <span key={tech} className={styles.techChip}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions: View Responsibilities Toggle & Deep Dive Link */}
                  <div className={styles.cardActions}>
                    <button
                      type="button"
                      className={styles.toggleExpandBtn}
                      onClick={() => toggleExpand(project.slug)}
                    >
                      {isExpanded ? '▲ Hide Responsibilities' : '▼ View Responsibilities & Impact'}
                    </button>

                    <Link className={styles.caseStudyLink} href={`/projects/${project.slug}`}>
                      FULL CASE STUDY SPECS <span aria-hidden="true">-&gt;</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Collapsible Responsibilities Drawer */}
              {isExpanded && (
                <div className={styles.responsibilitiesDrawer}>
                  <h4 className={styles.drawerTitle}>Key Responsibilities &amp; Engineering Contributions</h4>
                  <ul className={styles.respList}>
                    {project.responsibilities.map((resp) => (
                      <li key={resp} className={styles.respItem}>
                        <span className={styles.bulletDot}>•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
