import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import projectsData from '../../data/projects.json';
import { projectImageMap } from '../../data/projectImages';
import styles from './page.module.css';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projectsData.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsData.find((projectItem) => projectItem.slug === slug);

  if (!project) {
    notFound();
  }

  const heroImageKey = project.images && project.images[0];
  const heroImage = heroImageKey ? projectImageMap[heroImageKey] : null;

  const isHeroLogo = heroImageKey === 'symphony-1' || heroImageKey === 'ugl-1' || project.slug === 'symphony-trade-capture';

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link className={styles.backLink} href="/#projects">
          <span aria-hidden="true">&larr;</span> Back to projects
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
                alt={`${project.name} preview`}
                fill
                priority
                sizes="(max-width: 800px) 100vw, 44vw"
                className={`${styles.heroImage} ${isHeroLogo ? styles.heroImageLogo : ''}`}
              />
            </div>
          )}
        </section>

        {project.images && project.images.length > 1 && (
          <section className={styles.gallery} aria-label="Project visuals">
            {project.images.map((imgKey, index) => {
              const isGalleryLogo = imgKey === 'symphony-1' || imgKey === 'ugl-1';
              return (
                <div
                  className={`${styles.galleryImage} ${isGalleryLogo ? styles.galleryImageLogo : ''}`}
                  key={imgKey}
                >
                  <Image
                    src={projectImageMap[imgKey]}
                    alt={`${project.name} visual ${index + 1}`}
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
            {/* Business Impact */}
            <div className={styles.sectionBlock}>
              <p className={styles.sectionEyebrow}>Business &amp; Impact</p>
              <h2>Project Context &amp; Business Value</h2>
              <p>{project.description}</p>

              {project.businessImpact && (
                <div className={styles.impactContainer}>
                  {project.businessImpact.problemAndSolution && (
                    <div className={styles.challengeBox}>
                      <span className={styles.challengeTag}>Business Problem &amp; Solution</span>
                      <p>{project.businessImpact.problemAndSolution}</p>
                    </div>
                  )}

                  <div className={styles.metricsList}>
                    {project.businessImpact.metrics.map((metric, i) => (
                      <div key={i} className={styles.metricItem}>
                        <span className={styles.metricCheck}>✓</span>
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Key Work & Engineering Efficiencies */}
            <div className={styles.sectionBlock}>
              <p className={styles.sectionEyebrow}>Key Work &amp; Efficiencies</p>
              <h2>Engineering Contributions</h2>
              <ul className={styles.responsibilities}>
                {(project.efficientWork || project.responsibilities || []).map((work, idx) => (
                  <li key={idx}>
                    <strong>0{idx + 1}.</strong> {work}
                  </li>
                ))}
              </ul>
            </div>

            {/* Deep Tech Stack */}
            {project.techStackDeep && (
              <div className={styles.sectionBlock}>
                <p className={styles.sectionEyebrow}>Deep Architectural Dive</p>
                <h2>Tech Stack Breakdown</h2>
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
              <p className={styles.sectionEyebrow}>At a glance</p>
              <dl className={styles.facts}>
                <div>
                  <dt>Timeline</dt>
                  <dd>{project.duration}</dd>
                </div>
                <div>
                  <dt>Team size</dt>
                  <dd>{project.teamSize}</dd>
                </div>
                {project.company && (
                  <div>
                    <dt>Company</dt>
                    <dd>{project.company}</dd>
                  </div>
                )}
                {project.client && (
                  <div>
                    <dt>Client</dt>
                    <dd>{project.client}</dd>
                  </div>
                )}
                {project.category && (
                  <div>
                    <dt>Category</dt>
                    <dd>{project.category}</dd>
                  </div>
                )}
              </dl>
            </section>

            <section className={styles.factCard}>
              <p className={styles.sectionEyebrow}>Technology</p>
              <div className={styles.technology}>
                {project.technology.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </section>
          </aside>
        </div>

        <div className={styles.bottomNav}>
          <Link className={styles.backButtonBottom} href="/#projects">
            <span aria-hidden="true">&larr;</span> Back to All Projects
          </Link>
        </div>
      </div>
    </main>
  );
}

