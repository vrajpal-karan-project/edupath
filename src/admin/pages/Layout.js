import React, { useState, useEffect } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import {
  makeStyles,
  Container,
  useTheme,
  useMediaQuery,
  Breadcrumbs,
  Typography,
  Grid,
  Box
} from '@material-ui/core';

import Header from '../components/Header';
import Drawer from '../components/Drawer';

import Dashboard from './Dashboard/Dashboard';
import AddUser from './User/AddUser';
import ManageUsers from './User/ManageUsers';

// keep parent path in the end otherwise that'll match first instead of child path
const titlebarData = {
  "/admin/dashboard": {
    heading: "Dashboard",
    breadcrumbs: "Dashboard",
  },
  "/admin/user/add": {
    heading: "User Management",
    breadcrumbs: "User Management/Add User",
  },
  "/admin/user/update": {
    heading: "User Management",
    breadcrumbs: "User Management/Update User",
  },
  "/admin/users": {
    heading: "User Management",
    breadcrumbs: "User Management/Manage Users",
  },
  "/admin": {
    heading: "Dashboard",
    breadcrumbs: "Dashboard",
  },
};

const drawerWidth = 275;

const useStyle = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
  },
  content: {
    background: '#F2F2F2',
    padding: theme.spacing(2),
    transition: theme.transitions.create('margin, width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    maxWidth: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin, width', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    maxWidth: '100%',
    marginLeft: 0,
  },
  titlebar: {
    padding: `${theme.spacing(1)}px 2px ${theme.spacing(2)}px 2px`,
  },
  title: {
    fontSize: 22,
    color: '#25274D',
    fontWeight: 'bolder',
  },
  breadcrumbs: {
    padding: `0px ${theme.spacing(2)}px`,
    border: '2px solid silver',
    borderRadius: 50,
  },
  cardContainer: {
    position: 'absolute',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: `calc(100% - ${drawerWidth}px - ${theme.spacing(4)}px)`,
  },
  cardContainerShiff: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: `calc(100% - ${theme.spacing(4)}px)`,
  },
  card: {
    marginBottom: theme.spacing(4),
  },
}));

export const Layout = ({ match: { url }, location: { pathname } }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyle();

  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    if (!matches)
      setDrawer(true);
    else
      setDrawer(false);
  }, [matches]);

  return (
    <>
      <Header baseUrl={url} drawer={drawer} setDrawer={setDrawer} />
      <Drawer style={classes.drawer} baseUrl={url} drawer={drawer} setDrawer={setDrawer} />
      <Container className={`${classes.content} ${!drawer || matches ? classes.contentShift : ''}`}>
        <Grid container className={classes.titlebar} alignItems="center" justify="space-between">
          <Grid item>
            {console.log(Object.entries(titlebarData).find((entry) => pathname.includes(entry[0]))[1].heading)}
            <span className={classes.title}>{Object.entries(titlebarData).find((entry) => pathname.includes(entry[0]))[1].heading}</span>
          </Grid>
          <Grid item>
            <Breadcrumbs className={classes.breadcrumbs}>
              {Object.entries(titlebarData).find((entry) => pathname.includes(entry[0]))[1].breadcrumbs.split('/').map((path) => {
                return <Typography>{path}</Typography>
              })}
            </Breadcrumbs>
          </Grid>
        </Grid>
        <Box className={`${classes.cardContainer} ${!drawer || matches ? classes.cardContainerShiff : ''}`} >
          <Container className={classes.card} disableGutters>
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
        </Box>
      </Container>
    </>
  );
};

export default Layout;