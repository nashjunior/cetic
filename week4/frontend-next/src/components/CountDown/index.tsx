import React, { useEffect, useState } from 'react';
import { useChallengers } from '../../contexts/ChallengesContext';
import { useCountDown } from '../../contexts/CountDownContext';
import styles from '../../styles/components/CountDown.module.css'

const CountDown:React.FC = () => {
    const [time, setTime] = useState(0.1 * 60);
    const {minutes, seconds, startCountDown, stopCountDown, hasFinished, isActive} = useCountDown()

    const [minuteLeft, minuteRight] = minutes.toString().padStart(2, '0').split('')
    const [secondLeft, secondRight] = seconds.toString().padStart(2, '0').split('')
   
    return (
        <div>
            <div className={styles.countDownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {hasFinished ? (
                <button disabled type="button" className={`${styles.countDownButton}`}>Ciclo encerrado</button>
            ) : isActive ?
                (<button type="button" className={`${styles.countDownButton} ${styles.countDownButtonActive}`} onClick={stopCountDown}>Abandonar um ciclo</button>)
                : 
                (<button type="button" className={styles.countDownButton} onClick={startCountDown}>Iniciar um ciclo</button>)
            }

            

            
        </div>
    )
}

export default CountDown