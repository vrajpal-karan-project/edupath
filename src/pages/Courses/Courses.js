import React from 'react';
import { Grid, Container, Select, MenuItem } from '@material-ui/core';
import ItemCard from '../../components/ItemCard';
import Category from "./Category";

const Courses = (props) => {
    const [sortBy,setSortBy] = React.useState("alpha");
    const handleSortBy=(e)=>{
        setSortBy(e.target.value);
    }
    return (
        <Container maxWidth="xl" style={{ margin: "24px auto" }}>
            <Grid container>
                <Grid item xs={12}>
                    This is Courses page.
                </Grid>
                <Grid item container xs={12} justify="center">
                    <Grid container item xs={12} md={3}  style={{ padding:"12px" }}>
                        <Grid item xs={12}>
                            CATEGORIES
                            {
                                ["IT","Programming","Software","Hardware","Android"].map((cat,i)=>
                                    <Category category={cat} selected={["IT","Software"]} key={i}/>
                                )
                            }
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} md={9} justify="center" style={{paddingLeft:"16px"}}>
                        <Grid container item xs={12} justify="flex-end" style={{ padding: "12px" }}>
                            <Grid item>
                                SORT BY:
                              
                                <Select
                                    value={sortBy}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Sort B' }}
                                    onChange={handleSortBy} 
                                     style={{minWidth:"18ch", textAlign:"right"}}
                                >
                                    <MenuItem value={"alpha"}>A-Z</MenuItem>
                                    <MenuItem value={"date"}>Date Uploaded</MenuItem>
                                    <MenuItem value={"price"}>Price Low To High</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            {
                                [1, 2, 3, 4, 5, 6, 7].map((value, index) =>
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <ItemCard tilt={true} tooltip={true} index={index} />
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