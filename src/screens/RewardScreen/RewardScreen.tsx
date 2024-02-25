//@ts-nocheck
import { Box, Grid, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import './RewardScreen.scss';
import { style } from '../../utils/style';
import RewardTokenBox from '../../components/RewardTokenBox/RewardTokenBox';
import { REWARD_TOKENS } from '../../utils/tokens';
import CountdownBox from '../../components/CountdownBox/CountdownBox';
import { useAccount, useContractRead } from 'wagmi';
import { lockPeriod, stakeAddress } from '../../utils/global';
import STAKE_ABI  from "./../../services/web3/ABI/stakeAbi.json"

function RewardScreen() {
  const { address: account } = useAccount()

  const { data: stakeInfo } = useContractRead({
    address: stakeAddress as `0x${string}`,
    abi: STAKE_ABI,
    args:  [account],
    functionName: 'userInfo',
    enabled: !!account,
    watch: false
  })

  console.log("stakeInfo",stakeInfo)
  const currentDate = Date.now()
  const timestamp = !!stakeInfo && !!stakeInfo[2] && (Number(String(stakeInfo[2])) + lockPeriod) * 1000
  const isClaimEnable = !!timestamp && currentDate > timestamp

  return (
    <Grid className='stake-box' container sx={ROOT} position="relative">
      <Stack component="div">
        <Typography className='box-title' variant="h6" component="h2">
          REWARDS
        </Typography>        
      </Stack>
      <CountdownBox timestamp={timestamp} />
      {REWARD_TOKENS.map((token, index) => (

<RewardTokenBox key={index} token={token} isClaimEnable={isClaimEnable} />

))}




    


    </Grid>

  )
}

export default RewardScreen

export const ROOT = {
  backgroundImage: style.boxBgColor
}