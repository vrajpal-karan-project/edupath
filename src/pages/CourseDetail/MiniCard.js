import React from 'react';
import { Chip, Card, CardActions, CardContent, CardMedia, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../assets/logo.png";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
    tooltip: {
        margin: "24px 12px 0 12px",
        "& .tooltiptext": {
            [theme.breakpoints.down("sm")]: {
                display: "none !important",
                opacity: "0 !important",
                visibilty: "hidden !important",
            },
        },
        [theme.breakpoints.down("sm")]: {
            marginRight: "24px"
        }
    },
    Card: {
        background: "transparent",
        transformStyle: "preserve-3d",
        maxWidth: "fit-content",
        display: "flex",
        borderRadius: "10px",
        "& .itemCard": {
            boxShadow: "0 10px 20px rgba(0,0,0,0.1), 0 6px 6px rgba(0,0,0,0.15)",
        },
        "& img": {
            transition: "all 0.5s ease-out",
        },
        "&:hover": {
            "& .itemCard": {
                boxShadow: "0 14px 28px rgba(0,0,0,0.3), 0 10px 10px rgba(0,0,0,0.25)",
            },
            "& .chip": {
                display: "none"
            },
            "& .overlay": {
                display: "flex",
                height: "100%",
            },
            "& img": {
                transform: "scale(0.955)",
            },

        }
    },
    itemCard: {
        position: "relative",
        // display:"flex"
    },


    price: {
        position: "relative",
        width: "40%",
        padding: "10px 20px 10px 10px",
        color: "#5CDB94",
        background: "#25274D",
        display: "flex",
        height: "100%",
        // fontSize: "180%",
        "&::after": {
            content: '" "',
            position: "absolute",
            display: "block",
            width: "100%",
            height: "100%",
            top: "0",
            left: "0",
            zIndex: "2",
            background: "#25274D",
            transformOrigin: "bottom left",
            msTransform: "skew(-30deg,0deg)",
            "-webkit-transform": "skew(-30deg,0deg)",
            "-webkit-transform-origin": "bottom left",
            transform: "skew(-30deg, 0deg)",
        },
        "& span": {
            width: "100%",
            textAlign: "right",
            fontSize: "160%",
            lineHeight: "1em",
            padding: "8px",
            zIndex: "5",
        }
    },

}));



const MiniCard = ({ course = {} }) => {

    let orginalPrice = course.price;
    course.price = course.price - (course.price * (course.discount / 100))

    const isFree = course.price === 0 || course.discount === 100;

    const classes = useStyles();
    const Chips = () => {
        let labels = [];
        course.featured && labels.push("Featured");
        isFree && labels.push("FREE");
        course.discount > 0 && labels.push(course.discount + "% off");

        return labels.length && labels.map((label, i) =>
            <Chip key={i} className="chip" style={{ transform: "scale(0.9)", borderRadius: "8px", fontWeight: "550" }}
                color={label.toLowerCase() === "featured" ? "secondary" : "primary"} label={label} />
        );
    };

    return (
        <div className={classes.Card}>

            <Card className={`itemCard Tilt-inner ${classes.itemCard}`}>

                <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", top: "8px", left: "8px", zIndex: "101", }}>
                        <Chips />
                    </div>
                    <CardMedia
                        component="img"
                        alt="IMAGE"
                        height="140"
                        image={logo}
                        title="LOGO"
                    />

                    <div className="overlay" style={{ zIndex: "99" }}>
                        <div><i className="fa fa-play-circle fa-4x"></i></div>
                    </div>
                </div>
                <CardContent>
                    <div>
                        <div>
                            Length : {course.duration} Hrs
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: "center", margin: "8px 0 0" }}>
                                <div style={{ color: "coral", fontWeight: "bolder" }}><small>{course.rating.toFixed(1)}&nbsp;</small></div>
                                <Rating value={course.rating} name="rating" size="small" readOnly />
                                <div style={{ color: 'grey' }}><small> &nbsp;({course.ratingCount})</small> </div>
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardActions style={{ padding: 0, background: "#5CDB94" }}>
                    {/* <Button size="large" style={{ background: "#5CDB94", color: "#F2F2F2" }} variant="contained">
                            <b>Enroll Now</b>
                        </Button> */}
                    <span className={classes.price}>
                        <span className="priceAmount"> {isFree ? "FREE" : "$" + course.price}</span>
                    </span>
                    <span style={{ position: "absolute", color: "navy", fontWeight: "bolder", fontSize: "110%", right: 16 }}><del>${orginalPrice.toFixed(2)}</del><br />-{course.discount}%</span>
                </CardActions>
            </Card>
        </div>
    );
};

export default MiniCard;
