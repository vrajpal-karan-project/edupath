import React from 'react';
import {
  Grid,
  Container,
} from '@material-ui/core';
import Slider from '../../components/Slider';
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
        <Grid item xs={12}>
          <Slider>
            {
              [1, 2, 3, 4, 5, 6, 7].map((value) =>
                <ItemCard tilt tooltip />
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