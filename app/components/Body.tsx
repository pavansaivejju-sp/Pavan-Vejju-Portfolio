'use client';

import PersonalDetails from './tabs/PersonalDetails';
import TechStack from './tabs/TechStack';
import Projects from './tabs/Projects';
import EducationDetails from './tabs/EducationDetails';
import Address from './tabs/Address';
import styles from './Body.module.css';

interface BodyProps {
  activeTab: string;
}

export default function Body({ activeTab }: BodyProps) {
  const isStandaloneTab = activeTab === 'education' || activeTab === 'address';

  return (
    <main className={styles.body}>
      <div className={styles.container}>
        <div className={styles.content}>
          {isStandaloneTab ? (
            activeTab === 'education' ? <EducationDetails /> : <Address />
          ) : (
            <div className={styles.dashboardSections}>
              <section id="personal" className={styles.dashboardSection}>
                <PersonalDetails />
              </section>
              <section id="tech-stack" className={styles.dashboardSection}>
                <TechStack />
              </section>
              <section id="projects" className={styles.dashboardSection}>
                <Projects />
              </section>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
