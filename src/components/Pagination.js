import React from 'react';
import {
  createMuiTheme,
  ThemeProvider,
  darken,
} from '@material-ui/core';
import { Pagination as MuiPagination } from '@material-ui/lab';

const theme = createMuiTheme({
  overrides: {
    MuiPagination: {
      root: {
        display: 'flex',
        justifyContent: 'center',
        padding: `30px 0px 10px 0px`,
      },
    },
    MuiPaginationItem: {
      root: {
        color: '#25274D',
      },
      page: {
        '&:hover, &.Mui-focusVisible': {
          backgroundColor: '#5CDB94',
        },
        '&.Mui-selected': {
          backgroundColor: '#5CDB94',
          '&:hover, &.Mui-focusVisible': {
            backgroundColor: `${darken('#5CDB94', .15)} !important`,
          }
        },
      },
    },
  }
});

const Pagination = ({ count }) => {
  return (
    <ThemeProvider theme={theme}>
      <MuiPagination
        count={count}
        size="large"
        showFirstButton
        showLastButton
      />
    </ThemeProvider>
  );
};

export default Pagination;