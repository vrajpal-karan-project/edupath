import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Route, Switch, NavLink } from 'react-router-dom';

import Header from '../components/Header';
import Drawer from '../components/Drawer';
import LoginDialog from '../components/LoginDialog';
import RegisterDialog from '../components/RegisterDialog';
import Footer from '../components/Footer';

import Home from './Home/Home';
import Courses from './Courses/Courses';

const useStyle = makeStyles(theme => ({
  root: {
    background: "#e8e8e8",
  },
}));

export const Layout = ({ match: { url } }) => {
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
      <Header setDrawer={setDrawer} searching={searching} setSearching={setSearching} handleDialog={handleDialog} />
      <Drawer drawer={drawer} setDrawer={setDrawer} handleDialog={handleDialog} />
      <LoginDialog dialog={dialog['login']} handleDialog={handleDialog} />
      <RegisterDialog dialog={dialog['register']} handleDialog={handleDialog} />
      <Switch>
        <Route exact path={["/", `${url}`, "/home"]}>
          <Home />
        </Route>
        <Route exact path={`${url}/about`}>
          This is ABOUT page.
        </Route>
        <Route exact path={`${url}/contact`}>
          This is CONTACT US page.
        </Route>
        <Route exact path={`${url}/account`}>
          This is ACCOUNT page.
        </Route>
        <Route exact path={`${url}/courses`}>
          <Courses />
        </Route>
        <Route exact path={`${url}/instructors`}>
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