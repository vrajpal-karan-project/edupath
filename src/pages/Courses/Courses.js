import React from 'react';
import { Grid, Container } from '@material-ui/core';
import ItemCard from '../../components/ItemCard';

const Courses = (props) => {
    return (
        <Container maxWidth="xl">
            <Grid container>
                <Grid item xs={12}>
                    This is Couorses page.
                </Grid>
                <Grid item container xs={12} justify="center">
                    <Grid container item xs={12} md={3}>
                        <Grid item>
                            CATEGORIES
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} md={9} container justify="center">
                        <Grid container justify="flex-end">
                            <Grid item>
                                SORT BY:
                                 <select>
                                    <option>A-Z</option>
                                    <option>Date Uploaded</option>
                                    <option>Date Created</option>
                                </select>
                            </Grid>
                        </Grid>
                        <Grid container item spacing={3} xs={12} className="coursesContainer">
                            {
                                [1, 2, 3, 4, 5, 6, 7].map((value) =>
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={value}>
                                        <ItemCard />
                                    </Grid>
                                )
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Courses;