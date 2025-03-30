import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Toolbar } from "@mui/material";
import SideNavBar from "components/AppLayout/SideNavBar";
import ProfileIcon from "components/AppLayout/ProfileIcon";

export default function MiniDrawer({ children }) {
    return (
        <div className="overflow-hidden">
            <Box
                sx={{
                    display: "flex",
                    height: "calc(100vh)",
                    backgroundColor: "#111827",
                }}
            >
                <CssBaseline />
                <SideNavBar />
                <Box sx={{ flexGrow: 1}}>
                    <Toolbar className="flex justify-end h-6 w-[calc(100vw-283px)]" sx={{ marginTop: '13px' }}>
                        <ProfileIcon />
                    </Toolbar>
                    <Box
                        component="main"
                        sx={{
                            display: "flex",
                            height: "calc(100vh - 64px)",
                            backgroundColor: "white",
                            overflowY: "auto",
                            padding: "24px",

                            borderTopLeftRadius: "12px",
                        }}
                    >
                        {children}
                    </Box>
                </Box>
            </Box>
        </div>
    );
}
