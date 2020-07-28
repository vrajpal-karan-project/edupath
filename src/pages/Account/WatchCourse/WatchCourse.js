import React, { useState } from 'react';
import {
  Grid,
  Container,
  makeStyles,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';

const useStyle = makeStyles(theme => ({
}));

const WatchCourse = (props) => {
  const { id } = useParams();

  const classes = useStyle();

  const [activeStep, setActiveStep] = useState();

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    sources: [{
      src: '/home/vrajpal/vid',
      type: 'video/mp4'
    }]
  };

  const steps = ["Video 1 with a long long long title or long long long text", "Video 2", "Video 3"];

  return (
    <Container maxWidth="xl" style={{ margin: "24px auto" }}>
      <Grid container>
        <Grid item xs={8}>
          <VideoPlayer {...videoJsOptions} />
        </Grid>
        <Grid item xs={4}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>
                  <Typography>{label}</Typography>
                </StepLabel>
                <StepContent>
                  <Typography>3:20</Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default WatchCourse;
