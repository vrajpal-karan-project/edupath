import React from 'react';
import {  makeStyles } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from './components/Footer';
import Home from './pages/Home/Home';
import './App.css';

const useStyle = makeStyles(theme => ({
 
  root: {
    background: "#e8e8e8",
  },
}));

const App = () => {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <Router>
       
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
            This is Courses page.
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
