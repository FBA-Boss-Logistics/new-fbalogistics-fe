import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Collapse } from "@mui/material";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import LogoutWhite from "assets/icons/LogoutWhite.svg";
import fbaLogo from "assets/svg/FBALogo.svg";
import AnnouncementIcon from "assets/svg/announcement.svg";
import BarIcon from "assets/svg/bar.svg";
import completeIcon from "assets/svg/completeIcon.svg";
import shipmentHistorySvg from "assets/svg/shipmentHistorySvg.svg";
import Shoppingbag from "assets/svg/shopping-bag-02.svg";
import SmapleShipmentIcon from "assets/svg/shoppingbag02.svg";
import DOT from "assets/svg/statusdot.svg";
import { FetchUserDetailApi, useLogOutApiQuery } from "queries/Auth";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "routes/RouteConstants";

const CustomDropdownMenu = ({ isOpen, data }) => {
    const navigate = useNavigate();
    const handleClick = (route) => {
        navigate(route);
    };
    return (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <div className="flex-col gap-2 flex bg-natural-900 ">
                {data.map(({ label, route, showDot }) => {
                    return (
                        <div
                            key={label}
                            className="flex gap-2 justify-end items-center"
                        >
                            <hr className="w-4 h-0 ml-2" />
                            <Button
                                key={label}
                                variant={
                                    showDot
                                        ? "dashboard-variant-1"
                                        : "dashboard-variant-2"
                                }
                                sx={{
                                    width: "122px",
                                    fontSize: "12px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                                onClick={() => handleClick(route)}
                            >
                                {label}
                                {showDot && <img src={DOT} alt="dot" />}
                            </Button>
                        </div>
                    );
                })}
            </div>
        </Collapse>
    );
};

const SideNavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState(location?.pathname);
    const searchParams = new URLSearchParams(window.location.search);
    const srcQueryParam = searchParams.get("src");

    useEffect(() => {
        if (srcQueryParam === "accepted") {
            setCurrentPath(routes.SHIPPERORDERS.pathname);
        } else if (srcQueryParam === "sampleShipments") {
            setCurrentPath(routes.SHIPPERSAMPLESHIPMENT.pathname);
        } else {
            setCurrentPath(location?.pathname);
        }
    }, [location?.pathname]);

    const buttonsData = useMemo(
        () => [
            {
                icon: BarIcon,
                label: "Pending Quotations",
                route: routes.SHIPPERDASHBOARD.pathname,
            },
            {
                icon: Shoppingbag,
                label: "Current Shipments",
                route: routes.SHIPPERORDERS.pathname,

                // children: [
                //     {
                //         label: "Current Shipments",
                //         route: routes.SHIPPERORDERS.pathname,
                //         showDot:
                //             location.pathname ===
                //                 routes.SHIPPERORDERS.pathname ||
                //             location.pathname.startsWith(
                //                 routes.SHIPPERORDERSTATUS.pathname
                //             ),
                //     },
                //     {
                //         label: "Completed Shipments",
                //         route: routes.SHIPPERPASTORDERS.pathname,
                //         showDot:
                //             location.pathname ===
                //                 routes.SHIPPERPASTORDERS.pathname ||
                //             location.pathname.startsWith(
                //                 routes.SHIPPERPASTORDERSTATUS.pathname
                //             ),
                //     },
                // ],
            },
            {
                icon: completeIcon,
                label: "Completed Shipments",
                route: routes.SHIPPERPASTORDERS.pathname,
            },
            {
                icon: shipmentHistorySvg,
                label: "Shipments History",
                route: routes.SHIPPERSHIPMENTHISTORY.pathname,
            },
            {
                icon: SmapleShipmentIcon,
                label: "Sample Shipment",
                route: routes.SHIPPERSAMPLESHIPMENT.pathname,
            },
            {
                icon: AnnouncementIcon,
                label: "Announcement",
                route: routes.ANNOUNCEMENT_SHIPPER.pathname,
            },
        ],
        [location]
    );

    const { mutate: logoutApi } = useLogOutApiQuery();
    const handleClickLogout = () => {
        logoutApi(null, {
            onSuccess: () => {
                localStorage.clear();
                navigate("/");
            },
            onError: () => {},
        });
    };

    const { data: userinfo } = FetchUserDetailApi();

    return (
        <div
            style={{
                backgroundColor: "secondary.500",
                color: "white",
                justifyContent: "flex-start",
            }}
        >
            <img
                onClick={() => navigate(routes.SHIPPERDASHBOARD.pathname)}
                className="cursor-pointer ml-6 mt-5"
                width="150px"
                src={fbaLogo}
                alt="logo"
            />

            <div className="flex flex-col  mt-4 justify-between h-[calc(100vh-64px)]">
                <div className="flex flex-col gap-2 py-8 px-4 ">
                    {buttonsData
                        ?.filter((item) => {
                            if (item.label === "Sample Shipment") {
                                if (
                                    userinfo?.data?.email ===
                                    import.meta.env
                                        .VITE_REACT_APP_SAMPLE_SHIPPER_EMAIL
                                ) {
                                    return true;
                                }
                                return false;
                            }
                            return true;
                        })
                        ?.map(({ icon, label, route, children }, i) => {
                            const isOpen = location.pathname.startsWith(route);
                          
                            return (
                                <>
                                    <Button
                                        key={label}
                                        fullWidth
                                        startIcon={
                                            <img src={icon} alt="startIcon" />
                                        }
                                        variant={
                                            currentPath === route
                                                ? "dashboard-variant-1"
                                                : "dashboard-variant-2"
                                        }
                                        onClick={() => {
                                            setCurrentPath(route);
                                            navigate(route);
                                        }}
                                        className="flex"
                                    >
                                        {label}
                                        {children && (
                                            <>
                                                {isOpen ? (
                                                    <ExpandMoreIcon
                                                        fontSize="small"
                                                        className="text-natural-200 w-6 font-bold"
                                                    />
                                                ) : (
                                                    <ExpandLessIcon
                                                        fontSize="small"
                                                        className="text-natural-200 w-6 font-bold"
                                                    />
                                                )}
                                            </>
                                        )}
                                    </Button>
                                    {children && (
                                        <CustomDropdownMenu
                                            isOpen={isOpen}
                                            data={children}
                                        />
                                    )}
                                </>
                            );
                        })}
                </div>

                <div className="flex flex-col place-items-end gap-2 py-8 px-4 text-center">
                    <Divider
                        variant="end"
                        sx={{
                            width: "251px",
                            borderColor: "#fff",
                            marginBottom: "10px",
                        }}
                    />
                    <Button
                        fullWidth
                        startIcon={<img src={LogoutWhite} alt="LOGOUT" />}
                        variant="dashboard-variant-2"
                        onClick={handleClickLogout}
                    >
                        <Typography variant="subtitle1" fontWeight={500}>
                            Log Out
                        </Typography>{" "}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SideNavBar;
