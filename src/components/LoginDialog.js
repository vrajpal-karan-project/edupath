import React from 'react';
import {
  InputBase,
  Button,
  Link,
  Box,
  makeStyles,
  Divider,
  FormHelperText,
  Dialog,
  useTheme,
  useMediaQuery,
  DialogTitle,
  IconButton,
  DialogContent,
  darken,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const useStyle = makeStyles(theme => ({
  closeButton: {
    width: theme.spacing(6),
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  formField: {
    textAlign: 'right',
    marginBottom: theme.spacing(2),
  },
  formInput: {
    borderRadius: theme.shape.borderRadius,
    border: '1px solid #25274D',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
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

const LoginDialog = ({ dialog, handleDialog }) => {
  const classes = useStyle();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

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

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="xs"
      open={Boolean(dialog)}
      onClose={() => handleDialog('login', false)}
    >
      <DialogTitle>
        Log In
        <IconButton className={classes.closeButton} onClick={() => handleDialog('register', false)}>
          <span className="fa fa-close"></span>
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                }, maxLength: {
                  value: 100,
                  message: "Please enter no more than 100 characters"
                }
              })}
              fullWidth
            />
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
          <Link href="#">Forgot Password?</Link>
          <Button className={classes.formButton} type="submit" fullWidth>Log In</Button>
          <Divider />
          <Box className={classes.footerText}>
            Create an account? <Link href="#" onClick={() => handleDialog('register')}>Sing Up</Link>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;