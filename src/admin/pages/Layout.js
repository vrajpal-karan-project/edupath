import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  makeStyles,
  Container
} from '@material-ui/core';

import Header from '../components/Header';
import Drawer from '../components/Drawer';

import Dashboard from './Dashboard/Dashboard';

const drawerWidth = 275;

const useStyle = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
  },
  content: {
    padding: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
}));

export const Layout = ({ match: { url } }) => {
  const classes = useStyle();

  const [drawer, setDrawer] = useState(false);

  return (
    <>
      <Header baseUrl={url} setDrawer={setDrawer} />
      <Drawer style={classes.drawer} baseUrl={url} drawer={drawer} setDrawer={setDrawer} />
      <Container className={classes.content}>
        <Switch>
          <Route exact path={`${url}/`}>
            <Dashboard />
          </Route>
          <Route exact path={`${url}/add-user`}>
            This is ADD USER page.
          </Route>
          <Route exact path={`${url}/manage-user`}>
            This is MANAGE USER page.
          </Route>
          <Route exact path={`${url}/*`}>
            <div style={{ textAlign: "center" }}>
              <h1>404 PAGE NOT FOUND</h1>
              <p>Go back to <a href={`${url}/`}>Dashboard</a></p>
            </div>
          </Route>
        </Switch>
      </Container>
    </>
  );
};

export default Layout;