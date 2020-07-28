import React from 'react';
import {
  makeStyles,
  Box,
  /* InputBase,
   InputLabel,*/
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  Avatar,
  fade,
  Select,
  MenuItem,
} from '@material-ui/core';
import { Controller } from 'react-hook-form';

const useStyle = makeStyles(theme => ({
  formField: {
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
    height: theme.spacing(10),
    width: theme.spacing(10),
    borderRadius: '50%',
    '&:hover': {
      opacity: 1,
    },
  },
  formAvatar: {
    backgroundColor: '#25274D',
    height: theme.spacing(10),
    width: theme.spacing(10),
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
  label = "",
  placeholder = "",
  inputProps = {},
  validate,
  control,
  rules,
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
                  src={selectedAvatar} 
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
            type === "select" ?
              <Controller
                name={name}
                rules={rules}
                defaultValue=""
                control={control}
                as={
                  <Select
                    fullWidth
                    disableUnderline
                    displayEmpty
                    className={`${classes.formInput} ${errors[name] && classes.error}`}
                  >
                    <MenuItem value="">None</MenuItem>
                    {values.map((value) => (
                      <MenuItem key={value[0]} value={value[0]}>{value[1]}</MenuItem>
                    ))}
                  </Select>
                }
              /> :
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
        {(errors[name] && errors[name].message) || serverErrors[name] || ' '}
      </FormHelperText>
    </Box >
  );
};

export default FormField;