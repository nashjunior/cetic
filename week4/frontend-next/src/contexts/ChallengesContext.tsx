import React, { createContext, useContext, useState } from 'react'
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

export const ChallengesContext = createContext<ChallengesContextData>({} as ChallengesContextData)

const ChallengesProvider:React.FC = ({children}) => {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level+1) *4, 2)
  function levelUp() {
    setLevel(level+1)
  }

  function updateCurrentExperience() {
    setCurrentExperience(currentExperience + 2000)
  }

  function updateChallengesCompleted() {
    setChallengesCompleted(challengesCompleted +1)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random()* challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

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