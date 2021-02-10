import React, { FormEvent, useEffect, useState } from 'react'
import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import Select from '../../components/Select'
import TeacherItem from '../../components/TeacherItem'
import api from '../../services/api'
import './styles.css'

export type TeachersFormat = {
    id: number;
    name:string;
    bio: string;
    subject: string;
    avatar: string;
    cost: number;
    whatsapp: string;
}

const TeacherList: React.FC = () => {
    const [subject, setSubject] = useState('')
    const [week_day, setWeek_day] = useState('')
    const [time, setTime] = useState('')
    const [teachers, setTeachers] = useState<TeachersFormat[]>([])

    async function onSubmit(event: FormEvent) {
        event.preventDefault()
        try {
            const response = await api.get<TeachersFormat[]>('classes', {
                params: {
                    subject, week_day, time
                }
            })
            setTeachers(response.data)
        } catch (error) {
            alert('sem aulas')
        }
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponiveis">
                <form id="search-teachers" onSubmit={onSubmit}>
                    <Select name="subject" label="Matéria" 
                        options={[
                                    {label: 'Artes', value: 'Artes'},
                                    {label: 'Biologia', value: 'Biologia'},
                                    {label: 'Ciências', value: 'Ciências'},
                                    {label: 'Educação Física', value: 'Educação Física'},
                                    {label: 'Física', value: 'Física'},
                                    {label: 'Geografica', value: 'Geografica'},
                                    {label: 'História', value: 'História'},
                                    {label: 'Matemática', value: 'Matemática'},
                                    {label: 'Portugues', value: 'Portugues'},
                                    {label: 'Química', value: 'Química'},
                                ]}
                        value={subject}
                        onChange={e => (setSubject(e.target.value))}
                    />

                    <Select name="week_day" label="Dia da Semana" 
                        options={[
                                    {value: '0', label: 'Domingo'},
                                    {value: '1', label: 'Segunda-Feira'},
                                    {value: '2', label: 'Terça-Feira'},
                                    {value: '3', label: 'Quarta-Feira'},
                                    {value: '4', label: 'Quinta-Feira'},
                                    {value: '5', label: 'Sexta-Feira'},
                                    {value: '6', label: 'Sábado'},
                                    
                                ]}
                        value={week_day}
                        onChange={e => (setWeek_day(e.target.value))}
                    />

                    <Input type="time" label="Hora" name="time" value={time}
                        onChange={e => {
                            setTime(e.target.value)
                        }}
                    />
                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>

            <main>
                {teachers.map(teacher => 
                    (<TeacherItem 
                        key={teacher.id}
                        id={teacher.id}
                        bio={teacher.bio}
                        name={teacher.name} 
                        avatar={teacher.avatar} 
                        subject={teacher.subject} 
                        cost={teacher.cost}
                        whatsapp={teacher.whatsapp}
                    />)
                )}
            </main>
        </div>
    )
}

export default TeacherList