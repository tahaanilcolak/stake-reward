import { Box, Container, Tab, Tabs } from '@mui/material'
import './Tabs.scss'

import { useState } from 'react'
import { style } from '../../utils/style';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

function TabsList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(newValue)
  };

  return (
    <Box  sx={TABS_CONTAINER_STYLE}>
    <Tabs
  centered
  textColor="primary"
  indicatorColor="secondary"
  value={value}
  onChange={handleChange}
  aria-label="secondary tabs example"
>
  <Tab value="/" label="Staking" />
  <Tab value="/rewards" label="Rewards" />
  <Tab value="/statistics" label="Statistics" />
 {/*  <Tab value="/limit" label={
    <Box>Limit Order
     
      </Box>
  } /> */}
  
  {/* <Tab value="/liquidity" disabled label={
    <Box>Liquidity
      <Box position="absolute" fontSize="10px" sx={{opacity : "0.8", right  :"0", left : "0"}}>Coming Soon</Box>
      </Box>
  } /> */}

</Tabs>
         </Box>



  )

   
}

const TABS_CONTAINER_STYLE = {
  width : "100%",
  paddingTop : "1rem",
  backgroundColor : style.mainBgColor,
}


export default TabsList
