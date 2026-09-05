 'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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
        alt={`${projectName} project preview`}
        fill
        sizes="200px"
        priority={index === 0}
      />
      <div className={styles.imageShade} />
      <div className={styles.imageLabel}>Project {String(index + 1).padStart(2, '0')}</div>
      <div className={styles.carouselControls}>
        {images.map((image, imageIndex) => (
          <button
            key={image.src}
            className={`${styles.carouselDot} ${imageIndex === activeImage ? styles.activeDot : ''}`}
            type="button"
            aria-label={`Show image ${imageIndex + 1}`}
            onClick={() => setActiveImage(imageIndex)}
          />
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>Selected work</p>
          <h2 className={styles.title}>Projects</h2>
        </div>
        <p className={styles.headingNote}>A closer look at the products and systems behind the work.</p>
      </div>
      <div className={styles.list}>
        {projectsData.map((project, index) => (
          <article
            key={project.name}
            className={`${styles.project} ${index % 2 === 1 ? styles.reverseProject : ''}`}
          >
            <ProjectVisual
              imageIds={project.images}
              projectName={project.name}
              index={index}
            />
            <div className={styles.projectContent}>
              <div className={styles.projectMeta}>
                <span>{project.category}</span>
                <span>{project.duration}</span>
              </div>
              <h3 className={styles.projectName}>{project.name}</h3>
              {(project.company || project.client) && (
                <p className={styles.company}>
                  {project.company || project.client}
                  {project.company && project.client ? ` · ${project.client}` : ''}
                </p>
              )}
              <p className={styles.overview}>{project.overview}</p>
              <div className={styles.technology}>
                {project.technology.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
              <Link className={styles.learnMore} href={`/projects/${project.slug}`}>
                View More <span aria-hidden="true">-&gt;</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
