import {
    Typography,
    Checkbox,
    FormControlLabel,
    FormHelperText,
} from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { LabelledSelectField, LabelledTextField } from "components";
import * as yup from "yup";
import { CommonFormValidations } from "components/Form/CommonFormValidations";
import { useFieldArray, useForm } from "react-hook-form";
import BorderButton from "components/BorderButton";
import DatePicker from "react-multi-date-picker";
import "./calendar.css";
// import SubmitModal from "./SubmitModal";
import { useCreateShipmentQuery } from "queries/Seller";
import { useCreateWarehouseQuery } from "queries/Shipper";
import { format } from "date-fns";
import HandleErrorResponse from "utils/HandleErrorResponse";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { routes } from "routes/RouteConstants";
import { ChevronRight, Plus, X } from "lucide-react";
import { Button } from "components/ui/button";
import Location from "assets/svg/location.svg";
import Truck from "assets/svg/truck.svg";
import { Card } from "components/ui/card";
import CardComponent from "components/Dashboard/OrderStatus/CardComponent";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react";
import invoiceIcon from "assets/svg/invoice.svg";
import HandleSuccessResponse from "utils/HandleSuccessResponse";
import SaveIcon from "assets/svg/checked.svg";
import InvoiceIcon from "assets/svg/invoice.svg";
import DownloadInvoiceIcon from "assets/svg/downloadInvoice.svg";
import { fetchAllWarehouseDetailApi } from "queries/Shipper";
import { FetchSellerInvoiceDetailApi } from "queries/Seller";
import Loader from "components/Loader";

const ShipperFormSchema = yup.object().shape({
    warehouses: yup.array().of(
        yup.object().shape({
            shipment: yup.number().required("Shipment is required"),
            warehouse_code: yup.string().required("Warehouse code is required"),
            chargeable_weight: yup.number().typeError("Chargeable weight must be a number").required("Chargeable weight is required"),
            extra_fee: yup.number().typeError("Extra fee must be a number").required("Extra fee is required"),
            unit_price: yup.number().typeError("Unit price must be a number").required("Unit price is required"),
            pick_up_fee: yup.number().typeError("Pickup fee must be a number").required("Pickup fee is required"),
            discount: yup.number().typeError("Discount must be a number").required("Discount is required"),
        })
    ),
});

const Invoice = () => {
    const { id } = useParams();
    const { data: WarehousesData, isLoading: isWarehousesLoading } = fetchAllWarehouseDetailApi(id);
    const { data: CustomerInvoiceData, isLoading: isCustomerInvoiceLoading } = FetchSellerInvoiceDetailApi({shipment_id: id});
    const customerInvoice = CustomerInvoiceData?.data?.data[0]
    const warehouseData = WarehousesData?.data?.data
    const [isCustomerInvoiceEmpty, setIsCustomerInvoiceEmpty] = useState(true);
    const [isWarehouseEmpty, setIsWarehouseEmpty] = useState(true);
    const [invoiceOpen, setInvoiceOpen] = useState(true)
    const [warehouseOpen, setWarehouseOpen] = useState(true)

    useEffect(() => {
        setIsWarehouseEmpty(warehouseData?.length === 0);
        setIsCustomerInvoiceEmpty(customerInvoice === undefined);
    }, [warehouseData, customerInvoice]);

    // queries
    const { mutate: CreateWarehouse } = useCreateWarehouseQuery();

    const {
        control,
        setValue,
        handleSubmit,
        setError,
        trigger,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(ShipperFormSchema),
        defaultValues: {
            warehouses: [
                {
                    shipment: id,
                    warehouse_code: null,
                    chargeable_weight: null,
                    extra_fee: null,
                    unit_price: null,
                    pick_up_fee: null,
                    discount: null,
                },
            ],
        },
    });

    const {
        fields: warehouseSetFields,
        append: warehouseAppend,
        remove: warehouseRemove,
    } = useFieldArray({
        control,
        name: "warehouses",
    });

    // ref
    const queryClient = useQueryClient();
    const submitShipperFrom = (formData) => {
        const multipleWarehouse = formData?.warehouses?.map(
            (item) => {
            return {
                shipment: id,
                warehouse_code: item?.warehouse_code,
                chargeable_weight: item?.chargeable_weight,
                extra_fee: item?.extra_fee,
                unit_price: item?.unit_price,
                pick_up_fee: item?.pick_up_fee,
                discount: item?.discount,
            };
        });
        CreateWarehouse(multipleWarehouse, {
            onSuccess: () => {
                queryClient.invalidateQueries(["FETCH_SELLER_SHIPMENT_INFO"]);
                HandleSuccessResponse({message: "Warehouse created successfully"});
            },
            onError: (err) => {
                HandleErrorResponse(err, setError);
            },
        });
    };

    const handleChangeValue = (field, value, shouldValidate) => {
        setValue(field, value, {
            shouldValidate: shouldValidate || field in errors,
        });
    };

    const handleCargoField = (e, index, keyName) => {
        handleChangeValue(`warehouses.${index}.${keyName}`, e.target.value);
        trigger(`warehouses.${index}.${keyName}`);
    };

    const handleErrors = (error) => {
        console.log(error, "error");
    };

    const [cargoCount, setCargoCount] = useState(1);

    const handleAddCargoSetField = () => {
         if(warehouseSetFields.length < 10 && cargoCount < 10) {
        warehouseAppend({
            shipment: id,
            warehouse_code: null,
            chargeable_weight: null,
            extra_fee: null,
            unit_price: null,
            pickup_fee: null,
            discount: null,
        });
         }
           
    };
    
    const handleChangeCargoSetField = (e) => {
        setCargoCount(e)
        var currentCount = warehouseSetFields.length;
        var newCargoCount = parseInt(e)
        if (e === null) newCargoCount = 1;
        if (isNaN(newCargoCount)) return;
        if (newCargoCount < 1) newCargoCount = 1;
        if (newCargoCount > 10) newCargoCount = 10;
        setCargoCount(newCargoCount)
        if(currentCount < newCargoCount) {
        console.log(newCargoCount-currentCount,"newCargoCount-currentCount")
        for(let i = currentCount; i < newCargoCount; i++) {
                handleAddCargoSetField()

            }
        }
        else if(currentCount > newCargoCount) {
            for (let i = currentCount - 1; i >= newCargoCount; i--) {
            warehouseRemove(i);
            // deliveryLocationRemove(i);
            }
        }
       
    };
    return (
        <>
            {isWarehousesLoading || isCustomerInvoiceLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <Loader />
                </div>
            ) : (
                <div className="w-full">

                    <div className="">
                        <form id="invoice-shipper-form" onSubmit={handleSubmit(submitShipperFrom, handleErrors)}>
                        
                            <div>
                                <div className="flex flex-col gap-6  font-semibold">
                                    {/* Cargo Section */}
                                    <CardComponent className="px-6 pt-2">
                                        {/* collapsable section */}
                                        <Collapsible open={warehouseOpen} onOpenChange={setWarehouseOpen}>
                                            <CollapsibleTrigger className="flex items-center w-full  text-left  rounded-md">
                                                <div className="flex items-center w-full  text-left  rounded-md">
                                                    <div className="flex-col gap-2">
                                                        <div className="flex items-center flex-row gap-2 py-[18px]">
                                                            <div className="bg-natural-200 rounded-full w-[30px]">
                                                                <img src={invoiceIcon} alt="truck" />
                                                            </div>
                                                            <Typography color="natural.900" fontSize={18} fontWeight={600}>
                                                                Invoice
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ChevronDown className={`ml-auto h-5 w-5 transition-transform ${warehouseOpen ? "rotate-180" : ""}`} />
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                {isWarehouseEmpty ? warehouseSetFields?.map((field, index) => {
                                                    return (
                                                        <div key={index}>
                                                            {index > 0 &&
                                                                warehouseSetFields?.length >
                                                                    1 && (
                                                                    <hr className="mt-9" />
                                                                )}
                                                                <div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-4 ">
                                                                    {index === 0 ? (
                                                                        <LabelledSelectField
                                                                            label="Warehouse#"
                                                                            placeholder="Select a number"
                                                                            onChange={(event, value) => handleChangeCargoSetField(value)}
                                                                            options={[...Array(10).keys()].map((num) => (num + 1).toString())} // Just use numbers directly
                                                                        />
                                                                    ) : (
                                                                        <LabelledTextField
                                                                            label="Warehouse#"
                                                                            disabled={true}
                                                                            value={index + 1}
                                                                        />
                                                                    )}
                                                                    <LabelledTextField
                                                                        label="Warehouse codes"
                                                                        placeholder="Warehouse codes"
                                                                        type="string"
                                                                        autoComplete="new-warehouse-code"
                                                                        onChange={(e) => {
                                                                            handleCargoField(
                                                                                e,
                                                                                index,
                                                                                "warehouse_code"
                                                                            );
                                                                        }}
                                                                        value={
                                                                            field?.warehouse_code
                                                                        }
                                                                        error={Boolean(
                                                                            Array.isArray(
                                                                                errors?.warehouses
                                                                            ) &&
                                                                                errors
                                                                                    .warehouses[
                                                                                    index
                                                                                ]
                                                                                    ?.warehouse_code
                                                                        )}
                                                                        helperText={
                                                                            Array.isArray(
                                                                                errors?.warehouses
                                                                            ) &&
                                                                            errors.warehouses[
                                                                                index
                                                                            ]
                                                                                ?.warehouse_code &&
                                                                            errors.warehouses[
                                                                                index
                                                                            ]
                                                                                ?.warehouse_code
                                                                                .message
                                                                        }
                                                                    />

                                                                    <LabelledTextField
                                                                        label="Chargeable weight"
                                                                        placeholder="Chargeable weight"
                                                                        className="6"
                                                                        type="string"
                                                                        onChange={(e) => {
                                                                            handleCargoField(
                                                                                e,
                                                                                index,
                                                                                "chargeable_weight"
                                                                            );
                                                                        }}
                                                                        autoComplete="new-chargeable-weight"
                                                                        value={
                                                                            field?.chargeable_weight
                                                                        }
                                                                        error={Boolean(
                                                                            Array.isArray(
                                                                                errors?.warehouses
                                                                            ) &&
                                                                                errors
                                                                                    .warehouses[
                                                                                    index
                                                                                ]
                                                                                    ?.chargeable_weight
                                                                        )}
                                                                        helperText={
                                                                            Array.isArray(
                                                                                errors?.warehouses
                                                                            ) &&
                                                                            errors.warehouses[
                                                                                index
                                                                            ]
                                                                                ?.chargeable_weight &&
                                                                            errors.warehouses[
                                                                                index
                                                                            ]
                                                                                ?.chargeable_weight
                                                                                .message
                                                                        }
                                                                    />

                                                                    <LabelledTextField
                                                                        label="Extra fee"
                                                                        placeholder="Extra fee"
                                                                        type="string"
                                                                        className=""
                                                                        onChange={(e) => {
                                                                            handleCargoField(
                                                                                e,
                                                                                index,
                                                                                "extra_fee"
                                                                            );
                                                                        }}
                                                                        autoComplete="new-extra-fee"
                                                                        value={
                                                                            field?.extra_fee
                                                                        }
                                                                        error={Boolean(
                                                                            Array.isArray(
                                                                                errors?.warehouses
                                                                            ) &&
                                                                                errors
                                                                                    .warehouses[
                                                                                    index
                                                                                ]
                                                                                    ?.extra_fee
                                                                        )}
                                                                        helperText={
                                                                            Array.isArray(
                                                                                errors?.warehouses
                                                                            ) &&
                                                                            errors.warehouses[
                                                                                index
                                                                            ]
                                                                                ?.extra_fee &&
                                                                            errors.warehouses[
                                                                                index
                                                                            ]
                                                                                ?.extra_fee
                                                                                .message
                                                                        }
                                                                    />

                                                                    <LabelledTextField
                                                                        label="Unit price"
                                                                        placeholder="Unit price"
                                                                        type="string"
                                                                        onChange={(e) => {
                                                                            handleCargoField(
                                                                                e,
                                                                                index,
                                                                                "unit_price"
                                                                            );
                                                                        }}
                                                                        autoComplete="new-unit-price"
                                                                        value={
                                                                            field?.unit_price
                                                                        }
                                                                        error={Boolean(
                                                                            Array.isArray(
                                                                                errors?.warehouses
                                                                            ) &&
                                                                                errors
                                                                                    .warehouses[
                                                                                    index
                                                                                ]
                                                                                    ?.unit_price
                                                                        )}
                                                                        helperText={
                                                                            Array.isArray(
                                                                                errors?.warehouses
                                                                            ) &&
                                                                            errors.warehouses[
                                                                                index
                                                                            ]
                                                                                ?.unit_price &&
                                                                            errors.warehouses[
                                                                                index
                                                                            ]
                                                                                ?.unit_price
                                                                                .message
                                                                        }
                                                                    />
                                                            
                                                                    <LabelledTextField
                                                                        label="Pickup fee"
                                                                        placeholder="Pickup fee"
                                                                        type="string"
                                                                        onChange={(e) => {
                                                                            handleCargoField(
                                                                                e,
                                                                                index,
                                                                                "pick_up_fee"
                                                                            );
                                                                        }}
                                                                        autoComplete="new-pickup-fee"
                                                                        value={
                                                                            field?.pick_up_fee
                                                                        }
                                                                        error={Boolean(
                                                                            Array.isArray(
                                                                                errors?.warehouses
                                                                            ) &&
                                                                                errors
                                                                                    .warehouses[
                                                                                    index
                                                                                ]
                                                                                    ?.pick_up_fee
                                                                        )}
                                                                        helperText={
                                                                            Array.isArray(
                                                                                errors?.warehouses
                                                                            ) &&
                                                                            errors.warehouses[
                                                                                index
                                                                            ]
                                                                                ?.pick_up_fee &&
                                                                            errors.warehouses[
                                                                                index
                                                                            ]
                                                                                ?.pick_up_fee
                                                                                .message
                                                                        }
                                                                    />

                                                                    <LabelledTextField
                                                                        label="Discount"
                                                                        placeholder="Discount"
                                                                        type="string"
                                                                        onChange={(e) => {
                                                                            handleCargoField(
                                                                                e,
                                                                                index,
                                                                                "discount"
                                                                            );
                                                                        }}
                                                                        value={
                                                                            field?.discount
                                                                        }
                                                                        autoComplete="new-discount"
                                                                        error={Boolean(
                                                                            Array.isArray(
                                                                                errors?.warehouses
                                                                            ) &&
                                                                                errors
                                                                                    .warehouses[
                                                                                    index
                                                                                ]
                                                                                    ?.discount
                                                                        )}
                                                                        helperText={
                                                                            Array.isArray(
                                                                                errors?.warehouses
                                                                            ) &&
                                                                            errors.warehouses[
                                                                                index
                                                                            ]
                                                                                ?.discount &&
                                                                            errors.warehouses[
                                                                                index
                                                                            ]
                                                                                ?.discount
                                                                                .message
                                                                        }
                                                                    />
                                                                </div>
                                                        </div>
                                                    );
                                                }) : (
                                                    warehouseData?.map((field, index) => {
                                                        return (
                                                            <div key={index}>
                                                                {index > 0 &&
                                                                    warehouseData?.length > 1 && (
                                                                        <hr className="mt-9" />
                                                                )}
                                                                <div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-4 ">
                                                                    <LabelledTextField
                                                                        label="Warehouse#"
                                                                        disabled={true}
                                                                        value={index + 1}
                                                                    />
                                                                    <LabelledTextField
                                                                        label="Warehouse codes"
                                                                        disabled={true}
                                                                        value={field?.warehouse_code}
                                                                    />
                                                                    <LabelledTextField
                                                                        label="Chargeable weight"
                                                                        disabled={true}
                                                                        value={field?.chargeable_weight}
                                                                    />
                                                                    <LabelledTextField
                                                                        label="Extra fee"
                                                                        disabled={true}
                                                                        value={field?.extra_fee}
                                                                    />
                                                                    <LabelledTextField
                                                                        label="Unit price"
                                                                        disabled={true}
                                                                        value={field?.unit_price}
                                                                    />
                                                                    <LabelledTextField
                                                                        label="Pickup fee"
                                                                        disabled={true}
                                                                        value={field?.pick_up_fee}
                                                                    />
                                                                    <LabelledTextField
                                                                        label="Discount"
                                                                        disabled={true}
                                                                        value={field?.discount}
                                                                    />
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                )}
                                            </CollapsibleContent>
                                        </Collapsible>
                                    </CardComponent>
                                    {isCustomerInvoiceEmpty ? (
                                        <div className="flex flex-col gap-6 font-semibold w-full">
                                            <CardComponent className="px-6 py-2">
                                                <Collapsible open={invoiceOpen} onOpenChange={setInvoiceOpen}>
                                                    <CollapsibleTrigger className="flex items-center w-full  text-left  rounded-md">
                                                        <div className="flex items-center w-full  text-left  rounded-md">
                                                            <div className="flex-col gap-2 ">
                                                                <div className="flex items-center flex-row gap-2 py-[18px]">
                                                                    <div className="bg-natural-200 rounded-full w-[30px]">
                                                                        <img src={InvoiceIcon} alt="truck" />
                                                                    </div>
                                                                <Typography color="natural.900" fontSize={18} fontWeight={600}>
                                                                    Customer Invoice
                                                                </Typography>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <ChevronDown className={`ml-auto h-5 w-5 transition-transform ${invoiceOpen ? "rotate-180" : ""}`} />
                                                    </CollapsibleTrigger>
                                                    <CollapsibleContent>
                                                        <div className="flex flex-wrap lg:flex-nowrap gap-4 my-4 md:w-1/2 w-full  font-semibold ">
                                                            <Typography>No customer invoice found</Typography>
                                                        </div>
                                                    </CollapsibleContent>
                                                </Collapsible>
                                            </CardComponent>
                                        </div>
                                    ) : (
                                            <CardComponent className="px-6 py-2">
                                                <Collapsible open={invoiceOpen} onOpenChange={setInvoiceOpen}>
                                                    <CollapsibleTrigger className="flex items-center w-full  text-left  rounded-md">
                                                    <div className="flex items-center w-full  text-left  rounded-md">
                                                        <div className="flex-col gap-2 ">
                                                            <div className="flex items-center flex-row gap-2 py-[18px]">
                                                                <div className="bg-natural-200 rounded-full w-[30px]">
                                                                    <img src={InvoiceIcon} alt="truck" />
                                                                </div>
                                                            <Typography color="natural.900" fontSize={18} fontWeight={600}>
                                                                Customer Invoice
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
                                                                value={customerInvoice?.shipment?.id}
                                                                disabled={true}
                                                            />
                                                        </div>
                                                        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-4 w-full  font-semibold ">
                                                            <LabelledTextField
                                                                label="Name"
                                                                placeholder="Enter your name.."
                                                                value={customerInvoice?.user?.first_name}
                                                                disabled={true}
                                                            />
                                                            <LabelledTextField
                                                                label="Company Name"
                                                                placeholder="Enter your Company Name"
                                                                value={customerInvoice?.user?.profile?.company_name}
                                                                disabled={true}
                                                            />
                                                            <LabelledTextField
                                                                label="Phone Number"
                                                                placeholder="Enter your Phone Number"
                                                                value={customerInvoice?.user?.profile?.phone}
                                                                disabled={true}
                                                            />
                                                            <LabelledTextField
                                                                label="Email"
                                                                placeholder="Enter your email.."
                                                                value={customerInvoice?.user?.email}
                                                                disabled={true}
                                                            />
                                                        </div>
                                                        <div className="py-2">
                                                            {/* Customer Address Section */}
                                                            <div className="flex flex-col gap-2">
                                                                <div className="flex items-center flex-row gap-2 py-[10px]">
                                                                    <Typography color="natural.900" fontSize={18} fontWeight={600}>
                                                                        Address Details
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-4 w-full font-semibold">
                                                                <LabelledTextField
                                                                    label="Address 1"
                                                                    placeholder="Enter your Address"
                                                                    value={customerInvoice?.pickup_location?.street_address}
                                                                    disabled={true}
                                                                />
                                                                <LabelledTextField
                                                                    label="Address 2"
                                                                    placeholder="Enter your Address"
                                                                    value={customerInvoice?.pickup_location?.full_address}
                                                                    disabled={true}
                                                                />
                                                                <LabelledTextField
                                                                    label="City"
                                                                    placeholder="Enter your City"
                                                                    value={customerInvoice?.pickup_location?.city}
                                                                    disabled={true}
                                                                />
                                                                <LabelledTextField
                                                                    label="State"
                                                                    placeholder="Enter your State"
                                                                    value={customerInvoice?.pickup_location?.state}
                                                                    disabled={true}
                                                                />
                                                                <LabelledTextField
                                                                    label="Country"
                                                                    placeholder="Enter your Country"
                                                                    value={customerInvoice?.pickup_location?.country}
                                                                    disabled={true}
                                                                />
                                                                <LabelledTextField
                                                                    label="Zip Code"
                                                                    placeholder="Enter your Zip Code"
                                                                    value={customerInvoice?.pickup_location?.zip_code}
                                                                    disabled={true}
                                                                />
                                                            </div>
                                                        </div>
                                                    </CollapsibleContent>
                                                </Collapsible>
                                            </CardComponent>
                                    )}
                                    <div className="md:hidden text-center flex flex-row gap-4 items-center justify-center mt-[40px]">
                                        <Button variant="outline" size="lg" className=" rounded-[8px] bg-[#213E7B1F] text-[#213E7B] px-[13px] hover:bg-[#213E7B1F]/20 hover:text-[#213E7B]">
                                            <img src={DownloadInvoiceIcon} alt="Download Invoice" className="h-[16.25px] w-[16.25px]" />
                                            <span className="font-semibold text-sm">Download <span className="hidden md:inline">PDF Invoice</span></span>
                                        </Button>
                                        {warehouseData === undefined && (
                                            <Button type="submit" form="invoice-shipper-form" size="lg" className="rounded-[8px] bg-[#37A672] hover:bg-[#37A672]/90 text-white gap-[5.62px] px-[14px]" >
                                                <img src={SaveIcon} alt="Save Document" className="h-[8.75px] w-[10.42px]" />
                                                <span className="font-semibold text-sm">Save <span className="hidden md:inline">Document</span></span>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
};

export default Invoice;
