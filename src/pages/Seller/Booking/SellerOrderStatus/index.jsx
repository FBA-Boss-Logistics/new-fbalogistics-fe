import { Chip, Typography } from "@mui/material";
import UserIcon from "assets/svg/usericon.svg";
import ChatIcon from "assets/svg/ChatIcon.svg";
import quotationIcon from "assets/svg/quotation.svg";
import { useState } from "react";
import { CommonFormValidations } from "components/Form/CommonFormValidations";
import * as yup from "yup";
import { AdditionalInformation } from "pages/Shipper/Contact/AdditionalInformation";
import { Cargo } from "pages/Shipper/Contact/Cargo";
import { Compliance } from "pages/Shipper/Contact/Compliance";
import { OriginAndDestination } from "pages/Shipper/Contact/OriginAndDestination";
import { useNavigate } from "react-router-dom";
import Loader from "components/Loader";
import { FetchAllShipmentOrderDetailApi } from "queries/Shipper";
import PastStatus from "components/Dashboard/OrderStatus/PastStatus";
import { useParams } from "react-router-dom";
import ShipperBid from "./shipperBid";
import ShippingAmount from "pages/Shipper/Contact/ShippingAmount";
import ErrorUi from "./ErrorUi";
import { Card, CardContent, CardHeader } from "components/ui/card";

const { pickup_amount, fast_amount, normal_amount } = CommonFormValidations;
const QuotationFormSchema = yup.object().shape({
    pickup_amount,
    fast_amount,
    normal_amount,
});

export default function SellerOrderStatus() {
    const searchParams = new URLSearchParams(window.location.search);
    const srcQueryParam = searchParams.get("src");
    const [winBidAccepted, setWinBidAccepted] = useState(false);
    const navigate = useNavigate();

    const { id } = useParams();
    const {
        data: shipmentData,
        dataUpdatedAt,
        isLoading,
        error
    } = FetchAllShipmentOrderDetailApi(id);
    const pickupLocation = shipmentData?.data?.pickup_location;

    const deliveryLocation = shipmentData?.data?.delivery_location;
    let pickupLocationInfo = "";
    if (pickupLocation) {
        pickupLocationInfo = `${pickupLocation.street_address ?? ""} ${
            pickupLocation.city ?? ""
        } ${pickupLocation.state ?? ""} ${pickupLocation.country ?? ""} ${
            pickupLocation.zip_code ?? ""
        }`;
    }

    const isAuthorizedError =
        error?.status_code === 400 &&
        error?.message === "Bad Request" &&
        (error?.errors?.[0]?.message ===
            "You are not authorised to view this shipment"||
            error?.errors?.[0]?.message === "You cannot view this shipment right now.")

    let packages = shipmentData?.data?.packages;

    const asinNumber = shipmentData?.data?.main_competitor_asin;
    const productDescription =
        shipmentData?.data?.compliance?.detailed_product_description;
    const additionalNotes = shipmentData?.data?.compliance?.additional_notes;
    const shipmentGoods = shipmentData?.data?.compliance?.compliance;
    const quotation = shipmentData?.data?.quotation;
    const status = shipmentData?.data?.status;
    const created_at = shipmentData?.data?.created_at;
    const isEmptyObject = (obj) => {
        if (obj && Object.keys(obj).length === 0) {
            return true;
        }
        return false;
    };

    const handleClick = () => {
        navigate(
            `/seller/booking/recentorderstatus/${id}/?src=currentShipments`
        );
    };
    
    if (isAuthorizedError) {
        return <ErrorUi url={'/seller/booking'} content={error?.errors?.[0]?.message}/>
    }

    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center">
                  
                    <Loader />
                </div>
            ) : (
                <div>
                    <div className="flex flex-col md:flex-row-reverse gap-4">
                        {srcQueryParam === "pendingorders" && (
                            
                            <div className="w-full md:max-w-[300px] ">
                                <ShippingAmount
                                    shippingAmount={
                                        shipmentData?.data?.quotation
                                            ?.total_amount
                                    }
                                    shipmentData={shipmentData?.data?.quotation}
                                    quotationId={
                                        shipmentData?.data?.quotation?.id
                                    }
                                />
                            </div>
                        )}
                        {/* <Card> */}
                        {/* <div className="flex justify-between ml-4 mr-4">
                            <div className="flex gap-4">
                                <Typography
                                    textAlign={"center"}
                                    variant="body1"
                                    fontWeight={500}
                                    color="natural.900"
                                >
                                    Pickup Date
                                </Typography>
                                <Typography
                                    color="natural.900"
                                    variant="body1"
                                    fontWeight={600}
                                >
                                    {shipmentData?.data?.shipment_ready_date}
                                </Typography>
                             </div>
                        </div> */}
                        <div className="flex flex-col gap-4 w-full ">
                        {winBidAccepted && (
                            <div className="border-2  border-natural-100 border-solid p-4 rounded-xl m-4 flex-col gap-4 flex">
                                <div className="flex-col gap-2">
                                    <div className="w-8 h-8 p-1 bg-natural-100 rounded-full border-4 border-natural-100 justify-center  gap-2 inline-flex">
                                        <div className="bg-natural-200 rounded-full">
                                            <img
                                                src={UserIcon}
                                                alt="userIcon"
                                            />
                                        </div>
                                    </div>

                                    <Typography
                                        color="natural.900"
                                        fontSize={18}
                                        fontWeight={500}
                                    >
                                        Contact Information
                                    </Typography>
                                </div>

                                <div className="flex gap-20">
                                    <div className="flex-col gap-2 flex">
                                        <Typography
                                            variant="body2"
                                            fontWeight={500}
                                            color="natural.800"
                                        >
                                            First Name
                                        </Typography>
                                        <Typography
                                            color="natural.500"
                                            fontWeight={400}
                                            variant="body2"
                                        >
                                            Darrell
                                        </Typography>
                                    </div>
                                    <div className="flex-col gap-2 flex">
                                        <Typography
                                            variant="body2"
                                            fontWeight={500}
                                            color="natural.800"
                                        >
                                            Last Name
                                        </Typography>
                                        <Typography
                                            color="natural.500"
                                            fontWeight={400}
                                            variant="body2"
                                        >
                                            Steward
                                        </Typography>
                                    </div>
                                    <div className="flex-col gap-2 flex">
                                        <Typography
                                            variant="body2"
                                            fontWeight={500}
                                            color="natural.800"
                                        >
                                            Email
                                        </Typography>
                                        <Typography
                                            color="natural.500"
                                            fontWeight={400}
                                            variant="body2"
                                        >
                                            georgia.young@example.com
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="flex flex-col gap-4">
                            <Card >
                                <CardHeader>
                                <div className="border-b border-natural-100 ">
                                <Typography
                                        label={``}
                                        className="mb-4"
                                    >
                                        Freight Booking Reference Number : <span className="text-primary-500 font-medium ">{shipmentData?.data?.freight_booking_reference_number}</span>
                                    </Typography>
                                </div>
                                </CardHeader>
                                <CardContent>
                                    <OriginAndDestination
                                    supplierName={
                                        shipmentData?.data
                                            ?.supplier_contact_name
                                    }
                                    pickupLocation={
                                        shipmentData?.data?.pickup_location
                                            ?.full_address
                                    }
                                    deliveryLocation={
                                        shipmentData?.data?.packages
                                    }
                                    supplierPhone={
                                        shipmentData?.data
                                            ?.supplier_contact_phone
                                    }
                                />
                            </CardContent>
                            </Card>

                            <div>
                                <Cargo
                                    productName={
                                        shipmentData?.data?.product_name
                                    }
                                    packages={packages}
                                    asinNumber={asinNumber}
                                    shipmentData={shipmentData?.data}
                                />
                            </div>
                        </div>
                        <Compliance
                            productDescription={productDescription}
                            shipmentGoods={shipmentGoods}
                        />

                        {status === "Quotation Accepted" ||
                        status === "Shipment Completed" ||
                        status === "Shipment Cancelled" ? (
                            <div className="border-2  border-natural-100 border-solid p-4 rounded-xl m-4">
                                <div className="flex-col items-start gap-2">
                                    <div className=" bg-natural-100 rounded-full border-4 border-solid p-[6px] border-natural-100 justify-center  gap-2 inline-flex">
                                        <img
                                            src={quotationIcon}
                                            alt="quotation"
                                            width={25}
                                        />
                                    </div>
                                    <Typography
                                        color="natural.900"
                                        fontSize={18}
                                        fontWeight={500}
                                    >
                                        Quotation
                                    </Typography>
                                </div>
                                <div className="flex gap-2 justify-between mt-2">
                                    <div className="bg-natural-25 w-1/2 p-2 flex-col justify-start items-start gap-2 flex rounded-lg">
                                        <Typography
                                            color="natural.800"
                                            variant="body2"
                                            fontWeight={500}
                                        >
                                            Pickup
                                        </Typography>
                                        <Typography
                                            color="natural.500"
                                            variant="body2"
                                            className="border p-2  border-solid border-natural-400 rounded-md w-[50%] bg-[#e4e4e7]"
                                            fontWeight={500}
                                        >
                                            {quotation?.pickup_amount}
                                        </Typography>
                                    </div>
                                    <div className="bg-natural-25 w-1/2 p-2 flex-col justify-start items-start gap-2 flex rounded-lg">
                                        <Typography
                                            color="natural.800"
                                            variant="body2"
                                            fontWeight={500}
                                        >
                                            Fast
                                        </Typography>
                                        <Typography
                                            color="natural.500"
                                            variant="body2"
                                            className="border p-2  border-solid border-natural-400 rounded-md w-[50%] bg-[#e4e4e7]"
                                            fontWeight={500}
                                        >
                                            {quotation?.fast_amount}
                                        </Typography>
                                    </div>
                                    <div className="bg-natural-25 w-1/2 p-2 flex-col justify-start items-start gap-2 flex rounded-lg">
                                        <Typography
                                            color="natural.800"
                                            variant="body2"
                                            fontWeight={500}
                                        >
                                            Normal
                                        </Typography>
                                        <Typography
                                            color="natural.500"
                                            variant="body2"
                                            fontWeight={500}
                                            className="border p-2  border-solid border-natural-400 rounded-md w-[50%] bg-[#e4e4e7]"
                                        >
                                            {quotation?.normal_amount}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}

                        {additionalNotes && (
                            <AdditionalInformation
                                additionalNotes={additionalNotes}
                            />
                        )}

                        <div>
                            <PastStatus status={status} />
                        </div>
                    {srcQueryParam === "newshipment" && (
                        
                            <ShipperBid created_at={created_at} />
                      
                    )}
                    </div>
                    </div>
                </div>
            )}
        </>
    );
}
