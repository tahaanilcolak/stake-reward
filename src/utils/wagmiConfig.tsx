import { getDefaultConfig } from "connectkit";
import { createConfig } from "wagmi";
import { pulsechain } from "wagmi/chains";

const wagmiConfig = createConfig(
    getDefaultConfig({
      chains : [pulsechain],
      // Required API Keys
      //alchemyId: "g1ghFfe7XBOsft-xc8Yf7yC3BqWZpegY", // or infuraId
      walletConnectProjectId: "df7a9bdd8810e0ea044e96e21157c674",
      // Required
      appName: "Test",
  
      // Optional
      appDescription: "Your App Description",
      appUrl: "https://family.co", // your app's url
      appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    }),
  );

export default wagmiConfig;