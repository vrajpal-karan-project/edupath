import React from 'react';
import { Grid, Container } from '@material-ui/core';
import ItemCard from '../../components/ItemCard';
import Banner from './Banner';

const Home = () => {
  return (<>
    <Banner />
    <Container maxWidth="xl">

      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          This is HOME page.
        </Grid>
        <Grid container item className="coursesContainer">
          {
            [1, 2, 3, 4, 5, 6, 7].map((value) =>
              <Grid item xs={12} sm={6} md={4} key={value}>
                <ItemCard />
              </Grid>
            )
          }
        </Grid>
      </Grid>
    </Container>
  </>
  );
}

export default Home;