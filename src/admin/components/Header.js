import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  useTheme,
  useMediaQuery,
  makeStyles,
  AppBar,
  Toolbar,
  Grid,
  Hidden,
  IconButton,
  Button,
  Avatar,
  Typography,
  Popper,
  ClickAwayListener,
  List,
  ListItem,
  ListItemText,
  createMuiTheme,
  fade,
  ThemeProvider,
} from '@material-ui/core';
import logo from '../../assets/admin-logo.png';

const newTheme = createMuiTheme({
  overrides: {
    MuiListItem: {
      root: {
        cursor: 'pointer',
        color: fade('#000', 0.7),
        '&:hover': {
          color: 'black',
          backgroundColor: '#F2F2F2',
        },
      },
    },
  },
});

const useStyle = makeStyles(theme => ({
  header: {
    backgroundColor: '#5CDB94',
    color: '#25274D',
    [theme.breakpoints.up("md")]: {
      zIndex: theme.zIndex.drawer + 1,
    },
  },
  grow: {
    flexGrow: 1,
  },
  drawerButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    display: 'block',
  },
  navDropdown: {
    border: '1px solid #25274D',
  },
  dropdownPopper: {
    minWidth: '150px',
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'white',
    boxShadow: '2px 3px 7px #CCC',
  },
  avatar: {
    backgroundColor: '#25274D',
    color: '#5CDB94',
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
}));

const Header = ({ baseUrl, setDrawer }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.only('xs'));

  const classes = useStyle();

  const [menuAnchorEl, setMenuAnchorEl] = useState({});

  const handleMenu = (type) => (event) => {
    setMenuAnchorEl({ [type]: event.currentTarget });
  };

  const handleMenuClose = () => {
    setMenuAnchorEl({});
  };

  return (
    <ThemeProvider theme={newTheme}>
      <AppBar position="sticky" className={classes.header}>
        <Toolbar variant={matches ? "dense" : "regular"}>
          <Grid container alignItems="center">
            <Hidden mdUp>
              <Grid item>
                <IconButton edge="start" color="inherit" className={classes.drawerButton} onClick={() => setDrawer(true)}>
                  <span className="fa fa-bars"></span>
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item className={classes.grow}>
              <NavLink exact to={`${baseUrl}`}>
                <img className={classes.logo} src={logo} alt="logo" height={matches ? 48 : 64} />
              </NavLink>
            </Grid>
            <Hidden smDown>
              <Grid item>
                <Button
                  className={classes.navDropdown}
                  onClick={handleMenu('account')}
                  color="inherit"
                >
                  <Avatar src="" className={classes.avatar} />
                  <Typography>Account</Typography>
                </Button>
                <Popper
                  placement="bottom-end"
                  anchorEl={menuAnchorEl['account']}
                  open={Boolean(menuAnchorEl['account'])}
                  className={classes.dropdownPopper}
                >
                  <ClickAwayListener onClickAway={handleMenuClose}>
                    <List disablePadding>
                      <ListItem component={NavLink} exact to={`${baseUrl}/profile`} onClick={handleMenuClose}>
                        <ListItemText primary="Profile" />
                      </ListItem>
                      <ListItem component="a" href="/api/logout">
                        <ListItemText primary="Logout" />
                      </ListItem>
                    </List>
                  </ClickAwayListener>
                </Popper>
              </Grid>
            </Hidden>
          </Grid>
        </Toolbar>
      </AppBar >
    </ThemeProvider >
  );
};

export default Header;