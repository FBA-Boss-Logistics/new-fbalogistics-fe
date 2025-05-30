import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Chip, TextField, Typography } from "@mui/material";
import UserIcon from "assets/svg/usericon.svg";
import Quotation from "assets/svg/quotation.svg";
import { useEffect, useState } from "react";
import { CommonFormValidations } from "components/Form/CommonFormValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import BorderButton from "components/BorderButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AdditionalInformation } from "./AdditionalInformation";
import { Cargo } from "./Cargo";
import ChatIcon from "assets/svg/ChatIcon.svg";
import { Compliance } from "./Compliance";
import { OriginAndDestination } from "./OriginAndDestination";
import Loader from "components/Loader";
import {
    FetchAllShipmentOrderDetailApi,
    useCreateQuotationQuery,
} from "queries/Shipper";
import HandleErrorResponse from "utils/HandleErrorResponse";
import { formatDate } from "utils";
import { routes } from "routes/RouteConstants";
import PastStatus from "components/Dashboard/OrderStatus/PastStatus";
import ErrorUi from "pages/Seller/Booking/SellerOrderStatus/ErrorUi";
import { Card } from "components/ui/card";
import { Button } from "components/ui/button";
import { Collapsible, CollapsibleContent } from "components/ui/collapsible";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";

const { pickup_amount, fast_amount, normal_amount } = CommonFormValidations;
const QuotationFormSchema = yup.object().shape({
    pickup_amount,
    fast_amount,
    normal_amount,
});

export default function Contact() {
    const searchParams = new URLSearchParams(window.location.search);
    const srcQueryParam = searchParams.get("src");
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: quotationQuery } = useCreateQuotationQuery();

    const { id } = useParams();
    const location = useLocation(); // Get the location object
    const srcValue = new URLSearchParams(location.search).get("src");
    const {
        control,
        handleSubmit,
        watch,
        register,
        reset,
        setError,
        trigger,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(QuotationFormSchema),
    });

    const submitQuotationForm = (formData) => {
        const { pickup_amount, fast_amount, normal_amount } = formData;
        const payloadQuotation = {
            pickup_amount: pickup_amount,
            fast_amount: fast_amount,
            shipment: id,
            normal_amount: normal_amount,
        };
        quotationQuery(payloadQuotation, {
            onSuccess: () => {
                queryClient.invalidateQueries("FETCH_SHIPMENT_INFO");
                reset();
                navigate(routes.SHIPPERDASHBOARD.pathname);
            },
            onError: (err) => {
                HandleErrorResponse(err, setError);
            },
        });
    };

    const fast_amount = useWatch({
        control,
        name: "fast_amount",
    });

    const normal_amount = useWatch({
        control,
        name: "normal_amount",
    });

    const [winBidAccepted, setWinBidAccepted] = useState(false);

    useEffect(() => {
        if (fast_amount || normal_amount) {
            trigger(["fast_amount", "normal_amount"]);
        }
    }, [fast_amount, normal_amount, trigger]);
    const {
        data: shipmentData,
        dataUpdatedAt,
        isLoading,
        error, 
    } = FetchAllShipmentOrderDetailApi(id);

    
    const isAuthorizedError =  error?.status_code === 400 &&
        error?.message === "Bad Request" &&
        (error?.errors?.[0]?.message ===
            "You are not authorised to view this shipment"||
            error?.errors?.[0]?.message === "You cannot view this shipment right now.")

    const pickupLocation = shipmentData?.data?.pickup_location?.full_address;

    const deliveryLocation = shipmentData?.data?.delivery_location;

    let packages = shipmentData?.data?.packages;

    const asinNumber = shipmentData?.data?.main_competitor_asin;
    const productDescription =
        shipmentData?.data?.compliance?.detailed_product_description;
    const additionalNotes = shipmentData?.data?.compliance?.additional_notes;
    const shipmentGoods = shipmentData?.data?.compliance?.compliance;
    const quotation = shipmentData?.data?.quotation;
    const supplierPhone = shipmentData?.data?.user?.profile?.phone;
    const [showQuotation, setShowQuotation] = useState(true);
    const isEmptyObject = (obj) => {
        if (obj && Object.keys(obj).length === 0) {
            return true;
        }
        return false;
    };
    const handleClick = () => {
        navigate(`/shipper/dashboard/orders/status/${id}/?src=accepted`);
    };

    if(isAuthorizedError) {
        return <ErrorUi url={'/shipper/dashboard'} content={error?.errors?.[0]?.message}/>;
    }
    
    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center w-[80vw] h-full">
                    {" "}
                    <Loader />{" "}
                </div>
            ) : (
                <div className="space-y-4">
                     <Card className="p-4 space-y-4">

                        <div className="">
                            <div>
                                {/* <Chip
                                    label={`Freight Booking Reference Number ${shipmentData?.data?.freight_booking_reference_number}`}
                                    className="bg-primary-200"
                                /> */}
                              
                            </div>
                            <div className="flex items-center justify-between gap-4">
                            <p>
                                Freight Booking Reference Number:
                                 <span className="text-yellow-500"> {shipmentData?.data?.freight_booking_reference_number}</span>
                                </p>
                                {srcQueryParam === "phone" &&
                                    shipmentData.data.status ===
                                        "Quotation Accepted" && (
                                        <div
                                            title="chat"
                                            onClick={handleClick}
                                            className="flex items-center gap-2 cursor-pointer border-2 font-medium border-solid py-1 px-3 rounded-lg border-natural-100"
                                        >
                                            <img
                                                src={ChatIcon}
                                                className="opacity-70"
                                                alt="ChatIcon"
                                            />
                                            <span className="hidden md:inline">
                                            Chat
                                            </span>
                                        </div>
                                    )}
                                {/* <div className="flex items-center gap-2">
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
                                        {formatDate(
                                            shipmentData?.data
                                                ?.shipment_ready_date
                                        )}
                                    </Typography>
                                </div> */}
                            </div>
                        </div>
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
                                                                <div className="border-t border-zinc-100"></div>    

                            <div >
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
                                    supplierPhone={supplierPhone}
                                />
                            </div>
                    </Card>

                            <div>
                                <Cargo
                                    productName={
                                        shipmentData?.data?.product_name
                                    }
                                    shipmentData={shipmentData?.data}
                                    packages={packages}
                                    asinNumber={asinNumber}
                                />
                            </div>
                        <Compliance
                            productDescription={productDescription}
                            shipmentGoods={shipmentGoods}
                        />
                        {additionalNotes && (
                            <AdditionalInformation
                                additionalNotes={additionalNotes}
                            />
                        )}
                        {srcValue === "shipmenthistories" && (
                            <div className="p-4">
                                <PastStatus
                                    status={shipmentData?.data?.status}
                                />
                            </div>
                        )}
                        <Card className="p-4">
                        <Collapsible open={showQuotation} onOpenChange={setShowQuotation}>
                            <CollapsibleTrigger className="flex items-center w-full ">
                               <div className="flex items-center flex-row gap-2">
                                   <div className="w-[30px] h-[30px]">
                                           <img src={Quotation} alt="quotation" />
                                    </div>
                  
                                   <Typography
                                       color="natural.900"
                                       fontSize={18}
                                       fontWeight={500}
                                   >
                                       Quotation
                                   </Typography>
                               </div>
                               <ChevronDown className={`ml-auto h-5 w-5 transition-transform ${showQuotation ? "rotate-180" : ""}`} />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                            <form
                                id="QuotationForm" 
                                onSubmit={handleSubmit(submitQuotationForm)}
                            >
                                <div className="flex flex-col md:flex-row items-center align-bottom gap-2 w-full mt-4  ">
                                    <div className=" flex-col gap-2.5 flex grow w-full  rounded-lg">
                                        <Typography
                                            color="natural.900"
                                            variant="body1"
                                            fontWeight={400}
                                        >
                                            Pickup
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="$ Enter amount"
                                            inputProps={{
                                                pattern: "[0-9]*",
                                            }}
                                            defaultValue={
                                                !isEmptyObject(quotation)
                                                    ? quotation.pickup_amount
                                                    : ""
                                            }
                                            disabled={!isEmptyObject(quotation)}
                                            className=" bg-white rounded-lg shadow border border-natural-200 justify-start items-center gap-3 inline-flex"
                                            {...register("pickup_amount")}
                                            error={Boolean(
                                                errors.pickup_amount
                                            )}
                                            helperText={
                                                errors.pickup_amount &&
                                                errors.pickup_amount.message
                                            }
                                        />
                                    </div>
                                    <div className="flex-col gap-2.5 flex  w-full   rounded-lg">
                                        <Typography
                                            color="natural.900"
                                            variant="body1"
                                            fontWeight={400}
                                        >
                                            Fast
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="$ Enter amount"
                                            defaultValue={
                                                !isEmptyObject(quotation)
                                                    ? quotation.fast_amount
                                                    : ""
                                            }
                                            disabled={!isEmptyObject(quotation)}
                                            inputProps={{
                                                pattern: "[0-9]*",
                                            }}
                                            {...register("fast_amount")}
                                            error={Boolean(errors.fast_amount)}
                                            helperText={
                                                errors.fast_amount &&
                                                errors.fast_amount.message
                                            }
                                            className=" bg-white rounded-lg shadow border border-natural-200 justify-start items-center gap-3 inline-flex"
                                        />
                                    </div>
                                    <div className="flex-col gap-2.5 flex grow w-full  rounded-lg">
                                        <Typography
                                            color="natural.900"
                                            variant="body1"
                                            fontWeight={400}
                                        >
                                            Normal
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="$ Enter amount"
                                            defaultValue={
                                                !isEmptyObject(quotation)
                                                    ? quotation.normal_amount
                                                    : ""
                                            }
                                            disabled={!isEmptyObject(quotation)}
                                            inputProps={{
                                                pattern: "[0-9]*",
                                            }}
                                            {...register("normal_amount")}
                                            error={Boolean(
                                                errors.normal_amount
                                            )}
                                            helperText={
                                                errors.normal_amount &&
                                                errors.normal_amount.message
                                            }
                                            className=" bg-white rounded-lg shadow border border-natural-200 justify-start items-center gap-3 inline-flex"
                                        />
                                    </div>

                                </div>
                                    {isEmptyObject(quotation) ? (
                                        <div className="mt-8  items-end  justify-end hidden md:flex">
                                             <Button
                                                form="QuotationForm"
                                                type="submit"
                                                size="lg"
                                                fullWidth={true}
                                                variant="default"
                                                className="bg-primary rounded-full text-white border-none hover:bg-primary hover:ring-none hover:border-none w-[242px]"
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                            </form>
                            </CollapsibleContent>
                            </Collapsible>
                        </Card>
                        {isEmptyObject(quotation) ? (
                                        <div className="mt-8  items-end flex justify-end w-full md:hidden">
                                            <Button
                                                form="QuotationForm"
                                                type="submit"
                                                size="lg"
                                                fullWidth={true}
                                                variant="default"
                                                className="bg-primary rounded-full text-white border-none hover:bg-primary hover:ring-none hover:border-none w-full"
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                {/* </Card> */}
                </div>
            )}
        </>
    );
}
