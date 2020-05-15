import React from 'react';
import {
  makeStyles,
  Box,
  InputBase,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';

const useStyle = makeStyles(theme => ({
  formField: {
    textAlign: 'right',
    marginBottom: theme.spacing(2),
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

const FormField = ({ type = "text", multiline = false, rows = 1, inline = false, values = [], name, placeholder = "", inputProps = {}, validate, errors }) => {
  const classes = useStyle();

  return (
    <Box className={classes.formField}>
      {
        type === "radio" ?
          <RadioGroup row={inline} name={name}>
            {
              values.map(({ value, label }) =>
                <FormControlLabel
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
            <input
              type={type}
              name={name}
              ref={inputProps}
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
        {(errors[name] && errors[name].message) || ' '}
      </FormHelperText>
    </Box >
  );
};

export default FormField;