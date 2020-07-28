import React from 'react';
import {
  Container,
  Grid,
  makeStyles,
  createMuiTheme,
  Box,
  Divider,
  fade,
} from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import Navigation from './Navigation';
import Profile from './Profile/Profile';
import ChangePassword from './ChangePassword/ChangePassword';
import MyCourses from './MyCourses/MyCourses';
import RegisterCourse from './RegisterCourse/RegisterCourse';

const defaultTheme = createMuiTheme();

const useStyle = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    [defaultTheme.breakpoints.only('sm')]: {
      padding: `${theme.spacing(4)}px ${theme.spacing(10)}px`,
    },
    [defaultTheme.breakpoints.only('xs')]: {
      padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
    },
  },
  navigation: {
    position: 'inherit',
    zIndex: 1,
    marginBottom: theme.spacing(4),
  },
  tabDivider: {
    backgroundColor: fade('#25274D', 0.5),
  },
}));

const Account = ({ location: { pathname } }) => {
  const classes = useStyle();

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Box position="relative">
            <Box className={classes.navigation}>
              <Navigation pathname={pathname} />
            </Box>
            <Divider absolute className={classes.tabDivider} />
          </Box>
        </Grid>
        <Switch>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/changepassword">
            <ChangePassword />
          </Route>
          <Route exact path="/mycourses">
            <MyCourses />
          </Route>
          <Route exact path="/registercourse">
            <RegisterCourse />
          </Route>
        </Switch>
      </Grid>
    </Container>
  );
};

export default Account;