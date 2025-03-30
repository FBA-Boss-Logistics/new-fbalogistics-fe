import { Typography } from "@mui/material";
import Location from "assets/svg/location.svg";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { showAddress } from "utils";

export function OriginAndDestination({
    supplierName,
    pickupLocation,
    deliveryLocation,
    supplierPhone,
}) {
    const searchParams = new URLSearchParams(window.location.search);
    const srcQueryParam = searchParams.get("src");

    const currentUrl = useLocation().pathname;

    const [showMore, setShowMore] = useState(false);

    return (
        <div className="border-2  border-natural-100 border-solid p-4 rounded-xl m-4  flex-col gap-4 flex">
            <div className="flex-col gap-2">
                <div className="w-8 h-8 p-1 bg-natural-100 rounded-full border-4 border-natural-100 justify-center  gap-2 inline-flex">
                    <div className="bg-natural-200 rounded-full">
                        <img src={Location} alt="location" />
                    </div>
                </div>
                <Typography fontSize={18} fontWeight={500} color="natural.900">
                    Origin and Destination
                </Typography>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex w-full justify-between gap-4">
                    <div className="bg-natural-25 p-2 flex-col gap-2 flex rounded-lg w-1/2">
                        <Typography
                            variant="body2"
                            fontWeight={500}
                            color="natural.800"
                        >
                            Supplier Name
                        </Typography>
                        <Typography
                            color="natural.500"
                            fontWeight={400}
                            variant="body2"
                        >
                            {supplierName}
                        </Typography>
                    </div>
                    {(currentUrl.includes("/booking/order/status") ||
                        srcQueryParam === "past order" ||
                        srcQueryParam === "phone") && (
                        <div className="bg-natural-25 p-2 flex-col gap-2 flex w-1/2">
                            <Typography
                                variant="body2"
                                fontWeight={500}
                                color="natural.800"
                            >
                                Phone
                            </Typography>
                            <Typography
                                color="natural.500"
                                variant="body2"
                                fontWeight={400}
                            >
                                {supplierPhone}
                            </Typography>
                        </div>
                    )}
                </div>
                <div className="bg-natural-25 p-2 flex-col gap-2 flex rounded-lg">
                    <Typography
                        variant="body2"
                        fontWeight={500}
                        color="natural.800"
                    >
                        Pickup Location
                    </Typography>
                    <Typography
                        color="natural.500"
                        fontWeight={400}
                        variant="body2"
                    >
                        {pickupLocation}
                    </Typography>
                </div>
                {/* <div className="bg-natural-25 p-2 flex-col gap-2 flex rounded-lg">
                    <Typography
                        variant="body2"
                        fontWeight={500}
                        color="natural.800"
                    >
                        Delivery Location
                    </Typography>
                    <div className="flex flex-col gap-2">
                        {deliveryLocation?.map((location, index) => (
                            <div key={index}>
                                <Typography
                                    color="natural.500"
                                    fontWeight={400}
                                    variant="body2"
                                >
                                    {location?.delivery_location}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>
        </div>
    );
}
