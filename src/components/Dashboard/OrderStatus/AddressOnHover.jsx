import { Chip, Typography } from "@mui/material";
import Loader from "components/Loader";

export default function AddressOnHover({ OrderStatusData, isLoading }) {
    const pickupAddress = OrderStatusData?.pickup_location?.full_address;

    return (
        <>
            {isLoading ? (
                <div>
                    <Loader />
                </div>
            ) : (
                <div className="flex flex-col gap-2  p-2 bg-natural-200">
                    <div className="flex flex-col gap-2">
                        <Typography>Pickup Location</Typography>

                        <Chip
                            className="bg-secondary-500 text-secondary-25"
                            label={pickupAddress}
                        ></Chip>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Typography>Delivery Location</Typography>
                        {OrderStatusData?.delivery_location.map(
                            (location, index) => (
                                <Chip
                                    key={index}
                                    className="bg-natural-300 text-secondary-500"
                                    label={
                                        location.street_address +
                                        ", " +
                                        location.city +
                                        ", " +
                                        location.state +
                                        ", " +
                                        location.country +
                                        (location.zip_code
                                            ? ", " + location.zip_code
                                            : "")
                                    }
                                />
                            )
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
