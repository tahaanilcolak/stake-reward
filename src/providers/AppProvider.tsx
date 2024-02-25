//@ts-nocheck
import { ConnectKitProvider } from "connectkit"
import { MuiProvider } from "./MuiProvider"
import { WagmiProvider } from "./WagmiProvider"
import { LoadingProvider } from "../context/LoadingContext"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers"
import { CopyAddressProvider } from "../context/CopyAddress";
import { NativeCoinPriceProvider } from "../context/NativeCoinPriceContext";
import { TxModalProvider } from "../context/TxModalContext";




export function AppProviders({ children }: { children: any }) {
    return (

        <WagmiProvider>
            <ConnectKitProvider>
                <MuiProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <LoadingProvider>
                            <CopyAddressProvider>
                                <NativeCoinPriceProvider>
                                    <TxModalProvider>
                            {children}
                            </TxModalProvider>
                            </NativeCoinPriceProvider>
                            </CopyAddressProvider>
                        </LoadingProvider>

                    </LocalizationProvider>
                </MuiProvider>
            </ConnectKitProvider>
        </WagmiProvider>
    )
}