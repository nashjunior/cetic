import React from 'react'
import { useChallengers } from '../../contexts/ChallengesContext';
import styles from '../../styles/components/ExperienceBar.module.css';

const ExperienceBar:React.FC = () => {
  const {currentExperience, experienceToNextLevel} = useChallengers()

  const percentToNextLevel = Math.round((currentExperience *100)/experienceToNextLevel)

  return(
    <header className={styles.experienceBar}>
      <span>{currentExperience} xp</span>
        <div>
          <div style={{width: `${percentToNextLevel}%`}}/>
          <span className={styles.currentExperience} style={{left: `${percentToNextLevel}%`}}>0 xp</span>
        </div>
      <span>{experienceToNextLevel}xp</span>
    </header>
  )
}

export default ExperienceBar;