//@ts-nocheck
import { createContext, useContext, useState } from 'react';

const TxModalContext = createContext(undefined);

export function TxModalProvider({ children }) {
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [txLink, setTxLink] = useState("");


  function handleTxModalClose(){
    setIsTxModalOpen(false)
  }

  return (
    <TxModalContext.Provider value={{ error, setError,handleTxModalClose,txLink,setTxLink,isTxModalOpen,isTxModalOpen ,setIsTxModalOpen}}>
      {children}
    </TxModalContext.Provider>
  );
}

export function useTxModalContext() {
  return useContext(TxModalContext);
}