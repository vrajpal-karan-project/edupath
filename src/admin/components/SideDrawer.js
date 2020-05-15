import React from 'react';
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { List, ListItem, ListItemIcon, ListItemText, IconButton, Drawer, Tooltip } from '@material-ui/core';
import { Backdrop, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";



const SideDrawer = (props) => {
    const { open } = props;
    const drawerWidth = 220;
    const useStyles = makeStyles(theme => ({

        link: {

            textDecoration: "none",
            color: "white"

        },

        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: "nowrap",
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        },

        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            }),
            overflowX: "hidden"
        },
        drawerClose: {
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            overflowX: "hidden",
            width: 0,
            border: 0,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(8) + 1,
            },

        },
        toolbar: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingLeft: "90px",
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar
        },
        hoverEffect: {
            "&:hover": {
                backgroundColor: "rgba(0,0,0,0.15) !important"
            }
        },
        menuButton: {
            marginRight: 29,
        },
        textWhite: {
            color: "rgba(255,255,255,0.9)"
        },
        hide: {
            display: "none",
        },
        active: {
            "& > div": {
                boxShadow: "inset 4px 0 0 0 white",
                background: "rgba(0,0,0, 0.1)",
            }
        },
        backdrop: {
            [theme.breakpoints.down("sm")]: {
                zIndex: theme.zIndex.drawer - 1,
                color: "black"
            }
        },
    }));
    const classes = useStyles();
    return (
        <React.Fragment>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open
                })}
                classes={{
                    paper: clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })
                }}
            // style={{overflow:"hidden"}}
            >
                <div className={classes.toolbar} >
                    {open ? <IconButton onClick={()=>props.handleDrawerClose(false)} className={classes.hoverEffect} >
                        <i className="fa fa-chevron-left"></i>
                    </IconButton>
                        : <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={()=>props.handleDrawerClose(true)}
                            edge="start"
                            className={clsx(classes.menuButton, classes.textWhite, classes.hoverEffect, {
                                [classes.hide]: open
                            })}
                        >
                            {/* <ClearAllRounded fontSize="large" /> */}
                            <i className="fa fa-align-justify"></i>
                        </IconButton>}
                </div>

                <List className={classes.textWhite} style={{ marginTop: "40px" }}>

                    <NavLink exact activeClassName={classes.active} className={classes.link} to={"/contact-app"} >
                        <ListItem button className={classes.hoverEffect}>
                            <Tooltip title={!open ? "Local" : ""} placement="right" arrow>
                                <ListItemIcon className={classes.textWhite}>
                                    <i className="fa fa-user-i"></i>
                                </ListItemIcon>
                            </Tooltip>

                            <ListItemText primary="Local" />
                        </ListItem>
                    </NavLink>

                    <NavLink activeClassName={classes.active} className={classes.link} to="/contact-app/covid19">
                        <ListItem button className={classes.hoverEffect}>
                            <Tooltip title={!open ? "Covid19" : ""} placement="right" arrow>
                                <ListItemIcon className={classes.textWhite}>
                                    <i className="fa fa-bug"></i>
                                </ListItemIcon>
                            </Tooltip>
                            <ListItemText primary="Covid19" />
                        </ListItem>
                    </NavLink>

                    <NavLink exact activeClassName={classes.active} className={classes.link} to="/contact-app/jobs">
                        <ListItem button className={classes.hoverEffect}>
                            <Tooltip title={!open ? "Jobs" : ""} placement="right" arrow>
                                <ListItemIcon className={classes.textWhite}>
                                    <i className="fa fa-shoppin-bag"></i>
                                </ListItemIcon>
                            </Tooltip>
                            <ListItemText primary="Jobs" />
                        </ListItem>
                    </NavLink>

                </List>
            </Drawer>
            <Hidden mdUp>
                <Backdrop className={classes.backdrop} open={open} onClick={()=>props.handleDrawerClose(false)} />
            </Hidden>
        </React.Fragment>
    )
};

export default SideDrawer;