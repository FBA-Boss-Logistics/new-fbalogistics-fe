import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import Loader from "components/Loader";
import ModalComponent from "components/New/ModalComponent";
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
    quotationID,
    isSampleShipment=false
}) {
    const currentUrl = useLocation().pathname;
    const searchParams = new URLSearchParams(window.location.search);
    const srcQueryParam = searchParams.get("src");
    const [cancelReason, setCancelReason] = useState("");

    const section1 = [
        { label: "Shipment ID", value: OrderStatusData?.id },
        {
            label: isQuotationDeclined ? "Total Bid" : "Wining Bid",
            value: "$" + OrderStatusData?.quotation?.total_amount,
        },
        { label: "Product Name", value: OrderStatusData?.product_name },
      //   {
      //       label: "Tracking Link",
      //       value: (
      //           <div className="flex items-center gap-2">
      //           <a
      //               href={OrderStatusData?.tracking_link}
      //               target="_blank"
      //               rel="noopener noreferrer"
      //               className="text-natural-700 text-sm"
      //           >
      //               {OrderStatusData?.tracking_link ?? "N/A"}
      //           </a>
      //           </div>
      //       ),
      //   },
      {label:"Winning Agent", value: OrderStatusData?.quotation?.user?.first_name},
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
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <>
        {/* modal cancel winning bid */}
        <ModalComponent open={openModal} onClose={handleCloseModal} title="Cancel Winning Bid">
            <div className="flex flex-col  items-end justify-end h-full gap-4">
                {/* <textarea value={cancelReason} onChange={(e)=>setCancelReason(e.target.value)} className="w-full h-full border-1 border-natural-100 border-solid rounded-xl"></textarea> */}
                
                <textarea
                                        value={cancelReason}
                                        onChange={(e) =>
                                            setCancelReason(e.target.value)
                                        }
                                        rows={7}
                                        placeholder="Enter your Cancel Reason"
                                        className="border border-solid border-[#00000050] outline-none w-full p-4 rounded-md"
                                    />
                <div className="flex flex-col md:flex-row-reverse gap-2 w-full h-['20ox'] ">
                    <Button className="rounded-full border-2 border-primary md:flex-1" size="lg" onClick={()=>{
                        console.log(cancelReason)
                        handleStatusChange(quotationID, false, cancelReason)
                        handleCloseModal()
                    }}>Cancel Winning Bid</Button>
                    <Button className="rounded-full border-2 border-primary md:flex-1" variant="outline" size="lg" onClick={()=>{
                        handleCloseModal()
                    }}>Cancel</Button>
                </div>
            </div>
        </ModalComponent>
       
        <Card className="w-full h-full border-1 flex flex-col border-natural-100 border-solid rounded-xl  justify-between ">
         <CardHeader className="pb-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg text-[#333843]">Shipment Details</h3>
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
                                        // handleStatusChange(quotationID, false)
                                        handleOpenModal()
                                        handleClose()
                                    }}>Cancel Winning Bid</MenuItem>
                                </Menu>
                        </>
                        ) : (
                            <></>
                        )}
                  </div>
                  <CardDescription className="!mt-0">Sales performance by location</CardDescription>
        </CardHeader>
        <CardContent className="!pt-6">
        <div className="w-full h-full border-1 flex flex-col border-natural-100 border-solid rounded-xl  justify-between">
            {!isLoading ? (
                sections.map((section, index) => (
                    <React.Fragment key={index}>
                        <div className="flex gap-6">
                            <div className="flex items-start w-full">
                                <Typography className="text-sm font-normal text-[#667085]">
                                    {section.label}
                                </Typography>
                            </div>

                            <div className="flex items-start justify-end w-full ">
                                <Typography
                                    className="text-sm font-semibold text-[#2D3748]"
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
        <CardFooter className="flex justify-end !pt-1">
        {isSampleShipment ? (
            <></>
        ) : (
            <Button  variant="outline" size="lg"className="rounded-full border-2 border-primary text-primary px-[14px] py-[10px]" onClick={handleClick}>
                <span  className="text-primary">
                    View details
                </span>
            </Button>
        )}
        </CardFooter>
        </Card>
        </>
    );
}
