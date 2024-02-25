//@ts-nocheck
import { useState } from 'react'
import './App.css'
import TabsList from './components/Tabs/Tabs'
import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'
import { Alert, Backdrop, CircularProgress, Grid, Snackbar } from '@mui/material'
import { style } from './utils/style'
import Footer from './components/Footer/Footer'
import { useLoadingContext } from './context/LoadingContext'
import { useCopyAddressContext } from './context/CopyAddress'
import TransactionResultModal from './components/TransactionResultModal/TransactionResultModal'
import { useTxModalContext } from './context/TxModalContext'

function App() {
  const [count, setCount] = useState(0)
  
  const {isLoading} = useLoadingContext()
  const {isCopiedAddress, closeCopySnackbar} =  useCopyAddressContext()
  const {error ,setError,handleTxModalClose,txLink,isTxModalOpen} = useTxModalContext()

  
const MAIN_CONTAINER = {
  position: "relative",
  paddingTop: "1rem",
  backgroundColor: style.mainBgColor,
  height: "calc(100vh - 125px)"
}

  return (
    <>
      <Header />
      <TabsList />
      <Grid className='test' sx={MAIN_CONTAINER}>
        <Outlet />
      <Footer/>
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
      <Backdrop open={isLoading} sx={{zIndex : "999999999999"}}>
      <CircularProgress color="inherit" />
    <TransactionResultModal open={isTxModalOpen} error={error} txLink={txLink} handleClose={handleTxModalClose}/>

    </Backdrop>
      
      </Grid>
    </>
  )
}

export default App



