import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import BorderButton from "components/BorderButton";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { routes } from "routes/RouteConstants";
import SampleShipment from "../SampleShipment";
import CreateSampleShipment from "../SampleShipment/CreateSampleShipment";

export default function BookingsTopNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const [alignment, setAlignment] = React.useState("web");
    const [createSampleShipment, setCreateSampleShipment] = useState(false);

    const normalizedPathname = location.pathname.replace(/\/+$/, "");
    React.useEffect(() => {
        if (normalizedPathname === routes.BOOKING.pathname) {
            setAlignment("bookings");
        } else if (
            normalizedPathname === routes.SELLERRECENTORDERBOOKING.pathname
        ) {
            setAlignment("recentOrders");
        } else if (
            normalizedPathname === routes.SELLERPENDINGORDERBOOKING.pathname
        ) {
            setAlignment("pendingOrders");
        } else if (
            normalizedPathname === routes.SELLERSAMPLESHIPMENT.pathname
        ) {
            setAlignment("sampleshipment");
        } else if (
            normalizedPathname === routes.SELLERPASTORDERBOOKING.pathname
        ) {
            setAlignment("pastOrders");
        } else if (
            normalizedPathname === routes.SELLERCANCELLEDORDERBOOKING.pathname
        ) {
            setAlignment("cancelledOrders");
        }
    }, [normalizedPathname]);

    const createShipment = () => {
        setCreateSampleShipment(true);
    };

    const handleCreateSampleShipment = () => {
        setCreateSampleShipment(false);
    };

    const handleBooking = () => {
        navigate(routes.BOOKING.pathname);
    };

    const handlePastOrder = () => {
        navigate(routes.SELLERPASTORDERBOOKING.pathname);
    };

    const handleRecentOrder = () => {
        navigate(routes.SELLERRECENTORDERBOOKING.pathname);
    };

    const handleCancelledOrder = () => {
        navigate(routes.SELLERCANCELLEDORDERBOOKING.pathname);
    };

    const handleSampleShipment = () => {
        navigate(routes.SELLERSAMPLESHIPMENT.pathname);
    };

    const handlePendingsOrders = () => {
        navigate(routes.SELLERPENDINGORDERBOOKING.pathname);
    };

    return (
        <>
            {createSampleShipment && (
                <CreateSampleShipment
                    open={createSampleShipment}
                    onClose={handleCreateSampleShipment}
                />
            )}
            <div className="border-1 overflow-hidden border-solid border-natural-200 rounded-xl mb-4 gap-3  min-w-[184px]  flex justify-between p-4 mt-6">
                <div>
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        aria-label="Platform"
                        style={{
                            display: "flex",
                            alignItems: "stretch",
                        }}
                    >
                        <ToggleButton
                            value="bookings"
                            onClick={handleBooking}
                            style={{
                                textTransform: "capitalize",
                                fontSize: "16px",
                                fontWeight: "500",
                                padding: "7px 16px 7px 16px",
                                borderRadius: "8px",
                                borderTopRightRadius: "0px",
                                borderBottomRightRadius: "0px",
                                color:
                                    alignment === "bookings"
                                        ? "#F3F4F6"
                                        : "black",
                                backgroundColor:
                                    alignment === "bookings"
                                        ? "#BB9337"
                                        : "#F3F4F6",
                            }}
                        >
                            Current Shipments
                        </ToggleButton>
                        {/* <ToggleButton
                        value="pendingOrders"
                        onClick={handlePendingsOrders}
                        style={{
                            textTransform: "capitalize",
                            fontSize: "16px",
                            fontWeight: "500",
                            padding: "7px 16px 7px 16px",
                            height: "fit-content",
                            color:
                                alignment === "pendingOrders"
                                    ? "#F3F4F6"
                                    : "black",
                            backgroundColor:
                                alignment === "pendingOrders"
                                    ? "#BB9337"
                                    : "#F3F4F6",
                        }}
                    >
                        Pending Shipments
                    </ToggleButton>
                    <ToggleButton
                        value="recentOrders"
                        onClick={handleRecentOrder}
                        style={{
                            textTransform: "capitalize",
                            fontSize: "16px",
                            fontWeight: "500",
                            padding: "7px 16px 7px 16px",
                            height: "fit-content",
                            color:
                                alignment === "recentOrders"
                                    ? "#F3F4F6"
                                    : "black",
                            backgroundColor:
                                alignment === "recentOrders"
                                    ? "#BB9337"
                                    : "#F3F4F6",
                        }}
                    >
                        Current Shipments
                    </ToggleButton> */}
                        <ToggleButton
                            value="pastOrders"
                            onClick={handlePastOrder}
                            style={{
                                textTransform: "capitalize",
                                fontSize: "16px",
                                fontWeight: "500",
                                padding: "7px 16px 7px 16px",
                                color:
                                    alignment === "pastOrders"
                                        ? "#F3F4F6"
                                        : "#111827",
                                backgroundColor:
                                    alignment === "pastOrders"
                                        ? "#BB9337"
                                        : "#F3F4F6",
                            }}
                        >
                            Completed Shipments
                        </ToggleButton>

                        <ToggleButton
                            value="pastOrders"
                            onClick={handleCancelledOrder}
                            style={{
                                textTransform: "capitalize",
                                fontSize: "16px",
                                fontWeight: "500",
                                padding: "7px 16px 7px 16px",
                                color:
                                    alignment === "cancelledOrders"
                                        ? "#F3F4F6"
                                        : "#111827",
                                backgroundColor:
                                    alignment === "cancelledOrders"
                                        ? "#BB9337"
                                        : "#F3F4F6",
                            }}
                        >
                            Cancelled Shipments
                        </ToggleButton>
                        <ToggleButton
                            value="pastOrders"
                            onClick={handleSampleShipment}
                            style={{
                                textTransform: "capitalize",
                                fontSize: "16px",
                                fontWeight: "500",
                                padding: "7px 16px 7px 16px",
                                borderRadius: "8px",
                                borderTopLeftRadius: "0px",
                                borderBottomLeftRadius: "0px",
                                color:
                                    alignment === "sampleshipment"
                                        ? "#F3F4F6"
                                        : "#111827",
                                backgroundColor:
                                    alignment === "sampleshipment"
                                        ? "#BB9337"
                                        : "#F3F4F6",
                            }}
                        >
                            Sample Shipments
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div className="flex items-start">
                    <BorderButton
                        variant="ghost-outlined"
                        onClick={createShipment}
                    >
                        Create Sample Shipment
                    </BorderButton>
                    <BorderButton
                        variant="ghost-outlined"
                        onClick={() => navigate(routes.QUOTES.pathname)}
                    >
                        New Booking
                    </BorderButton>
                </div>
            </div>
        </>
    );
}
