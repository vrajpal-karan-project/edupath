import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import {
  Grid,
  Box,
  makeStyles,
  Paper,
  Button,
  Divider,
  darken
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import FormField from '../../components/FormField';

const useStyle = makeStyles(theme => ({
  title: {
    fontSize: 28,
    color: '#25274D',
    fontWeight: 'bolder',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
  },
  body: {
    padding: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(1),
    }
  },
  formTitle: {
    color: darken('#5CDB94', 0.15),
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
  cancelButton: {
    minWidth: 114,
    fontWeight: 'bolder',
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    color: '#25274D',
    border: '2px solid transparent',
    boxShadow: '0px 0px 2px #25274D',
  },
}));

const AddUser = ({ baseUrl }) => {
  const classes = useStyle();

  const { userId } = useParams();

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    console.log(data);
    axios({
      method: 'POST',
      url: '/api/user/add',
      data,
      responseType: 'JSON'
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  };

  const type = userId ? 'Update' : 'Add';

  return (
    <Grid container justify="center">
      <Grid item xs={12} container justify="center">
        <Box className={classes.title}>User Management</Box>
      </Grid>
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Paper className={classes.body} elevation={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box className={classes.formTitle}>
              {type} User
            </Box>
            <Divider />
            <Box className={classes.formBody}>
              <FormField
                type="file"
                name="avatar"
                validate={register({
                  required: {
                    value: true,
                    message: "This field is required"
                  },
                })}
                errors={errors}
              />
              <FormField
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
              <FormField
                type="radio"
                inline={true}
                name="role"
                values={[
                  { label: "Student", value: "student" },
                  { label: "Instructor", value: "instructor" }
                ]}
                validate={register({
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                })}
                errors={errors}
              />
              <FormField
                multiline={true}
                rows={4}
                name="about"
                placeholder="About"
                inputProps={{ maxLength: 150 }}
                validate={register({
                  minLength: {
                    value: 5,
                    message: "About should be atleast 5 characters long"
                  },
                  maxLength: {
                    value: 150,
                    message: "Please enter no more than 150 characters"
                  }
                })}
                errors={errors}
              />
            </Box>
            <Divider />
            <Grid className={classes.formFooter} container justify="space-around">
              <Grid item>
                <Button className={classes.submitButton} type="submit">{type}</Button>
              </Grid>
              <Grid item>
                <Button className={classes.cancelButton} component={NavLink} to={`${baseUrl}/users`}>Cancel</Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AddUser;