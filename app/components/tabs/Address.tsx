import addressData from '../../data/address.json';
import styles from './Address.module.css';

export default function Address() {
  return (
    <div className={styles.section}>
      <div>
        <h2 className={styles.title}>
          Address
        </h2>
        <div className={styles.card}>
          <p className={styles.message}>
            {addressData.message}
          </p>
          {!addressData.available && (
            <p className={styles.hint}>
              Add an address to app/data/address.json when it is available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
