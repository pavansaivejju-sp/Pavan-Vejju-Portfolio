'use client';

import Image from 'next/image';
import Link from 'next/link';
import projectsData from '../../data/projects.json';
import { projectImageMap } from '../../data/projectImages';
import { useLanguage } from '../../i18n/LanguageProvider';
import { getProjectText } from '../../i18n/projectText';
import styles from './page.module.css';

export default function ProjectDetails({ slug }: { slug: string }) {
  const { locale, text } = useLanguage();
  const sourceProject = projectsData.find((projectItem) => projectItem.slug === slug);

  if (!sourceProject) return null;

  const project = getProjectText(sourceProject, locale) as typeof sourceProject;
  const images = (project.images || []).map((imageId) => projectImageMap[imageId]).filter(Boolean);
  const heroImage = images[0];
  const isHeroLogo = project.images?.[0] === 'symphony-1' || project.images?.[0] === 'ugl-1' || project.slug === 'symphony-trade-capture';

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link className={styles.backLink} href="/#projects">
          <span aria-hidden="true">&larr;</span> {text.backToProjects}
        </Link>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{project.category}</p>
            <h1 className={styles.title}>{project.name}</h1>
            <p className={styles.lead}>{project.overview || project.description}</p>
            <div className={styles.heroMeta}>
              <span>{project.duration}</span>
              {project.company && <span>{project.company}</span>}
              {project.client && <span>{project.client}</span>}
              {project.teamSize && <span>👥 {project.teamSize}</span>}
            </div>
          </div>

          {heroImage && (
            <div className={`${styles.heroVisual} ${isHeroLogo ? styles.heroVisualLogo : ''}`}>
              <Image
                src={heroImage}
                alt={`${project.name} ${text.projectPreview}`}
                fill
                priority
                sizes="(max-width: 800px) 100vw, 44vw"
                className={`${styles.heroImage} ${isHeroLogo ? styles.heroImageLogo : ''}`}
              />
            </div>
          )}
        </section>

        {project.images && project.images.length > 1 && (
          <section className={styles.gallery} aria-label={text.projectVisuals}>
            {project.images.map((imageId, index) => {
              const isGalleryLogo = imageId === 'symphony-1' || imageId === 'ugl-1';
              return (
                <div
                  className={`${styles.galleryImage} ${isGalleryLogo ? styles.galleryImageLogo : ''}`}
                  key={imageId}
                >
                  <Image
                    src={projectImageMap[imageId]}
                    alt={`${project.name} ${text.projectVisuals} ${index + 1}`}
                    fill
                    sizes="(max-width: 800px) 50vw, 220px"
                    className={isGalleryLogo ? styles.galleryLogoImg : ''}
                  />
                </div>
              );
            })}
          </section>
        )}

        <div className={styles.detailGrid}>
          <section className={styles.mainColumn}>
            <div className={styles.sectionBlock}>
              <p className={styles.sectionEyebrow}>{text.businessImpact}</p>
              <h2>{text.projectContext}</h2>
              <p>{project.description}</p>
              {project.businessImpact && (
                <div className={styles.impactContainer}>
                  {project.businessImpact.problemAndSolution && (
                    <div className={styles.challengeBox}>
                      <span className={styles.challengeTag}>{text.problemSolution}</span>
                      <p>{project.businessImpact.problemAndSolution}</p>
                    </div>
                  )}
                  <div className={styles.metricsList}>
                    {project.businessImpact.metrics.map((metric, index) => (
                      <div key={index} className={styles.metricItem}>
                        <span className={styles.metricCheck}>✓</span>
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className={styles.sectionBlock}>
              <p className={styles.sectionEyebrow}>{text.keyWork}</p>
              <h2>{text.engineeringContributions}</h2>
              <ul className={styles.responsibilities}>
                {(project.efficientWork || project.responsibilities || []).map((work, index) => (
                  <li key={index}><strong>0{index + 1}.</strong> {work}</li>
                ))}
              </ul>
            </div>

            {project.techStackDeep && (
              <div className={styles.sectionBlock}>
                <p className={styles.sectionEyebrow}>{text.deepDive}</p>
                <h2>{text.techBreakdown}</h2>
                <div className={styles.techDeepList}>
                  {project.techStackDeep.map((tech) => (
                    <div key={tech.name} className={styles.techDeepItem}>
                      <div className={styles.techDeepHeader}>
                        <span className={styles.techDeepTitle}>{tech.name}</span>
                        <span className={styles.techDeepBadge}>{tech.role}</span>
                      </div>
                      <p className={styles.techDeepText}>{tech.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          <aside className={styles.sidebar}>
            <section className={styles.factCard}>
              <p className={styles.sectionEyebrow}>{text.atAGlance}</p>
              <dl className={styles.facts}>
                <div><dt>{text.timeline}</dt><dd>{project.duration}</dd></div>
                <div><dt>{text.teamSize}</dt><dd>{project.teamSize}</dd></div>
                {project.company && <div><dt>{text.company}</dt><dd>{project.company}</dd></div>}
                {project.client && <div><dt>{text.client}</dt><dd>{project.client}</dd></div>}
                {project.category && <div><dt>{text.category}</dt><dd>{project.category}</dd></div>}
              </dl>
            </section>
            <section className={styles.factCard}>
              <p className={styles.sectionEyebrow}>{text.technology}</p>
              <div className={styles.technology}>
                {project.technology.map((technology) => <span key={technology}>{technology}</span>)}
              </div>
            </section>
          </aside>
        </div>

        <div className={styles.bottomNav}>
          <Link className={styles.backButtonBottom} href="/#projects">
            <span aria-hidden="true">&larr;</span> {text.backToAllProjects}
          </Link>
        </div>
      </div>
    </main>
  );
}