import {
    Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { LabelledTextField } from "components";
import * as yup from "yup";
import { CommonFormValidations } from "components/Form/CommonFormValidations";
import { useFieldArray, useForm } from "react-hook-form";
// import SubmitModal from "./SubmitModal";
import { useCreateShipmentQuery, useCreateInvoiceQuery, FetchSellerInvoiceDetailApi } from "queries/Seller";
import { format } from "date-fns";
import HandleErrorResponse from "utils/HandleErrorResponse";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { routes } from "routes/RouteConstants";
import { ChevronDown, X } from "lucide-react";
import { Button } from "components/ui/button";
import InvoiceIcon from "assets/svg/invoice.svg";
import CardComponent from "components/Dashboard/OrderStatus/CardComponent";
import { FetchSellerShipmentDetailApi, FetchSellerShipmentDetailByIdApi } from "queries/Seller";
import SaveIcon from "assets/svg/checked.svg";
import DownloadInvoiceIcon from "assets/svg/downloadInvoice.svg";
import HandleSuccessResponse from "utils/HandleSuccessResponse";
import Loader from "components/Loader";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "components/ui/collapsible";



const {
    shipment_number,
    email,
    first_name,
    company_name,
    street_address,
    city,
    state,
    country,
    zip_code,
    full_address,
} = CommonFormValidations;
const ShipperFormSchema = yup.object().shape({
    shipment_number,
    email,
    first_name,
    company_name,
    street_address,
    city,
    state,
    country,
    zip_code,
    full_address,
    phone_number: yup.string().required("Phone number is required"),
});

export default function InvoiceCustomer({ formId }) {
    const {id} = useParams()
    // queries
    // const { mutate: CreateShipment } = useCreateShipmentQuery();
    const { mutate: CreateInvoice } = useCreateInvoiceQuery();
    const { data: Invoices } = FetchSellerInvoiceDetailApi({shipment_id: id});

    const invoice = Invoices?.data?.data[0]

    console.log("id", id)

    const { data: invoiceData, isLoading } = FetchSellerShipmentDetailByIdApi(id);
    const [invoiceOpen, setInvoiceOpen] = useState(true)

    useEffect(() => {
        if (invoiceData) {
            setValue("email", invoiceData?.user?.email || null);
            setValue("first_name", invoiceData?.user?.first_name || null);
            setValue("company_name", invoiceData?.user?.profile?.company_name || null);
            setValue("phone_number", invoiceData?.user?.profile?.phone || null);
            setValue("street_address", invoiceData?.pickup_location?.street_address || null);
            setValue("city", invoiceData?.pickup_location?.city || null);
            setValue("state", invoiceData?.pickup_location?.state || null);
            setValue("country", invoiceData?.pickup_location?.country || null);
            setValue("zip_code", invoiceData?.pickup_location?.zip_code || null);
            setValue("full_address", invoiceData?.pickup_location?.full_address || null);
        }
    }, [invoiceData]);

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(ShipperFormSchema),
        defaultValues: {
            shipment_number: id,
            email: invoiceData?.user?.email || "",
            first_name: invoiceData?.user?.first_name || "",
            company_name: invoiceData?.user?.profile?.company_name || "",
            phone_number: invoiceData?.user?.profile?.phone || "",
            delivery_location: [
                {
                    street_address: invoiceData?.pickup_location?.street_address || "",
                    city: invoiceData?.pickup_location?.city || "",
                    state: invoiceData?.pickup_location?.state || "",
                    country: invoiceData?.pickup_location?.country || "",
                    zip_code: invoiceData?.pickup_location?.zip_code || "",
                    full_address: invoiceData?.pickup_location?.full_address || "",
                },
            ],
            user: {
                email: invoiceData?.user?.email || "",
                first_name: invoiceData?.user?.first_name || "",
                profile: {
                    phone: invoiceData?.user?.profile?.phone || "",
                    company_name: invoiceData?.user?.profile?.company_name || "",
                },
            },
            compliance: [],
        },
    });

    // ref
    const { ref: refShipmentNumber, ...RegisterShipmentNumber } = register("shipment_number");
    const { ref: refFirstName, ...RegisterFirstName } = register("first_name");
    const { ref: refCompanyName, ...RegisterCompanyName } = register("company_name");
    const { ref: refEmail, ...RegisterEmail } = register("email");
    const { ref: refPhoneNumber, ...RegisterPhoneNumber } = register("phone_number");
    const { ref: refStreetAddress, ...RegisterStreetAddress } = register("street_address");
    const { ref: refCity, ...RegisterCity } = register("city");
    const { ref: refState, ...RegisterState } = register("state");
    const { ref: refCountry, ...RegisterCountry } = register("country");
    const { ref: refZipCode, ...RegisterZipCode } = register("zip_code");
    const { ref: refFullAddress, ...RegisterFullAddress } = register("full_address");
    const queryClient = useQueryClient();
    const {
        full_address,
        delivery_location,
        product_name,
        compliance,
        main_competitor_asin,
        supplier_contact_name,
        detailed_product_description,
        supplier_contact_phone,
        packages,
        email,
        first_name,
        company_name,
    } = watch();
    const submitShipperFrom = (formData) => {

        const payload = {
            shipment: id,
            user_id: invoiceData?.user?.id,
            pickup_location_id: invoiceData?.pickup_location?.id,
            pickup_location: {
                street_address: formData?.street_address,
                city: formData?.city,
                state: formData?.state,
                country: formData?.country,
                zip_code: formData?.zip_code,
                full_address: formData?.full_address,
            },
            user: {
                email: formData?.email,
                first_name: formData?.first_name,
                profile: {
                    phone: formData?.phone_number,
                    company_name: formData?.company_name,
                },
            },
        };
        CreateInvoice(payload, {
            onSuccess: () => {
                queryClient.invalidateQueries(["FETCH_SELLER_SHIPMENT_INFO"]);
                HandleSuccessResponse({ message: "Invoice created successfully" });
            },
            onError: (err) => {
                HandleErrorResponse(err, setError);
            },
        });
    };

    const handleErrors = (error) => {
        console.log(error, "error");
    };

    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <Loader />
                </div>
            ) : (
                <div className="w-full">
                    <div className="">
                        <form id={formId} onSubmit={handleSubmit(submitShipperFrom, handleErrors)}>
                            <div>
                                <div className="flex flex-col gap-6  font-semibold w-full">
                                    {/* contact information Section */}
                                    <CardComponent className="px-6 py-2">
                                        {/* collapsable section */}
                                        <Collapsible open={invoiceOpen} onOpenChange={setInvoiceOpen}>
                                        <CollapsibleTrigger className="flex items-center w-full  text-left  rounded-md">
                                            <div className="flex items-center w-full  text-left  rounded-md">
                                                <div className="flex-col gap-2 ">
                                                    <div className="flex items-center flex-row gap-2 py-[18px]">
                                                        <div className="bg-natural-200 rounded-full w-[30px]">
                                                            <img src={InvoiceIcon} alt="truck" />
                                                        </div>
                                                        <Typography color="natural.900" fontSize={18} fontWeight={600}>
                                                            Invoice
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </div>
                                            <ChevronDown className={`ml-auto h-5 w-5 transition-transform ${invoiceOpen ? "rotate-180" : ""}`} />
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                        <div className="flex flex-wrap lg:flex-nowrap gap-4 my-4 md:w-1/2 w-full  font-semibold ">
                                            <LabelledTextField
                                                label="Shipment number"
                                                placeholder="#"
                                                value={id}
                                                disabled={true}
                                                inputRef={refShipmentNumber}
                                                {...RegisterShipmentNumber}
                                                error={Boolean(
                                                    errors.shipment_number
                                                )}
                                                helperText={
                                                    errors.shipment_number &&
                                                    errors.shipment_number.message
                                                }
                                                autoComplete="new-shipment-number"
                                                className="gap-[6px] text-sm font-semibold text-[#2E2E2E]"
                                            />
                                        </div>
                                        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-4 w-full  font-semibold ">
                                            <LabelledTextField
                                                label="Name"
                                                placeholder="Enter your name.."
                                                className=""
                                                // value={shipmentData?.data[0].user.first_name}
                                                disabled={invoiceData?.user?.first_name ? true : false}
                                                inputRef={refFirstName}
                                                {...RegisterFirstName}
                                                error={Boolean(errors.first_name)}
                                                helperText={
                                                    errors.first_name &&
                                                    errors.first_name.message
                                                }
                                                autoComplete="new-first-name"
                                            />
                                            <LabelledTextField
                                                label="Company Name"
                                                placeholder="Enter your Company Name"
                                                disabled={invoiceData?.user?.profile?.company_name ? true : false}
                                                inputRef={refCompanyName}
                                                {...RegisterCompanyName}
                                                error={Boolean(
                                                    errors.company_name
                                                )}
                                                helperText={
                                                    errors.company_name &&
                                                    errors.company_name.message
                                                }
                                                autoComplete="new-company-name"
                                                className="gap-[6px] text-sm font-semibold text-[#2E2E2E]"
                                            />
                                            <LabelledTextField
                                                label="Phone Number"
                                                placeholder="Enter your Phone Number"
                                                disabled={invoiceData?.user?.profile?.phone ? true : false}
                                                inputRef={refPhoneNumber}
                                                {...RegisterPhoneNumber}
                                                error={Boolean(
                                                    errors.phone_number
                                                )}
                                                helperText={
                                                    errors.phone_number &&
                                                    errors.phone_number.message
                                                }
                                                autoComplete="new-phone-number"
                                                className="gap-[6px] text-sm font-semibold text-[#2E2E2E]"
                                            />
                                            <LabelledTextField
                                                label="Email"
                                                placeholder="Enter your email.."
                                                className=""
                                                // value={shipmentData?.data[0].user.email}
                                                disabled={invoiceData?.user?.email ? true : false}
                                                inputRef={refEmail}
                                                {...RegisterEmail}
                                                error={Boolean(errors.email)}
                                                helperText={
                                                    errors.email &&
                                                    errors.email.message
                                                }
                                                autoComplete="new-email"
                                            />
                                        </div>
                                            {/* Address Section */}
                                        <div className="py-2">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center flex-row gap-2 py-[10px]">
                                                    <Typography color="natural.900" fontSize={18} fontWeight={600}>
                                                        Address Details
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-4 w-full  font-semibold ">
                                            <LabelledTextField
                                                label="Address 1"
                                                placeholder="Enter your Address"
                                                className=""
                                                // value={shipmentData?.data[0].user.first_name}
                                                disabled={invoiceData?.pickup_location?.street_address ? true : false}
                                                inputRef={refStreetAddress}
                                                {...RegisterStreetAddress}
                                                error={Boolean(errors.street_address)}
                                                helperText={
                                                    errors.street_address &&
                                                    errors.street_address.message
                                                }
                                                autoComplete="new-street-address"
                                            />
                                            <LabelledTextField
                                                label="Address 2"
                                                placeholder="Enter your Address"
                                                // value={shipmentData?.data[0].user.profile}
                                                disabled={invoiceData?.pickup_location?.full_address ? true : false}
                                                inputRef={refFullAddress}
                                                {...RegisterFullAddress}
                                                error={Boolean(
                                                    errors.full_address
                                                )}
                                                helperText={
                                                    errors.full_address &&
                                                    errors.full_address.message
                                                }
                                                autoComplete="new-full-address"
                                            />
                                            <LabelledTextField
                                                label="City"
                                                placeholder="Enter your City"
                                                // value={shipmentData?.data[0]?.user?.profile?.phone}
                                                disabled={invoiceData?.pickup_location?.city ? true : false}
                                                inputRef={refCity}
                                                {...RegisterCity}
                                                error={Boolean(
                                                    errors.city
                                                )}
                                                helperText={
                                                    errors.city &&
                                                    errors.city.message
                                                }
                                                autoComplete="new-city"
                                            />
                                            <LabelledTextField
                                                label="State/Province"
                                                placeholder="Enter your State/Province"
                                                className=""
                                                // value={shipmentData?.data[0].user.email}
                                                disabled={invoiceData?.pickup_location?.state ? true : false}
                                                inputRef={refState}
                                                {...RegisterState}
                                                error={Boolean(errors.state)}
                                                helperText={
                                                    errors.state &&
                                                    errors.state.message
                                                }
                                                autoComplete="new-state"
                                            />
                                            <LabelledTextField
                                                label="Country"
                                                placeholder="Enter your Country"
                                                className=""
                                                // value={shipmentData?.data[0].user.email}
                                                disabled={invoiceData?.pickup_location?.country ? true : false}
                                                inputRef={refCountry}
                                                {...RegisterCountry}
                                                error={Boolean(errors.country)}
                                                helperText={
                                                    errors.country &&
                                                    errors.country.message
                                                }
                                                autoComplete="new-country"
                                            />
                                            <LabelledTextField
                                                label="Postal Code"
                                                placeholder="Enter your Postal Code"
                                                className=""
                                                // value={shipmentData?.data[0].user.email}
                                                disabled={invoiceData?.pickup_location?.zip_code ? true : false}
                                                inputRef={refZipCode}
                                                {...RegisterZipCode}
                                                error={Boolean(errors.zip_code)}
                                                helperText={
                                                    errors.zip_code &&
                                                    errors.zip_code.message
                                                }
                                                autoComplete="new-zip-code"
                                            />
                                        </div>
                                        </div>
                                        </CollapsibleContent>
                                        </Collapsible>
                                    </CardComponent>
                                </div>
                            </div>
                            <div className="md:hidden text-center flex flex-row gap-4 items-center justify-center mt-[40px]">
                                {invoice && (
                                    <Button variant="outline" size="lg" className=" rounded-[8px] bg-[#213E7B1F] text-[#213E7B] px-[13px] hover:bg-[#213E7B1F]/20 hover:text-[#213E7B]">
                                        <img src={DownloadInvoiceIcon} alt="Download Invoice" className="h-[16.25px] w-[16.25px]" />
                                        <span className="font-semibold text-sm">Download <span className="hidden md:inline">PDF Invoice</span></span>
                                    </Button>
                                )}
                                { invoice === undefined && (
                                    <Button type="submit" form="invoice-customer-form" size="lg" className="rounded-[8px] bg-[#37A672] hover:bg-[#37A672]/90 text-white gap-[5.62px] px-[14px]" >
                                        <img src={SaveIcon} alt="Save Document" className="h-[8.75px] w-[10.42px]" />
                                        <span className="font-semibold text-sm">Save <span className="hidden md:inline">Document</span></span>
                                    </Button>
                                )}
                            </div>
                            {/* <SubmitModal open={open} handleClose={handleCloseModal} /> */}
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

// export default InvoiceCustomer;
