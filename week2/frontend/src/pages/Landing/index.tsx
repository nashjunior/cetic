import React, { useEffect, useState } from 'react'
import LogoImg from '../../assets/images/logo.svg'
import landining from '../../assets/images/landing.svg'
import studying from '../../assets/images/icons/study.svg'
import giveClssesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'
import './styles.css'
import { Link } from 'react-router-dom'
import api from '../../services/api'

const Landing: React.FC = () => {
    const [totalConnections, setTotalConnections] = useState(0)

    useEffect(() => {
        async function loadTotalConnections() {
            const connections = await api.get<{total:number}>('total_connections')
            setTotalConnections(connections.data.total)

        }
        loadTotalConnections()
    }, [])

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={LogoImg} alt="Proffy Logo Img"/>
                    <h2>Sua plataforma de estudos online</h2>

                    <img src={landining} alt="Plataforma de Estudos" className="hero-image"/>

                    <div className="buttons-container">
                        <Link to="study" className="study">
                            <img src={studying} alt="Estudar"/>
                        </Link>

                        <Link to="/give-classes" className="give-classes">
                            <img src={giveClssesIcon} alt="Dar aulas"/>
                            Dar aulas
                        </Link>
                    </div>

                    <span className="total-connections">
                        Total de {totalConnections} conexões ja realizadas
                        <img src={purpleHeartIcon} alt="Coração Roxo"/>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Landing