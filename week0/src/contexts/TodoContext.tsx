import React, { createContext, useContext, useEffect, useState } from 'react'
import Todo from '../models/Todo'
import { get, save } from '../services/Todo'

type TodoContextType = {
  todos: Todo[];
  addTodo(title: string): void;
  removeTodo(todo: Todo): void;
  toggle(todo: Todo): void
}

const TodoContext = createContext<TodoContextType>({
  addTodo: () => {},
  removeTodo: () => {},
  toggle: () => {},
  todos: [],
}) 

export const TodoContextProvider: React.FC = ({children}) => {
  const [todos, setTodos] = useState<Todo[]>(get)
  console.log(todos);
  

  const addTodo = (title: string) => {
    const id = todos.length +1;
    setTodos([...todos, new Todo({id, title, done: false})])
    
  };

  useEffect(() => {
    save(todos)
  }, [todos])

  const removeTodo = (todo: Todo) => {
    const index = todos.indexOf(todo);
    const filteredTodos = todos.filter((_, i) => i!==index);
    const resetedTodosIds = filteredTodos.map<Todo>((todo, index) => {
      todo.setId(index+1)
      return todo;
    })
    setTodos([...resetedTodosIds])
  }
  const toggle = (todo: Todo) => {
    const index = todos.indexOf(todo);
    
    todos[index].setDone(!todo.getDone())
    setTodos([...todos])
  };
  return (
    <TodoContext.Provider value={{addTodo, removeTodo, toggle, todos}}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodo = (): TodoContextType => {
  const todoContext = useContext(TodoContext)
  if(!todoContext) throw new Error('Todo context deve ser inicializado')
  return todoContext;
}