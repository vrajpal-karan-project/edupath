import React from 'react';
import logo from '../assets/logo.png';
import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Typography,
  Box,
  makeStyles,
  Divider,
  createMuiTheme,
  ThemeProvider
} from '@material-ui/core';

const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
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
        '&:hover': {
          backgroundColor: '#F2F2F2',
        },
      },
    },
  },
});

const useStyle = makeStyles({
  drawer: {
    width: 275,
  },
  logoWrapper: {
    paddingLeft: theme.spacing(2),
  },
  userInfoWrapper: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  listHeader: {
    pointerEvents: 'none',
  }
});

const Drawer = ({ drawer, setDrawer, handleDialog }) => {
  const classes = useStyle();

  return (
    <MuiDrawer
      open={drawer}
      onClose={() => setDrawer(false)}
      classes={{ paper: classes.drawer }}
    >
      <Box className={classes.logoWrapper}>
        <img src={logo} alt="logo" height={64} />
      </Box>
      {
        false &&
        <>
          <Divider />
          <Box
            className={classes.userInfoWrapper}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Avatar />
            <Typography>Hi, User Name</Typography>
          </Box>
        </>
      }
      <ThemeProvider theme={theme}>
        <List disablePadding>
          <Divider />
          <ListItem className={classes.listHeader}>
            <ListItemText>Account</ListItemText>
          </ListItem>
          {
            false
              ?
              <>
                <ListItem component="a" href="#">
                  <ListItemIcon>
                    <span className="fa fa-user-circle-o"></span>
                  </ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </ListItem>
                <ListItem component="a" href="#">
                  <ListItemIcon>
                    <span className="fa fa-file"></span>
                  </ListItemIcon>
                  <ListItemText>My Courses</ListItemText>
                </ListItem>
                {
                  true
                    ?
                    <ListItem component="a" href="#">
                      <ListItemIcon>
                        <span className="fa fa-pencil-square-o"></span>
                      </ListItemIcon>
                      <ListItemText>Beacome an Instructor</ListItemText>
                    </ListItem>
                    :
                    <ListItem component="a" href="#">
                      <ListItemIcon>
                        <span className="fa fa-upload"></span>
                      </ListItemIcon>
                      <ListItemText>Upload New Course</ListItemText>
                    </ListItem>
                }
              </>
              :
              <>
                <ListItem button onClick={() => handleDialog('login')}>
                  <ListItemIcon>
                    <span className="fa fa-sign-in"></span>
                  </ListItemIcon>
                  <ListItemText>Log In</ListItemText>
                </ListItem>
                <ListItem button onClick={() => handleDialog('register')}>
                  <ListItemIcon>
                    <span className="fa fa-plus-square"></span>
                  </ListItemIcon>
                  <ListItemText>Create an Account</ListItemText>
                </ListItem>
              </>
          }
          <Divider />
          <ListItem className={classes.listHeader}>
            <ListItemText>Browse</ListItemText>
          </ListItem>
          <ListItem component="a" href="#">
            <ListItemIcon>
              <span className="fa fa-list-alt"></span>
            </ListItemIcon>
            <ListItemText>All Courses</ListItemText>
          </ListItem>
          <ListItem component="a" href="#">
            <ListItemIcon>
              <span className="fa fa-users"></span>
            </ListItemIcon>
            <ListItemText>Insturctors</ListItemText>
          </ListItem>
          <Divider />
          <ListItem component="a" href="#">
            <ListItemIcon>
              <span className="fa fa-info"></span>
            </ListItemIcon>
            <ListItemText>About Us</ListItemText>
          </ListItem>
          <ListItem component="a" href="#">
            <ListItemIcon>
              <span className="fa fa-phone"></span>
            </ListItemIcon>
            <ListItemText>Contact Us</ListItemText>
          </ListItem>
          {
            false &&
            <ListItem component="a" href="/api/logout">
              <ListItemIcon>
                <span className="fa fa-sign-out"></span>
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItem>
          }
        </List>
      </ThemeProvider>
    </MuiDrawer>
  );
};

export default Drawer;