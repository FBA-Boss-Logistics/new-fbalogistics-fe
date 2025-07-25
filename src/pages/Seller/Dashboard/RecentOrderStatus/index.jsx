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
import Loader from "components/Loader";
import NavigationShipments from "components/HeaderPage/NavigationShipments";
import InvoiceCustomer from "components/Dashboard/OrderStatus/Invoice/Customer/InvoiceCustomer";
import Tracking from "components/Dashboard/OrderStatus/Tracking/Customer";
import SellerOrderStatus from "pages/Seller/Booking/SellerOrderStatus";

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
        // navigate(`/seller/booking/order/status/${id}`);
        setActiveTab("Project");
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
    const [activeTab, setActiveTab] = useState("Chat")

    const handleComponentSwitch = () => {
        switch (activeTab) {
            case "Chat":
                return <ChatWindow />;
            case "Project":
                return <SellerOrderStatus id={id} />;
            case "Invoice":
                return <InvoiceCustomer formId="invoice-customer-form" />;
            case "Tracking":
                return <Tracking id={id} />;
        }
    }
    return (
        <div className="flex flex-col gap-6 w-full">
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <Loader />
                </div>
            ) : (
                <>           
            <HeaderPage title="Recent Order Status" home="seller" pathname={'Recent Order Status'} />
                <NavigationShipments activeTab={activeTab} setActiveTab={setActiveTab} id={id} />
              

                <div className="flex gap-4 flex-col lg:flex-row  items-start">
                
                        {handleComponentSwitch()}
                    
                    {activeTab === "Chat" && (
                        <div className=" w-full lg:w-1/2 flex flex-col gap-4">
                            <OrderDetails isSampleShipment={srcQueryParam === "sampleShipments"} OrderStatusData={orderData?.data} handleClick={handleClick} handleStatusChange={handleStatusChange} quotationID={quotationID}/>

                            {/* <PastStatus status={orderData?.data?.status} /> */}
                        </div>
                    )}
                </div>
                </>
            )}
        </div>
        
    );
}
