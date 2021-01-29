import React from 'react'
import { useTodo } from '../../../../contexts/TodoContext';
import TodoListItem from '../TodoListItem';

const TodoList: React.FC = () => {
  const {todos} = useTodo()

  return(
    <table className="uk-table">
      <caption> Lista de tarefas
      </caption>
        <thead>
          <tr>
            <th>#</th>
            <th>Tarefa</th>
            <></>
          </tr>
        </thead>
        <tbody>
          {todos?.map(todo => {
            
            
           return (<TodoListItem key={todo.getId()} todo={todo}/>)
          })}
        </tbody>
    </table>
  )
}

export default TodoList;