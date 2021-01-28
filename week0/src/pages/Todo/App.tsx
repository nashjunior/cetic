import React from 'react'
import NavBar from '../Todo/components/Navbar';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  return (
    <div className="uk-container">
      <NavBar />
      <TodoList/>
    </div>
  )
}

export default App;