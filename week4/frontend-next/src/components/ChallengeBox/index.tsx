import React, { useState } from 'react'
import { useChallengers } from '../../contexts/ChallengesContext'
import styles from '../../styles/components/ChallengeBox.module.css'

const ChallengeBox:React.FC = () => {
  const {activeChallenge, resetChallenge} = useChallengers()

  return (
    <div className={styles.challengeBoxContainer}>
      {
        activeChallenge ? (
          <div className={styles.challengeActive}>
            <header>Ganhe {activeChallenge.amount} xp</header>

            <main>
              <img src={`icons/${activeChallenge.type}.svg`} alt="Muscle xp"/>
              <strong>Novo desafio</strong>
              <p>{activeChallenge.description}</p>
            </main>

            <footer>
              <button type="button" className={styles.challengeFailedButton} onClick={resetChallenge}>Falhei</button>
              <button type="button" className={styles.challegeCompletedButton}>Completei</button>
            </footer>
          </div>
        ) : (

            <div className={styles.challengeNotActive}>
              <strong> Finalize um ciclo para receber desafios</strong>
              <p>
                <img src="icons/level-up.svg" alt="level Up"/>
                Avance de level completando desafios
              </p>
          </div>
        )
      }
  </div>
  )
}

export default ChallengeBox