import Head from 'next/head'
import ChallengeBox from '../components/ChallengeBox';
import CompletedChallenges from '../components/CompletedChallenges';
import CountDown from '../components/CountDown';
import ExperienceBar from '../components/ExperienceBar'
import Profile from '../components/Profile';
import CountDownProvider from '../contexts/CountDownContext';
import styles from '../styles/pages/Home.module.css'

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inicio | Movit</title>
      </Head>

       <ExperienceBar />

       <CountDownProvider>
        <section>
          <div>
              <Profile />
              <CompletedChallenges/>
              <CountDown />
          </div>
          <div>
            <ChallengeBox/>
          </div>
        </section>
      </CountDownProvider>
    </div>
  )
}

export default Home;