import React from 'react';
import {
  makeStyles,
  Box,
  InputBase,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  Avatar,
  fade,
} from '@material-ui/core';

const useStyle = makeStyles(theme => ({
  formField: {
    textAlign: 'right',
    marginBottom: theme.spacing(2),
  },
  avatarWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatarOverlay: {
    cursor: 'pointer',
    position: 'absolute',
    opacity: 0,
    transition: '.3s ease',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.background.paper,
    backgroundColor: fade('#25274D', 0.6),
    height: theme.spacing(8),
    width: theme.spacing(8),
    borderRadius: '50%',
    '&:hover': {
      opacity: 1,
    },
  },
  formAvatar: {
    backgroundColor: '#25274D',
    height: theme.spacing(8),
    width: theme.spacing(8),
  },
  formInput: {
    borderRadius: theme.shape.borderRadius,
    border: '1px solid #25274D',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    '&[class*="multiline"]': {
      padding: `${theme.spacing(1.813)}px ${theme.spacing(2)}px`,
    }
  },
  formRadio: {
    color: '#25274D !important',
  },
  error: {
    borderColor: theme.palette.error.main,
  }
}));

const FormField = ({
  type = "text",
  multiline = false,
  rows = 1,
  inline = false,
  values = [],
  selectedAvatar,
  handleUpload,
  handleRemove,
  name,
  placeholder = "",
  inputProps = {},
  validate,
  errors
}) => {
  const classes = useStyle();

  return (
    <Box className={classes.formField}>
      {
        type === "radio" ?
          <RadioGroup row={inline} name={name}>
            {
              values.map(({ value, label }) =>
                <FormControlLabel
                  key={value}
                  value={value}
                  control={
                    <Radio
                      className={classes.formRadio}
                      classes={{ checked: classes.formRadio }}
                      inputRef={validate}
                    />
                  }
                  label={label}
                />
              )
            }
          </RadioGroup> :
          type === "file" ?
            <>
              <Box className={classes.avatarWrapper}>
                <Avatar
                  className={classes.formAvatar}
                  src={selectedAvatar && URL.createObjectURL(selectedAvatar)}
                />
                <label htmlFor="formAvatar" className={classes.avatarOverlay}>
                  <span className={`fa fa-${selectedAvatar ? 'trash' : 'pencil'}`} />
                </label>
                <input
                  id="formAvatar"
                  type={type}
                  name={name}
                  onClick={(event) => handleRemove(event, selectedAvatar)}
                  onChange={handleUpload}
                  hidden
                />
              </Box>
            </> :
            <InputBase
              className={`${classes.formInput} ${errors[name] && classes.error}`}
              multiline={multiline}
              rows={rows}
              type={type}
              name={name}
              placeholder={placeholder}
              inputProps={inputProps}
              inputRef={validate}
              fullWidth
            />
      }
      <FormHelperText error>
        {(errors[name] && errors[name].message) || ' '}
      </FormHelperText>
    </Box >
  );
};

export default FormField;