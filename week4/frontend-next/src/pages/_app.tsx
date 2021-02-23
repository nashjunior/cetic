import type {AppProps} from 'next/app'
import React from 'react';
import '../styles/global.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default MyApp
