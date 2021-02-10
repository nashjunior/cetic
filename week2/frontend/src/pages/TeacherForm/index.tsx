import React from 'react'
import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import './styles.css'
import warningIcon from '../../assets/images/icons/warning.svg'
import TextArea from '../../components/TextArea'
import Select from '../../components/Select'

const TeacherForm: React.FC = () => {
    return (
        <div id="page-teacher-form" className="container">
            <PageHeader title="Que incrível que você quer dar aulas" description="O primeiro passo é preencher esse formulário de inscrição"/>
            <main>
                <fieldset>
                    <legend>Seus Dados</legend>
                    
                    <Input type="text" name="name" label="Nome" />

                    <Input type="text" name="avatar" label="Avatar" />

                    <Input type="text" name="whatsapp" label="whatsapp" />

                    <TextArea name="bio" label="Biografia"/>
                </fieldset>

                <fieldset>
                    <legend>Sobre a aula
                    </legend>
                        <Select name="subject" label="Matéria" options={[
                            {label: 'Artes', value: 'Artes'}
                        ]}/>
                        <Input type="text" name="cost" label="Custo da sua hora por aula"/>
                </fieldset>

                <footer>
                    <p>
                        <img src={warningIcon} alt="Aviso Importante"/>
                        Importante!<br/>
                        Preencha todos os dados
                    </p>

                    <button type="button">Salvar cadastro</button>

                </footer>
            </main>
        </div>
    )
}

export default TeacherForm