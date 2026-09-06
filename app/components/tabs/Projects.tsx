'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import projectsData from '../../data/projects.json';
import { projectImageMap } from '../../data/projectImages';
import styles from './Projects.module.css';

interface ProjectItem {
  slug: string;
  name: string;
  client?: string;
  company?: string;
  type?: string;
  category: string;
  images?: string[];
  technology: string[];
  duration: string;
  overview?: string;
  description?: string;
}

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const imagesKeys = project.images || [];
  const validImages = imagesKeys
    .map((imgKey) => ({
      key: imgKey,
      data: projectImageMap[imgKey],
      isLogo: imgKey === 'symphony-1' || imgKey === 'ugl-1' || project.slug === 'symphony-trade-capture',
    }))
    .filter((item) => Boolean(item.data));

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-cycle through images every 4 seconds when not hovered and has multiple images
  useEffect(() => {
    if (validImages.length <= 1 || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % validImages.length);
    }, 4000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [validImages.length, isHovered]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % validImages.length);
  };

  const handleDotClick = (e: React.MouseEvent, dotIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex(dotIndex);
  };

  const currentItem = validImages[activeImageIndex];
  const isCurrentSlideLogo = currentItem ? currentItem.isLogo : false;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={styles.projectCard}
      aria-label={`View details for ${project.name}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image Preview / Interactive Carousel */}
      <div className={styles.imageContainer}>
        {validImages.length > 0 ? (
          <div className={styles.carouselContainer}>
            {validImages.map((imageObj, imgIdx) => (
              <div
                key={imgIdx}
                className={`${styles.carouselSlide} ${
                  imgIdx === activeImageIndex ? styles.carouselSlideActive : ''
                } ${imageObj.isLogo ? styles.logoSlide : ''}`}
                aria-hidden={imgIdx !== activeImageIndex}
              >
                <Image
                  src={imageObj.data}
                  alt={`${project.name} slide ${imgIdx + 1}`}
                  fill
                  className={`${styles.cardImage} ${imageObj.isLogo ? styles.logoCardImage : ''}`}
                  sizes="(max-width: 768px) 100vw, 420px"
                  priority={index === 0 && imgIdx === 0}
                />
              </div>
            ))}

            {/* Carousel Navigation Arrows when multiple images exist */}
            {validImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className={`${styles.carouselNavBtn} ${styles.carouselPrevBtn}`}
                  aria-label="Previous project image"
                  title="Previous image"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className={`${styles.carouselNavBtn} ${styles.carouselNextBtn}`}
                  aria-label="Next project image"
                  title="Next image"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                {/* Dot Indicators */}
                <div className={styles.carouselDots} role="tablist" aria-label="Project images carousel">
                  {validImages.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={(e) => handleDotClick(e, dotIdx)}
                      className={`${styles.carouselDot} ${
                        dotIdx === activeImageIndex ? styles.carouselDotActive : ''
                      }`}
                      aria-label={`Slide ${dotIdx + 1}`}
                      title={`Image ${dotIdx + 1} of ${validImages.length}`}
                    />
                  ))}
                </div>

                {/* Counter Pill Badge */}
                <span className={styles.slideCounterBadge}>
                  {activeImageIndex + 1}/{validImages.length}
                </span>
              </>
            )}
          </div>
        ) : (
          <div className={styles.fallbackVisual}>
            <span className={styles.fallbackIcon}>⚡</span>
            <span className={styles.fallbackCategory}>{project.category}</span>
          </div>
        )}

        {/* Gradient Overlay only on non-logo slides */}
        {!isCurrentSlideLogo && <div className={styles.imageOverlay} />}
        
        <span className={styles.projectIndex}>0{index + 1}</span>
        <span className={styles.quickViewHint}>View Details ↗</span>
      </div>

      {/* Card Content */}
      <div className={styles.cardContent}>
        <div className={styles.clientRow}>
          <span className={styles.clientName}>
            {project.client || project.company}
          </span>
          <span className={styles.projectDuration}>{project.duration}</span>
        </div>

        <h3 className={styles.projectName}>{project.name}</h3>

        <p className={styles.projectDesc}>
          {project.overview || project.description}
        </p>

        {/* Tech Chips */}
        <div className={styles.techTags}>
          {project.technology.slice(0, 4).map((tech) => (
            <span key={tech} className={styles.techTag}>
              {tech}
            </span>
          ))}
          {project.technology.length > 4 && (
            <span className={styles.moreTechTag}>
              +{project.technology.length - 4}
            </span>
          )}
        </div>

        {/* Card Action Button */}
        <div className={styles.cardFooter}>
          <span className={styles.viewDetailsBtn}>
            <span>View Details</span>
            <svg
              className={styles.btnIcon}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Projects() {
  return (
    <section id="projects" className={styles.container}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Portfolio &amp; Case Studies</span>
        <h2 className={styles.title}>Projects</h2>
        <p className={styles.subtitle}>
          Enterprise web applications and platforms built for industry leaders. Click any project to view comprehensive architecture, business impact, and tech stack details.
        </p>
      </div>

      <div className={styles.projectsGrid}>
        {projectsData.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
