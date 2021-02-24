import React from 'react';
import { useChallengers } from '../../contexts/ChallengesContext';
import styles from '../../styles/components/CompletedChallenges.module.css'

const CompletedChallenges: React.FC = () => {

     const {challengesCompleted} = useChallengers()
    return (
        <div className={styles.completedChallengesContainer}>
            <span>Desafios completos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}

export default CompletedChallenges;