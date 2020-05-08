import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  createMuiTheme,
  makeStyles,
  Drawer as MuiDrawer,
  Box,
  ThemeProvider,
  List,
  Divider,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import logo from '../assets/logo.png';

const defaultTheme = createMuiTheme();

const newTheme = createMuiTheme({
  overrides: {
    MuiListItemIcon: {
      root: {
        minWidth: defaultTheme.spacing(4),
      },
    },
    MuiListItem: {
      root: {
        paddingTop: 0,
        paddingBottom: 0,
        margin: `${defaultTheme.spacing(1)}px 0px`,
        color: defaultTheme.palette.text.primary,
        '&:hover, &.active': {
          backgroundColor: '#F2F2F2',
        },
      },
    },
  },
});

const useStyle = makeStyles(theme => ({
  logoWrapper: {
    paddingLeft: theme.spacing(2),
  },
  logo: {
    display: 'block',
  },
  listHeader: {
    pointerEvents: 'none',
  }
}));

const Drawer = ({ style, baseUrl, drawer, setDrawer }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const classes = useStyle();

  return (
    <MuiDrawer
      variant={matches ? "temporary" : "permanent"}
      open={drawer}
      onClose={() => setDrawer(false)}
      classes={{ paper: style }}
    >
      <Box className={classes.logoWrapper}>
        <NavLink exact to={`${baseUrl}`}>
          <img className={classes.logo} src={logo} alt="logo" height={64} />
        </NavLink>
      </Box>
      <ThemeProvider theme={newTheme}>
        <List disablePadding>
          <Divider />
          <ListItem className={classes.listHeader}>
            <ListItemText>User Management</ListItemText>
          </ListItem>
          <ListItem component={NavLink} exact to={`${baseUrl}/user/add`} onClick={() => setDrawer(false)}>
            <ListItemIcon>
              <span className="fa fa-plus"></span>
            </ListItemIcon>
            <ListItemText>Add User</ListItemText>
          </ListItem>
          <ListItem component={NavLink} exact to={`${baseUrl}/users`} onClick={() => setDrawer(false)}>
            <ListItemIcon>
              <span className="fa fa-list"></span>
            </ListItemIcon>
            <ListItemText>Manage User</ListItemText>
          </ListItem>
          <Divider />
          <ListItem component="a" href="/api/logout">
            <ListItemIcon>
              <span className="fa fa-sign-out"></span>
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItem>
        </List>
      </ThemeProvider>
    </MuiDrawer>
  );
};

export default Drawer;