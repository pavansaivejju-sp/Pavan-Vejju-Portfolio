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

  const images = project.images
    .map((imageId) => projectImageMap[imageId])
    .filter(Boolean);
  const heroImage = images[0];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link className={styles.backLink} href="/?section=projects">
          <span aria-hidden="true">&lt;-</span> Back to projects
        </Link>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{project.category}</p>
            <h1 className={styles.title}>{project.name}</h1>
            <p className={styles.lead}>{project.overview}</p>
            <div className={styles.heroMeta}>
              <span>{project.duration}</span>
              {project.company && <span>{project.company}</span>}
              {project.client && <span>{project.client}</span>}
            </div>
          </div>
          {/* <div className={`${styles.heroVisual} ${!heroImage ? styles.fallbackVisual : ''}`}>
            {heroImage ? (
              <Image
                src={heroImage}
                alt={`${project.name} project preview`}
                fill
                priority
                sizes="(max-width: 800px) 100vw, 44vw"
                className={styles.heroImage}
              />
            ) : (
              <span>{project.name}</span>
            )}
          </div> */}
        </section>
{/* 
        {images.length > 1 && (
          <section className={styles.gallery} aria-label="Project visuals">
            {images.map((image, index) => (
              <div className={styles.galleryImage} key={image.src}>
                <Image
                  src={image}
                  alt={`${project.name} visual ${index + 1}`}
                  fill
                  sizes="(max-width: 800px) 50vw, 220px"
                />
              </div>
            ))}
          </section>
        )} */}

        <div className={styles.detailGrid}>
          <section className={styles.mainColumn}>
            <div className={styles.sectionBlock}>
              <p className={styles.sectionEyebrow}>Project context</p>
              <h2>What the product does</h2>
              <p>{project.description}</p>
            </div>
            <div className={styles.sectionBlock}>
              <p className={styles.sectionEyebrow}>My involvement</p>
              <h2>Responsibilities and contribution</h2>
              <ul className={styles.responsibilities}>
                {project.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>
            </div>
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
      </div>
    </main>
  );
}
