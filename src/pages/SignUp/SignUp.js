import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  makeStyles,
} from '@material-ui/core';
import SignUpForm from '../../components/SignUpForm';

const useStyle = makeStyles(theme => ({
  container: {
    margin: `${theme.spacing(4)}px 0px`,
  },
  title: {
    color: '#25274D',
    fontWeight: 'bolder',
    marginBottom: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(3),
  },
}));

const SignUp = () => {
  const classes = useStyle();

  return (
    <Container maxWidth="lg">
      <Grid className={classes.container} container justify="center">
        <Grid xs={12} sm={8} md={6} lg={5}>
          <Paper className={classes.paper} elevation={4}>
            <Typography className={classes.title} variant="h5">
              SignUp
            </Typography>
            <SignUpForm />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUp;