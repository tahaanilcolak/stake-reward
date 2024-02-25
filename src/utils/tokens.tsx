import tetraLogo from './../assets/tetra_logo.webp'
import plsLogo from './../assets/pulse_logo.png'
import usdtLogo from './../assets/usdtLogo.png'

export const TETRA = {
    symbol : "TETRAp",
    name : "TETRA",
    address : "0xAeC4C07537B03E3E62fc066EC62401Aed5Fdd361",
    decimals : 18,
    logo : tetraLogo,
}
export interface IToken {
    symbol : string;
    name : string;
    address : string | null;
    decimals : number,
    logo : any
}
export const REWARD_TOKENS = [
    {
        symbol : "PLS",
        name : "PLS",
        address : "0x0000000000000000000000000000000000000000",
        decimals : 18,
        logo : plsLogo,
    },
    {
        symbol : "TETRAp",
        name : "TETRA",
        address : "0xAeC4C07537B03E3E62fc066EC62401Aed5Fdd361",
        decimals : 18,
        logo : tetraLogo,
    },
    {
        symbol : "USDT",
        name : "USDT",
        address : "0x0Cb6F5a34ad42ec934882A05265A7d5F59b51A2f",
        decimals : 6,
        logo : usdtLogo,
    }
]

//["0x0000000000000000000000000000000000000000","0xAeC4C07537B03E3E62fc066EC62401Aed5Fdd361","0x0Cb6F5a34ad42ec934882A05265A7d5F59b51A2f"]