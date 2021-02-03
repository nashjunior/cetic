import { Route, Switch } from "react-router-dom";
import CollectPoint from "../pages/CollectPoint";
import CreatePoint from "../pages/CreatePoint";
import Home from "../pages/Home";

const Routes: React.FC = () =>{
  return (
    <Switch>
      <Route exact component={Home} path="/"/>
      <Route component={CreatePoint} path="/create-point"/>
      <Route component={CollectPoint} path="/collect-point"/>
    </Switch>
  )
}

export default Routes;