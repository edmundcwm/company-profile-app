import React, { useState } from 'react';
import Login from './components/Login/Login';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './hoc/PrivateRoute/PrivateRoute';
import Main from './components/Main';
import { CompanyProfileProvider } from './components/Context/CompanyProfileContext';
import { OrderProvider } from './components/Context/OrderContext';

function App() {
  const [isLoading, setLoading] = useState(false);
  if (isLoading) {
    return <p>Loading...</p>;
  } else {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/auth" />} />
            <Route exact path="/auth" component={Login} />
            <OrderProvider>
              <CompanyProfileProvider>
                <PrivateRoute path="/app" component={Main} />
              </CompanyProfileProvider>
            </OrderProvider>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
