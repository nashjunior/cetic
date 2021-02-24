import React, { useEffect, useState } from 'react';
import { useChallengers } from '../../contexts/ChallengesContext';
import styles from '../../styles/components/CountDown.module.css'

let countDownTimeout: NodeJS.Timeout;

const CountDown:React.FC = () => {
    const [time, setTime] = useState(0.1 * 60);
    const {startNewChallenge} = useChallengers()
    const minutes = Math.floor(time / 60)
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = minutes.toString().padStart(2, '0').split('')
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)
    const [secondLeft, secondRight] = seconds.toString().padStart(2, '0').split('')

    useEffect(() => {
        if(isActive && time > 0){
            countDownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000);
        }

        else if(isActive && time<=0 ) {
            setIsActive(false)
            setHasFinished(true)
            startNewChallenge()
        }
    }, [isActive, time])
    
    function startCountDown() {
        setIsActive(true)
    }
    
    function stopCountDown() {
        clearTimeout(countDownTimeout)
        setIsActive(false)
        setTime(25 * 60)
    }
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