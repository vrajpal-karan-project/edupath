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
import { Alert, AlertTitle } from '@material-ui/lab';
import { useForm } from 'react-hook-form';
import FormField from '../../../components/FormField';
import { changePassword } from '../../../service/user.service';
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
  formMessage: {
    marginBottom: theme.spacing(2),
  }
}));

const ChangePassword = () => {
  const classes = useStyle();

  const { user, token } = isAuthenticated();

  const { register, handleSubmit, errors, reset } = useForm();

  const [message, setMessage] = React.useState({ serverErrors: "", loading: false, success: false });
  const { serverErrors, loading, success } = message;

  const onSubmit = data => {
    setMessage({ ...message, serverErrors: false, loading: true });

    changePassword(user._id, token, data)
      .then(response => {
        console.log("response:", response);
        if (response.errors) {
          setMessage({
            serverErrors: response.errors,
            loading: false,
            success: false
          });
          // getting serverErrors.email when duplicate eamail is passed, So have to display it properly as well as success message
          console.log("Errors in Changing Password:", response.errors);
        } else {
          reset();
          setMessage({
            serverErrors: "",
            success: true
          });
          console.log("successfully Changed Password");
        }
      }).catch(err => console.error("Err in ChangePassword:", err))
  };

  const resetOnChange = event => {
    const { name } = event.target;
    serverErrors[name] && serverErrors[name].length && setMessage({ message, serverErrors: { serverErrors, [name]: "" } });
  }

  const SuccessMessage = () => (
    <Alert severity="success" className={classes.formMessage} style={{ display: success ? "" : "none" }}>
      <AlertTitle>Success</AlertTitle>
         Your Password has been Changed successfully.
    </Alert>
  );

  const ErrorMessage = ({ errors }) => (
    <Alert severity="error" className={classes.formMessage} style={{ display: errors.old_password || errors.password ? "" : "none" }}>
      <AlertTitle>Failed To Change Password&nbsp;!</AlertTitle>
      <strong>
        <div>{errors.old_password}</div>
        <div>{errors.password}</div>
      </strong>
    </Alert>
  );


  return (
    <Grid item md={6} sm={12} xs={12}>
      <Paper elevation={4}>
        <form onSubmit={handleSubmit(onSubmit)}>

          <Box className={classes.formTitle}>Change Password</Box>
          <Divider />

          <Box className={classes.formBody}>

            <SuccessMessage />
            <ErrorMessage errors={serverErrors} />

            <FormField
              key="old_password"
              type="password"
              name="old_password"
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
              label="Old Password"
              errors={errors}
              serverErrors={serverErrors}
              resetOnChange={resetOnChange}
            />
            <FormField
              key="password"
              type="password"
              name="password"
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
              label="New Password"
              errors={errors}
              serverErrors={serverErrors}
              resetOnChange={resetOnChange}
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

export default ChangePassword;