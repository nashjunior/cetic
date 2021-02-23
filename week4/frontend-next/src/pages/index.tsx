import Head from 'next/head'
import CompletedChallenges from '../components/CompletedChallenges';
import CountDown from '../components/CountDown';
import ExperienceBar from '../components/ExperienceBar'
import Profile from '../components/Profile';
import styles from '../styles/pages/Home.module.css'

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inicio | Movit</title>
      </Head>

       <ExperienceBar />
       <section>
         <div>
            <Profile />
            <CompletedChallenges/>
            <CountDown />
         </div>
         <div></div>
       </section>
    </div>
  )
}

export default Home;