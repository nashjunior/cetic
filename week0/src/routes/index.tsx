import React from 'react'
import { Route, Switch } from 'react-router-dom'
import App from '../pages/Todo/App'
import NewTodo from '../pages/Todo/new'


const Routes: React.FC = () => {
  return(
    <Switch>
      <Route path="/" component={App} exact/>
      <Route path="/create" component={NewTodo} />
    </Switch>
  )
}

export default Routes