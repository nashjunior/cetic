import React, { useState } from 'react'
import { useChallengers } from '../../contexts/ChallengesContext'
import { useCountDown } from '../../contexts/CountDownContext'
import styles from '../../styles/components/ChallengeBox.module.css'

const ChallengeBox:React.FC = () => {
  const {activeChallenge, resetChallenge, updateChallengesCompleted} = useChallengers()
  const {stopCountDown} = useCountDown()

  function handleFailedChallege() {
    resetChallenge()
    stopCountDown()
  }

  function handleChallengeSucceeded(){
    updateChallengesCompleted()
    stopCountDown()
  }

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
              <button type="button" className={styles.challengeFailedButton} onClick={handleFailedChallege}>Falhei</button>
              <button type="button" className={styles.challegeCompletedButton} onClick={handleChallengeSucceeded}>Completei</button>
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