import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateOrphanage from '../pages/CreateOrphanage';
import Landing from '../pages/Landing';
import Orphanage from '../pages/Orphanage';
import OrphanagesMap from '../pages/OrphanagesMap';

const Routes:React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
      <Route exact path="/" component={Landing} />
        <Route path="/app" component={OrphanagesMap} />
        <Route path="/orphanage/create" component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;