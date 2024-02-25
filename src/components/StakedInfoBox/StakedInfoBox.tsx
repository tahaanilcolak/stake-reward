import { Box, Grid, Snackbar, styled } from "@mui/material"
import { addTokenToMetamask, humanReadableAmount, readableInput, readablePrice } from "../../utils/helper"
import './StakedInfoBox.scss';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockIcon from '@mui/icons-material/Lock';
import metamaskLogo from './../../assets/metamask-icon.svg'
import { TETRA } from "../../utils/tokens";
import { useNativeCoinPriceContext } from "../../context/NativeCoinPriceContext";

function StakedInfoBox({singleTokenPrice, stakedAmount} : {singleTokenPrice : any, stakedAmount : any} ){
  const {nativeCoinPrice} = useNativeCoinPriceContext()

    const Img = styled('img')({
        margin: 'auto',
        display: 'inline',
        height: '26px',
        width: '26px',
      });

      const tokenPrice = !!singleTokenPrice && !!nativeCoinPrice && !!stakedAmount &&  Number(humanReadableAmount(singleTokenPrice[0],10,18)) * Number(nativeCoinPrice) * Number(humanReadableAmount(stakedAmount, 6, TETRA.decimals))

      
    return(
        <Grid container alignItems="center" justifyContent="space-between" position="relative" className='stake-info-input'>
      <Box className='input-label-text' position="absolute">You Staked</Box>
         <Box component="div" className='swap-container-tac'>
          <Box component="input" className='input-tac' disabled type="text" placeholder="0" value={!!stakedAmount && readableInput(Number(humanReadableAmount(stakedAmount, 2, TETRA.decimals)))}    />

          <Box component="div" className='symbol-tac'>
          <Box className="" >
          <Box className='select-token-btn' component={"span"} onClick={()=>{}}>
          <Img src={TETRA.logo} />
          <Box component="span" className='input-token-symbol'> TETRA</Box>
          
          <Box component="span" className='lock-icon'>
         
            <LockOutlinedIcon/>
          </Box>
          </Box>
         

        </Box>
          </Box>

        </Box>
        {
          !!tokenPrice && 
      <Box className='input-token-price'> ${readablePrice(tokenPrice)}
      </Box>
        }
    </Grid>
    )
}

export default StakedInfoBox
