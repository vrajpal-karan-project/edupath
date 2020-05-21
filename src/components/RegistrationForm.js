import React from 'react';
import {
  InputBase,
  Button,
  Box,
  makeStyles,
  Divider,
  FormHelperText,
  darken
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const useStyle = makeStyles(theme => ({
  formField: {
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
    fontWeight: 'bold',
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

const RegistrationForm = ({ handleDialog }) => {
  const classes = useStyle();

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    axios({
      method: 'POST',
      url: '/api/signup',
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
      handleDialog('login');
      event.preventDefault();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className={classes.formField}>
        <InputBase
          className={classes.formInput}
          name="fullname"
          inputProps={{ maxLength: 40 }}
          placeholder="Full Name"
          inputRef={register({
            required: {
              value: true,
              message: "This field is required"
            },
            maxLength: {
              value: 40, message: "Please enter no more than 40 characters"
            }
          })}
          fullWidth />
        <FormHelperText error>
          {errors.fullname && errors.fullname.message}
        </FormHelperText>
      </Box>
      <Box className={classes.formField}>
        <InputBase
          className={classes.formInput}
          name="email"
          inputProps={{ maxLength: 100 }}
          placeholder="Email"
          type="email"
          inputRef={register({
            required: {
              value: true,
              message: "This field is required"
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Please enter valid email"
            },
            maxLength: {
              value: 100,
              message: "Please enter no more than 100 characters"
            }
          })} fullWidth />
        <FormHelperText error>
          {errors.email && errors.email.message}
        </FormHelperText>
      </Box>
      <Box className={classes.formField}>
        <InputBase
          className={classes.formInput}
          name="password"
          inputProps={{ maxLength: 20 }}
          placeholder="Password"
          type="password"
          inputRef={register({
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
          fullWidth />
        <FormHelperText error>
          {errors.password && errors.password.message}
        </FormHelperText>
      </Box>
      <Button className={classes.formButton} type="submit" fullWidth>Sign Up</Button>
      <Divider />
      <Box className={classes.footerText}>
        Already have an account?&nbsp;
        <NavLink
          to={{
            pathname: "/login",
            state: { modal: true },
          }}
          onClick={handleClick}
        >
          Log In
        </NavLink>
      </Box>
    </form>
  );
};

export default RegistrationForm;