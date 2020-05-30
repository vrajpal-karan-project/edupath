import React from 'react';
import { Grid, Container, Typography } from '@material-ui/core';
import MiniCard from './MiniCard';
import ItemCard from '../../components/ItemCard';

const CourseDetail = (props) => {
    const courseId = props.match.params.id;
    const course = ({
        id: courseId || Math.ceil(Math.random() * 10000),
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

    return (
        <Grid container>
            <Container maxWidth="xl" disableGutters style={{ background: "#25274D", color: "white" }}>

                <Container maxWidth="xl" fixed>
                    <Grid container style={{ margin: "24px auto" }}>
                        <Grid container item xs={12} sm={8}>
                            <Typography variant="h4" style={{ lineHeight: "1.2" }}>
                                {course.title}
                            </Typography>
                        </Grid>
                        <Grid container item xs={12} sm={4} style={{ position: "relative", top: "0" }}>
                            <div style={{ position: "sticky", top: "0" }}>
                                <MiniCard course={course} />
                            </div>
                        </Grid>

                    </Grid>
                </Container>
            </Container>

            <Container maxWidth="xl" disableGutters>
                <Container maxWidth="xl" fixed>
                    <Grid container>
                        <Grid container item xs={12} sm={8}>
                            <Grid item>
                                <Typography variant="h5">
                                    Instructor : {course.instructor}
                                </Typography>
                                <Typography variant="h6">
                                    Last updated on : {Date(course.updated)}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6">
                                    {course.description}
                                    {course.description}
                                    {course.description}
                                    {course.description}
                                    {course.description}
                                    {course.description}
                                    {course.description}
                                    {course.description}
                                    {course.description}
                                    {course.description}
                                    {course.description}
                                    {course.description}
                                    {course.description}
                                    {course.description}
                                    {course.description}
                                    {course.description}

                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} sm={4}> </Grid>
                    </Grid>
                </Container>
            </Container>


        </Grid>
    )
}

export default CourseDetail;
