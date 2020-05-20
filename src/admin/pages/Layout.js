import React, { useState } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import {
  makeStyles,
  Container
} from '@material-ui/core';

import Header from '../components/Header';
import Drawer from '../components/Drawer';
import Dashboard from './Dashboard/Dashboard';
import AddUser from './User/AddUser';
import ManageUsers from './User/ManageUsers';

const drawerWidth = 275;

const useStyle = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
  },
  content: {
    background: '#F2F2F2',
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
          <Route exact path={[`${url}`, `${url}/dashboard`]}>
            <Dashboard />
          </Route>
          <Route exact path={`${url}/user/add`}>
            <AddUser baseUrl={url} />
          </Route>
          <Route exact path={`${url}/user/update/:userId`}>
            <AddUser baseUrl={url} />
          </Route>
          <Route exact path={`${url}/users`}>
            <ManageUsers baseUrl={url} />
          </Route>
          <Route exact path={`${url}/*`}>
            <div style={{ textAlign: "center" }}>
              <h1>404 PAGE NOT FOUND</h1>
              <p>Go back to <NavLink to={`${url}`}>Dashboard</NavLink></p>
            </div>
          </Route>
        </Switch>
      </Container>
    </>
  );
};

export default Layout;