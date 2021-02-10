import React, { FormEvent, useState } from 'react'
import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import './styles.css'
import warningIcon from '../../assets/images/icons/warning.svg'
import TextArea from '../../components/TextArea'
import Select from '../../components/Select'
import api from '../../services/api'
import { useHistory } from 'react-router'

type ScheduleItemsType = {
    week_day: string;
    from: string;
    to: string;
}

const TeacherForm: React.FC = () => {
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [bio, setBio] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')
    const history = useHistory()

    const [scheduleItems, setScheduleItems] = useState<ScheduleItemsType[]>([
        {
            week_day: '',
            from: '',
            to: ''
        }
    ])

    function addNewScheduleItem() {
        setScheduleItems([...scheduleItems, {
            week_day: '',
            from: '',
            to: ''
        }])
    }

    async function handleCreateClass(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        try {
            await api.post('classes', {
                name,
                avatar,
                whatsapp,
                bio,
                subject,
                cost: Number(cost),
                schedule: scheduleItems
            })
            history.push("/")
        } catch (error) {
            alert('erro no cadastro')
        }

    }

    function setScheduleItemValue(position: number, key: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if(index === position)
                return {...scheduleItem, [key]: value}
            
            return scheduleItem
        })

        setScheduleItems(updatedScheduleItems)

    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader title="Que incrível que você quer dar aulas" description="O primeiro passo é preencher esse formulário de inscrição"/>
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus Dados</legend>
                        
                        <Input type="text" name="name" label="Nome" value={name} onChange={e => (setName(e.target.value))}/>

                        <Input type="text" name="avatar" label="Avatar" value={avatar} onChange={e => (setAvatar(e.target.value))}/>

                        <Input type="text" name="whatsapp" label="whatsapp" value={whatsapp} onChange={e => (setWhatsapp(e.target.value))}/>

                        <TextArea name="bio" label="Biografia" value={bio} onChange={e => (setBio(e.target.value))}/>
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula
                        </legend>
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
                            <Input type="text" name="cost" label="Custo da sua hora por aula" 
                                value={cost} 
                                onChange={e => (setCost(e.target.value))}
                            />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}> + Novo Horario</button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => (
                            
                            <div key={scheduleItem.week_day} className="schedule-item">
                                <Select onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)} 
                                    name="week_day" label="Dia da Semana" 
                                    options={[
                                                {value: '0', label: 'Domingo'},
                                                {value: '1', label: 'Segunda-Feira'},
                                                {value: '2', label: 'Terça-Feira'},
                                                {value: '3', label: 'Quarta-Feira'},
                                                {value: '4', label: 'Quinta-Feira'},
                                                {value: '5', label: 'Sexta-Feira'},
                                                {value: '6', label: 'Sábado'},
                                                
                                            ]}
                                    value={scheduleItem.week_day}
                                />

                                <Input type="time" name="from" label="Das" value={scheduleItem.from} onChange={e => setScheduleItemValue(index, 'from', e.target.value)}/>
                                <Input type="time" name="to" label="Até" value={scheduleItem.to} onChange={e => setScheduleItemValue(index, 'to', e.target.value)}/>
                            </div>
                        ))}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante"/>
                            Importante!<br/>
                            Preencha todos os dados
                        </p>

                        <button type="submit">Salvar cadastro</button>

                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm