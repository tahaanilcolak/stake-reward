//@ts-nocheck
import _ from "lodash"
import { BigNumber, BigNumberish, BytesLike } from "ethers";
import { formatUnits } from "ethers/lib/utils";

type HumanReadableAmountInput = BigNumberish | string | number | BigNumber | BytesLike | BigInt

export function timestampToReadableDate(timestamp : number) {
 
  const finalTimestamp = timestamp * 1000;
  // Tarihi istediğiniz formatta elde etmek için Intl.DateTimeFormat kullanabilirsiniz
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // 24 saat formatında
    timeZone: 'UTC' // Opsiyonel olarak zaman dilimini belirleyebilirsiniz
  };
  
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(finalTimestamp);
  return formattedDate
  
    }

   export function formatCustomDateTime(inputDateTime) {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC'
      };
    
      const date = new Date(inputDateTime);
      const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
      
      const [formattedDatePart, formattedTimePart] = formattedDate.split(', ');
      
      return `${formattedDatePart}, ${formattedTimePart}`;
    }
    
export function humanReadableAmount(amount: HumanReadableAmountInput, requestedDecimals: number = 18, tokenDecimals: number = 18, formatSmallNumbers = true) {
    if (
        _.isNil(amount) ||
        (typeof amount === 'string' && !/^((\+|-)?(0|([1-9][0-9]*))(\.[0-9]+)?)$/.test(amount))
    ) return null;


    const amountBn = BigNumber.isBigNumber(amount) ? amount : BigNumber.from(amount);

    let shortenedAmountBn: BigNumber;
    const decimalDifference = tokenDecimals - requestedDecimals;
    if (decimalDifference > 0) {
        shortenedAmountBn = amountBn.div(BigNumber.from(10).pow(decimalDifference));
    } else {
        shortenedAmountBn = amountBn.mul(BigNumber.from(10).pow(Math.abs(decimalDifference)));
    }

    let shortenedAmount = formatUnits(shortenedAmountBn, requestedDecimals);
    if (+shortenedAmount === 0) return "0";

    if (formatSmallNumbers && +shortenedAmount === 0) {
        let tempAmount = shortenedAmount.slice(2);

        tempAmount = _.trimStart(tempAmount, "0").slice(0, requestedDecimals);
        tempAmount = "0..." + tempAmount;
        shortenedAmount = tempAmount;
    }

    const shortenedSplit = shortenedAmount.split('.');

    const shortenedBase = shortenedSplit[0];
    const shortenedDecimals = _.trimEnd(shortenedSplit[1], "0");
    if (+shortenedDecimals === 0) {
        shortenedAmount = shortenedBase;
    } else {
        shortenedAmount = shortenedBase + "." + shortenedDecimals;
    }

    return shortenedAmount;
}

export function formattedAddress(address : string){
return `0x${address.slice(2, 6)}...${address.slice(-4)}`
}

export function formattedReceiverAddress(address : string){
  return `0x${address.slice(2, 10)}...${address.slice(-8)}`
  }

export function addTokenToMetamask(tokenAddress : string, symbol : string, decimals : number){

    if (typeof window?.ethereum !== 'undefined') {
      const ethereum = window?.ethereum;
      
      
      ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: symbol,
            decimals: decimals
          },
        },
      })
      .then((result) => {
        if (result) {
        } else {
        }
      })
      .catch((error) => {
      });
    } else {
    }
}

export function readableInput(inputValue : number) {
  /* var value = (number).toLocaleString(
    "en-US", // leave undefined to use the visitor's browser 
               // locale or a string like 'en-US' to override it.
    { minimumFractionDigits: 0 , maximumFractionDigits : 18}
  );

  if(value.includes(".")){
    let parts = value.split('.');
    let integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let result = `${integerPart}.${parts[1]}`;
    return result
  }else{
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

    return value; */

    const sanitizedValue = String(inputValue).replace(/[^\d.]/g, '');

    // Virgül ile binlik gruplarına ayırma
    const parts = sanitizedValue.split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const result = parts.length > 1 ? `${integerPart}.${parts[1]}` : integerPart;

    return result
}

export function originalNumber(formattedNumber : string) {
  const cleanedNumberString = formattedNumber.replace(/,/g, '');

  // Sayıyı düz bir şekilde geri dönüştür
  const originalNumber = Number(cleanedNumberString);
  return originalNumber;
}

export function readablePrice(inputNumber) {
  const parsedNumber = parseFloat(inputNumber);

  if (isNaN(parsedNumber)) {
    return "Invalid Number";
  }

  const formattedNumber = parsedNumber < 1
    ? parseFloat(parsedNumber.toPrecision(2)).toFixed(3)
    : parsedNumber.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 5 });

  return formattedNumber;
}