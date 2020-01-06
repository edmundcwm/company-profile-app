import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import useHeaderStyles from './HeaderStyles';

export default function Header(props) {
  const classes = useHeaderStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={props.toggleDrawer}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap className={classes.logo}>
          {/* <img src={logo} alt="Foxwood" /> */}
        </Typography>
        <Link
          to={{
            pathname: '/auth',
            state: { isLogout: true }
          }}
          style={{ color: 'inherit' }}
        >
          <ExitToAppIcon />
        </Link>
      </Toolbar>
    </AppBar>
  );
}
