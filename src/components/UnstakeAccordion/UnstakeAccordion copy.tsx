import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Grid, Snackbar, styled } from "@mui/material"
import './UnstakeAccordion.scss';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
function UnstakeAccordion(){

    const Img = styled('img')({
        margin: 'auto',
        display: 'inline',
        height: '26px',
        width: '26px',
      });
      
    return(
        <Grid container alignItems="center" justifyContent="space-between" position="relative" className='swap-input'>
     <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          UNSTAKE
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
    
    </Grid>
    )
}

export default UnstakeAccordion
