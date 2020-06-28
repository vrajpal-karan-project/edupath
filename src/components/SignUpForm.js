import React from 'react';
import {
  Button,
  Box,
  makeStyles,
  Divider,
  darken
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import FormField from './FormField';
import { signup } from "../helper/auth.helper";

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

const SignUpForm = ({ handleDialog }) => {
  const classes = useStyle();

  const { register, handleSubmit, errors } = useForm();
  let serverErrors = {};

  const onSubmit = data => {
    // axios({
    //   method: 'POST',
    //   url: '/api/signup',
    //   data,
    //   responseType: 'JSON'
    // }).then((response) => {
    //   console.log(response);
    // }).catch((error) => {
    //   console.log(error);
    // });
    signup(data).then(response => {
      console.log("Response:", response);
      if (response.errors) {
        serverErrors = response.errors;  
        // getting serverErrors.email when duplicate eamail is passed, So have to display it properly as well as success message
        console.log("Errors in signup:", response.errors);
      } else {
        console.log("succeswsfully signedUp");
      }
    }).catch(err => console.log("ERROR IN SIGNUP", err));

  };

  const handleClick = (event) => {
    if (handleDialog) {
      handleDialog('login');
      event.preventDefault();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField
        key="name"
        name="fullname"
        placeholder="Full Name"
        inputProps={{ maxLength: 40 }}
        validate={register({
          required: {
            value: true,
            message: "This field is required"
          },
          maxLength: {
            value: 40, message: "Please enter no more than 40 characters"
          }
        })}
        errors={errors}
      />
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
      <Button className={classes.formButton} type="submit" fullWidth>Sign Up</Button>
      <Divider />
      <Box className={classes.footerText}>
        Already have an account?&nbsp;
        <NavLink
          to="/login"
          onClick={handleClick}
        >
          Log In
        </NavLink>
      </Box>
    </form>
  );
};

export default SignUpForm;