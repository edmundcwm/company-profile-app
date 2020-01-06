import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import useSideNavStyles from './SideNavStyles';

export default function SideNav(props) {
  const classes = useSideNavStyles();

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      {/* Mobile menu */}
      <Hidden smUp implementation="css">
        <Drawer
          // container={container}
          variant="temporary"
          open={props.mobileMenu}
          onClose={props.closeMobileMenu}
          classes={
            {
              // paper: classes.drawerPaper
            }
          }
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          Hello Side Nav
        </Drawer>
      </Hidden>
      {/* Desktop menu */}
      <Hidden xsDown implementation="css">
        <Drawer
          classes={
            {
              // paper: classes.drawerPaper1
            }
          }
          variant="permanent"
          open
        >
          Hello desktop menu
        </Drawer>
      </Hidden>
    </nav>
  );
}
