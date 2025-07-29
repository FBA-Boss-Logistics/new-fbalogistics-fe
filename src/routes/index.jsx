import { Suspense, useMemo } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { Route, Routes, Outlet, Navigate, useLocation } from "react-router-dom";
import { routes } from "routes/RouteConstants";
import Seo from "./Seo";
import { getLocalStorageItem } from "hooks";
import { localStorageKeys } from "constants";
import NotFound from "pages/404";
import MiniDrawer from "components/Layout";
import { useIsMutating } from "@tanstack/react-query";
import SellerTopNav from "pages/Seller/SellerTopNav";
import NewDrawer from "components/Layout/NewDrawer";
import LogoFBA from 'assets/images/logo.png'
import DocumentIcon from 'assets/svg/Documents.svg'
import FeedIcon from 'assets/svg/Feed.svg'
import HistoryIcon from 'assets/svg/History.svg'
import CheckIcon from 'assets/svg/Check.svg'
import sellerDashboard from 'assets/svg/dashboardIcon.svg'
import activeShipment from 'assets/svg/activeShipmentIcon.svg'
import sampleIcon from 'assets/svg/sampleIcon.svg'
import completedShipment from 'assets/svg/box-tick.svg'
import cancelledShipment from 'assets/svg/box-remove.svg'
import calculatorIcon from 'assets/svg/calculator.svg'
import averageCostIcon from 'assets/svg/averageCostIcon.svg'
import CreateSampleShipment from "pages/Seller/Booking/SampleShipment/New/CreateSampleShipment";
import { useSeller } from "pages/Seller/Context/SellerContext";


// import AppContainer from 'Pages/AppContainer';

const ProtectedRoutes = () => {
    const location = useLocation();
    const isLoggedIn = getLocalStorageItem(localStorageKeys.AUTH_TOKEN);
    const userRole = getLocalStorageItem("USER_DETAILS");
   

    const sellerMenu=[
        {
            icon: sellerDashboard,
            label: "Dashboard",
            route: routes.SELLERDASHBOARD.pathname,
        },
        {
            icon: activeShipment,
            label: "Active Shipments",
            route: routes.BOOKING.pathname,
        },
        {
            icon: sampleIcon,
            label: "Sample Shipment",
            route: routes.SELLERSAMPLESHIPMENT.pathname,
        },
        {
            icon: completedShipment,
            label: "Completed Shipments",
            route: routes.SELLERPASTORDERBOOKING.pathname,
        },
        {
            icon: cancelledShipment,
            label: "Cancelled Shipments",
            route: routes.SELLERCANCELLEDORDERBOOKING.pathname,
        },
        {
            icon: calculatorIcon,
            label: "Calculator",
            route: routes.SELLERCALCULATOR.pathname,
        },
        {
            icon: averageCostIcon,
            label: "Average Cost",
            route: routes.AVERAGECOST.pathname,
        }
    ]

    const shipperMenu=[
        {
            icon: DocumentIcon,
            label: "Pending Quotations",
            route: routes.SHIPPERDASHBOARD.pathname,
        },
        {
            icon: CheckIcon,
            label: "Current Shipments",
            route: routes.SHIPPERORDERS.pathname,
        },
        {
            icon: CheckIcon,
            label: "Completed Shipments",
            route: routes.SHIPPERPASTORDERS.pathname,
        },
        {
            icon: HistoryIcon,
            label: "Shipments History",
            route: routes.SHIPPERSHIPMENTHISTORY.pathname,
        },
        {
            icon: HistoryIcon,
            label: "Sample Shipment",
            route: routes.SHIPPERSAMPLESHIPMENT.pathname,
        },
        {
            icon: FeedIcon,
            label: "Announcement",
            route: routes.ANNOUNCEMENT_SHIPPER.pathname,
        },
        {
            icon: averageCostIcon,
            label: "Average Cost",
            route: routes.AVERAGECOST.pathname,
        },
    ]
    const {createSampleShipment,setSampleShipment}=useSeller()

    return isLoggedIn ? (
        userRole?.groups === "Seller" ? (
            <>
                {/* <div className="py-4 border border-natural-100 border-solid border-x-0 border-t-0">
                    <SellerTopNav />
                </div>
                <Outlet /> */}
                {createSampleShipment && (
                <CreateSampleShipment
                    isOpen={createSampleShipment}
                    title="Create Sample Shipment"
                    description="Create a sample shipment to test the shipment process."
                />
                 )}
                <NewDrawer menu={sellerMenu} dashboard="seller"> 
                    <Outlet />
                </NewDrawer>
            </>
        ) : (
            <NewDrawer menu={shipperMenu} dashboard="shipper"> 
                <Outlet />
            </NewDrawer>
        )
    ) : (
        <Navigate
            to={routes.HOME.pathname}
            replace
            state={{ from: location }}
        />
    );
};

const RoutesPage = () => {
    const PublicRoutes = useMemo(
        () => (
            <>
                {Object.values(routes)
                    .filter(
                        (routeDetails) =>
                            routeDetails.isPublic && routeDetails.element
                    )
                    .map((routeDetails) => (
                        <Route
                            key={`public-route-${routeDetails.pathname}`}
                            path={routeDetails.pathname}
                            element={
                                <Suspense fallback={null}>
                                    <routeDetails.element />
                                </Suspense>
                            }
                        />
                    ))}
            </>
        ),
        []
    );
    const PrivateRoutes = useMemo(
        () => (
            <>
                {/* <Suspense fallback={<Backdrop />}> */}
                {Object.values(routes)
                    .filter(
                        (routeDetails) =>
                            !routeDetails.isPublic && routeDetails.element
                    )
                    .map((routeDetails) => {
                        return (
                            <Route
                                key={`private-route-${routeDetails.pathname}`}
                                path={routeDetails.pathname}
                                element={
                                    <Suspense fallback={null}>
                                        <routeDetails.element />
                                    </Suspense>
                                }
                            />
                        );
                    })}
                {/* </Suspense> */}
            </>
        ),
        []
    );

    const mutatingAPICount = useIsMutating();
    const mutatingAPIBackdrop = (
        <Backdrop
            open={Boolean(mutatingAPICount)}
            sx={{
                zIndex: (theme) => theme.zIndex.modal + 100,
                backgroundColor: "rgba(0,0,0,0.3)",
            }}
        >
            <CircularProgress className="text-[#111827]" />
            {/* <Lottie options={LottieOptions} height={150} width={'100%'} /> */}
        </Backdrop>
    );

    return (
        <>
            <div /* className="hide-scrollbar" */>
                {mutatingAPIBackdrop}
                <Seo />
                <Routes>
                    {PublicRoutes}
                    <Route element={<ProtectedRoutes />}>
                        {/* Dashboard */}
                        {PrivateRoutes}
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </>
    );
};

export default RoutesPage;
