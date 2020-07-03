import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Route, Switch, NavLink } from 'react-router-dom';

import Header from '../components/Header';
import Drawer from '../components/Drawer';
import Footer from '../components/Footer';

import SignUp from './SignUp/SignUp';
import Login from './Login/Login';
import Home from './Home/Home';
import Courses from './Courses/Courses';
import Dialog from '../components/Dialog';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import CourseDetail from './CourseDetail/CourseDetail';
import Account from './Account/Account';
import { isAuthenticated } from "../service/auth.service";
import PrivateRoute from '../service/PrivateRoute';

const useStyle = makeStyles(theme => ({
  root: {
    background: "#e8e8e8",
  },
}));

export const Layout = () => {
  const classes = useStyle();

  const [searching, setSearching] = useState(false);
  const [dialog, setDialog] = useState({});
  const [drawer, setDrawer] = useState(false);

  const handleDialog = (type, open = true) => {
    setDialog({ [type]: open });
    if (drawer)
      setDrawer(false);
  };

  return (
    <div className={classes.root}>
      <Header
        setDrawer={setDrawer}
        searching={searching}
        setSearching={setSearching}
        handleDialog={handleDialog}
        isAuthenticated={isAuthenticated}
      />
      <Drawer drawer={drawer} setDrawer={setDrawer} handleDialog={handleDialog} />
      <Dialog
        title="Login"
        content={<LoginForm handleDialog={handleDialog} />}
        open={Boolean(dialog['login'])}
        onClose={() => handleDialog('login', false)}
      />
      <Dialog
        title="SignUp"
        content={<SignUpForm handleDialog={handleDialog} />}
        open={Boolean(dialog['signup'])}
        onClose={() => handleDialog('signup', false)}
      />
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path={["/", "/home"]}>
          <Home />
        </Route>
        <Route exact path="/about">
          This is ABOUT page.
        </Route>
        <Route exact path="/contact">
          This is CONTACT US page.
        </Route>
        <PrivateRoute
          exact
          path={["/profile", "/changepassword", "/mycourses"]}
          component={({ location }) => (<Account location={location} />)}
        />
        <Route exact path="/courses">
          <Courses />
        </Route>
        <Route exact path="/course/:id" component={CourseDetail} />
        <Route exact path="/instructors">
          This is INSTRUCTORS page.
        </Route>
        <Route>
          <div style={{ textAlign: "center" }}>
            <h1>404 PAGE NOT FOUND</h1>
            <p>Go back to <NavLink to="/">Home Page</NavLink></p>
          </div>
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default Layout;