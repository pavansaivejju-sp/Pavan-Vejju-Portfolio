import personalData from '../../data/personal.json';
import styles from './TechStack.module.css';

export default function TechStack() {
  return (
    <section className={styles.section}>
      <p className={styles.eyebrow}>Toolkit</p>
      <h2 className={styles.title}>Technical Stack</h2>
      <p className={styles.intro}>
        Core technologies and tools used to build reliable, scalable frontend experiences.
      </p>
      <div className={styles.skillGrid}>
        {Object.entries(personalData.skills).map(([category, skills]) => (
          <article key={category} className={styles.skillCard}>
            <h3 className={styles.skillCategory}>
              {category.replace(/([A-Z])/g, ' $1')}
            </h3>
            <div className={styles.skillList}>
              {skills.map((skill) => (
                <span key={skill} className={styles.skill}>
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
