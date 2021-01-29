import React, { useEffect, useState } from 'react'
import { useTodo } from '../../../contexts/TodoContext';
import * as Yup from 'yup'
import { Link, useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Todo from '../../../models/Todo';

type EditTodoParam = {
  id: string
}

const EditTodo: React.FC = () => {
  const {todos,editTodo} = useTodo()
  const {id} = useParams<EditTodoParam>()
  const [todo, setTodo] = useState<Todo | undefined>()
  const history = useHistory()
  
  const schema = Yup.object().shape({
    title: Yup.string().required('Tarefa Invalida').test('isValid', 'The title already exists', value => {
      const todoExists =  todos.find(todo => todo.getTitle() === value && Number.parseInt(id) !==todo.getId());
      return todoExists ? false : true
    })
  }).required('Falta algo')
  
  type SchemaFormat = Yup.InferType<typeof schema>
  
  const {register, handleSubmit, errors} = useForm<SchemaFormat>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: todo?.getTitle()
    },
  })

  const onSubmit = (data: SchemaFormat):void => {
    todo?.setTitle(data.title);
    setTodo(todo)
    if(todo) editTodo(todo);
    history.push('/')
  }

  useEffect(() => {
    try {
      const todoId = Number.parseInt(id, 10);
      const foundedTodo = todos.find(todoSearch => todoSearch.getId() === todoId);
      if(!foundedTodo) throw new Error();

      setTodo(foundedTodo)
      
    } catch (error) {
      history.push('/')
    }
  }, [todos, id, history])

  return (
    <div className="uk-container">      
      <Link to="/" className="uk-navbar-item uk-logo">
        <h4>Minha lista de tarefas</h4>
      </Link>

      {todo && (
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4>Editar Tarefa</h4>
        <div className="uk-margin uk-width-1-1"></div>
        
        <input 
          type="text" 
          name="title" 
          id="title" 
          placeholder="Nova tarefa..." 
          ref={register} 
          defaultValue={todo.getTitle()}
          />
        <span>
          <small><strong className="uk-text-danger">{errors.title?.message}</strong></small>
          <div className="uk-width-1-1"><button type="submit" className="uk-button">add</button></div>
        </span>
      </form>
      )}
    </div>

  )
}
export default EditTodo;