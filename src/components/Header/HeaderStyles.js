import { makeStyles } from '@material-ui/core/styles';
import common from '@material-ui/core/colors/common';

const useHeaderStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: common.black,
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
      marginRight: 0
    }
  },
  logo: {
    flexGrow: 1,
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'left'
    }
  }
}));
export default useHeaderStyles;
