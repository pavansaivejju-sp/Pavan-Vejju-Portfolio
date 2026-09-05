'use client';

import React, { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import projectsData from '../../data/projects.json';
import { projectImageMap } from '../../data/projectImages';
import styles from './Projects.module.css';

interface ProjectVisualProps {
  imageIds: string[];
  projectName: string;
  index: number;
  onOpenLightbox: (images: StaticImageData[], initialIdx: number, title: string) => void;
}

function ProjectVisual({ imageIds, projectName, index, onOpenLightbox }: ProjectVisualProps) {
  const images = imageIds.map((imageId) => projectImageMap[imageId]).filter(Boolean) as StaticImageData[];
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
        <span className={styles.fallbackType}>Architecture &amp; Code Platform</span>
      </div>
    );
  }

  return (
    <div
      className={styles.visual}
      onClick={() => onOpenLightbox(images, activeImage, projectName)}
      title="Click to expand high-resolution preview"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onOpenLightbox(images, activeImage, projectName);
        }
      }}
    >
      <Image
        key={images[activeImage].src}
        className={styles.projectImage}
        src={images[activeImage]}
        alt={`${projectName} preview`}
        fill
        sizes="(max-width: 768px) 100vw, 320px"
        priority={index === 0}
      />
      <div className={styles.imageShade} />
      <div className={styles.imageLabel}>0{index + 1}</div>
      <div className={styles.zoomHint}>🔍 Click to Enlarge</div>

      <div className={styles.carouselControls} onClick={(e) => e.stopPropagation()}>
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
  const [viewModes, setViewModes] = useState<Record<string, 'preview' | 'blueprint'>>({});
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    images: StaticImageData[];
    currentIndex: number;
    title: string;
  } | null>(null);

  const toggleExpand = (slug: string) => {
    setExpandedProjects((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const setCardMode = (slug: string, mode: 'preview' | 'blueprint') => {
    setViewModes((prev) => ({ ...prev, [slug]: mode }));
  };

  const handleOpenLightbox = (images: StaticImageData[], initialIdx: number, title: string) => {
    setLightbox({
      isOpen: true,
      images,
      currentIndex: initialIdx,
      title,
    });
  };

  const handleCloseLightbox = () => {
    setLightbox(null);
  };

  const handleNextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightbox || lightbox.images.length <= 1) return;
    setLightbox((prev) => prev ? {
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length,
    } : null);
  };

  const handlePrevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightbox || lightbox.images.length <= 1) return;
    setLightbox((prev) => prev ? {
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
    } : null);
  };

  const categories = [
    { id: 'all', label: 'All Platforms (5)' },
    { id: 'analytics', label: 'Sports & Gaming (EA)' },
    { id: 'telemetry', label: 'Rail Telemetry & IoT (UGL)' },
    { id: 'trading', label: 'Energy Trading ETRM (Amphora)' },
  ];

  const filteredProjects = projectsData.filter((project) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'analytics') return project.slug.includes('fc26');
    if (selectedCategory === 'telemetry') return project.slug.includes('ugl');
    if (selectedCategory === 'trading') return project.slug.includes('symphony');
    return true;
  });

  const getArchitectureBlueprint = (slug: string) => {
    switch (slug) {
      case 'fc26-game-stats-platform':
        return [
          { stage: 'CLIENT LAYER', detail: 'Next.js 16 App Router + React 19 Client Modules' },
          { stage: 'FEDERATION', detail: 'Micro-Frontend Gateway with decoupled asset pipelines' },
          { stage: 'VISUALIZATION', detail: '60 FPS Recharts analytics + dynamic SVG radar polygon' },
          { stage: 'QUALITY ASSURANCE', detail: 'Jest unit tests + Stryker Mutation Testing (86% score)' },
        ];
      case 'symphony-trade-capture':
        return [
          { stage: 'DYNAMIC FORM ENGINE', detail: 'TanStack Form with strict field-level schema validation' },
          { stage: 'DATA PIPELINE', detail: 'GraphQL Queries & Mutations with sub-10ms validation latency' },
          { stage: 'STATE ARCHITECTURE', detail: 'Redux-Saga asynchronous event loop & trade caches' },
          { stage: 'VALUATION ENGINE', detail: 'Multi-leg energy derivative pricing & position risk' },
        ];
      case 'ugl-cms':
        return [
          { stage: 'SENSOR INGESTION', detail: 'Locomotive vibration accelerometers & axle bearing probes' },
          { stage: 'REAL-TIME TRANSPORT', detail: 'Microsoft SignalR bidirectional WebSockets (<20ms ping)' },
          { stage: 'ANALYTICS ENGINE', detail: 'Highcharts real-time heatmaps, bar charts, and spline waves' },
          { stage: 'DESIGN SYSTEM', detail: 'Microsoft Fluent UI + Atomic Component Architecture' },
        ];
      case 'ugl-pms':
        return [
          { stage: 'ENTERPRISE PLATFORM', detail: 'UGL Integra Cloud Performance Management Suite' },
          { stage: 'SAP INTEGRATION', detail: 'Enterprise asset maintenance schedule data synchronization' },
          { stage: 'ASYNC STORE', detail: 'Complex Redux-Saga state machine for real-time asset tracking' },
          { stage: 'REPORTING', detail: 'Highcharts data visualization + automated PDF/CSV export engine' },
        ];
      case 'aman-travels':
        return [
          { stage: 'MULTILINGUAL UI', detail: 'Ant Design responsive component suite across 3 locales' },
          { stage: 'API INTEGRATION', detail: 'GraphQL API gateway for multi-vendor transport queries' },
          { stage: 'STATE ORCHESTRATION', detail: 'Redux store with optimized route-based code splitting' },
        ];
      default:
        return null;
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.headerRow}>
        <div>
          <span className={styles.tag}>ENTERPRISE PORTFOLIO</span>
          <h2 className={styles.title}>Flagship Enterprise Case Studies</h2>
          <p className={styles.subtitle}>
            In-depth architectural breakdowns of mission-critical platforms, gaming analytics engines, and real-time telemetry systems built over 5.5+ years.
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
          const mode = viewModes[project.slug] || 'preview';
          const blueprint = getArchitectureBlueprint(project.slug);

          return (
            <article key={project.name} className={styles.projectCard}>
              {/* Card Top Action Bar: View Mode Switcher */}
              <div className={styles.cardTopBar}>
                <div className={styles.metaRow}>
                  <span className={styles.categoryBadge}>{project.category}</span>
                  <span className={styles.durationBadge}>{project.duration}</span>
                  {project.teamSize && (
                    <span className={styles.teamBadge}>👥 Team: {project.teamSize}</span>
                  )}
                </div>

                <div className={styles.cardViewToggle}>
                  <button
                    type="button"
                    className={`${styles.toggleModeBtn} ${mode === 'preview' ? styles.activeToggleMode : ''}`}
                    onClick={() => setCardMode(project.slug, 'preview')}
                  >
                    🖼️ Screenshots
                  </button>
                  <button
                    type="button"
                    className={`${styles.toggleModeBtn} ${mode === 'blueprint' ? styles.activeToggleMode : ''}`}
                    onClick={() => setCardMode(project.slug, 'blueprint')}
                  >
                    📐 Architecture Flow
                  </button>
                </div>
              </div>

              <div className={styles.cardMain}>
                {/* Visual / Blueprint Section */}
                {mode === 'preview' ? (
                  <ProjectVisual
                    imageIds={project.images}
                    projectName={project.name}
                    index={index}
                    onOpenLightbox={handleOpenLightbox}
                  />
                ) : (
                  <div className={styles.blueprintContainer}>
                    <div className={styles.blueprintHeader}>
                      <span className={styles.blueprintTag}>SYSTEM ARCHITECTURE BLUEPRINT</span>
                      <span className={styles.blueprintSub}>Enterprise Data Flow</span>
                    </div>

                    <div className={styles.blueprintNodes}>
                      {blueprint?.map((step, sIdx) => (
                        <div key={step.stage} className={styles.blueprintNode}>
                          <div className={styles.nodeIndex}>0{sIdx + 1}</div>
                          <div className={styles.nodeText}>
                            <span className={styles.nodeStage}>{step.stage}</span>
                            <span className={styles.nodeDetail}>{step.detail}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project Details */}
                <div className={styles.projectDetails}>
                  <h3 className={styles.projectName}>{project.name}</h3>

                  {(project.company || project.client) && (
                    <p className={styles.companyLine}>
                      Enterprise Client: <strong>{project.client || project.company}</strong>
                      {project.company && project.client ? ` (via ${project.company})` : ''}
                    </p>
                  )}

                  <p className={styles.overviewText}>{project.overview}</p>

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
                      FULL SPECIFICATION <span aria-hidden="true">-&gt;</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Collapsible Responsibilities Drawer */}
              {isExpanded && (
                <div className={styles.responsibilitiesDrawer}>
                  <h4 className={styles.drawerTitle}>Key Engineering Responsibilities &amp; Contributions</h4>
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

      {/* --- INTERACTIVE FULLSCREEN IMAGE LIGHTBOX MODAL --- */}
      {lightbox && lightbox.isOpen && (
        <div className={styles.lightboxOverlay} onClick={handleCloseLightbox}>
          <div className={styles.lightboxModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.lightboxHeader}>
              <div>
                <span className={styles.lightboxBrand}>HIGH-RESOLUTION CASE STUDY PREVIEW</span>
                <h4 className={styles.lightboxTitle}>{lightbox.title}</h4>
              </div>
              <button
                type="button"
                className={styles.lightboxCloseBtn}
                onClick={handleCloseLightbox}
                aria-label="Close Lightbox"
              >
                &times;
              </button>
            </div>

            <div className={styles.lightboxBody}>
              <div className={styles.lightboxImageWrapper}>
                <Image
                  src={lightbox.images[lightbox.currentIndex]}
                  alt={`${lightbox.title} Slide ${lightbox.currentIndex + 1}`}
                  fill
                  className={styles.lightboxImage}
                  sizes="90vw"
                  priority
                />
              </div>

              {lightbox.images.length > 1 && (
                <>
                  <button
                    type="button"
                    className={`${styles.navArrow} ${styles.prevArrow}`}
                    onClick={handlePrevLightbox}
                    aria-label="Previous image"
                  >
                    ❮
                  </button>
                  <button
                    type="button"
                    className={`${styles.navArrow} ${styles.nextArrow}`}
                    onClick={handleNextLightbox}
                    aria-label="Next image"
                  >
                    ❯
                  </button>
                </>
              )}
            </div>

            <div className={styles.lightboxFooter}>
              <span className={styles.counterText}>
                Image {lightbox.currentIndex + 1} of {lightbox.images.length}
              </span>
              <span className={styles.hintText}>Press ESC or click outside to close</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
