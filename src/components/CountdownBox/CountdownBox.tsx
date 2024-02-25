import { Box, Button, Container, Grid, Tab, Tabs, Typography } from '@mui/material'
import { ConnectKitButton } from 'connectkit'
import { useState } from 'react'
import { style } from '../../utils/style'
import Countdown from 'react-countdown';


function CountdownBox({timestamp} : {timestamp : any}) {
  const renderer = ({ days ,hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Box width="100%" textAlign="center">Claiming available</Box>;
    } else {
      return <Box width="100%" textAlign="center"> 
      <Typography component="h4">
      Claiming available in 
      </Typography>
      <Typography component="h3" fontSize="18px">
      {days} Days {hours} Hours  {minutes} Minutes 
      </Typography>
      </Box>;
    }
  };

  return (
   <Grid container>
    <Countdown
    date={timestamp}
    renderer={renderer}
  />
   
   </Grid>
  )

  1706692365
  1709214918000
}
export default CountdownBox
