import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';


import {
  SignUp as SignUpView,
  Login as LoginView,
  Favorite as FavoriteView,
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/sign-up"
      />      
      <Route path="/log-in" exact>
        <LoginView/>
      </Route>
      <Route path="/sign-up" exact>
        <SignUpView/>
      </Route>      
      <Route path="/favorite" exact>
        <FavoriteView/>
      </Route>      
    </Switch>
  );
};

export default Routes;
