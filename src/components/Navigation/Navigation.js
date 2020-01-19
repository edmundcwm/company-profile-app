import React from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import roles from '../../settings/roles';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  navMenuIcon: {
    minWidth: 35
  },
  selected: {
    color: theme.palette.primary.main
  }
}));

const MainNav = props => {
  const classes = useStyles();
  const userRole = Cookies.get('user_role');
  const { [userRole]: currentRole } = roles;
  const links = currentRole.routes.map(({ icon: Icon, ...route }) => {
    const link = React.forwardRef((props, ref) => (
      <NavLink {...props} activeClassName={classes.selected} />
    ));
    return (
      <MenuItem key={route.id} component={link} to={`${props.path}${route.path}`}>
        <ListItemIcon classes={{ root: classes.navMenuIcon }}>
          <Icon />
        </ListItemIcon>
        <Typography>{route.title}</Typography>
      </MenuItem>
    );
  });
  return (
    <>
      <MenuList>{links}</MenuList>
    </>
  );
};
export default MainNav;
