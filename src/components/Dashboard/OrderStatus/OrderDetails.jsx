import { Typography } from "@mui/material";
import Loader from "components/Loader";

import React from "react";
import { useLocation } from "react-router-dom";
import { formatDate, formatDateString } from "utils";
import { formatLongDate } from "utils/format";
export default function OrderDetails({
    OrderStatusData,
    isLoading,
    isQuotationDeclined,
}) {
    const currentUrl = useLocation().pathname;
    const searchParams = new URLSearchParams(window.location.search);
    const srcQueryParam = searchParams.get("src");

    const section1 = [
        { label: "Order Id", value: OrderStatusData?.id },
        {
            label: "Expected Date",
            value: currentUrl.includes("seller")
                ? formatDate(OrderStatusData?.shipment_ready_date)
                : formatDate(OrderStatusData?.shipment_ready_date),
        },
        { label: "Total Amount", value: "$" + OrderStatusData?.final_amount },
        {
            label: isQuotationDeclined ? "Total Bid" : "Wining Bid",
            value: "$" + OrderStatusData?.quotation?.total_amount,
        },
        {
            label: "Tracking Link",
            value: (
                <a
                    href={OrderStatusData?.tracking_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-natural-700"
                >
                    {OrderStatusData?.tracking_link}
                </a>
            ),
        },
        { label: "Product", value: OrderStatusData?.product_name },
    ];

    const section2 = [
        {
            label: "Product Name",
            value: OrderStatusData?.product_name,
        },
        {
            label: "Amount of Samples",
            value: OrderStatusData?.quantity,
        },
        { label: "Sample Delivery Address", value: OrderStatusData?.address },
        {
            label: "Shipping Agent Address",
            value: `地址:浙江省金华市义乌市北苑街道宗泽北路505号宝娜斯大厦511
联系人:Angel ID-${OrderStatusData?.seller?.id}
电话:18296186314`,
        },
    ];

    const sections = srcQueryParam === "sampleShipments" ? section2 : section1;

    return (
        <div className="w-full h-full border-1 flex flex-col border-natural-100 border-solid p-3 rounded-xl  justify-between ">
            {!isLoading ? (
                sections.map((section, index) => (
                    <React.Fragment key={index}>
                        <div className="flex gap-6">
                            <div className="flex items-start w-1/3">
                                <Typography color="natural.700">
                                    {section.label}
                                </Typography>
                            </div>

                            <div className="flex items-start w-1/2">
                                <Typography
                                    textAlign={"start"}
                                    color="natural.700"
                                    fontWeight={500}
                                >
                                    {section.value}
                                </Typography>
                            </div>
                        </div>

                        {index < sections.length - 1 && (
                            <hr className="mt-3 mb-3 bg-natural-200 border-natural-200 border-solid" />
                        )}
                    </React.Fragment>
                ))
            ) : (
                <div className="flex items-center w-full justify-center h-full">
                    <Loader />
                </div>
            )}
        </div>
    );
}
