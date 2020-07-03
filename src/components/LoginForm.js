import React from 'react';
import {
  Button,
  Box,
  makeStyles,
  Divider,
  darken,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import FormField from './FormField';
import { useForm } from 'react-hook-form';
import { NavLink, Redirect } from 'react-router-dom';
import { login, authenticate, isAuthenticated } from '../service/auth.service';

const useStyle = makeStyles(theme => ({
  formField: {
    textAlign: 'right',
    marginBottom: theme.spacing(2),
  },
  formInput: {
    borderRadius: theme.shape.borderRadius,
    border: '1px solid #25274D',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  link: {
    textDecoration: 'none',
    color: '#3F51B5',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  formButton: {
    backgroundColor: '#5CDB94',
    color: '#F2F2F2',
    fontWeight: 'bolder',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    '&:hover': {
      backgroundColor: darken('#5CDB94', 0.15),
    },
  },
  footerText: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: '#25274D',
  },
  formMessage: {
    marginBottom: theme.spacing(2),
  }
}));

const LoginForm = ({ handleDialog }) => {
  const classes = useStyle();

  const { register, handleSubmit, errors } = useForm();

  const [message, setMessage] = React.useState({ serverErrors: "", loading: false, success: false });
  const { serverErrors, loading, success } = message;
  const { user } = isAuthenticated();

  const resetOnChange = event => {
    const { name } = event.target;
    serverErrors[name] && serverErrors[name].length && setMessage({ message, serverErrors: { serverErrors, [name]: "" } });
  }

  const onSubmit = data => {
    setMessage({ ...message, serverErrors: false, loading: true });
    login(data).then(response => {
      console.log("Response:", response);
      if (response.errors) {
        setMessage({
          serverErrors: response.errors,
          loading: false,
        });
        // getting serverErrors.email when duplicate eamail is passed, So have to display it properly as well as success message
        console.log("Errors in Login:", response.errors);
      } else {
        authenticate(response, () => {
          setMessage({
            serverErrors: "",
            success: true
          });
          handleDialog("login", false);
          console.log("successfully LoggedIn");
        });
      }
    }).catch(err => console.log("LogIn REQ Failed", err));
  };

  const handleClick = (event) => {
    if (handleDialog) {
      handleDialog('register');
      event.preventDefault();
    }
  };

  const performRedirect = () => {
    if (success) {
      if (user && user.role === 2) {
        return <Redirect to="/admin" />
      }
      else {
        return <Redirect to="/profile" />
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const SuccessMessage = () => (
    <Alert severity="success" className={classes.formMessage} style={{ display: success ? "" : "none" }}>
      <AlertTitle>LoggedIn succesfully</AlertTitle>
         Redirecting to <strong><NavLink to="/home">HomePage</NavLink> </strong>
    </Alert>
  );

  const ErrorMessage = ({ errors }) => (
    <Alert severity="error" className={classes.formMessage} style={{ display: errors.email || errors.password ? "" : "none" }}>
      <AlertTitle>Log in Failed !</AlertTitle>
      <strong>
        <div>{errors.email}</div>
        <div>{errors.password}</div>
      </strong>
    </Alert>
  );

  const LoadingMessage = () => (
    <Alert variant="outlined" severity="info" className={classes.formMessage} style={{ display: loading ? "" : "none" }}>
      Logging In...
    </Alert>
  );


  return (<>
    <form onSubmit={handleSubmit(onSubmit)}>

      <LoadingMessage />

      <SuccessMessage />

      <ErrorMessage errors={serverErrors} />

      <FormField
        key="email"
        type="email"
        name="email"
        placeholder="Email"
        inputProps={{ maxLength: 100 }}
        validate={register({
          required: {
            value: true,
            message: "This field is required"
          },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "Please enter valid email"
          }, maxLength: {
            value: 100,
            message: "Please enter no more than 100 characters"
          }
        })}
        errors={errors}
        serverErrors={serverErrors}
        resetOnChange={resetOnChange}
      />
      <FormField
        key="password"
        type="password"
        name="password"
        placeholder="Password"
        inputProps={{ maxLength: 20 }}
        validate={register({
          required: {
            value: true,
            message: "This field is required"
          },
          minLength: {
            value: 8,
            message: "Password should be atleast 8 characters long"
          },
          maxLength: {
            value: 20,
            message: "Please enter no more than 20 characters"
          }
        })}
        errors={errors}
        serverErrors={serverErrors}
        resetOnChange={resetOnChange}
      />
      <NavLink className={classes.link} exact to="/forgotpassword" onClick={() => handleDialog('login', false)}>Forgot Password?</NavLink>
      <Button className={classes.formButton} type="submit" fullWidth disabled={loading}>Log{loading && "ging"} In</Button>
      <Divider />
      <Box className={classes.footerText}>
        Create an account?&nbsp;
        <NavLink
          className={classes.link}
          exact
          to="/signup"
          onClick={handleClick}
        >
          Sing Up
        </NavLink>
      </Box>
    </form>
    {performRedirect()}</>
  );
};

export default LoginForm;