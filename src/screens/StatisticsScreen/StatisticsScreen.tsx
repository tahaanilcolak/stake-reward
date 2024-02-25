//@ts-nocheck
import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { style } from '../../utils/style';
import RewardTokenBox from '../../components/RewardTokenBox/RewardTokenBox';
import { IToken, REWARD_TOKENS, TETRA } from '../../utils/tokens';
import CountdownBox from '../../components/CountdownBox/CountdownBox';
import { humanReadableAmount, readableInput, readablePrice } from '../../utils/helper';
import { WPLS, routerAddress, stakeAddress } from '../../utils/global';
import { useAccount, useContractRead } from 'wagmi';
import STAKE_ABI  from "./../../services/web3/ABI/stakeAbi.json"
import ROUTER_ABI  from "./../../services/web3/ABI/routerAbi.json"

import { BigNumber, ethers } from 'ethers';
import { useNativeCoinPriceContext } from '../../context/NativeCoinPriceContext';

function StatisticsScreen() {
  const { address: account } = useAccount()
  const {nativeCoinPrice} = useNativeCoinPriceContext()


  const { data: totalStakedAmount } = useContractRead({
    address: stakeAddress as `0x${string}`,
    abi: STAKE_ABI,
    args:  [],
    functionName: 'totalStakedAmount',
    enabled: true,
    watch: true
  })

  const { data: userInfo } = useContractRead({
    address: stakeAddress as `0x${string}`,
    abi: STAKE_ABI,
    args:  [account],
    functionName: 'userInfo',
    enabled: !!account,
    watch: true
  })

  const { data: singleTokenPrice } = useContractRead({
    address: routerAddress as `0x${string}`,
    abi: ROUTER_ABI,
    args:  [String(ethers.utils.parseUnits("1", TETRA.decimals)), [WPLS, TETRA.address]],
    functionName: 'getAmountsIn',
    enabled: true,
    watch: false
  })

  const readableTotalStakedAmount = !!userInfo && !!userInfo[0] && humanReadableAmount(userInfo[0],2 , TETRA.decimals)

  const userTokenPrice = !!singleTokenPrice && !!nativeCoinPrice && !!totalStakedAmount &&  Number(humanReadableAmount(singleTokenPrice[0],10,18)) * Number(nativeCoinPrice) * Number((readableTotalStakedAmount))
  const totalStakeTokenPrice = !!singleTokenPrice && !!nativeCoinPrice && !!totalStakedAmount &&  Number(humanReadableAmount(singleTokenPrice[0],10,18)) * Number(nativeCoinPrice) * Number((readableTotalStakedAmount))

  const shareOfPool = !!userInfo && !!userInfo[0] && !!totalStakedAmount && (BigNumber.from(userInfo[0]).mul(ethers.utils.parseUnits("1",18)).mul(100).div(totalStakedAmount))
  const readebleShare = !!shareOfPool && humanReadableAmount(shareOfPool, 6,TETRA.decimals )
  console.log("shareOfPool",shareOfPool.toString())
  console.log("readebleShare",readebleShare)
  

  return (
    <Grid className='stake-box' container sx={ROOT} position="relative">
      <Stack component="div">
        <Typography className='box-title' variant="h6" component="h2">
        User Statistics
        </Typography>
      </Stack>


      <Grid container>
        <Stack width="100%">


        <Grid container paddingTop={1} justifyContent="space-between">
            <Grid item textAlign={"left"}>
              <Box >
            My Staked
              </Box>
            </Grid>
            <Grid item textAlign="right" >
              {readableInput(!!readableTotalStakedAmount ? readableTotalStakedAmount : 0)} {TETRA.symbol}

              {!!userTokenPrice &&
              <Box component="span" className='statistics-usdt-price'>
              (${readablePrice(userTokenPrice)})
              </Box>
             }
            </Grid>
          </Grid>

          <Grid container paddingTop={1} justifyContent="space-between">
            <Grid item textAlign={"left"}>
              <Box >
              Your % share of the Pool
              </Box>
            </Grid>
            <Grid item textAlign="right" >
              {!!readebleShare ? readebleShare : 0} %
            </Grid>
          </Grid>

          {REWARD_TOKENS.map((token, index) => (

<SingleUserTokenClaim key={index} token={token} />

))}



          <Divider light  sx={{paddingTop : "10px",paddingBottom : "10px"}} />

          <Stack component="div">
        <Typography className='box-title' variant="h6" component="h2">
        Global Statistics
        </Typography>
      </Stack>

          <Grid container paddingTop={1} justifyContent="space-between">
            <Grid item textAlign={"left"}>
              <Box >
              Total amount of TETRA staked
              </Box>
            </Grid>
            <Grid item textAlign="right" >
              {!!totalStakedAmount ? readableInput(humanReadableAmount(totalStakedAmount, 2, TETRA.decimals)) : 0 }  {TETRA.symbol}
              {!!totalStakeTokenPrice &&
              <Box component="span" className='statistics-usdt-price'>
              (${readablePrice(totalStakeTokenPrice)})
              </Box>
             }
            </Grid>
          </Grid>
        </Stack>

        {REWARD_TOKENS.map((token, index) => (

<DistrubeteReward key={index} token={token} />

))}


      </Grid>


    </Grid>

  )
}

export default StatisticsScreen

export const ROOT = {
  backgroundImage: style.boxBgColor
}


function SingleUserTokenClaim({token} : {token : IToken}) {


  return (
    <Grid container paddingTop={1} justifyContent="space-between">
            <Grid item textAlign={"left"}>
              <Box >
              Claimed {token.symbol}
              </Box>
            </Grid>
            <Grid item textAlign="right" >
              {readableInput(0) + " " + token.symbol}
            </Grid>
          </Grid>
  )
}


function DistrubeteReward({token} : {token : IToken}) {
  const {nativeCoinPrice} = useNativeCoinPriceContext()

  const { data: rewardTokensDetail } = useContractRead({
    address: stakeAddress as `0x${string}`,
    abi: STAKE_ABI,
    args:  [token.address],
    functionName: 'rewardTokensDetail',
    enabled: true,
    watch: true
  })

  const { data: singleTokenPrice } = useContractRead({
    address: routerAddress as `0x${string}`,
    abi: ROUTER_ABI,
    args:  [String(ethers.utils.parseUnits("1", token.decimals)), [WPLS, token.address]],
    functionName: 'getAmountsIn',
    enabled: token.address != "0x0000000000000000000000000000000000000000",
    watch: false
  })

  const totalDistrubutedAmount = (!!rewardTokensDetail && !!rewardTokensDetail[1]) ? humanReadableAmount(BigNumber.from(rewardTokensDetail[1]), 2, token.decimals) : 0
  const totalClaimedAmount = (!!rewardTokensDetail && !!rewardTokensDetail[2]) ? humanReadableAmount(BigNumber.from(rewardTokensDetail[2]), 2, token.decimals) : 0

  const totalDistrubuteInUsdt = token.address == "0x0000000000000000000000000000000000000000" ?
  !!nativeCoinPrice && !!totalDistrubutedAmount && 
  Number(nativeCoinPrice) * Number(totalDistrubutedAmount)
  :  
   !!singleTokenPrice && !!nativeCoinPrice && !!totalDistrubutedAmount &&  Number(humanReadableAmount(singleTokenPrice[0],10,18)) * Number(nativeCoinPrice) * Number(totalDistrubutedAmount)

   const totalClaimedInUsdt = token.address == "0x0000000000000000000000000000000000000000" ?
  !!nativeCoinPrice && !!totalClaimedAmount && 
  Number(nativeCoinPrice) * Number(totalClaimedAmount)
  :  
   !!singleTokenPrice && !!nativeCoinPrice && !!totalClaimedAmount &&  Number(humanReadableAmount(singleTokenPrice[0],10,18)) * Number(nativeCoinPrice) * Number(totalClaimedAmount)



  return (
    <>
    <Grid container paddingTop={1} justifyContent="space-between">
            <Grid item textAlign={"left"}>
              <Box >
              Distrubuted reward {token.symbol}
              </Box>
            </Grid>
            <Grid item textAlign="right" >
              {readableInput(totalDistrubutedAmount) + " " + token.symbol}
             {!!totalDistrubuteInUsdt &&
              <Box component="span" className='statistics-usdt-price'>
              (${readablePrice(totalDistrubuteInUsdt)})
              </Box>
             }
            </Grid>
          </Grid>
           <Grid container paddingTop={1} justifyContent="space-between">
           <Grid item textAlign={"left"}>
             <Box >
             Total claimed reward {token.symbol}
             </Box>
           </Grid>
           <Grid item textAlign="right" >
             {readableInput(totalClaimedAmount) + " " + token.symbol}

             {!!totalClaimedInUsdt &&
              <Box component="span" className='statistics-usdt-price'>
              (${readablePrice(totalClaimedInUsdt)})
              </Box>
             }
           </Grid>
         </Grid>
         </>
  )
}