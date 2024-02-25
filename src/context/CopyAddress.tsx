//@ts-nocheck
import { createContext, useContext, useState } from 'react';

const CopyAddressContext = createContext(undefined);

export function CopyAddressProvider({ children }) {
  const [isCopiedAddress, setIsCopiedAddress] = useState(false)

  function copyToCliboard (tokenAddress : string)  {

    setIsCopiedAddress(true);
    //navigator.clipboard.writeText(tokenAddress)
  }

  function closeCopySnackbar(){
    setIsCopiedAddress(false);

  }

  return (
    <CopyAddressContext.Provider value={{ isCopiedAddress, closeCopySnackbar,copyToCliboard } }>
      {children}
    </CopyAddressContext.Provider>
  );
}

export function useCopyAddressContext() {
  return useContext(CopyAddressContext);
}