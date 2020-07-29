import React, { useState, useCallback, Fragment, useEffect } from 'react';
import {
  Grid,
  makeStyles,
  Divider,
  Button,
  darken,
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core';
import FormField from '../../../components/FormField';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { getAllCategories, getSubcategoriesByCategoryId } from '../../../service/user.service';

const defaultTheme = createMuiTheme({
  overrides: {
    MuiStepper: {
      root: {
        background: 'none',
      },
    },
    MuiStepIcon: {
      active: {
        color: '#25274d !important',
      },
      completed: {
        color: '#77dc95 !important'
      }
    }
  }
});

const useStyle = makeStyles(theme => ({
  formTitle: {
    color: darken('#25274D', 0.15),
    fontSize: 20,
    fontWeight: 'bolder',
    padding: defaultTheme.spacing(2),
  },
  formBody: {
    padding: defaultTheme.spacing(4),
    [defaultTheme.breakpoints.only("xs")]: {
      padding: defaultTheme.spacing(2),
    }
  },
  formFooter: {
    padding: defaultTheme.spacing(2),
  },
  dropzone: {
    width: '100%',
    height: '200px',
    background: '#f2f2f2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  submitButton: {
    minWidth: 114,
    padding: `${defaultTheme.spacing(1)}px ${defaultTheme.spacing(3)}px`,
    color: 'white',
    fontWeight: 'bolder',
    backgroundColor: '#25274D',
    border: `2px solid ${darken('#25274D', 0.15)}`,
    '&:hover': {
      backgroundColor: darken('#5CDB94', 0.15),
      border: `2px solid ${darken('#5CDB94', 0.3)}`,
    }
  },
  backButton: {
    minWidth: 114,
    fontWeight: 'bolder',
    padding: `${defaultTheme.spacing(1)}px ${defaultTheme.spacing(3)}px`,
    color: '#25274D',
    border: '2px solid transparent',
    boxShadow: '0px 0px 2px #25274D',
  },
}));

const getSteps = () => {
  return ['Enter course details', 'Upload course videos', 'Publish the course'];
}

const RegisterCourse = () => {
  const classes = useStyle();

  const { register, handleSubmit, control, errors } = useForm();

  const [activeStep, setActiveStep] = useState(0);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [acceptedFiles, setAcceptedFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file) => {
      selectedFiles.push(file.name);
    });
    setSelectedFiles(selectedFiles);
    setAcceptedFiles(acceptedFiles);
  }, [selectedFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const steps = getSteps();

  useEffect(() => {
    getAllCategories()
      .then((response) => {
        setCategories([['IT', 'IT'], ['Science', 'Science']]);
      })
      .catch(() => {

      });
  }, []);

  const handleNext = () => {
    if (activeStep + 1 < 3)
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    getSubcategoriesByCategoryId(e[1].props.value)
      .then((response) => {
        setSubCategories([['AI', 'AI'], ['ML', 'ML']]);
      })
      .catch(() => {

      });
  }

  const formData = new FormData();

  const onSubmit = data => {
    const titles = [];
    Object.keys(data).forEach((key) => {
      if (key.startsWith('videoTitle')) {
        titles.push(data[key]);
      } else {
        formData.set(key, data[key]);
      }
    });

    if (titles.length > 0) {
      const videos = titles.map((title, index) => {
        return {
          title,
          video: acceptedFiles[index],
        }
      });
      formData.set('videos', videos);
    }

    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1])
    }

    handleNext();

    if (activeStep + 1 === 3) {
      axios({
        method: 'POST',
        url: '/course/register/:userId',
        data,
        responseType: 'JSON'
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    }
  };

  return (
    <Grid item md={6} sm={12} xs={12}>
      <MuiThemeProvider theme={defaultTheme}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </MuiThemeProvider>
      <Paper elevation={4}>
        <Box className={classes.formTitle}>Register Course</Box>
        <Divider />
        <Box className={classes.formBody}>
          {
            activeStep === 0 ?
              <>
                <FormField
                  key="title"
                  name="title"
                  placeholder="Title"
                  inputProps={{ minLength: 20, maxLength: 150 }}
                  validate={register({
                    required: {
                      value: true,
                      message: "This field is required"
                    },
                    minLength: {
                      value: 20, message: "Please enter atleast 20 characters"
                    },
                    maxLength: {
                      value: 150, message: "Please enter no more than 150 characters"
                    }
                  })}
                  errors={errors}
                />
                <FormField
                  key="price"
                  type="number"
                  name="price"
                  placeholder="Price"
                  inputProps={{ min: 0, maxLength: 5 }}
                  validate={register({
                    required: {
                      value: true,
                      message: "This field is required"
                    },
                    minLength: {
                      value: 2,
                      message: "Please enter atleast 2 digits"
                    },
                    maxLength: {
                      value: 5,
                      message: "Please enter no more than 5 digits"
                    }
                  })}
                  errors={errors}
                />
                <FormField
                  key="discount"
                  type="text"
                  name="discount"
                  placeholder="Discount"
                  inputProps={{ maxLength: 5 }}
                  validate={register({
                    required: {
                      value: true,
                      message: "This field is required"
                    },
                    pattern: {
                      value: /^(100|[1-9]?\d\.\d{2})$/,
                      message: "Please enter valid discount"
                    }
                  })}
                  errors={errors}
                />
                <FormField
                  key="category"
                  type="select"
                  name="category"
                  placeholder="Category"
                  control={control}
                  values={[['IT', 'IT'], ['Science', 'Science']]}
                  rules={{
                    required: "This field is required"
                  }}
                  errors={errors}
                // handleChange={handleChange}
                />
                <FormField
                  key="subcat"
                  type="select"
                  name="subcategory"
                  placeholder="Sub-Category"
                  control={control}
                  values={[['AI', 'AI'], ['ML', 'ML']]}
                  rules={{
                    required: "This field is required"
                  }}
                  errors={errors}
                // handleChange={() => { }}
                />
                <FormField
                  key="description"
                  multiline={true}
                  rows={4}
                  name="description"
                  placeholder="Description"
                  inputProps={{ maxLength: 500 }}
                  validate={register({
                    required: {
                      value: true,
                      message: "This field is required"
                    },
                    minLength: {
                      value: 5,
                      message: "Description should be atleast 50 characters long"
                    },
                    maxLength: {
                      value: 500,
                      message: "Please enter no more than 500 characters"
                    }
                  })}
                  errors={errors}
                />
                <FormField
                  key="level"
                  type="select"
                  name="level"
                  placeholder="Level"
                  control={control}
                  values={[["ALL", "All"], ["BIGINNER", "Biginner"], ["INTERMEDIATE", "Intermediate"], ["EXPERT", "Expert"]]}
                  rules={{
                    required: "This field is required"
                  }}
                  errors={errors}
                // handleChange={() => { }}
                />
                <FormField
                  key="requirements"
                  multiline={true}
                  rows={2}
                  name="requirements"
                  placeholder="Requirements"
                  inputProps={{ maxLength: 200 }}
                  validate={register({
                    maxLength: {
                      value: 200,
                      message: "Please enter no more than 200 characters"
                    }
                  })}
                  errors={errors}
                />
              </> :
              activeStep === 1 ?
                <>
                  <div className={classes.dropzone} {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                      isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    }
                  </div>
                  <div>
                    {selectedFiles.map((fileName, index) =>
                      <Fragment key={fileName}>
                        <p>File: {fileName}</p>
                        <FormField
                          key={`videoTitle${index}`}
                          name={`videoTitle${index}`}
                          placeholder="Video Title"
                          inputProps={{ minLength: 20, maxLength: 50 }}
                          validate={register({
                            required: {
                              value: true,
                              message: "This field is required"
                            },
                            minLength: {
                              value: 20, message: "Please enter atleast 20 characters"
                            },
                            maxLength: {
                              value: 50, message: "Please enter no more than 50 characters"
                            }
                          })}
                          errors={errors}
                        />
                        <hr />
                      </Fragment>
                    )}
                  </div>
                </> :
                <Grid container justify="center" alignItems="center">
                  <h2>You have successfully created a course. Want to publish?</h2>
                </Grid>
          }
        </Box>
        <Divider />
        <Grid className={classes.formFooter} container justify="space-around">
          <Grid item>
            <Button className={classes.backButton} type="button" onClick={handleBack} disabled={activeStep === 0}>Back</Button>
          </Grid>
          <Grid item>
            <Button className={classes.submitButton} type="submit" onClick={handleSubmit(onSubmit)}>{activeStep === steps.length - 1 ? 'Publish' : 'Next'}</Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default RegisterCourse;