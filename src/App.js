import React, { useState } from 'react';
import { Backdrop, makeStyles } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/Header';
import Drawer from './components/Drawer';
import LoginDialog from './components/LoginDialog';
import RegisterDialog from './components/RegisterDialog';
import Footer from './components/Footer';
import Home from './pages/Home/Home';
import './App.css';

const useStyle = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.appBar,
  },
  root: {
    background: theme.palette.background.default,
  },
}));

const App = () => {
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
      <Router>
        <Backdrop className={classes.backdrop} open={searching} onClick={() => setSearching(false)} />
        <Header setDrawer={setDrawer} searching={searching} setSearching={setSearching} handleDialog={handleDialog} />
        <Drawer drawer={drawer} setDrawer={setDrawer} handleDialog={handleDialog} />
        <LoginDialog dialog={dialog['login']} handleDialog={handleDialog} />
        <RegisterDialog dialog={dialog['register']} handleDialog={handleDialog} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            This is ABOUT page.
         </Route>
          <Route exact path="/contact">
            This is CONTACT US page.
         </Route>
          <Route exact path="/account">
            This is ACCOUNT page.
         </Route>
          <Route exact path="/courses">
            This is COURSES page.
          </Route>
          <Route exact path="/instructors">
            This is INSTRUCTORS page.
          </Route>
          <Route>
            <div style={{ textAlign: "center" }}>
              <h1>404 PAGE NOT FOUND</h1>
              <p>Go back to <a href="/">Home Page</a></p>
            </div>
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
