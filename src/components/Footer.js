import React from 'react';
import { Grid, Container, IconButton, Typography, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

const Footer = (props) => {
    const useStyles = makeStyles((theme) => ({

        active: {
            fontWeight: "550 !important",
            color: "#5CDB94 !important"
        },
        footericon: {
            transition: "all 0.3s linear",
            color: "rgba(255,255,255,0.7)",
            "&:hover": {
                color: "white"
            }
        },
        footerlist: {
            borderBottom: "1px solid grey",
            "& div ul": {
                listStyle: "none",
                padding: "0",
                "& li a": {
                    transition: "all 0.3s linear",
                    color: "white",
                    textDecoration: "none",
                    lineHeight: 1.5,
                    "&:hover": {
                        color: "rgba(255,255,255,0.8)",
                    }
                }
            }
        }
    }));

    const classes = useStyles();

    const Link = ({ link, label }) =>
        <NavLink exact activeClassName={classes.active} to={link}>
            {label}
        </NavLink>;

    return (
        <Container maxWidth="xl" disableGutters style={{ background: "#25274D", color: "white" }} >
            <Container fixed>
                <Grid container>
                    {/* Footer #ROW1 with bottomBorder as Divider */}
                    <Grid container item xs={12} className={classes.footerlist}>
                        {/* Page Links */}
                        <Grid item xs={6} md={3}>
                            <ul>
                                <li>
                                    <Link link="/" label="Home" />
                                </li>
                                <li>
                                    <Link link="/about" label="About" />
                                </li>
                                <li>
                                    <Link link="/contact" label="Contact us" />
                                </li>
                            </ul>
                        </Grid>
                        {/* Feature Links */}
                        <Grid item xs={6} md={3}>
                            <ul>
                                <li>
                                    <Link link="/courses" label="Courses" />
                                </li>
                                <li>
                                    <Link link="/instructors" label="Instructors" />
                                </li>
                                <li>
                                    <Link link="/account" label="Account" />
                                </li>
                            </ul>
                        </Grid>
                        {/* Connect With Section */}
                        <Grid container item xs={12} md={6} alignItems="center" justify="center">
                            <Grid container item xs={12} md={4} justify="center">
                                <Grid item>
                                    <h1>CONNECT</h1>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} md={8} justify="center" alignContent="space-around">
                                <Grid item>
                                    <Tooltip title="connect on Twitter" arrow>
                                        <IconButton className={classes.footericon} aria-label="Twitter" target="_blank" href="https://twitter.com/jhala_vrajpal"><i className="fa fa-twitter fa-2x"></i></IconButton>
                                    </Tooltip>
                                    <Tooltip title="connect on GitHub" arrow>
                                        <IconButton className={classes.footericon} aria-label="github" target="_blank" href="https://github.com/vrajpal-karan-project/edupath"><i className="fa fa-github fa-2x"></i></IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item>
                                    <Tooltip title="connect on Facebook" arrow>
                                        <IconButton className={classes.footericon} aria-label="facebook" target="_blank" href="https://www.facebook.com/jvrajpalk.jvrajpalk"><i className="fa fa-facebook fa-2x"></i></IconButton>
                                    </Tooltip>
                                    <Tooltip title="connect on LinkedIn" arrow>
                                        <IconButton className={classes.footericon} aria-label="linkedin" target="_blank" href="https://in.linkedin.com/in/karanparmar1"><i className="fa fa-linkedin fa-2x"></i></IconButton>
                                    </Tooltip>
                                    <Tooltip title="connect on Instagram" arrow>
                                        <IconButton className={classes.footericon} aria-label="instagram" target="_blank" href="https://www.instagram.com/vkjhala"><i className="fa fa-instagram fa-2x"></i></IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Footer #ROW2 */}
                    <Grid container item xs={12} alignItems="center">
                        <Grid container item xs justify="flex-start" >
                            <img src={logo} alt="logo" />
                        </Grid>
                        <Grid container item xs justify="flex-end">
                            <Typography variant="caption" display="block" noWrap>
                                Copyright &copy; 2020 | courses.edupath@gmail.com
                                </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    );
};

export default Footer;
