import React, { useEffect, useState } from 'react';
import { Grid, Container, Typography, makeStyles } from '@material-ui/core';
import ItemCard from '../../components/ItemCard';
import Slider from '../../components/Slider';
import Banner from './Banner';
import InstructorCard from '../../components/InstructorCard';
import Mockup from '../../assets/mockup.png';
import { NavLink } from 'react-router-dom';
import { getUsersByRole } from '../../service/user.service';

const useStyle = makeStyles(theme => ({
  section: {
    margin: `${theme.spacing(4)}px 0px`,
  },
  sectionTitle: {
    color: '#25274D',
    fontWeight: 'bolder',
  },
  fancySection: {
    padding: '40px 100px',
    color: '#25274d',
    [theme.breakpoints.down('md')]: {
      padding: '20px',
    }
  },
  ruler: {
    width: '40%',
    borderBottom: '4px solid #78dd96',
    marginBottom: 10,
  },
  categoryColumn: {
    padding: '0px 10px',
    '& h6': {
      color: '#25274d',
      marginBottom: '2px',
    },
    '& p': {
      '& a': {
        textDecoration: 'none',
        color: 'inherit',
      },
    },
  },
  smallRuler: {
    width: '20%',
    borderBottom: '2px solid #78dd96',
    marginBottom: 10,
  },
  sectionBody: {
    margin: '20px 0',
    padding: '0 20px',
  }
}));

const Home = () => {
  const classes = useStyle();
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    getUsersByRole('1')
      .then((response) => {
        setInstructors(response);
      })
      .catch(() => {

      });
  }, [])

  return (<>
    <Banner />
    <Container maxWidth="xl" className={classes.section}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.sectionTitle}>
            Feature Courses
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Slider>
            {
              [1, 2, 3, 4, 5, 6, 7].map((value, index) =>
                <ItemCard key={index} />
              )
            }
          </Slider>
        </Grid>
      </Grid>
    </Container>
    <Container maxWidth="xl" className={classes.section}>
      <Grid container>
        <Grid item xs={12} md={6} container alignItems="center">
          <div className={classes.fancySection}>
            <h1>Don't let this pendemic stop you from learning.</h1>
            <div className={classes.ruler}></div>
            <Typography variant="body1" color="textSecondary">Take classes on the go from anywhere, and anytime. Stream on mobile too.</Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <img src={Mockup} width="100%" height="100%" alt="EduPath" />
        </Grid>
      </Grid>
    </Container>
    <Container maxWidth="xl" className={classes.section}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.sectionTitle}>
            Top Instructors
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Slider slides={3}>
            {
              instructors.map((value, index) =>
                <InstructorCard key={index} data={value} />
              )
            }
          </Slider>
        </Grid>
      </Grid>
    </Container>
    <Container maxWidth="xl" className={classes.section}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.sectionTitle}>
            Personalised learning
          </Typography>
        </Grid>
        <Grid item xs={12} container className={classes.sectionBody}>
          <Grid item xs={12} md={3} className={classes.categoryColumn}>
            <Typography variant="h6">IT</Typography>
            <div className={classes.smallRuler}></div>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">AI</NavLink></Typography>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">ML</NavLink></Typography>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">Cyber Security</NavLink></Typography>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">Data Admin</NavLink></Typography>
            <NavLink to="/courses">More</NavLink>
          </Grid>
          <Grid item xs={12} md={3} className={classes.categoryColumn}>
            <Typography variant="h6">Web Development</Typography>
            <div className={classes.smallRuler}></div>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">React</NavLink></Typography>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">Angular</NavLink></Typography>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">Java</NavLink></Typography>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">Node JS</NavLink></Typography>
            <NavLink to="/courses">More</NavLink>
          </Grid>
          <Grid item xs={12} md={3} className={classes.categoryColumn}>
            <Typography variant="h6">Mobile Apps</Typography>
            <div className={classes.smallRuler}></div>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">React Native</NavLink></Typography>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">Flutter</NavLink></Typography>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">Kotlin</NavLink></Typography>
            <NavLink to="/courses">More</NavLink>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  </>
  );
}

export default Home;