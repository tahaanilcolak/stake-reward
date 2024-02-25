import { Box, Button, Container, Tab, Tabs } from '@mui/material'
import { ConnectKitButton } from 'connectkit'
import { useState } from 'react'
import { style } from '../../utils/style'

function Header() {

  return (
    <Container sx={{paddingY : "10px"}}>
    <Box display="flex" alignItems="center">
           <Box fontSize='24px' fontWeight='700'>
             {/* OMNIS */} <Box component="span" sx={DEX_LOGO}>OMNIS <Box component="span" sx={BETA_LOGO}>STAKE / REWARD</Box></Box>
           </Box>
           <Box flexGrow={1} />
           <Box paddingRight={1}>
           <Button href='https://www.tetra.win/support/omnis' target='_blank' className='support-btn' fullWidth variant="contained"  sx={{ backgroundColor: style.mainBtnColor, textTransform : "none" }}>Support</Button>
           </Box>
           <Box>
           <ConnectKitButton/>
           </Box>
         </Box>

     </Container>
  )

   
}
export default Header

const DEX_LOGO = {
  color : style.brandColor
}

const BETA_LOGO = {
  color : style.brandColor,
  fontSize : "12px"
}
/* 
           <Button className='swap-btn' fullWidth variant="contained"  sx={{ backgroundColor: style.mainBtnColor }}>Support</Button>

*/