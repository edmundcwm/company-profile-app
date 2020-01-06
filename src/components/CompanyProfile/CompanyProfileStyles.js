import { makeStyles } from '@material-ui/core/styles';

const useCompanyProfileStyles = makeStyles(theme => ({
  '@global': {
    body: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(7)
  },
  bdbGray: {
    borderColor: '#e0e0e0'
  },
  bdb0: {
    borderBottom: 'none'
  },
  bold: {
    fontWeight: 700
  },
  height100: {
    height: '100%'
  },
  tableHeadingLight: {
    backgroundColor: theme.palette.grey[100]
  },
  tableCell: {
    padding: `${theme.spacing(2)}px ${theme.spacing(5)}px`
  },
  companyProfilePaper: {
    height: '100%',
    paddingBottom: theme.spacing(4)
  },
  updateBtn: {
    textTransform: 'none',
    marginLeft: theme.spacing(4),
    fontWeight: 700
  }
}));

export default useCompanyProfileStyles;
