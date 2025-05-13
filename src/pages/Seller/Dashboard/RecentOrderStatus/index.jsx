import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import AddressOnHover from "components/Dashboard/OrderStatus/AddressOnHover";
import ChatWindow from "components/Dashboard/OrderStatus/Chat/ChatWindow";
import OrderDate from "components/Dashboard/OrderStatus/OrderDate";
import OrderDetails from "components/Dashboard/OrderStatus/OrderDetails";
import PastStatus from "components/Dashboard/OrderStatus/PastStatus";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "routes/RouteConstants";
import { useParams } from "react-router-dom";
import {
    FetchAllSampleShipmentsApi,
    FetchAllShipmentOrderDetailApi,
} from "queries/Shipper";
import { formatDateString } from "utils";
import ShippingAddress from "components/Dashboard/OrderStatus/ShippingAddress";
import BorderButton from "components/BorderButton";
import { UpdateQuotationStatusDetailApi } from "queries/Seller";
import ErrorUi from "pages/Seller/Booking/SellerOrderStatus/ErrorUi";
import HeaderPage from "components/HeaderPage";
import { Card } from "components/ui/card";
import { MoreVerticalIcon } from "lucide-react";

export default function SellerRecentOrderStatus() {
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(window.location.search);
    const srcQueryParam = searchParams.get("src");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { id } = useParams();

    let orderData = null;
    let isLoading = null;
    let errors = null;

    if (srcQueryParam === "sampleShipments") {
        const { data: OrderStatusData, isLoading: loading, error } =
            FetchAllSampleShipmentsApi(id);
        orderData = OrderStatusData;
        isLoading = loading;
        errors = error;
    } else {
        const { data: OrderStatusData, isLoading: loading, error } =
            FetchAllShipmentOrderDetailApi(id);
        orderData = OrderStatusData;
        isLoading = loading;
        errors = error;
    }


    const isAuthorizedError = errors?.status_code === 400 &&
        errors?.message === "Bad Request" &&
        (errors?.errors?.[0]?.message === "You are not authorised to view this shipment" ||
            errors?.errors?.[0]?.message === "You cannot view this shipment right now.");
  
    // const { data: OrderStatusData } = FetchAllShipmentOrderDetailApi(id);
    const { mutate: updateQuotationInfo } = UpdateQuotationStatusDetailApi();

    const quotationID = orderData?.data?.quotation?.id;

    const pickupAddress = orderData?.data?.pickup_location?.full_address;

    const handleClick = () => {
        navigate(`/seller/booking/order/status/${id}`);
    };

    const handleStatusChange = (id, status, reason) => {
        // console.log(id, status);

        const payload = {
            user_id: id,
            is_accepted: status,
            cancel_reason: reason,
        };
        updateQuotationInfo({ payload });

        navigate(routes.SELLERCANCELLEDORDERBOOKING.pathname);
    };

    if (isAuthorizedError) {
        return <ErrorUi url='/seller/booking' content={errors?.errors?.[0]?.message} />;
    }
    return (
        <div className="flex flex-col gap-6 w-full">
            {/* <div className="py-4 border border-natural-100 border-solid border-x-0 border-t-0">
                <SellerTopNav />
            </div> */}
            <HeaderPage title="Recent Order Status" home="seller" pathname={'Recent Order Status'} />
            {/* <div className="flex flex-col gap-6 w-full p-4 h-[calc(100vh_-_76.8px)] overflow-y-scroll"> */}
                <div className="w-full flex justify-between">
                    {/* {!isLoading && <OrderDate
                        Label={
                            srcQueryParam === "currentShipments"
                                ? "Shipping Agent has been assigned this order on"
                                : "You placed the order on"
                        }
                        Date={formatDateString(
                            orderData?.data?.updated_at,
                            "long"   
                        )}
                    />} */}
                    {/* {srcQueryParam !== "sampleShipments" && (
                        <BorderButton
                            variant="ghost-outlined"
                            onClick={() =>
                                handleStatusChange(quotationID, false)
                            }
                        >
                            Cancel Winning Bid
                        </BorderButton>
                    )} */}
                </div>
               
                {/* {srcQueryParam !== "sampleShipments" && (
                    <div className="flex flex-col border-solid rounded-xl border-natural-200 p-3 w-full gap-6 bg-natural-25">
                        <div className="flex gap-5 justify-between">
                            <div className="flex flex-1 flex-col gap-6 pr-5">
                                <div className="flex gap-5">
                                    <Typography
                                        fontWeight={500}
                                        fontSize={14}
                                        minWidth={149}
                                    >
                                        Pickup Location
                                    </Typography>
                                    <Typography
                                        fontWeight={400}
                                        fontSize={14}
                                        color="natural.500"
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
                                        Origin and Destination
                                    </Typography>
                                    <Typography
                                        fontWeight={400}
                                        fontSize={14}
                                        color="natural.500"
                                        className="cursor-pointer whitespace-nowrap"
                                    >
                                        <u onClick={handleClick}>
                                            View the requirement
                                        </u>
                                    </Typography>
                                </div>
                            </div>
                            <div className="flex flex-1">
                                <Typography
                                    fontWeight={500}
                                    fontSize={14}
                                    minWidth={149}
                                >
                                    Delivery Location
                                </Typography>
                                <Typography
                                    fontWeight={400}
                                    fontSize={14}
                                    color="natural.500"
                                    className="cursor-pointer"
                                >
                                    <ul>
                                        {orderData?.data?.packages?.map(
                                            (location, index) => (
                                                <li key={index}>
                                                    {
                                                        location?.delivery_location
                                                    }
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </Typography>
                            </div>
                        </div>
                    </div>
                )} */}

                <div className="flex gap-4 flex-col lg:flex-row  items-start">
                    {/* <Card className=""> */}
                        <ChatWindow />
                    {/* </Card> */}
                    <div className=" w-full lg:w-1/3 flex flex-col gap-4">
                    
                        <OrderDetails OrderStatusData={orderData?.data} handleClick={handleClick} handleStatusChange={handleStatusChange} quotationID={quotationID}/>

                        <PastStatus status={orderData?.data?.status} />
                    </div>
                </div>
            </div>
        // </div>
    );
}
