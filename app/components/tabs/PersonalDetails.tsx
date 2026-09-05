import personalData from '../../data/personal.json';
import styles from './PersonalDetails.module.css';

export default function PersonalDetails() {
  return (
    <div className={styles.section}>
      <div>
        <h2 className={styles.title}>
          Personal Details
        </h2>
        <div className={styles.content}>
          <div className={styles.snapshot}>
            <div className={styles.snapshotGlow} />
            <p className={styles.eyebrow}>
              Profile snapshot
            </p>
            <h3 className={styles.snapshotTitle}>
              Building scalable, responsive experiences with modern frontend architecture.
            </h3>
            <p className={styles.summary}>
              {personalData.summary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
