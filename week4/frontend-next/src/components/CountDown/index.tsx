import React, { useEffect, useState } from 'react';
import styles from '../../styles/components/CountDown.module.css'

const CountDown:React.FC = () => {
    const [time, setTime] = useState(25 * 60);

    const minutes = Math.floor(time / 60)
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = minutes.toString().padStart(2, '0').split('')
    const [active, setActive] = useState(false)
    const [secondLeft, secondRight] = seconds.toString().padStart(2, '0').split('')

    useEffect(() => {

        if(active && time > 0){
            setTimeout(() => {
                setTime(time - 1)
            }, 1000);
        }
    }, [active, time])

    function startCountDown() {
        setActive(true)
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

            <button type="button" className={styles.countDownButton} onClick={startCountDown}>Iniciar</button>
        </div>
    )
}

export default CountDown