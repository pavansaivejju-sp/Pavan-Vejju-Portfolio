import educationData from '../../data/education.json';
import styles from './EducationDetails.module.css';

export default function EducationDetails() {
  return (
    <div className={styles.section}>
      <div>
        <h2 className={styles.title}>
          Education Details
        </h2>
        <div className={styles.list}>
          {educationData.map((education) => (
            <article
              key={`${education.degree}-${education.year}`}
              className={styles.card}
            >
              <h3 className={styles.degree}>
                {education.degree}
              </h3>
              <p className={styles.institution}>
                {education.institution}
              </p>
              <p className={styles.year}>
                Completed {education.year}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
