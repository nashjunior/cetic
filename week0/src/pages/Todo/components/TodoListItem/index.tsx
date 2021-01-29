import React from 'react'
import { useTodo } from '../../../../contexts/TodoContext';
import Todo from '../../../../models/Todo';

type TodoListItemProps = {
  todo: Todo
}

const TodoListItem: React.FC<TodoListItemProps> = ({todo}) => {
  const {toggle, removeTodo} = useTodo()

  function onRemoveTodo(todo: Todo){
    removeTodo(todo)
  }
  
  return (
    <tr className="uk-animation-slide-bottom-medium">
      <td className="uk-width-auto">
        <label htmlFor="">
          <input 
          type="checkbox" 
          className="uk-checkbox" 
          checked={todo.getDone()}
          onChange={() => toggle(todo)}
          />
        </label>
      </td>
        <td className="uk-width-expand">{todo.getTitle()}</td>
        <td className="uk-width-auto">{todo.getId()}</td>
        <td className="uk-width-auto">
          <button className="uk-icon-button uk-button-danger" uk-icon="trash" onClick={() => onRemoveTodo(todo)}/>
        </td>
    </tr>
  )
}

export default TodoListItem;