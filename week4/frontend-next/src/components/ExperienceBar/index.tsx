import React from 'react'
import styles from '../../styles/components/ExperienceBar.module.css';

const ExperienceBar:React.FC = () => {
  return(
    <header className={styles.experienceBar}>
      <span>0xp</span>
        <div>
          <div style={{width: '50%'}}/>
          <span className={styles.currentExperience} style={{left: '50%'}}>0xp</span>
        </div>
      <span>0xp</span>
    </header>
  )
}

export default ExperienceBar;