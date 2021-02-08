import React from 'react'
import logoImg from '../../assets/images/logo.png'
import landingImg from '../../assets/images/landing.png'
import studyIcon from '../../assets/images/icons/study.png'
import giveClassesIcon from '../../assets/images/icons/give-classes.png'
import purpleHeart from '../../assets/images/icons/heart.png'
import './styles.css'
import { Link } from 'react-router-dom'

const Landing: React.FC = () => {
    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy Logo Img"/>
                    <h2>Sua plataforma de estudos online</h2>

                    <img src={landingImg} alt="Plataforma de Estudos" className="hero-image"/>

                    <div className="buttons-container">
                        <Link to="study" className="study">
                            <img src={studyIcon} alt="Estudar"/>
                        </Link>

                        <Link to="/give-classes" className="give-classes">
                            <img src={giveClassesIcon} alt="Dar aulas"/>
                            Dar aulas
                        </Link>
                    </div>

                    <span className="total-connections">
                        Total de 200 conexões ja realizadas
                        <img src={purpleHeart} alt="Coração Roxo"/>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Landing