import { Step, StepLabel, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import BorderButton from "components/BorderButton";
import ChatWindow from "components/Dashboard/OrderStatus/Chat/ChatWindow";
import OrderDate from "components/Dashboard/OrderStatus/OrderDate";
import OrderDetails from "components/Dashboard/OrderStatus/OrderDetails";
import OrderRadioGroup from "components/Dashboard/OrderStatus/OrderRadioGroup";
import { CompleteStepIcon } from "components/Dashboard/OrderStatus/PastStatus";
import ShippingAddress from "components/Dashboard/OrderStatus/ShippingAddress";
import Loader from "components/Loader";
import ErrorUi from "pages/Seller/Booking/SellerOrderStatus/ErrorUi";
import {
    FetchAllSampleShipmentsApi,
    FetchAllShipmentOrderDetailApi,
    usePatchStatusUpdate,
} from "queries/Shipper";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { formatDateString } from "utils";
import ConfirmModal from "./ConfirmModal";

export default function OrderStatus() {
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const searchParams = new URLSearchParams(window.location.search);
    const srcQueryParam = searchParams.get("src");
    const queryClient = useQueryClient();

    const { mutate: patchStatusUpdate } = usePatchStatusUpdate();
    // const { data: OrderStatusData, isLoading } =
    //     FetchAllShipmentOrderDetailApi(id);

    let orderData = null;
    let isLoading = null;
    let errors = null;
    if (srcQueryParam === "sampleShipments") {
        const {
            data: OrderStatusData,
            isLoading: loading,
            error,
        } = FetchAllSampleShipmentsApi(id);
        orderData = OrderStatusData;
        isLoading = loading;
        errors = error;
    } else {
        const {
            data: OrderStatusData,
            isLoading: loading,
            error,
        } = FetchAllShipmentOrderDetailApi(id);
        orderData = OrderStatusData;
        isLoading = loading;
        errors = error;
    }

    function handleClose() {
        setOpen(false);
    }

    if (
        errors?.status_code === 400 &&
        errors?.message === "Bad Request" &&
        (errors?.errors?.[0]?.message ===
            "You are not authorised to view this shipment" ||
            errors?.errors?.[0]?.message ===
                "You cannot view this shipment right now.")
    ) {
        return (
            <ErrorUi
                url={"/shipper/dashboard/orders"}
                content={errors?.errors?.[0]?.message}
            />
        );
    }

    return (
        <>
            {" "}
            {isLoading ? (
                <div className="flex items-center w-full justify-center">
                    <Loader />
                </div>
            ) : (
                <div className="flex flex-col gap-6 w-full">
                    <div className="w-[569px]">
                        {" "}
                        <OrderDate
                            Label={"You have assigned this order on"}
                            Date={
                                orderData &&
                                (srcQueryParam === "sampleShipments"
                                    ? formatDateString(
                                          orderData?.data?.created_at,
                                          "long"
                                      )
                                    : formatDateString(
                                          orderData?.data?.quotation
                                              ?.updated_at,
                                          "long"
                                      ))
                            }
                            isLoading={isLoading}
                        />
                    </div>

                    {srcQueryParam !== "sampleShipments" && (
                        <ShippingAddress
                            OrderStatusData={orderData?.data}
                            isLoading={isLoading}
                        />
                    )}
                    <div className="flex gap-4 items-start">
                        <ChatWindow />
                        <div className=" w-1/3 flex flex-col gap-4">
                            <OrderDetails
                                OrderStatusData={orderData?.data}
                                isLoading={isLoading}
                            />
                            {srcQueryParam === "sampleShipments" ? (
                                <div>
                                    <div className="bg-primary-100 border-primary-100 border-solid rounded-t-xl pt-2 pb-2 pr-3 pl-3 ">
                                        <Typography
                                            color="primary.900"
                                            fontWeight={600}
                                        >
                                            Status
                                        </Typography>
                                    </div>
                                    <div className="p-3 bg-natural-25 flex flex-col gap-4">
                                        <Step>
                                            <StepLabel
                                                StepIconComponent={
                                                    CompleteStepIcon
                                                }
                                            >
                                                <span
                                                    style={{
                                                        color: "black",
                                                    }}
                                                >
                                                    Shipment Pending
                                                </span>
                                            </StepLabel>
                                        </Step>
                                        {orderData?.data?.status ===
                                        "Shipment Completed" ? (
                                            <Step>
                                                <StepLabel
                                                    StepIconComponent={
                                                        CompleteStepIcon
                                                    }
                                                >
                                                    <span
                                                        style={{
                                                            color: "black",
                                                        }}
                                                    >
                                                        Shipment Completed
                                                    </span>
                                                </StepLabel>
                                            </Step>
                                        ) : (
                                            <BorderButton
                                                variant="outlined"
                                                onClick={() => {
                                                    setOpen(true);
                                                }}
                                                className={"!py-[2px]"}
                                            >
                                                Mark as complete
                                            </BorderButton>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <OrderRadioGroup
                                    OrderStatusData={orderData?.data}
                                    id={id}
                                    isLoading={isLoading}
                                />
                            )}
                        </div>
                    </div>
                    {srcQueryParam === "sampleShipments" && (
                        <ConfirmModal
                            open={open}
                            onClose={handleClose}
                            handleYes={() => {
                                patchStatusUpdate(
                                    {
                                        id,
                                        data: {
                                            status: "Shipment Completed",
                                        },
                                    },
                                    {
                                        onSuccess: () => {
                                            queryClient.invalidateQueries([
                                                `FETCH_SAMPLE_RECENT_ORDER_INFO`,
                                                id,
                                            ]);
                                            handleClose();
                                        },
                                    }
                                );
                            }}
                        />
                    )}
                </div>
            )}
        </>
    );
}
