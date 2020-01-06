import { makeStyles } from '@material-ui/core/styles';

const useLoginStyles = makeStyles(theme => ({
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
  LoginContainer: {
    display: 'flex'
  },
  input: {
    marginBottom: 20
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    marginBottom: 20,
    backgroundColor: theme.palette.secondary.main
  },
  error: {
    color: theme.palette.error.main,
    marginBottom: 20
  },
  form: {
    marginTop: 30
  }
}));

export default useLoginStyles;
