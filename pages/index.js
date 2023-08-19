import { Navbar } from '@/components/navbar';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className="page-container">

      <Navbar />

      <div className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.title}>News Reader App</h1>
          <h3 className={styles.subtitle}>News at Your Fingertips.</h3>
        </div>
      </div>
    </div>
  )
}
