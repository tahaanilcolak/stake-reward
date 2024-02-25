import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Grid, Slider, Snackbar, Stack, styled } from "@mui/material"
import './UnstakeAccordion.scss';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { humanReadableAmount, originalNumber, readableInput, readablePrice } from "../../utils/helper";
import tetraLogo from './../../assets/tetra_logo.webp'
import { style } from "../../utils/style";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { TETRA } from "../../utils/tokens";
import { useNativeCoinPriceContext } from "../../context/NativeCoinPriceContext";
import { regex, stakeAddress } from "../../utils/global";
import { parseUnits } from "ethers/lib/utils";
import STAKE_ABI  from "./../../services/web3/ABI/stakeAbi.json"
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { useLoadingContext } from "../../context/LoadingContext";
import { useTxModalContext } from "../../context/TxModalContext";

function UnstakeAccordion({singleTokenPrice, stakedAmount} : {singleTokenPrice : any, stakedAmount : BigNumber} ){
  const {nativeCoinPrice} = useNativeCoinPriceContext()

  const [readableUnstakeTokenAmount, setReadableUnstakeTokenAmount] = useState<string>(!!stakedAmount && humanReadableAmount(BigNumber.from(stakedAmount).div(2),2, TETRA.decimals))
  const [UnstakeTokenAmount, setUnstakeTokenAmount] = useState(!!stakedAmount && BigNumber.from(stakedAmount).div(2))
  const [percent, setPercent] = useState(50)
  const { address: account } = useAccount()
  const {setIsLoading} =  useLoadingContext()
  const { setIsTxModalOpen, setError, setTxLink } = useTxModalContext()


  const tokenPrice = !!singleTokenPrice && !!nativeCoinPrice && !!stakedAmount &&  Number(humanReadableAmount(singleTokenPrice[0],10,18)) * Number(nativeCoinPrice) * Number(readableUnstakeTokenAmount)

  useEffect(()=>{
    if(!!stakedAmount){
      setUnstakeTokenAmount(BigNumber.from(stakedAmount).div(2))
      setReadableUnstakeTokenAmount(humanReadableAmount(BigNumber.from(stakedAmount).div(2),2, TETRA.decimals))
      setPercent(50)
    }

  },[stakedAmount])
  const marks = [
    {
      value: 0,
      label: '0%',
    },
    {
      value: 25,
      label: '25%',
    },
    {
      value: 50,
      label: '50%',
    },
    {
      value: 75,
      label: '75%',
    },
    {
      value: 100,
      label: '100%',
    },
  ];
  
  function valuetext(value: number) {
    return `${value}%`;
  }
  
  function handleSliderChange(event){
    setPercent(event.target.value)
    const newBnUnstakeAmount =  BigNumber.from(stakedAmount).mul(event.target.value).div(100)
    setReadableUnstakeTokenAmount(humanReadableAmount(newBnUnstakeAmount, 2, TETRA.decimals))
    setUnstakeTokenAmount(newBnUnstakeAmount)
  }

  console.log("UnstakeTokenAmount",UnstakeTokenAmount)

  
  function handleTokenAmount(event){
    if (regex.test(event.target.value) || event.target.value === '' || true) {
      const newBnUnstakeAmount = parseUnits(String(originalNumber(event.target.value)), TETRA.decimals)
      if(newBnUnstakeAmount.gt(stakedAmount)){
        setReadableUnstakeTokenAmount(humanReadableAmount(stakedAmount, 2, TETRA.decimals))
        setUnstakeTokenAmount(stakedAmount)
        const newPercentege = Number(BigNumber.from(newBnUnstakeAmount).mul(100).div(stakedAmount)).toFixed(2)
        setPercent(Number(newPercentege))
      }else{
        setReadableUnstakeTokenAmount(readableInput(event.target.value))
        setUnstakeTokenAmount(!!event.target.value && newBnUnstakeAmount )
        const newPercentege = Number(BigNumber.from(newBnUnstakeAmount).mul(100).div(stakedAmount)).toFixed(2)
        setPercent(Number(newPercentege))
      }
      
    }
    }

    const { config: configUnstakePrepare, error: errorUnstakePrepare } = usePrepareContractWrite({
      address: stakeAddress as `0x${string}`,
      abi: STAKE_ABI,
      functionName: 'withdraw',
      args: [String(UnstakeTokenAmount)],
      enabled: !!account && !!UnstakeTokenAmount && !!stakedAmount,
    })

    console.log("enabled", !!account && !!UnstakeTokenAmount && !!stakedAmount)
  
    const { data: dataUnstake, write: writeUnstake } = useContractWrite(configUnstakePrepare)
  
    const { isLoading: isLoadingUnstake, isSuccess: isSuccessUnstake } = useWaitForTransaction({
      hash: dataUnstake?.hash,
      onSettled(data, error) {
        setIsLoading(false)
        setIsTxModalOpen(true)
        if (!!error) {
          setError(error)
        }
        if (!!data) {
          setTxLink(dataUnstake?.hash)
        }
      },
    })


    useEffect(() => {
      if (isLoadingUnstake == true) {
        setIsLoading(true)
      }
    }, [isLoadingUnstake])

    const Img = styled('img')({
        margin: 'auto',
        display: 'inline',
        height: '26px',
        width: '26px',
      });
      
    return(
      <Grid  width="100%">
     <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          UNSTAKE
        </AccordionSummary>
        <AccordionDetails  sx={{background: `${style.boxBgColor}  !important`}}>
        <Grid container alignItems="center" justifyContent="space-between" position="relative" className='stake-info-input' width="100%">
      <Box className='input-label-text' position="absolute">Unstaked Amount</Box>
         <Box component="div" className='swap-container-tac'>
          <Box component="input" className='input-tac'  type="text" placeholder="0" value={readableUnstakeTokenAmount}  onChange={(event) => {handleTokenAmount(event)}}  />

          <Box component="div" className='symbol-tac'>
          <Box className="" >
          <Box className='select-token-btn' component={"span"} onClick={()=>{}}>
          <Img src={tetraLogo} />
          <Box component="span" className='input-token-symbol'> TETRA</Box>
          
          <Box component="span" className='lock-icon'>
         
            <LockOpenIcon/>
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

    <Box width="100%" paddingBottom={2}>
      <Slider
        aria-label="Always visible"
        value={percent}
        onChange={handleSliderChange}
        getAriaValueText={valuetext}
        step={5}
        min={0}
        max={100}
        marks={marks}
        valueLabelDisplay="on"
      />
    </Box>
    <Button disabled={!!!UnstakeTokenAmount || (!BigNumber.from(UnstakeTokenAmount).gt(0))} className='swap-btn' fullWidth variant="contained" onClick={() => {writeUnstake() }} sx={{ backgroundColor: style.mainBtnColor }}>UNSTAKE</Button>

        </AccordionDetails>
      </Accordion>
    
    </Grid>
    )
}

export default UnstakeAccordion

