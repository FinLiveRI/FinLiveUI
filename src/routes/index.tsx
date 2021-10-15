import { Switch, Redirect, Route } from 'react-router-dom';
import { AnimalView, GroupView, LoginView } from '../views';
import PrivateRoute from './PrivateRoute';

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Redirect to="/animal" />
    </Route>
    <Route path="/login" component={LoginView} />
    <PrivateRoute path="/animal">
      <AnimalView />
    </PrivateRoute>
    <PrivateRoute path="/group">
      <GroupView />
    </PrivateRoute>
    <Redirect from="*" to="/" />
  </Switch>
);

export default Routes;