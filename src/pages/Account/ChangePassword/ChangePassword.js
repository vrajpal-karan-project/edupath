import React from 'react';
import {
  makeStyles,
  darken,
  Grid,
  Box,
  Divider,
  Button,
  Paper
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import FormField from '../../../components/FormField';

const useStyle = makeStyles(theme => ({
  formTitle: {
    color: darken('#25274D', 0.15),
    fontSize: 20,
    fontWeight: 'bolder',
    padding: theme.spacing(2),
  },
  formBody: {
    padding: theme.spacing(4),
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(2),
    }
  },
  formFooter: {
    padding: theme.spacing(2),
  },
  submitButton: {
    minWidth: 114,
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    color: 'white',
    fontWeight: 'bolder',
    backgroundColor: '#25274D',
    border: `2px solid ${darken('#25274D', 0.15)}`,
    '&:hover': {
      backgroundColor: darken('#5CDB94', 0.15),
      border: `2px solid ${darken('#5CDB94', 0.3)}`,
    }
  },
}));

const ChangePassword = () => {
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

  return (
    <Grid item md={6} sm={12} xs={12}>
      <Paper elevation={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className={classes.formTitle}>Change Password</Box>
          <Divider />
          <Box className={classes.formBody}>
            <FormField
              key="password"
              type="password"
              name="oldPassword"
              placeholder="Old Password"
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
            <FormField
              key="password"
              type="password"
              name="newPassword"
              placeholder="New Password"
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
          </Box>
          <Divider />
          <Grid className={classes.formFooter} container justify="space-around">
            <Grid item>
              <Button className={classes.submitButton} type="submit">Update</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default ChangePassword;