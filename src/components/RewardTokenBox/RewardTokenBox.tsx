import { Box, Button, Grid, Snackbar, styled } from "@mui/material"
import { addTokenToMetamask, humanReadableAmount, readablePrice } from "../../utils/helper"
import './RewardTokenBox.scss';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import metamaskLogo from './../../assets/metamask-icon.svg'
import { Img, style } from "../../utils/style";
import { IToken } from "../../utils/tokens";
import { useCopyAddressContext } from "../../context/CopyAddress";
import STAKE_ABI  from "./../../services/web3/ABI/stakeAbi.json"
import { WPLS, routerAddress, stakeAddress } from "../../utils/global";
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { BigNumber, ethers } from "ethers";
import ROUTER_ABI  from "./../../services/web3/ABI/routerAbi.json"
import { useNativeCoinPriceContext } from "../../context/NativeCoinPriceContext";
import { useTxModalContext } from "../../context/TxModalContext";
import { useLoadingContext } from "../../context/LoadingContext";
import { useEffect } from "react";

function RewardTokenBox({token, isClaimEnable} : {token : IToken , isClaimEnable : boolean}){
  const {copyToCliboard} =  useCopyAddressContext()
  const { address: account } = useAccount()
  const {nativeCoinPrice} = useNativeCoinPriceContext()
  const {setIsLoading} =  useLoadingContext()
  const { setIsTxModalOpen, setError, setTxLink } = useTxModalContext()
 

  const { data: deservedRewardAmount } = useContractRead({
    address: stakeAddress as `0x${string}`,
    abi: STAKE_ABI,
    args:  [account,token.address],
    functionName: 'deservedRewardAmount',
    enabled: !!account,
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

  const tokenPrice = token.address == "0x0000000000000000000000000000000000000000" ?
  !!nativeCoinPrice && !!deservedRewardAmount && 
  Number(nativeCoinPrice) * Number(humanReadableAmount(BigNumber.from(deservedRewardAmount), 6, token.decimals))
  :  
   !!singleTokenPrice && !!nativeCoinPrice && !!deservedRewardAmount &&  Number(humanReadableAmount(singleTokenPrice[0],10,18)) * Number(nativeCoinPrice) * Number(humanReadableAmount(BigNumber.from(deservedRewardAmount), 6, token.decimals))

  const isClaimingEnabled = !!isClaimEnable && !!deservedRewardAmount && BigNumber.from(deservedRewardAmount).gt(0)
      

  const { config: configClaimRewardPrepare, error: errorClaimRewardPrepare } = usePrepareContractWrite({
    address: stakeAddress as `0x${string}`,
    abi: STAKE_ABI,
    functionName: 'claimReward',
    args: [String(token.address)],
    enabled: !!account && !!isClaimingEnabled,
  })

  const { data: dataClaimReward, write: writeClaimReward } = useContractWrite(configClaimRewardPrepare)

  const { isLoading: isLoadingClaimReward, isSuccess: isSuccessClaimReward } = useWaitForTransaction({
    hash: dataClaimReward?.hash,
    onSettled(data, error) {
      setIsLoading(false)
      setIsTxModalOpen(true)
      
      if (!!error) {
        setError(error)
      }
      if (!!data) {
        setTxLink(dataClaimReward?.hash)
      }
    },
  })


  useEffect(() => {
    if (isLoadingClaimReward == true) {
      setIsLoading(true)
    }
  }, [isLoadingClaimReward])



    return(
      <>
        <Grid container alignItems="center" justifyContent="space-between" position="relative" className='swap-input'>
      <Box className='input-label-text' position="absolute">You Deserved</Box>
         <Box component="div" className='swap-container-tac'>
          <Box component="input" disabled className='input-tac' type="text" placeholder="0" value={!!deservedRewardAmount ? humanReadableAmount(BigNumber.from(deservedRewardAmount), 4, token.decimals) : 0}  />

          <Box component="div" className='symbol-tac'>
          <Box className="" >
          <Box className='select-token-btn' component={"span"} onClick={()=>{}}>
          <Img src={token.logo} />
          <Box component="span" className='input-token-symbol'> {token.symbol}</Box>
          
         
          </Box>
          {
            token.address != "0x0000000000000000000000000000000000000000" && 
            <>
          <Box component="span" className='copy-icon-container' onClick={()=>{copyToCliboard(token.address)}}>
            <ContentCopyIcon className='copy-icon' />
          </Box>
          
          
         
            <Box component="span" className='copy-icon-container'>
         
            <Box component="img" src={metamaskLogo} className='metamask-icon' onClick={()=>{addTokenToMetamask(token.address, token.symbol, token.decimals)}} />
          </Box>
          </>
          }
          
          

        </Box>
          </Box>

        </Box>
        {
          !!tokenPrice && 
      <Box className='input-token-price'> ${readablePrice(tokenPrice)}
      </Box>

        }
        

      {/* <Box className='input-label-balance'>Balance: {"0"}</Box> */}
        
      



    </Grid>
    <Button className='swap-btn' disabled={!isClaimingEnabled} fullWidth variant="contained" onClick={() => { }} sx={{ backgroundColor: style.mainBtnColor }}>Claim</Button>

    </>
    )
}

export default RewardTokenBox
