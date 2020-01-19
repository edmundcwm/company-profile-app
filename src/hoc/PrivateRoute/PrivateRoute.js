import React from 'react';
import Cookies from 'js-cookie';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest }) {
  const token = Cookies.get('fxtoken');
  return (
    <Route
      {...rest}
      render={props => (token ? <Component {...props} /> : <Redirect to="/auth" />)}
    />
  );
}
