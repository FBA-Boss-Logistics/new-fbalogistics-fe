import * as React from "react";
import { Chip, Popover, Typography } from "@mui/material";
import AddressOnHover from "./AddressOnHover";
import { useNavigate, useLocation } from "react-router-dom";
import { routes } from "routes/RouteConstants";
import { useParams } from "react-router-dom";

export default function ShippingAddress({ OrderStatusData, isLoading }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(window.location.search);
    const srcQueryParam = searchParams.get("src");
    const navigate = useNavigate();
    const isShipmentHistoriesPresent =
        location?.pathname?.includes("shipmenthistories");
    const pickupAddress = OrderStatusData?.pickup_location?.full_address;
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const { id } = useParams();

    const handleClick = () => {
        if (srcQueryParam === "accepted") {
            navigate(`/shipper/bid/${id}/?src=phone`);
        } else {
            navigate(`/shipper/bid/${id}`);
        }
    };

    return (
        <div className="flex flex-col border-solid rounded-xl border-natural-200 p-3 w-full gap-6">
            <div className="flex gap-5 justify-between">
                <div className="flex flex-col gap-6 pr-5">
                    <div className="flex gap-5">
                        <Typography
                            fontWeight={500}
                            fontSize={14}
                            minWidth={149}
                        >
                            Pickup Location
                        </Typography>
                        <Typography
                            aria-owns={open ? "mouse-over-popover" : undefined}
                            aria-haspopup="true"
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                            fontWeight={400}
                            fontSize={14}
                            color="natural.500"
                            className="cursor-pointer"
                        >
                            {pickupAddress}
                        </Typography>
                    </div>
                    <div className="flex gap-5">
                        <Typography
                            fontWeight={500}
                            fontSize={14}
                            minWidth={149}
                        >
                            Order Details
                        </Typography>
                        <Typography
                            fontWeight={400}
                            fontSize={14}
                            color="natural.500"
                            className="cursor-pointer whitespace-nowrap"
                        >
                            <u onClick={handleClick}>View the requirement</u>
                        </Typography>
                    </div>
                </div>
                <div className="flex w-2/3">
                    <Typography fontWeight={500} fontSize={14} minWidth={149}>
                        Delivery Location
                    </Typography>
                    <Typography
                        aria-owns={open ? "mouse-over-popover" : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                        fontWeight={400}
                        fontSize={14}
                        color="natural.500"
                        className="cursor-pointer"
                    >
                        {/* {OrderStatusData?.delivery_location?.map(
                            (location, index) => (
                                <Typography key={index}>
                                    {location?.full_address}
                                </Typography>
                            )
                        )} */}
                        <ul>
                            {OrderStatusData?.packages?.map(
                                (location, index) =>
                                    location?.delivery_location && (
                                        <li key={index}>
                                            {location?.delivery_location}
                                        </li>
                                    )
                            )}
                        </ul>
                    </Typography>
                </div>
            </div>
        </div>
    );
}
