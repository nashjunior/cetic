import React from 'react'
import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import TeacherItem from '../../components/TeacherItem'
import './styles.css'

const TeacherList: React.FC = () => {
    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponiveis">
                <form id="search-teachers">
                    <Input type="text" label="Matéria" name="subject"/>
                    
                    <Input type="text" label="Dia da Semana" name="week_day"/>

                    <Input type="text" label="Hora" name="time"/>
                    
                </form>
            </PageHeader>

            <main>
                <TeacherItem/>
            </main>
        </div>
    )
}

export default TeacherList