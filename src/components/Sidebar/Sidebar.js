import React from 'react';
import { Divider } from '@material-ui/core';
import Navigation from '../Navigation/Navigation';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Avatar from '@material-ui/core/Avatar';
import ProfileAvatar from '../../assets/images/avatar.jpg';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  offset: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  profileAvatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    margin: `${theme.spacing(2)}px auto`
  }
}));

export default function Sidebar(props) {
  const { container, mobileOpen, toggle } = props;

  const classes = useStyles();
  const drawer = (
    <div>
      <div className={classes.offset} />
      <Divider />
      <Avatar alt="Edmund" src={ProfileAvatar} className={classes.profileAvatar} />
      <Divider />
      <Navigation path={props.path} />
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      {/* Mobile menu */}
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={toggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      {/* Desktop menu */}
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}
