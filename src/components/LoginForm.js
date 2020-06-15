import React from 'react';
import {
  Button,
  Box,
  makeStyles,
  Divider,
  darken,
} from '@material-ui/core';
import FormField from './FormField';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

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
}));

const LoginForm = ({ handleDialog }) => {
  const classes = useStyle();

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    axios({
      method: 'POST',
      url: '/api/login',
      data,
      responseType: 'JSON'
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleClick = (event) => {
    if (handleDialog) {
      handleDialog('register');
      event.preventDefault();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      />
      <NavLink className={classes.link} exact to="/forgotpassword" onClick={() => handleDialog('login', false)}>Forgot Password?</NavLink>
      <Button className={classes.formButton} type="submit" fullWidth>Log In</Button>
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
  );
};

export default LoginForm;