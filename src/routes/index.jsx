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

// import AppContainer from 'Pages/AppContainer';

const ProtectedRoutes = () => {
    const location = useLocation();
    const isLoggedIn = getLocalStorageItem(localStorageKeys.AUTH_TOKEN);
    const userRole = getLocalStorageItem("USER_DETAILS");
    return isLoggedIn ? (
        userRole?.groups === "Seller" ? (
            <>
                <div className="py-4 border border-natural-100 border-solid border-x-0 border-t-0">
                    <SellerTopNav />
                </div>
                <Outlet />
            </>
        ) : (
            <NewDrawer> 
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
