import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Button, darken } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import "./banner-style.css";

const Banner = () => {
    const useStyles = makeStyles(theme => ({
        banner: {
            height: `calc(100vh - 64px)`,
            [theme.breakpoints.down("sm")]: {
                height: `calc(100vh - 48px)`,
            },
            width: "100%",
            top: 0,
            background: "#25274D",
            color: "white",
            overflow: "hidden"
        },
        // content: {
        //     width: "100%",
        //     textAlign: "center",
        //     fontFamily: "serif",
        //     fontSize: "2em",
        //     position: "absolute",
        //     top: "50%",
        //     transform: "translateY(-50%)",
        //     maxHeight: "99vh",
        //     overflow: "hidden",
        // },
        signUpButton: {
            border: '1px solid #5CDB94',
            backgroundColor: '#5CDB94',
            fontSize: "70%",
            fontWeight: "bolder",
            margin: "20px auto",
            padding: "4px 16px",
            transition: "all 0.4s linear",

            "& a": {
                transition: "all 0.2s linear",
                textDecoration: "none",
                color: '#25274D',
                letterSpacing: "0px",
            },
            '&:hover': {
                padding: "4px 24px",
                backgroundColor: 'transparent',
                "& a": {
                    color: "#5CDB94",
                    transform: "scale(1.1)"
                }
            },
        },

    }));
    const classes = useStyles();
    return (
        <div className={`${classes.banner} banner`}>

            <div className="context">

                <h1>We take learning to new heights.</h1>
                <small>Join Edupath to watch, learn, make, and discover.</small>

                <div>
                    <Button className={classes.signUpButton}>
                        <NavLink exact to="/signup"> Get Started for Free </NavLink>
                    </Button>
                </div>

            </div>
            <div className="area">
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>

    )
};

export default Banner;
