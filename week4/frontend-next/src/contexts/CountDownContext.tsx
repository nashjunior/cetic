import React, { createContext, useContext, useEffect, useState } from 'react';
import { useChallengers } from './ChallengesContext';

type CountDownContextData = {
    minutes: number;
    seconds: number
    isActive: boolean;
    hasFinished: boolean;
    startCountDown(): void;
    stopCountDown(): void
}

let countDownTimeout: NodeJS.Timeout;

export const CountDownContext = createContext({} as CountDownContextData)

const CountDownProvider:React.FC = ({children}) => {
    const {startNewChallenge} = useChallengers();

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)


    const minutes = Math.floor(time / 60)
    const seconds = time % 60;

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
        setHasFinished(false)
    }

    return(
        <CountDownContext.Provider value={{minutes, seconds, isActive, hasFinished, startCountDown, stopCountDown}}>
            {children}
        </CountDownContext.Provider>
    )
}

export default CountDownProvider;

export const useCountDown = (): CountDownContextData => {
    const context = useContext(CountDownContext);
    
  if(!context) throw Error('Use countdown importado de forma errada')

  return context;
}