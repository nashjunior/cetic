import React, { createContext, useContext, useEffect, useState } from 'react'
import challenges from '../../challenges.json'

type Challenge = {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

type ChallengesContextData ={
  level: number;
  levelUp: () => void;

  currentExperience: number;
  updateCurrentExperience: () => void;

  experienceToNextLevel: number

  challengesCompleted: number;
  startNewChallenge: () => void;
  updateChallengesCompleted: () => void;

  activeChallenge: Challenge

  resetChallenge: () => void;
}

const ChallengesContext = createContext<ChallengesContextData>({} as ChallengesContextData)

const ChallengesProvider:React.FC = ({children}) => {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  const [activeChallenge, setActiveChallenge] = useState<Challenge>(null)

  const experienceToNextLevel = Math.pow((level+1) *4, 2)
  function levelUp() {
    setLevel(level+1)
  }

  function updateCurrentExperience() {
    setCurrentExperience(currentExperience + 2000)
  }

  function updateChallengesCompleted() {
    if(!activeChallenge) return;

    const {amount} = activeChallenge;
    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextLevel) {
      finalExperience-=experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted+1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random()* challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge as Challenge);

    new Audio('/notification.mp3').play()

    if(Notification.permission === 'granted') {
      new Notification('Novo desafio', {
        body: `Valend ${challenge.amount} xp`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  return (
    <ChallengesContext.Provider value={{level, levelUp, currentExperience, updateCurrentExperience, 
      challengesCompleted, updateChallengesCompleted, startNewChallenge, activeChallenge, resetChallenge
      ,experienceToNextLevel
    }}>
      {children}
    </ChallengesContext.Provider>
  )
}

export default ChallengesProvider;

export const useChallengers = (): ChallengesContextData => {
  const context = useContext(ChallengesContext)

  if(!context) throw Error('Use challenges importado de forma errada')

  return context;
}