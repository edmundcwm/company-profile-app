import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 250;

const useSideNavStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(7)
  },
  logo: {
    flexGrow: 1,
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'left'
    }
  },
  profileAvatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    margin: `${theme.spacing(2)}px auto`
  },
  navMenuIcon: {
    minWidth: 35
  }
}));
export default useSideNavStyles;
