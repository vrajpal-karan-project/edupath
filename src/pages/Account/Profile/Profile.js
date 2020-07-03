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
import { Alert, AlertTitle } from '@material-ui/lab';
import FormField from '../../../components/FormField';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { updateUser } from '../../../service/user.service';
import { isAuthenticated } from '../../../service/auth.service';

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

  const { user, token } = isAuthenticated();

  const { register, handleSubmit, errors, reset } = useForm();

  const [message, setMessage] = React.useState({ serverErrors: "", loading: false, success: false });
  const { serverErrors, loading, success } = message;

  const onSubmit = data => {
    setMessage({ ...message, serverErrors: false, loading: true });

    updateUser(user._id, token, data)
      .then(response => {
        console.log("Response:", response);
        if (response.errors) {
          setMessage({
            serverErrors: response.errors,
            loading: false,
            success: false
          });
          // getting serverErrors.email when duplicate eamail is passed, So have to display it properly as well as success message
          console.log("Errors in Profile Update:", response.errors);
        } else {
          reset();
          setMessage({
            serverErrors: "",
            success: true
          });
          setTimeout(() => <Redirect to="/" />, 2000);
          console.log("successfully Updated Profile");
        }
      }).catch(err => console.log("ERROR IN Profile Update", err));

  };

  const resetOnChange = event => {
    const { name } = event.target;
    serverErrors[name] && serverErrors[name].length && setMessage({ message, serverErrors: { serverErrors, [name]: "" } });
  }

  const SuccessMessage = () => (
    <Alert severity="success" className={classes.formMessage} style={{ display: success ? "" : "none" }}>
      <AlertTitle>Success</AlertTitle>
         Your Profile has been Updated.
    </Alert>
  );

  const ErrorMessage = ({ errors }) => (
    <Alert severity="error" className={classes.formMessage} style={{ display: errors.email || errors.fullname || errors.password ? "" : "none" }}>
      <AlertTitle>Error in Updating the Profile&nbsp;!</AlertTitle>
      <strong>
        <div>{errors.fullname}</div>
        <div>{errors.email}</div>
        <div>{errors.password}</div>
      </strong>
    </Alert>
  );

  return (
    <Grid item md={6} sm={12} xs={12}>
      <Paper elevation={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className={classes.formTitle}>Edit Profile</Box>
          <Divider />
          <Box className={classes.formBody}>

            <SuccessMessage />
            <ErrorMessage errors={serverErrors} />
            
            <FormField
              key="avatar"
              type="file"
              name="avatar"
              selectedAvatar={selectedAvatar}
              handleUpload={handleUpload}
              handleRemove={handleRemove}
              errors={errors}
              serverErrors={serverErrors}
              resetOnChange={resetOnChange}
              defaultValue={user.avatar}
            />
            <FormField
              key="fullname"
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
              label="Full Name"
              errors={errors}
              serverErrors={serverErrors}
              resetOnChange={resetOnChange}
              defaultValue={user.fullname}
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
              label="Email"
              errors={errors}
              serverErrors={serverErrors}
              resetOnChange={resetOnChange}
              defaultValue={user.email}
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
              label="About"
              errors={errors}
              serverErrors={serverErrors}
              resetOnChange={resetOnChange}
              defaultValue={user.about}
            />
          </Box>
          <Divider />
          <Grid className={classes.formFooter} container justify="space-around">
            <Grid item>
              <Button className={classes.submitButton} type="submit">{loading ? "Updating..." : "Update"}</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default Profile;