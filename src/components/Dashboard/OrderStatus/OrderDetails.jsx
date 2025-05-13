import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import Loader from "components/Loader";
import { Button } from "components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "components/ui/card";
import { Info, MoreVerticalIcon } from "lucide-react";

import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { formatDate, formatDateString } from "utils";
import { formatLongDate } from "utils/format";
export default function OrderDetails({
    OrderStatusData,
    isLoading,
    isQuotationDeclined,
    handleClick,
    handleStatusChange=null,
    quotationID
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
                <div className="flex items-center gap-2">
                <a
                    href={OrderStatusData?.tracking_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-natural-700 text-sm"
                >
                    {OrderStatusData?.tracking_link ?? "N/A"}
                </a>
                </div>
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
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card className="w-full h-full border-1 flex flex-col border-natural-100 border-solid rounded-xl  justify-between ">
         <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Shipment Details</h3>
                        {srcQueryParam !== "sampleShipments" && handleStatusChange!==null ? (
                            <>
                            <IconButton
                                    aria-label="more"
                                    aria-controls="message-menu"
                                    aria-haspopup="true"
                                    onClick={(e) => { handleClose();
                                        setAnchorEl(e.currentTarget);
                                    }}
                                    className=""
                                    sx={{ marginLeft: "auto" }}
                                >
                                    <MoreVerticalIcon />
                                </IconButton>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={()=>{
                                        handleStatusChange(quotationID, false)
                                        handleClose()
                                    }}>Cancel Winning Bid</MenuItem>
                                </Menu>
                        </>
                        ) : (
                            <></>
                        )}
                  </div>
                  <CardDescription>Sales performance by location</CardDescription>
        </CardHeader>
        <CardContent>
        <div className="w-full h-full border-1 flex flex-col border-natural-100 border-solid rounded-xl  justify-between  ">
            {!isLoading ? (
                sections.map((section, index) => (
                    <React.Fragment key={index}>
                        <div className="flex gap-6">
                            <div className="flex items-start w-1/3">
                                <Typography color="natural.700">
                                    {section.label}
                                </Typography>
                            </div>

                            <div className="flex items-start justify-end w-full ">
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
                )
            )
            ) : (
                <div className="flex items-center w-full justify-center h-full">
                    <Loader />
                </div>
            )}
        </div>
        </CardContent>
        <CardFooter className="flex justify-end">
            <Button  variant="outline" size="lg"className="rounded-full border-2 border-primary" onClick={handleClick}>
                {/* <   className="text-primary"> */}
                    View details
                {/* </Link> */}
            </Button>
        </CardFooter>
        </Card>
    );
}
