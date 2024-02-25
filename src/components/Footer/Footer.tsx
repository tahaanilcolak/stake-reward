import { Box, Container, Tab, Tabs } from '@mui/material'
import dapprexLogo from './../../assets/dapprexlogo.svg'
import { style } from '../../utils/style'


function Footer() {

  return (
<Box component="a" href='https://tetra.win' target='blank' className="footer" >
Part of the <Box fontWeight={600} component="span" color={style.brandColor}>TETRA</Box>  ecosystem
          </Box>      

  )

   
}

export default Footer
/* 
    <Box className="developer-container" paddingTop={2} >
        Powered by       
        <Box component="a" href='https://dapprex.com' target='blank' className='dapprex-link'>
        <Box component="img" src={dapprexLogo} className='dapprex-icon' />
          </Box>      
         </Box>
*/