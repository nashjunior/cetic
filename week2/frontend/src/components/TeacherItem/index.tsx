import React from 'react'
import './styles.css'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'

const TeacherItem: React.FC = () => {
    return (
        <article className="teacher-item">
                    <header>
                        <img src="" alt="Imagem do Professor"/>
                        <div>
                            <strong>Diego Fernandes</strong>
                            <span>Química</span>
                        </div>
                    </header>

                    <p>Entusiasta das melhores tecnologias de quimica avancada</p>

                    <footer>
                        <p>
                            Preço/Hora
                            <strong>R$ 00,00</strong>
                        </p>
                         
                        <button type="button">
                            <img src={whatsappIcon} alt="Icone Whatsapp"/>
                            Entrar em contato 
                        </button>
                    </footer>
                </article>
    )
}

export default TeacherItem