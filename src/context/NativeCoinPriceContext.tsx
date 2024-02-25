//@ts-nocheck
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const NativeCoinPriceContext = createContext(undefined);

export function NativeCoinPriceProvider({ children }) {
  const [nativeCoinPrice, setNativeCoinPrice] = useState(null);

  useEffect(()=>{
    axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=pulsechain&vs_currencies=usd`)
    .then(response => {
      setNativeCoinPrice(Number(response.data.pulsechain.usd))
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  },[])  

  

  return (
    <NativeCoinPriceContext.Provider value={{ nativeCoinPrice }}>
      {children}
    </NativeCoinPriceContext.Provider>
  );
}

export function useNativeCoinPriceContext() {
  return useContext(NativeCoinPriceContext);
}