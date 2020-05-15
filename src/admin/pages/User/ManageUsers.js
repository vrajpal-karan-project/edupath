import React, { forwardRef } from 'react';
import {
  Grid,
  Box,
  makeStyles,
  Paper,
  darken,
  createMuiTheme,
  ThemeProvider,
  IconButton,
} from '@material-ui/core';
import MaterialTable from 'material-table';
import { NavLink } from 'react-router-dom';

const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      h6: {
        fontWeight: 'bolder !important',
        color: darken('#5CDB94', 0.15),
      },
    },
    MuiIconButton: {
      root: {
        width: defaultTheme.spacing(6),
        height: defaultTheme.spacing(6),
      }
    }
  },
});

const useStyle = makeStyles({
  title: {
    fontSize: 28,
    color: '#25274D',
    fontWeight: 'bolder',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
  },
  rowActions: {
    display: 'flex',
    alignItems: 'center',
  },
});

const icons = {
  Add: forwardRef((props, ref) => <span className='fa fa-fw fa-plus-square' {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <span className='fa fa-fw fa-check' {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <span className='fa fa-fw fa-times-o' {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <span className='fa fa-fw fa-trash' {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <span className='fa fa-fw fa-list' {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <span className='fa fa-fw fa-pencil' {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <span className='fa fa-fw fa-download' {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <span className='fa fa-fw fa-filter' {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <span className='fa fa-fw fa-angle-double-left' {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <span className='fa fa-fw fa-angle-double-right' {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <span className='fa fa-fw fa-angle-right' {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <span className='fa fa-fw fa-angle-left' {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <span className='fa fa-fw fa-times' {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <span className='fa fa-fw fa-search' ref={ref} />),
  SortArrow: forwardRef((props, ref) => <span className='' ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <span className='fa fa-fw fa-minus' {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <span className='fa fa-fw fa-columns' {...props} ref={ref} />)
};

const ManageUsers = ({ baseUrl }) => {
  const classes = useStyle();

  return (
    <Grid container justify="center">
      <Grid item xs={12} container justify="center">
        <Box className={classes.title}>User Management</Box>
      </Grid>
      <Grid item>
        <ThemeProvider theme={theme}>
          <MaterialTable
            components={{
              Container: props => <Paper {...props} elevation={4} />,
            }}
            icons={icons}
            title="Manage User"
            columns={[
              { title: 'Id', field: 'id' },
              { title: 'URL', field: 'url' },
              { title: 'Name', field: 'name' },
              { title: 'Type', field: 'type' },
              { title: 'Language', field: 'language' },
              {
                title: 'Edit', field: 'id', render: rowData => (
                  <Box className={classes.rowActions}>
                    <IconButton component={NavLink} to={`${baseUrl}/user/update/${rowData.id}`}>
                      <span className="fa fa-fw fa-pencil" />
                    </IconButton>
                    <IconButton onClick={() => { }}>
                      <span className="fa fa-fw fa-trash-o" />
                    </IconButton>
                  </Box>
                )
              },
            ]}
            data={query =>
              new Promise((resolve, reject) => {
                let url = `https://api.tvmaze.com/shows?page=${query.page}`
                fetch(url)
                  .then(response => response.json())
                  .then(result => {
                    resolve({
                      data: result,
                      page: 0,
                      totalCount: result.length / query.pageSize,
                    })
                  })
              })
            }
          />
        </ThemeProvider>
      </Grid>
    </Grid>
  );
};

export default ManageUsers;