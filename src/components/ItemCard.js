import React from 'react';
import { Chip, Card, CardActions, CardContent, CardMedia, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";
import Rating from "@material-ui/lab/Rating";
import Tilt from "react-parallax-tilt";

const useStyles = makeStyles((theme) => ({
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

    title: {
        maxHeight: "2.4em",
        fontWeight: "650",
        color: "#25274D",
        fontSize: "115%",
    },
    description: {
        fontWeight: "200",
        fontSize: "0.9em",
        maxHeight: "3.6em",
        color: 'dimgrey'
    },
    tooltip: {
        "& .tooltiptext": {
            // making ToolTip right sided
            right: "auto",
            left: "105%",
            "&::after": {
                // arrow to the left
                left: "auto",
                right: "100%",
                borderColor: "transparent white transparent transparent",
            },
            [theme.breakpoints.down("sm")]: {
                display: "none !important",
                opacity: "0 !important",
                visibilty: "hidden !important",
            },
        }
    },
    instructor: {
        color: "grey",
        margin: "8px 0",
        lineHeight: "1.2em",
        // maxWidth:"100%",
        maxHeight: "1.2em",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
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
    fade: { /* fade effect on overflow text that has more than 3 lines */
        lineHeight: "1.2em",
        position: "relative",
        overflow: "hidden",
        "&:after": {
            content: '""',
            textAlign: "right",
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "20%",
            height: "1.2em",
            background: "linear-gradient(to right, transparent, white 50%)",
        },
    },
}));

const ItemCard = (props) => {
    let course = props.course || ({
        id: Math.ceil(Math.random() * 10000),
        title: "Dummy Title For Some course & some long name for 3 lines more and more content is here",
        instructor: "Instructor Name, some long name here is trunctaed with magic",
        featured: true,
        enrolled: false,  /*If user enrolled */
        rating: 4.0,
        ratingCount: 250, /* Total Ratings */
        studentCount: 21550, /* Total students Who Enrolled this */
        lectureCount: 16, /* Total Lectures */
        language: "English",
        duration: 3, /* Hrs of duration */
        discount: 50, /* % off */
        description: "Python is the language for people wanting to start their careers as programmers, data analysts, machine learning specialists, or AI developers.",
        price: 200, //This is Discounted Amount
        updated: Date.now(),
    });

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
            <Chip key={i} className="chip" style={{ margin: "8px 8px", borderRadius: "8px", fontWeight: "550", fontSize: "90%" }}
                color={label.toLowerCase() === "featured" ? "secondary" : "primary"} label={label} />
        );
    };

    const tooltipContent = <div>
        <h4 style={{ margin: "0px auto 8px", lineHeight: "1em" }}>
            {course.title}
        </h4>
        <p style={{ color: "green" }}> Updated : {new Date(course.updated).toLocaleDateString()}</p>
        <h5 style={{ margin: "8px auto", lineHeight: "1em", fontWeight: "lighter" }}>{course.description}</h5>
    </div>;

    return (

        <div className={`tooltip ${classes.tooltip}`}>
            <span className="tooltiptext">{tooltipContent}</span>
            <Link href={`/courses/${course.id}`} underline="none" component="a">
                <Tilt
                    className={`parallax-effect-glare-scale ${classes.Card}`}
                    perspective={900} /* bydef its1000, lower=extreme effect */
                    glareEnable={true}
                    glareMaxOpacity={0.8}
                    tiltMaxAngleX={10}
                    tiltMaxAngleY={10}
                    scale={1.04}
                // tiltReverse={true}
                >
                    <Card className={`itemCard ${classes.itemCard}`}>

                        <div style={{ position: "relative" }}>
                            <div style={{ position: "absolute", top: "8px", left: "8px", zIndex: "101", }}>
                                <Chips />
                            </div>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image={logo}
                                title="LOGO"
                                className={classes.media}
                            />
                            <Chip size="small" style={{
                                zIndex: "101", background: "rgba(0,0,0,0.4)", color: "white",
                                position: "absolute", bottom: "4px", right: "4px", cursor: "pointer"
                            }}
                                label={`${course.duration} hrs`}
                                icon={<i className="fa fa-clock-o" style={{ color: "white", height: "auto", marginLeft: "6px", marginRight: "-10px" }}></i>} />
                            <div className="overlay" style={{ zIndex: "99" }}>
                                <div>Goto Course</div>
                            </div>
                        </div>
                        <CardContent>
                            <div className={`${classes.fade} ${classes.title}`}>
                                {course.title}
                            </div>

                            <div className={`${classes.instructor}`}><small>{course.instructor}</small></div>

                            {/* <div className={`${classes.fade} ${classes.description}`}>
                            {course.description}
                        </div> */}
                            <div style={{ display: 'flex', alignItems: "center", margin: "8px 0 0" }}>
                                <div style={{ color: "coral", fontWeight: "bolder" }}><small>{course.rating.toFixed(1)}&nbsp;</small></div>
                                <Rating value={course.rating} name="rating" size="small" readOnly />
                                <div style={{ color: 'grey' }}><small> &nbsp;({course.ratingCount})</small> </div>
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
                </Tilt >
            </Link>
        </div>

    );
};

export default ItemCard;