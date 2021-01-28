import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import { useTodo } from '../../../contexts/TodoContext';

const schema = Yup.object().shape({
  title: Yup.string().required('Tarefa Invalida'),
}).required('Falta algo')

type SchemaFormat = Yup.InferType<typeof schema>

const NewTodo: React.FC = () => {
  const {addTodo} = useTodo()
  const history = useHistory()

  const {register, handleSubmit, errors} = useForm<SchemaFormat>({
    resolver: yupResolver(schema),
    defaultValues: {} as SchemaFormat,
  })


  const onSubmit = (data: SchemaFormat):void => {
    addTodo(data.title);
    history.push('/')
  }
  
  return(

    <div className="uk-container">      
      <Link to="/" className="uk-navbar-item uk-logo">
        <h4>Minha lista de tarefas</h4>
      </Link>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h4>Nova Tarefa</h4>
        <div className="uk-margin uk-width-1-1"></div>
        <input type="text" name="title" id="title" placeholder="Nova tarefa..." ref={register}/>
        <span>
          <small><strong className="uk-text-danger">{errors.title?.message}</strong></small>
          <div className="uk-width-1-1"><button type="submit" className="uk-button">add</button></div>
        </span>
      </form>


    </div>
  )
}

export default NewTodo;