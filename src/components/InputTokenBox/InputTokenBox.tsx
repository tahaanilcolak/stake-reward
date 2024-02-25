import { Alert, Box, Button, Grid, Snackbar, styled } from "@mui/material"
import { addTokenToMetamask, humanReadableAmount, originalNumber, readableInput, readablePrice } from "../../utils/helper"
import './InputTokenBox.scss';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import metamaskLogo from './../../assets/metamask-icon.svg'
import { style } from "../../utils/style";
import { TETRA } from "../../utils/tokens";
import { useEffect, useState } from "react";
import { erc20ABI, useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { WPLS, regex, routerAddress, stakeAddress } from "../../utils/global";
import { parseUnits } from "ethers/lib/utils";
import { BigNumber, ethers } from "ethers";
import STAKE_ABI  from "./../../services/web3/ABI/stakeAbi.json"
import { useNativeCoinPriceContext } from "../../context/NativeCoinPriceContext";
import { useLoadingContext } from "../../context/LoadingContext";
import { useTxModalContext } from "../../context/TxModalContext";
const Img = styled('img')({
  margin: 'auto',
  display: 'inline',
  height: '26px',
  width: '26px',
});
function InputTokenBox({singleTokenPrice} : {singleTokenPrice : any} ){
  const [isCopiedAddress, setIsCopiedAddress] = useState(false)
  const [inputTokenAmount, setInputTokenAmount] = useState<BigNumber | BigInt>()
  const [readableTokenAmount, setReadableTokenAmount] = useState<string>("")
  const { address: account } = useAccount()
  const {setIsLoading} =  useLoadingContext()
  const { setIsTxModalOpen, setError, setTxLink } = useTxModalContext()
  const {nativeCoinPrice} = useNativeCoinPriceContext()
  function copyToCliboard (tokenAddress : string)  {

    setIsCopiedAddress(true);
    navigator.clipboard.writeText(tokenAddress)
  }

  function closeCopySnackbar(){
    setIsCopiedAddress(false);

  }


      /* WAGMI READ */

      const { data: tetraBalance } = useContractRead({
        address: TETRA.address as `0x${string}`,
        abi: erc20ABI,
        args: [account],
        functionName: 'balanceOf',
        enabled: !!account,
        watch: true
      })

      const { data: allowance } = useContractRead({
        address: TETRA.address as `0x${string}`,
        abi: erc20ABI,
        args: [account, stakeAddress],
        functionName: 'allowance',
        enabled: !!account,
        watch: true
      })

      


      const needToApprove = !!inputTokenAmount && allowance != undefined && BigNumber.from(inputTokenAmount).gt(allowance);

      /* WAGMI WRITE */


      const { config: configApprovePrepare, error: errorApprovePrepare } = usePrepareContractWrite({
        address: TETRA.address as `0x${string}`,
        abi: erc20ABI,
        functionName: 'approve',
        args: [stakeAddress, String(inputTokenAmount)],
        enabled: !!account && !!needToApprove,
      })
    
      const { data: dataApprove, write: writeApprove } = useContractWrite(configApprovePrepare)
    
      const { isLoading: isLoadingApprove, isSuccess: isSuccessApprove } = useWaitForTransaction({
        hash: dataApprove?.hash,
        
        onSettled(data, error) {
          setIsLoading(false)
          
        },
      })


      const { config: configStakePrepare, error: errorStakePrepare } = usePrepareContractWrite({
        address: stakeAddress as `0x${string}`,
        abi: STAKE_ABI,
        functionName: 'stake',
        args: [String(inputTokenAmount)],
        enabled: !!account && !!inputTokenAmount && !!!needToApprove,
      })
    
      const { data: dataStake, write: writeStake } = useContractWrite(configStakePrepare)
    
      const { isLoading: isLoadingStake, isSuccess: isSuccessStake } = useWaitForTransaction({
        hash: dataStake?.hash,
        onSettled(data, error) {
          setIsLoading(false)
          setIsTxModalOpen(true)
          setInputTokenAmount(null)
          setReadableTokenAmount("")
          if (!!error) {
            setError(error)
          }
          if (!!data) {
            setTxLink(dataStake?.hash)
          }
        },
      })


      useEffect(() => {
        if (isLoadingStake == true) {
          setIsLoading(true)
        }
      }, [isLoadingStake])

      useEffect(() => {
        if (isLoadingApprove == true) {
          setIsLoading(true)
        }
      }, [isLoadingApprove])
    

      const tokenPrice = !!singleTokenPrice && !!nativeCoinPrice && !!readableTokenAmount &&  Number(humanReadableAmount(singleTokenPrice[0],10,18)) * Number(nativeCoinPrice) * Number(originalNumber(readableTokenAmount))

  const readableTetraBalance = !!tetraBalance ? humanReadableAmount(tetraBalance, 2, TETRA.decimals) : 0
      
  function handleTokenAmount(event){
    if (regex.test(event.target.value) || event.target.value === '' || true) {
      setReadableTokenAmount(readableInput(event.target.value))
      setInputTokenAmount(!!event.target.value && parseUnits(String(originalNumber(event.target.value)), TETRA.decimals) )
    }else{
      setReadableTokenAmount("")
      setInputTokenAmount(null)
    }
    }

    function handleMaxAmount(){
        if(!!tetraBalance){
          setReadableTokenAmount(readableInput(Number(readableTetraBalance)))
          setInputTokenAmount(tetraBalance)
        }
    }
      
      
    return(
      <>
        <Grid container alignItems="center" justifyContent="space-between" position="relative" className='swap-input'>
      <Box className='input-label-text' position="absolute">You Stake</Box>
         <Box component="div" className='swap-container-tac'>
          <Box component="input" className='input-tac' type="text" placeholder="0" value={readableTokenAmount}  onChange={(event) => {handleTokenAmount(event)}}  />

          <Box component="div" className='symbol-tac'>
          <Box className="" >
          <Box className='select-token-btn' component={"span"} onClick={()=>{}}>
          <Img src={TETRA.logo} />
          <Box component="span" className='input-token-symbol'> TETRA</Box>
          
         
          </Box>
          <Box component="span" className='copy-icon-container' onClick={()=>{copyToCliboard(TETRA.address)}}>
            <ContentCopyIcon className='copy-icon' />
          </Box>
         
          <Box component="span" className='copy-icon-container'>
         
            <Box component="img" src={metamaskLogo} className='metamask-icon' onClick={()=>{addTokenToMetamask(TETRA.address, TETRA.symbol, TETRA.decimals)}} />
          </Box>
          

        </Box>
          </Box>

        </Box>
        {
          !!tokenPrice && 
      <Box className='input-token-price'> ${readablePrice(tokenPrice)}
      </Box>

        }
        

      <Box className='input-label-balance'>Balance: {readableTetraBalance}
        <Box component="span" className='balance-max-btn' onClick={() => {handleMaxAmount()}}> MAX</Box>
        
      </Box>



    </Grid>
    {
      !!needToApprove &&
      <Button className='swap-btn' fullWidth variant="contained" onClick={() => { writeApprove()}} sx={{ backgroundColor: style.mainBtnColor , marginBottom : "10px"}}>Approve</Button>
    }
    <Button className='swap-btn' disabled={!!needToApprove} fullWidth variant="contained" onClick={() => { writeStake() }} sx={{ backgroundColor: style.mainBtnColor }}>Stake</Button>
    {/* <Alert sx={{width : "100%", marginTop : "10px"}} variant="filled" severity="error">
  This is a filled error Alert.
</Alert> */}
    <Snackbar
      ContentProps={{
        sx: {
          display: 'block',
          textAlign: "center"
        }
      }}
          anchorOrigin={{vertical : "top", horizontal : "center"}}
            open={isCopiedAddress}
            autoHideDuration={2000}
            onClose={closeCopySnackbar}
            
            message="Token address copied"
          />
    </>
    )
}

export default InputTokenBox
