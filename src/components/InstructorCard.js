import React from 'react';
import { Card, Avatar, CardMedia, CardContent, Typography, makeStyles } from '@material-ui/core';
import Logo from '../assets/logo.png';

const useStyle = makeStyles(theme => ({
  card: {
    margin: '30px 10px 0px 10px',
    outline: 0,
    cursor: 'pointer',
    transition: "all 0.2s linear",
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  bannerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  avatar: {
    height: 100,
    width: 100,
    position: 'absolute',
    border: '2px solid #25274d',
  },
  cardContent: {
    textAlign: 'justify',
    marginBottom: 10,
  },
  heading: {
    color: '#25274d',
    fontWeight: 'bold',
  }
}));

const InstructorCard = (props) => {
  const classes = useStyle();

  return (
    <Card elevation={4} className={classes.card}>
      <CardContent>
        <div className={classes.bannerWrapper}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={Logo}
            title="Contemplative Reptile"
          />
          <Avatar className={classes.avatar}>
            R
          </Avatar>
        </div>
        <Typography variant="h6" className={classes.heading}>{props.data.fullname}</Typography>
        <Typography variant="body2" component="p" color="textSecondary" className={classes.cardContent}>
          {props.data.about}
        </Typography>
        <Typography variant="h6" className={classes.heading}>No of Courses: {props.data.published_courses.length}</Typography>
        <Typography variant="h6" className={classes.heading}>No of Students: 0</Typography>
      </CardContent>
    </Card>
  );
};

export default InstructorCard;
