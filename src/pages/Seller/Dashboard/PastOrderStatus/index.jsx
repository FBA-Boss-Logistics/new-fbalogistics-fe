import { Typography } from "@mui/material";
import { AdditionalInformation } from "pages/Shipper/Contact/AdditionalInformation";
import { Cargo } from "pages/Shipper/Contact/Cargo";
import { Compliance } from "pages/Shipper/Contact/Compliance";
import { OriginAndDestination } from "pages/Shipper/Contact/OriginAndDestination";
import TICK from "assets/svg/TICK.svg";
import QuotationIcon from "assets/svg/quotation.svg";
import { useLocation } from "react-router-dom";

export function Quotation() {
    const currentUrl = useLocation().pathname;

    return (
        <div className="border-2  border-natural-100 border-solid p-4 rounded-xl m-4  flex-col gap-4 flex">
            <div className="flex justify-between">
                <div className="flex bg-primary-200  w-2/5 h-10 rounded-full gap-12 py-1 pl-3 text-center items-center">
                    <div>
                        <Typography color="success.900">
                            Freight Booking Reference Number
                        </Typography>
                    </div>
                    <div>
                        <Typography color="success.900">
                            023214-36565
                        </Typography>
                    </div>
                </div>

                {currentUrl.includes("/seller/booking/status") ? (
                    <></>
                ) : (
                    <div className="flex  bg-success-50  border-2 border-solid border-success-500 h-10 rounded-[140px] gap-2 py-1 px-2 text-success-700 text-center items-center">
                        <img src={TICK} alt="tick" />

                        <Typography fontWeight={500}>
                            Estimated Delivery on 07-15-2023
                        </Typography>
                    </div>
                )}
            </div>
            {currentUrl.includes("/seller/booking/status") ? (
                <></>
            ) : (
                <div>
                    <div className="flex-col gap-2">
                        <div className="w-8 h-8 p-1 bg-natural-100 rounded-full border-4 border-natural-100 justify-center  gap-2 inline-flex">
                            <div className="bg-natural-200 rounded-full ">
                                <img src={QuotationIcon} alt="quotation" />
                            </div>
                        </div>

                        <Typography
                            color="natural.900"
                            fontSize={18}
                            fontWeight={500}
                        >
                            Quotation
                        </Typography>
                    </div>
                    <div className="flex gap-6 p-4 bg-natural-25 rounded-xl">
                        <Typography
                            color="natural.900"
                            fontSize={18}
                            fontWeight={500}
                        >
                            Final
                        </Typography>
                        <Typography
                            color="natural.500"
                            fontSize={18}
                            fontWeight={500}
                        >
                            $25.8
                        </Typography>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function PastOrderStatusSeller() {
    
    return (
        <div>
            {/* <div className="py-4 border border-natural-100 border-solid border-x-0 border-t-0">
                <SellerTopNav />
            </div> */}
            <div className="border-2  border-natural-100 border-solid p-4 rounded-xl m-4">
                <Quotation />
                <div className="flex">
                    <OriginAndDestination />
                    <Cargo />
                </div>
                <Compliance />
                <AdditionalInformation />
            </div>
        </div>
    );
}
