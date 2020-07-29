import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import {
  Grid,
  Box,
  makeStyles,
  Paper,
  Button,
  Divider,
  darken
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import FormField from '../../components/FormField';
import { getUserById } from '../../../service/user.service';
import { isAuthenticated } from '../../../service/auth.service';
import { routes } from '../../../backend';

const useStyle = makeStyles(theme => ({
  title: {
    fontSize: 28,
    color: '#25274D',
    fontWeight: 'bolder',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
  },
  body: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(1),
    }
  },
  formTitle: {
    color: darken('#5CDB94', 0.15),
    fontSize: 20,
    fontWeight: 'bolder',
    padding: theme.spacing(2),
  },
  formBody: {
    padding: theme.spacing(4),
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(2),
    }
  },
  formFooter: {
    padding: theme.spacing(2),
  },
  submitButton: {
    minWidth: 114,
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    color: 'white',
    fontWeight: 'bolder',
    backgroundColor: '#25274D',
    border: `2px solid ${darken('#25274D', 0.15)}`,
    '&:hover': {
      backgroundColor: darken('#5CDB94', 0.15),
      border: `2px solid ${darken('#5CDB94', 0.3)}`,
    }
  },
  cancelButton: {
    minWidth: 114,
    fontWeight: 'bolder',
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    color: '#25274D',
    border: '2px solid transparent',
    boxShadow: '0px 0px 2px #25274D',
  },
}));

const AddCategory = ({ baseUrl }) => {
  const classes = useStyle();

  const { categoryId } = useParams();

  const { user, token } = isAuthenticated();

  const { register, handleSubmit, errors } = useForm();

  const onCategorySubmit = data => {
    data = {
      name: data.categoryName,
    };
    console.log(data);
    axios({
      method: 'POST',
      url: `${routes.addCategory}/${user._id}`,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data,
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  };

  const onSubCategorySubmit = data => {
    data = {
      name: data.subCategoryName,
      parent: categoryId,
    };

    axios({
      method: 'POST',
      url: `${routes.addSubCategory}/${user._id}`,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data,
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  };

  const type = categoryId ? 'Update' : 'Add';

  return (
    <Grid container justify="center">
      <form onSubmit={handleSubmit(onCategorySubmit)}>
        <Grid item xs={12}>
          <Paper className={classes.body} elevation={4}>
            <Grid container justify="center">
              <Grid item xs={12}>
                <Box className={classes.formTitle}>
                  {type} Category
              </Box>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={10} md={8} lg={6}>
                <Box className={classes.formBody}>
                  <FormField
                    key="categoryName"
                    name="categoryName"
                    placeholder="Category Name"
                    inputProps={{ maxLength: 20 }}
                    validate={register({
                      required: {
                        value: true,
                        message: "This field is required"
                      },
                      maxLength: {
                        value: 20, message: "Please enter no more than 20 characters"
                      }
                    })}
                    errors={errors}
                  />
                </Box>
              </Grid>
              <Grid item container justify="center" xs={12}>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12} sm={10} md={8} lg={6}>
                  <Grid className={classes.formFooter} container justify="space-around">
                    <Grid item>
                      <Button className={classes.submitButton} type="submit">{type}</Button>
                    </Grid>
                    <Grid item>
                      <Button className={classes.cancelButton} component={NavLink} to={`${baseUrl}/categories`}>Cancel</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </form>
      {categoryId &&
        <form onSubmit={handleSubmit(onSubCategorySubmit)}>
          <Grid item xs={12}>
            <Paper className={classes.body} elevation={4}>
              <Grid container justify="center">
                <Grid item xs={12}>
                  <Box className={classes.formTitle}>
                    {type} Sub-Category
              </Box>
                  <Divider />
                </Grid>
                <Grid item xs={12} sm={10} md={8} lg={6}>
                  <Box className={classes.formBody}>
                    <FormField
                      key="subCategoryName"
                      name="subCategoryName"
                      placeholder="Sub-Category Name"
                      inputProps={{ maxLength: 20 }}
                      validate={register({
                        required: {
                          value: true,
                          message: "This field is required"
                        },
                        maxLength: {
                          value: 20, message: "Please enter no more than 20 characters"
                        }
                      })}
                      errors={errors}
                    />
                  </Box>
                </Grid>
                <Grid item container justify="center" xs={12}>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12} sm={10} md={8} lg={6}>
                    <Grid className={classes.formFooter} container justify="space-around">
                      <Grid item>
                        <Button className={classes.submitButton} type="submit">{type}</Button>
                      </Grid>
                      <Grid item>
                        <Button className={classes.cancelButton} component={NavLink} to={`${baseUrl}/categories`}>Cancel</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </form>}
    </Grid>
  );
};

export default AddCategory;