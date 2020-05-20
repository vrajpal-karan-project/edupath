import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  createMuiTheme,
  Collapse,
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
  useMediaQuery
} from '@material-ui/core';
import logo from '../../assets/admin-logo.png';

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
  },
  activeHeader: {
    background: "red !important"
  },
  openSubmenu: {
    background: "#00000040"
  }
}));

const Drawer = ({ style, baseUrl, drawer, setDrawer }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const linkList = [
    {
      title: "User Management",
      path: "/user",
      icon: "fa-user",
      children: [
        {
          title: "Add User",
          path: "/user/add",
          icon: "fa-plus"
        },
        {
          title: "Manage Users",
          path: "/users",
          icon: "fa-list",
        }

      ]
    },
    {
      title: "Course Management",
      path: "/course",
      icon: "",
      children: [
        {
          title: "Add Course",
          path: "/course/add",
          icon: "fa-plus"
        },
        {
          title: "Manage Courses",
          path: "/courses",
          icon: "fa-list",
        }
      ]
    },
    {
      title: "Category Management",
      path: "/category",
      icon: "",
      children: [
        {
          title: "Add Category",
          path: "/category/add",
          icon: "fa-plus"
        },
        {
          title: "Manage Users",
          path: "/categories",
          icon: "fa-list",
        }
      ]
    },
    {
      title: "Logout",
      path: "/logout",
      icon: "fa-sign-out"
    }
  ];

  let activeIndex = 0;
  const isCurrentLink = link => window.location?.pathname.indexOf(link) > -1;
  const getActiveLink = () => linkList.forEach((list, index) => {
    if (list.children?.length) {
      list.children.forEach(sublink => activeIndex = isCurrentLink(sublink.path) ? index : activeIndex);
    }

    else {
      activeIndex = (isCurrentLink(list.path)) ? index : activeIndex
    }
  }
  );

  getActiveLink();

  const [activeRoute, setActiveRoute] = useState(activeIndex);

  const toggleMenu = index => setActiveRoute(activeRoute === index ? undefined : index);

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

          {

            linkList.map((menuItem, index) => {
              const { title, path, icon, children = [] } = menuItem;
              const hasChildren = children && children.length > 0;
              return <>
                {
                  hasChildren ? (
                    <div key={index}>
                      <ListItem className={isCurrentLink(path) ? classes.activeHeader : activeRoute === index ? classes.openSubmenu : ""} button onClick={() => toggleMenu(index)}>
                        <ListItemText>{title} </ListItemText>
                        <i class="fa fa-angle-down"></i>
                      </ListItem>
                      <Collapse in={activeRoute === index}>
                        <List disablePadding>
                          {children.map((subItem, i) =>
                            <ListItem component={NavLink} exact to={baseUrl + subItem.path} key={i} onClick={() => setDrawer(false)}>
                              <ListItemIcon>
                                <i className={`fa  ${subItem.icon}`}></i>
                              </ListItemIcon>
                              <ListItemText>{subItem.title}</ListItemText>
                            </ListItem>

                          )}
                        </List>
                      </Collapse>
                    </div>
                  ) : (
                      <ListItem button={true} key={index}
                        className={isCurrentLink(path) ? classes.activeHeader : ""}
                        component={NavLink} exact to={baseUrl + path}
                        onClick={() => toggleMenu(index)}>
                        <ListItemIcon>
                          <i className={`fa ${icon}`}></i>
                        </ListItemIcon>
                        <ListItemText>{title} </ListItemText>
                      </ListItem>

                    )

                }
              </>

            })
          }
          <Divider />

          {/* <Collapse in={activeRoute}>
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
          </Collapse>

          <Divider />
          <ListItem component="a" href="/api/logout">
            <ListItemIcon>
              <span className="fa fa-sign-out"></span>
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItem> */}
        </List>
      </ThemeProvider>
    </MuiDrawer >
  );
};

export default Drawer;