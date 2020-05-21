import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  makeStyles,
} from '@material-ui/core';
import RegistrationForm from '../../components/RegistrationForm';

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

const Register = () => {
  const classes = useStyle();

  return (
    <Container maxWidth="lg">
      <Grid className={classes.container} container justify="center">
        <Grid xs={12} sm={8} md={6} lg={5}>
          <Paper className={classes.paper} elevation={4}>
            <Typography className={classes.title} variant="h5">
              Register
            </Typography>
            <RegistrationForm />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;