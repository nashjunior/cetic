import type {AppProps} from 'next/app'
import React from 'react';
import ChallengesProvider from '../contexts/ChallengesContext';
import '../styles/global.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
  )
}

export default MyApp
