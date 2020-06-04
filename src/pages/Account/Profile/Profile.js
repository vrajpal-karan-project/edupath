import React, { useState } from 'react';
import {
  Grid,
  makeStyles,
  Divider,
  Button,
  darken,
  Box,
  Paper,
} from '@material-ui/core';
import FormField from '../../../components/FormField';
import { useForm } from 'react-hook-form';
import axios from 'axios';

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

const Profile = () => {
  const classes = useStyle();

  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const handleUpload = ({ target }) => {
    const { files } = target;
    setSelectedAvatar(files[0]);
  }

  const handleRemove = (event, removing) => {
    event.target.value = null;
    setSelectedAvatar(undefined);

    if (removing)
      event.preventDefault();
  }

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
          <Box className={classes.formTitle}>Edit Profile</Box>
          <Divider />
          <Box className={classes.formBody}>
            <FormField
              key="avatar"
              type="file"
              name="avatar"
              selectedAvatar={selectedAvatar}
              handleUpload={handleUpload}
              handleRemove={handleRemove}
              errors={errors}
            />
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
              key="about"
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
              <Button className={classes.submitButton} type="submit">Update</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default Profile;