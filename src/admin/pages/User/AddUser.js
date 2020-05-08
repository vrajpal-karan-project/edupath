import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';

const AddUser = () => {
  const { userId } = useParams();

  return (
    <Grid container>
      <Grid item xs={12}>
        This is {userId ? `UPDATEUSER ${userId}` : 'ADDUSER'} page.
      </Grid>
    </Grid>
  );
};

export default AddUser;