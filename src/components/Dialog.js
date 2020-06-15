import React from 'react';
import {
  makeStyles,
  Dialog as MuiDialog,
  useTheme,
  useMediaQuery,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@material-ui/core';

const useStyle = makeStyles(theme => ({
  closeButton: {
    width: theme.spacing(6),
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const Dialog = ({ open, onClose, title, content }) => {
  const classes = useStyle();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <MuiDialog
      classes={{ paper: classes.dialog }}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        {title}
        <IconButton className={classes.closeButton} onClick={onClose}>
          <span className="fa fa-close"></span>
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {content}
      </DialogContent>
    </MuiDialog>
  );
};

export default Dialog;