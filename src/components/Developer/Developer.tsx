import { Box, Container, Tab, Tabs } from '@mui/material'
import dapprexLogo from './../../assets/dapprexlogo.svg'

import { useState } from 'react'
import { style } from '../../utils/style'

function Developer() {

  return (
    <Box className="developer-container" paddingTop={2} >
        Powered by       
        <Box component="a" href='https://www.tetra.win/' target='blank' className='dapprex-link'>
        <Box fontWeight={600} component="span" color={style.brandColor}>&nbsp;TETRA</Box>
        {/* <Box component="img" src={dapprexLogo} className='dapprex-icon' /> */}
          </Box>      
         </Box>

  )

   
}

export default Developer
