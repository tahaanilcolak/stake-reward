import { WagmiConfig, createConfig } from "wagmi";
import wagmiConfig from "../utils/wagmiConfig";


export function WagmiProvider({children}: { children: any }) {
    return (
        <WagmiConfig config={wagmiConfig}>
            {children}
        </WagmiConfig>
    )
}