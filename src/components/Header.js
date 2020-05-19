import React, { useState } from 'react';
import {
  fade,
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Popper,
  ClickAwayListener,
  List,
  ListItem,
  ListItemText,
  InputBase,
  Grid,
  Hidden,
  useTheme,
  useMediaQuery,
  Avatar,
  darken,
  Divider,
  createMuiTheme,
  ThemeProvider,
  Box,
  Backdrop,
} from '@material-ui/core';
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';

const defaultTheme = createMuiTheme();

const newTheme = createMuiTheme({
  overrides: {
    MuiListItem: {
      root: {
        cursor: 'pointer',
        color: fade('#000', 0.7),
        '&:hover': {
          '& [class*="courseNestedMenu"]': {
            zIndex: defaultTheme.zIndex.appBar + 1,
            boxShadow: '-3px 3px 7px #CCC',
            backgroundColor: defaultTheme.palette.background.paper,
            display: 'block',
            position: 'absolute',
            width: 'max-content',
            top: 0,
            left: '100%',
          },
          color: 'black',
          backgroundColor: '#F2F2F2',
        },
      },
    },
  },
});

const useStyle = makeStyles(theme => ({
  header: {
    backgroundColor: '#25274D',
    color: '#5CDB94',
  },
  logo: {
    display: 'block',
  },
  navItem: {
    color: 'inherit',
    textDecoration: 'none',
    borderRadius: theme.shape.borderRadius,
    padding: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
    '&:hover, &.active': {
      backgroundColor: fade(theme.palette.common.white, 0.1),
    },
  },
  navItemMargin: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  navDropdown: {
    border: '1px solid #5CDB94',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.1),
    },
  },
  dropdownPopper: {
    zIndex: theme.zIndex.appBar + 1,
    backgroundColor: 'white',
    boxShadow: '2px 3px 7px #CCC',
    '& .fa': {
      marginLeft: theme.spacing(2),
    },
  },
  courseNestedMenu: {
    display: 'none',
  },
  seeAllWrapper: {
    margin: theme.spacing(2),
  },
  seeAllCourse: {
    display: 'block',
    textDecoration: 'none',
    width: '100%',
    fontWeight: "bold",
    backgroundColor: '#5CDB94',
    color: 'white',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    textAlign: 'center',
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: darken('#5CDB94', 0.15),
    }
  },
  seeAllTopics: {
    color: '#25274D',
    textDecoration: 'underline',
    textAlign: 'center',
  },
  drawerButton: {
    marginRight: theme.spacing(2),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.1),
    },
  },
  courseMenuIcon: {
    marginLeft: theme.spacing(1),
  },
  searchBackdrop: {
    zIndex: theme.zIndex.appBar,
  },
  searchPopup: {
    [theme.breakpoints.up("md")]: {
      flexGrow: 1,
    },
    [theme.breakpoints.down("xs")]: {
      display: 'flex',
      alignItems: 'center',
      borderRadius: 0,
      position: 'absolute',
      zIndex: theme.zIndex.appBar + 1,
      width: '100%',
      top: 0,
      left: 0,
      padding: `${theme.spacing(1)}px 0px`,
      backgroundColor: '#25274D',
      '&:hover': {
        backgroundColor: '#25274D',
      },
    },
  },
  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    [theme.breakpoints.down("xs")]: {
      flexGrow: 1,
      marginRight: theme.spacing(1),
    }
  },
  searchIcon: {
    margin: theme.spacing(1),
    fontWeight: 'bolder',
    transform: 'scale(1.15)',
  },
  searchInput: {
    color: 'inherit',
    flexGrow: 1,
  },
  searchButton: {
    cursor: 'pointer',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0),
    backgroundColor: fade(theme.palette.common.white, 0.15),
    color: '#5CDB94',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
  closeButton: {
    cursor: 'pointer',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  loginButton: {
    border: '1px solid #5CDB94',
    '&:hover': {
      backgroundColor: fade('#5CDB94', 0.15),
    },
  },
  signUpButton: {
    border: '1px solid #5CDB94',
    backgroundColor: '#5CDB94',
    color: '#25274D',
    fontWeight: 'bolder',
    '&:hover': {
      backgroundColor: darken('#5CDB94', 0.15),
    },
  },
  avatar: {
    backgroundColor: '#5CDB94',
    color: '#25274D',
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
}));

const Header = ({ setDrawer, searching, setSearching, handleDialog, isAuthenticated }) => {
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
          <Grid container>
            <Grid item md={2} sm={4} xs={10} container alignItems="center">
              <Hidden mdUp>
                <IconButton edge="start" color="inherit" className={classes.drawerButton} onClick={() => setDrawer(true)}>
                  <span className="fa fa-bars"></span>
                </IconButton>
              </Hidden>
              <NavLink exact to="/">
                <img className={classes.logo} src={logo} alt="logo" height={matches ? 48 : 64} />
              </NavLink>
            </Grid>
            <Grid item lg={5} md={6} sm={8} xs={2} container alignItems="center" justify={matches ? "flex-end" : "flex-start"}>
              <Hidden smDown>
                <Button
                  className={`${classes.navItemMargin} ${classes.navDropdown}`}
                  onClick={handleMenu('course')}
                  color="inherit"
                >
                  <Typography>Courses</Typography>
                  <span className={`fa fa-angle-down ${classes.courseMenuIcon}`}></span>
                </Button>
                <Popper
                  anchorEl={menuAnchorEl['course']}
                  placement="bottom-start"
                  open={Boolean(menuAnchorEl['course'])}
                  className={classes.dropdownPopper}
                >
                  <ClickAwayListener
                    onClickAway={handleMenuClose}
                  >
                    <Box>
                      <List disablePadding>
                        {["1", "2", "3", "4"].map((value, index) =>
                          <React.Fragment key={index}>
                            <ListItem>
                              <ListItemText
                                primary={`This is some long text of Course Name ${value}`}
                              />
                              <span className="fa fa-angle-right"></span>
                              <List disablePadding className={`${classes.courseNestedMenu}`}>
                                {["1", "2", "3", "4"].map((value, index) =>
                                  <React.Fragment key={index}>
                                    <ListItem
                                      component={NavLink}
                                      exact
                                      to={`/${value}`}
                                      onClick={handleMenuClose}
                                    >
                                      <ListItemText primary={`This is some long text of Topic Name ${value}`}></ListItemText>
                                    </ListItem>
                                  </React.Fragment>
                                )}
                                <Divider />
                                <ListItem
                                  component={NavLink}
                                  exact
                                  to={`/${value}`}
                                  onClick={handleMenuClose}
                                >
                                  <ListItemText className={classes.seeAllTopics}>See All In Field</ListItemText>
                                </ListItem>
                              </List>
                            </ListItem>
                          </React.Fragment>
                        )}
                      </List>
                      <Divider />
                      <Box className={classes.seeAllWrapper}>
                        <NavLink
                          exact
                          className={classes.seeAllCourse}
                          to="/courses"
                          onClick={handleMenuClose}
                        >
                          All Categories
                        </NavLink>
                      </Box>
                    </Box>
                  </ClickAwayListener>
                </Popper>
              </Hidden>
              <Hidden smUp>
                <Backdrop className={classes.searchBackdrop} open={searching} onClick={() => setSearching(false)} />
                <span className={classes.searchButton} onClick={() => setSearching(!searching)}>
                  <span className={`fa fa-${searching ? 'close' : 'search'} fa-fw ${classes.searchIcon}`}></span>
                </span>
              </Hidden>
              {
                (!matches || searching) &&
                <span className={classes.searchPopup}>
                  <Hidden smUp>
                    <span className={classes.closeButton} onClick={() => setSearching(!searching)}>
                      <span className="fa fa-close"></span>
                    </span>
                  </Hidden>
                  <span className={`${classes.searchWrapper}`}>
                    <span className={`fa fa-search ${classes.searchIcon}`}></span>
                    <InputBase
                      autoFocus={matches}
                      className={classes.searchInput}
                      placeholder="Search courses..."
                    />
                  </span>
                </span>
              }
            </Grid>
            <Hidden smDown>
              <Grid item lg={5} md={4} container alignItems="center" justify="flex-end">
                <NavLink exact to="/instructors" className={`${classes.navItem} ${classes.navItemMargin}`}>
                  Instructors
                </NavLink>
                {
                  isAuthenticated
                    ?
                    <>
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
                            <ListItem component={NavLink} exact to="/profile" onClick={handleMenuClose}>
                              <ListItemText primary="Profile" />
                            </ListItem>
                            <ListItem component={NavLink} exact to="/mycourses" onClick={handleMenuClose}>
                              <ListItemText primary="My Courses" />
                            </ListItem>
                            {
                              true
                                ?
                                <ListItem component={NavLink} exact to="/becomeaninstructor" onClick={handleMenuClose}>
                                  <ListItemText primary="Beacome an Instructor" />
                                </ListItem>
                                :
                                <ListItem component={NavLink} exact to="/uploadcourse" onClick={handleMenuClose}>
                                  <ListItemText primary="Upload New Course" />
                                </ListItem>
                            }
                            <ListItem component="a" href="/api/logout">
                              <ListItemText primary="Logout" />
                            </ListItem>
                          </List>
                        </ClickAwayListener>
                      </Popper>
                    </>
                    :
                    <>
                      <Button color="inherit" className={`${classes.loginButton} ${classes.navItemMargin}`} onClick={() => handleDialog('login')}>Log In</Button>
                      <Button className={classes.signUpButton} onClick={() => handleDialog('register')}>Sign Up</Button>
                    </>
                }
              </Grid>
            </Hidden>
          </Grid>
        </Toolbar >
      </AppBar >
    </ThemeProvider >
  );
};

export default Header;
