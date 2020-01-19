import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Switch, Route } from 'react-router-dom';
import roles from '../settings/roles';
// import NotFound from './404/NotFound';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex'
  },
  offset: theme.mixins.toolbar,
  main: {
    flexGrow: 1,
    padding: theme.spacing(7)
  }
}));

export default function Main(props) {
  const userRole = Cookies.get('user_role') ? Cookies.get('user_role') : '';
  const { [userRole]: currentRole } = roles;
  const routes = currentRole
    ? currentRole.routes.map(route => (
        <Route
          key={route.id}
          exact={route.exact || false}
          path={`${props.match.path}${route.path}`}
          component={route.component}
        />
      ))
    : null;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.wrapper}>
      <CssBaseline />
      <Header toggleDrawer={handleDrawerToggle} />
      <Sidebar mobileOpen={mobileOpen} toggle={handleDrawerToggle} path={props.match.path} />
      <main className={classes.main}>
        <div className={classes.offset} />
        <Switch>{routes}</Switch>
      </main>
    </div>
  );
}
