import React from 'react';
import { Grid, Container, Typography, makeStyles } from '@material-ui/core';
import ItemCard from '../../components/ItemCard';
import Slider from '../../components/Slider';
import Banner from './Banner';

const useStyle = makeStyles(theme => ({
  section: {
    margin: `${theme.spacing(4)}px 0px`,
  },
  sectionTitle: {
    color: '#25274D',
    fontWeight: 'bolder',
  }
}));

const Home = () => {
  const classes = useStyle();

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
  </>
  );
}

export default Home;