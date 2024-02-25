import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../utils/theme";


export function MuiProvider({children}: { children: any }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme/>
            {children}
        </ThemeProvider>
    )
}