import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "./App.css";
import PrimaryTheme from "./theme/PrimaryTheme";
import Routes from "routes";
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { SellerProvider } from "pages/Seller/Context/SellerContext";
import { SidebarProvider } from "Context/SidebarContext";

function App() {
    const [queryClient] = useState(
        new QueryClient({
            defaultOptions: {
                queries: {
                    refetchOnWindowFocus: false,
                    cacheTime: 1000 * 60 * 7,
                    enabled: false,
                    staleTime: Infinity,
                    retry: 1,
                },
            },
        })
    );

    return (
        <div>
            <SellerProvider>
            <SidebarProvider>
            <QueryClientProvider client={queryClient}>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={PrimaryTheme}>
                        <CssBaseline/>
                        <ToastContainer closeButton={false} />
                        <Routes />
                    </ThemeProvider>
                </StyledEngineProvider>
            </QueryClientProvider>
            </SidebarProvider>
            </SellerProvider>
        </div>
    );
}

export default App;
