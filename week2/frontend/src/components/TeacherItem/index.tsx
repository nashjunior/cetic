import React from 'react'
import './styles.css'
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import {TeachersFormat} from '../../pages/TeacherList/index'
import api from '../../services/api'

const TeacherItem: React.FC<TeachersFormat> = ({avatar, bio, name, subject, cost, whatsapp, id}) => {
    async function createNewConnection() {
        const response = await api.post('connections', {
            user_id: id
        })
    }

    return (
        <article className="teacher-item">
                    <header>
                        <img src={avatar} alt="Imagem do Professor"/>
                        <div>
                            <strong>{name}</strong>
                            <span>{subject}</span>
                        </div>
                    </header>

                    <p>{bio}</p>

                    <footer>
                        <p>
                            Preço/Hora
                            <strong>R$ {`${cost},00`}</strong>
                        </p>
                         
                        <button type="button" onClick={createNewConnection}>
                            <img src={whatsappIcon} alt="Icone Whatsapp"/>
                            Entrar em contato 
                        </button>
                    </footer>
                </article>
    )
}

export default TeacherItem