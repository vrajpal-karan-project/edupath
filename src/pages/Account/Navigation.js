import React from 'react';
import {
  createMuiTheme,
  darken,
  ThemeProvider,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const defaultTheme = createMuiTheme();

const newTheme = createMuiTheme({
  overrides: {
    MuiTabs: {
      root: {
        color: '#25274D',
      },
      indicator: {
        top: 0,
        height: '5px',
        backgroundColor: '#5CDB94',
      },
    },
    MuiTab: {
      root: {
        border: '1px solid #9e9ea4',
        backgroundColor: '#CCC',
        '&:hover': {
          backgroundColor: '#F2F2F2',
        },
        '&.active': {
          fontWeight: 'bolder',
          backgroundColor: '#e8e8e8',
          borderColor: 'transparent',
          boxShadow: defaultTheme.shadows[4],
        },
        [defaultTheme.breakpoints.down('sm')]: {
          minWidth: 72,
        },
      },
    },
    MuiListItem: {
      root: {
        borderLeft: '4px solid transparent',
        color: '#25274D',
        '&:hover': {
          backgroundColor: '#F2F2F2',
        },
        '&.active': {
          borderColor: darken('#25274D', 0.15),
          backgroundColor: '#F2F2F2',
          color: '#25274D',
        },
      },
    },
    MuiListItemText: {
      root: {
        color: 'inherit',
      }
    },
  },
});

const Navigation = ({ pathname }) => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={newTheme}>
      <Tabs value={pathname} centered>
        <Tab
          label={xs ? "" : "My Profile"}
          icon={xs ? <span className="fa fa-2x fa-user-circle-o"></span> : ""}
          value="/profile"
          component={NavLink}
          exact
          to="/profile"
        />
        <Tab
          label={xs ? "" : "Change Password"}
          icon={xs ? <span className="fa fa-2x fa-key"></span> : ""}
          value="/changepassword"
          component={NavLink}
          exact
          to="/changepassword"
        />
        <Tab
          label={xs ? "" : "My Courses"}
          icon={xs ? <span className="fa fa-2x fa-list-alt"></span> : ""}
          value="/mycourses"
          component={NavLink}
          exact
          to="/mycourses"
        />
        <Tab
          label={xs ? "" : "Register Courses"}
          icon={xs ? <span className="fa fa-2x fa-graduation-cap"></span> : ""}
          value="/registercourse"
          component={NavLink}
          exact
          to="/registercourse"
        />
      </Tabs>
    </ThemeProvider>
  );
};

export default Navigation;