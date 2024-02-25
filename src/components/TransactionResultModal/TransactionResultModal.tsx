//@ts-nocheck
import { Avatar, Box, Button, ButtonGroup, FormLabel, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Modal, TextField, Tooltip, Typography } from '@mui/material'
import './TransactionResultModal.scss'
import CloseIcon from '@mui/icons-material/Close';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import LaunchIcon from '@mui/icons-material/Launch';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
function TransactionResultModal({ open, handleClose, error, txLink}: { open : boolean,error: string,txLink : string, handleClose: () => void }) {


  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <Box className="mui-modal-container mui-settings-modal-container">
        <Box >
          <Box onClick={handleClose} className="close-modal-btn">
            <CloseIcon />
          </Box>

          <Typography paddingTop="4px" className='modal-header' id="modal-modal-title" variant="h6" component="h2">
            {!!!txLink ?
            "Error"
            :
            "Transaction Submitted" 
            }
          </Typography>


        </Box>


        
            
            {
              !!!txLink ? 
              <Box textAlign="center" paddingTop={2}>
          <Box padding={4}>
            <ErrorOutlineIcon className='tx-error-icon' />
          </Box>

          <Grid container  textAlign="center" justifyContent="center" alignItems="center">
              <Box display="flex">
          <Typography paddingLeft={"4px"} color={"#E14F9B"} fontWeight={600}  >The transaction cannot succeed.
          <br/>
          error
          </Typography>
          </Box>
          </Grid>
        </Box>
:
<Box textAlign="center" paddingTop={2}>
<Box padding={4}>
  <ArrowCircleUpIcon className='tx-status-icon' />
</Box>

<Grid container  textAlign="center" justifyContent="center" alignItems="center">
<Box display="flex" component={"a"} href={`https://scan.mypinata.cloud/ipfs/bafybeignzhc77l2eszm4jvjvvnx2t2hy7lxdo4prnpnovzqqntsg47kmmy/#/tx/${txLink}`} target='blank' sx={{textDecoration : "none"}}>
            <LaunchIcon className='tx-launch-icon'/>
          <Typography paddingLeft={"4px"} color={"#2e7d32"} fontWeight={600}  >View on PulseScan</Typography>
          </Box>
          </Grid>
        </Box>
            }

          <Box paddingX={2} paddingTop={3}>
            {
!!!txLink ?
<Button color='error' fullWidth variant="contained" onClick={handleClose}>DISMISS</Button>
:
<Button color='success' fullWidth variant="contained" onClick={handleClose}>CLOSE</Button>


            }

          </Box>



      </Box>
    </Modal>
  )


}

export default TransactionResultModal
