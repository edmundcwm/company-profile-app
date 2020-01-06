import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import getHomePath from '../../helpers/users';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import roles from '../../settings/roles';
import settings from '../../settings/settings';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useInputs from '../../hooks/useInputs';
import useLoginStyles from './LoginStyles';
import { authService } from '../../services/auth/auth';

/**
 * Login Component
 */
export default function Login(props) {
  const classes = useLoginStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const email = useInputs('');
  const password = useInputs('');

  // Handles basic form validation
  function validateForm() {
    // value of all input fields
    const inputs = {
      userEmail: email.value,
      userPass: password.value
    };
    // error status of input fields
    const fieldErrors = {
      userEmail: false,
      userPass: false
    };

    // result of form validation
    let result = false;

    // Pass validation if both inputs are filled
    if (inputs.userEmail && inputs.userPass) {
      result = true;
    } else {
      // determine which input is empty and set its error status to true
      Object.keys(inputs).forEach(field => {
        if (!inputs[field]) {
          fieldErrors[field] = true;
        }
      });
    }
    return {
      result,
      fieldErrors
    };
  }

  // Login form submit event handler
  function handleSubmit(e) {
    e.preventDefault();
    const { value: userEmail } = email;
    const { value: userPass } = password;
    const data = {
      username: userEmail,
      password: userPass
    };

    const validate = validateForm();

    if (validate.result) {
      // reset field errors
      setErrors({});

      // enable loading while credentials are being authenticated
      setIsLoading(true);

      // Authenticate with WordPress
      authService
        .login(data)
        .then(response => {
          const { user_role, user_email, user_id, token } = response.data;
          Cookies.set(settings.token, token); //set JWT token
          Cookies.set('user_id', user_id); //set user id
          Cookies.set('user_email', user_email); //set user email
          // set user role (this assumes user only has one role since we are just getting the first item from the array)
          Cookies.set('user_role', user_role[0]);
          // login and redirect to respective home page based on roles
          const homePath = getHomePath(roles, user_role[0]);
          props.history.push(homePath);
        })
        .catch(err => {
          const { status } = err.response;
          let errorMessages = {
            404: 'Oops. Something went wrong. Please contact support',
            403: 'Invalid credentials. Please try again'
          };

          const errorCode = Object.keys(errorMessages).filter(code => {
            return status === parseInt(code);
          });

          // remove Loading status
          setIsLoading(false);
          setErrors({
            userCredentials: errorMessages[errorCode]
          });
        });
    } else {
      setErrors({
        ...validate.fieldErrors
      });
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.wrapper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Welcome
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email*"
            error={errors.userEmail}
            className={classes.input}
            type="email"
            // value={email}
            name="email"
            variant="outlined"
            {...email}
          />
          <TextField
            fullWidth
            label="Password*"
            error={errors.userPass}
            className={classes.input}
            type="password"
            name="password"
            variant="outlined"
            {...password}
          />
          {errors.userCredentials ? (
            <Typography className={classes.error}>{errors.userCredentials}</Typography>
          ) : (
            ''
          )}
          <Button type="submit" variant="contained" size="large" fullWidth color="primary">
            {isLoading ? 'Logging In...' : 'Login'}
          </Button>
        </form>
      </div>
    </Container>
  );
}
