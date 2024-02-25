//@ts-nocheck
import { Box, Grid, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import './StakeScreen.scss';
import { style } from '../../utils/style';
import InputTokenBox from '../../components/InputTokenBox/InputTokenBox';
import UnstakeAccordion from '../../components/UnstakeAccordion/UnstakeAccordion';
import { readableInput } from '../../utils/helper';
import StakedInfoBox from '../../components/StakedInfoBox/StakedInfoBox';
import { useCopyAddressContext } from '../../context/CopyAddress';
import { useAccount, useContractRead } from 'wagmi';
import { TETRA } from '../../utils/tokens';
import STAKE_ABI  from "./../../services/web3/ABI/stakeAbi.json"
import ROUTER_ABI  from "./../../services/web3/ABI/routerAbi.json"
import { WPLS, routerAddress, stakeAddress } from '../../utils/global';
import { BigNumber, ethers } from 'ethers';



function StakeScreen() {
  const { address: account } = useAccount()

  const { data: singleTokenPrice } = useContractRead({
    address: routerAddress as `0x${string}`,
    abi: ROUTER_ABI,
    args:  [String(ethers.utils.parseUnits("1", TETRA.decimals)), [WPLS, TETRA.address]],
    functionName: 'getAmountsIn',
    enabled: true,
    watch: false
  })

  const { data: stakeInfo } = useContractRead({
    address: stakeAddress as `0x${string}`,
    abi: STAKE_ABI,
    args:  [account],
    functionName: 'userInfo',
    enabled: !!account,
    watch: true
  })

  const stakedAmount = ( !!stakeInfo &&  !!stakeInfo[0] && stakeInfo[0] ) ? stakeInfo[0] : BigNumber.from(0) 

  console.log("stakedAmount",stakedAmount)
  return (
    <Grid className='stake-box' container sx={ROOT} position="relative">
      <Stack component="div">
        <Typography className='box-title' variant="h6" component="h2">
          STAKE TETRA
        </Typography>        
      </Stack>

      <InputTokenBox singleTokenPrice={singleTokenPrice} />

      <StakedInfoBox singleTokenPrice={singleTokenPrice} stakedAmount={stakedAmount} />

      <UnstakeAccordion singleTokenPrice={singleTokenPrice} stakedAmount={stakedAmount} />
    </Grid>

  )
}

export default StakeScreen

export const ROOT = {
  backgroundImage: style.boxBgColor
}