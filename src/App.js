import React, { useState } from 'react';
import Login from './components/Login/Login';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import CompanyProfile from './components/CompanyProfile/CompanyProfile';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Cookies from 'js-cookie';
import Header from './components/Header/Header';
import { CompanyProfileProvider } from './components/Context/CompanyProfileContext';

function App() {
  const [isLoading, setLoading] = useState(false);
  const token = Cookies.get('fxtoken');
  if (isLoading) {
    return <p>Loading...</p>;
  } else {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/auth" />} />
            <Route exact path="/auth" component={Login} />
            <CompanyProfileProvider>
              <PrivateRoute path="/app/company-profile" component={CompanyProfile} />
            </CompanyProfileProvider>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
