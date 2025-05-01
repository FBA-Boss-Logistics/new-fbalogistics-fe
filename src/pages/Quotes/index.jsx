import {
    Typography,
    Checkbox,
    FormControlLabel,
    FormHelperText,
} from "@mui/material";
import { useState, useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { LabelledTextField } from "components";
import * as yup from "yup";
import { CommonFormValidations } from "components/Form/CommonFormValidations";
import { useFieldArray, useForm } from "react-hook-form";
import BorderButton from "components/BorderButton";
import DatePicker from "react-multi-date-picker";
import "./calendar.css";
import SubmitModal from "./SubmitModal";
import ComplianceCheckboxes from "./ComplianceCheckboxes";
import { useCreateShipmentQuery } from "queries/Seller";
import { format } from "date-fns";
import HandleErrorResponse from "utils/HandleErrorResponse";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { routes } from "routes/RouteConstants";
import { ChevronRight, Plus, X } from "lucide-react";
import { Button } from "components/ui/button";
import Location from "assets/svg/location.svg";
import Truck from "assets/svg/truck.svg";


const {
    email,
    first_name,
    last_name,
    freight_booking_reference_number,
    full_address,
    supplier_contact_name,

    supplier_contact_phone,
    product_name,
    main_competitor_asin,
    shipment_ready_date,
    detailed_product_description,
} = CommonFormValidations;
const ShipperFormSchema = yup.object().shape({
    email,
    first_name,
    last_name,
    freight_booking_reference_number,
    full_address,
    supplier_contact_name,

    supplier_contact_phone,
    product_name,
    shipment_ready_date,
    main_competitor_asin,
    detailed_product_description,
    packages: yup.array().of(
        yup.object().shape({
            carton_dimensions_length: yup
                .string()
                .trim()
                .required("Carton dimensions length is required"),
            carton_dimensions_width: yup
                .string()
                .trim()
                .required("Carton dimensions width is required"),
            carton_dimensions_height: yup
                .string()
                .trim()
                .required("Carton dimensions height is required"),
            weight_per_carton_kg: yup
                .string()
                .trim()
                .required("Weight per carton (KG) is required"),
            total_cost_of_goods: yup
                .string()
                .trim()
                .required("Total cost of goods is required"),
            number_of_cartons: yup
                .string()
                .trim()
                .required("Total number of cartons is required"),
        })
    ),
    delivery_location: yup.array().of(
        yup.object().shape({
            full_address: yup.string().required("Delivery Address is required"),
        })
    ),

    compliance: yup
        .array()
        .min(1, "At least one shipment contain must be checked."),
});
const complianceOptions = [
    "FDA Certified Product",
    "Wooden / Bamboo / Animal Product",
    "Batteries or Hazardous Materials",
    "Cream / Liquids / Powders",
    "No, my shipment does not contain any of the goods listed",
];

const Quotes = () => {
    const [open, setOpen] = useState(false);

    // queries
    const { mutate: CreateShipment } = useCreateShipmentQuery();

    const handleCloseModal = () => {
        setOpen(false);
    };

    const {
        control,
        register,
        setValue,
        handleSubmit,
        watch,
        setError,
        trigger,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(ShipperFormSchema),
        defaultValues: {
            delivery_location: [
                {
                    formatted_address_delivery: "",
                    full_address: "",
                },
            ],
            packages: [
                {
                    carton_dimensions_length: null,
                    carton_dimensions_width: null,
                    carton_dimensions_height: null,
                    weight_per_carton_kg: null,
                    total_cost_of_goods: null,
                    number_of_cartons: null,
                },
            ],
            compliance: [],
        },
    });

    const { remove: deliveryLocationRemove, append: deliveryLocationAppend } =
        useFieldArray({
            control,
            name: "delivery_location",
        });
    const {
        fields: cargoSetFields,
        append: cargoAppend,
        remove: cargoRemove,
    } = useFieldArray({
        control,
        name: "packages",
    });
    const [isRemoveChecked, setIsRemoveChecked] = useState(true);
    const [isAddChecked, setIsAddChecked] = useState(false);

    const handleTogglePackage = (isChecked) => {
        setIsAddChecked(!isChecked);
        if (isChecked) {
            deliveryLocationAppend({
                full_address: null,
            });
            cargoAppend({
                carton_dimensions_length: null,
                carton_dimensions_width: null,
                carton_dimensions_height: null,
                weight_per_carton_kg: null,
                total_cost_of_goods: null,
                number_of_cartons: null,
            });
        }
    };

    const handleTogglePackageRemove = (isChecked, index) => {
        if (!isChecked && cargoSetFields.length > 1) {
            cargoRemove(index);
            deliveryLocationRemove(index);
            setIsRemoveChecked(true); // Re-check the checkbox after removing
        } else {
            setIsRemoveChecked(true); // Ensure the checkbox stays checked
        }
    };

    // ref
    const {
        ref: refBookingReferenceNumber,
        ...RegisterBookingReferenceNumber
    } = register("freight_booking_reference_number");
    const { ref: refFirstName, ...RegisterFirstName } = register("first_name");
    const { ref: refLastName, ...RegisterLastName } = register("last_name");
    const { ref: refEmail, ...RegisterEmail } = register("email");
    const { ref: refAdditionalNotes, ...RegisterAdditionalNotes } =
        register("additional_notes");
    const { ref: refAdditionalAddress, ...RegisterAdditionalAddress } =
        register("full_address");
    const { ref: refDetailedDescription, ...RegisterDetailedDescription } =
        register("detailed_product_description");
    const { ref: refSupplierName, ...RegisterSupplierName } = register(
        "supplier_contact_name"
    );
    const { ref: refSupplierPhone, ...RegisterSupplierPhone } = register(
        "supplier_contact_phone"
    );
    const { ref: refCompetitorAsin, ...RegisterCompetitorAsin } = register(
        "main_competitor_asin"
    );
    const { ref: refProductName, ...RegisterProductName } =
        register("product_name");
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
        last_name,
    } = watch();
    const handleOpenModal = () => {
        setOpen(true);
    };
    const submitShipperFrom = (formData) => {
        const multipleDeliveryLocation = formData?.delivery_location?.map(
            (item) => {
                return {
                    street_address: null,
                    city: null,
                    state: null,
                    country: null,
                    zip_code: null,
                    latitude: null,
                    longitude: null,
                    place_id: null,
                    full_address: item?.full_address,
                };
            }
        );

        const multiplePackages = formData?.packages?.map((item, index) => {
            return {
                carton_dimensions_length: parseInt(
                    item?.carton_dimensions_length
                ),
                carton_dimensions_width: parseInt(
                    item?.carton_dimensions_width
                ),
                carton_dimensions_height: parseInt(
                    item?.carton_dimensions_height
                ),
                weight_per_carton_kg: parseInt(item?.weight_per_carton_kg),
                total_cost_of_goods: parseInt(item?.total_cost_of_goods),
                number_of_cartons: parseInt(item?.number_of_cartons),
                delivery_location: multipleDeliveryLocation[index].full_address,
            };
        });

        const payload = {
            freight_booking_reference_number:
                formData?.freight_booking_reference_number,
            shipment_ready_date:
                formData?.shipment_ready_date &&
                format(new Date(formData?.shipment_ready_date), "yyyy-MM-dd"),
            supplier_contact_name: formData?.supplier_contact_name,
            supplier_contact_phone: formData?.supplier_contact_phone,
            product_name: formData?.product_name,
            main_competitor_asin: formData?.main_competitor_asin,
            pickup_location: {
                street_address: null,
                city: null,
                state: null,
                country: null,
                zip_code: null,
                latitude: null,
                longitude: null,
                place_id: null,
                full_address: formData?.full_address,
            },
            // delivery_location: multipleDeliveryLocation,
            packages: multiplePackages,
            compliance: {
                detailed_product_description:
                    formData?.detailed_product_description,
                compliance: formData?.compliance?.map((complianceData) => {
                    return complianceData;
                }),
                additional_notes: formData?.additional_notes,
            },
            contact_information: {
                first_name: formData?.first_name,
                last_name: formData?.last_name,
                email: formData?.email,
            },
        };
        CreateShipment(payload, {
            onSuccess: () => {
                queryClient.invalidateQueries(["FETCH_SELLER_SHIPMENT_INFO"]);
                handleOpenModal();
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
        handleChangeValue(`packages.${index}.${keyName}`, e.target.value);
        trigger(`packages.${index}.${keyName}`);
    };
    const handleAdditinalAddress = (address, index) => {
        handleChangeValue(`delivery_location.${index}.full_address`, address, {
            shouldValidate: true,
        });
    };

    const handleErrors = (error) => {
        console.log(error, "error");
    };

    const originFilled = useMemo(
        () =>
            full_address &&
            supplier_contact_name &&
            delivery_location?.[0]?.full_address &&
            supplier_contact_phone,
        [
            supplier_contact_name,
            delivery_location?.[0]?.full_address,
            full_address,
            supplier_contact_phone,
        ]
    );

    const cargoFilled = useMemo(
        () =>
            product_name &&
            main_competitor_asin &&
            packages?.[0]?.carton_dimensions_length &&
            packages?.[0]?.carton_dimensions_width &&
            packages?.[0]?.carton_dimensions_height &&
            packages?.[0]?.weight_per_carton_kg &&
            packages?.[0]?.total_cost_of_goods &&
            packages?.[0]?.number_of_cartons,

        [
            main_competitor_asin,
            packages?.[0]?.carton_dimensions_length,
            packages?.[0]?.carton_dimensions_width,
            packages?.[0]?.carton_dimensions_height,
            packages?.[0]?.weight_per_carton_kg,
            packages?.[0]?.total_cost_of_goods,
            packages?.[0]?.number_of_cartons,
            product_name,
        ]
    );

    const complianceFilled = useMemo(
        () => compliance?.[0] && detailed_product_description,
        [compliance?.[0], detailed_product_description]
    );

    const contactInfoFilled = useMemo(
        () => email && first_name && last_name,
        [email, first_name, last_name]
    );

    return (    
        <div>
            {/* <div className="py-4">
                <TopNavBar />
            </div> */}
            <div className="flex flex-row justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-zinc-800 mb-2">New Shipment</h1>
                    <div className="flex items-center text-sm">
                    <Link to={routes.SELLERDASHBOARD.pathname} className="text-blue-600 hover:underline">
                        Dashboard
                    </Link>
                    <ChevronRight className="h-4 w-4 inline" />
                    <span className="text-gray-500">New Shipment</span>
                    </div>
                </div>
                <div>
                    <Button asChild variant="outline" className="border-2 font-semibold border-gray-400 text-gray-500">
                        <Link to={routes.SELLERDASHBOARD.pathname}>
                            <X className="h-4 w-4" />
                            Cancel
                        </Link>
                    </Button>
                </div>
            </div>
            {/* <div className="px-32 py-8 flex bg-natural-50 border border-solid border-natural-100 justify-center">
                <div className="w-64">
                    <div
                        className={`h-1 bg-natural-200 mb-2.5 ${
                            originFilled ? "bg-primary-500" : "bg-natural-200"
                        }`}
                    ></div>
                    <Typography
                        color={originFilled ? "primary.500" : "natural.700"}
                        variant="body2"
                        fontWeight={500}
                    >
                        Origin and Destination
                    </Typography>

                    <Typography
                        color={originFilled ? "primary.500" : "natural.500"}
                        variant="body2"
                        fontWeight={500}
                    >
                        Please provide your Origin and Destination
                    </Typography>
                </div>

                <div className="w-72">
                    <div
                        className={`h-1 bg-natural-200 mb-2.5 ${
                            cargoFilled ? "bg-primary-500" : "bg-natural-200"
                        }`}
                    ></div>
                    <Typography
                        color={cargoFilled ? "primary.500" : "natural.700"}
                        variant="body2"
                        fontWeight={500}
                    >
                        Cargo
                    </Typography>

                    <Typography
                        color={cargoFilled ? "primary.500" : "natural.500"}
                        variant="body2"
                        fontWeight={500}
                    >
                        Please provide your Cargo Details
                    </Typography>
                </div>

                <div className="w-72">
                    <div
                        className={`h-1 bg-natural-200 mb-2.5 ${
                            complianceFilled
                                ? "bg-primary-500"
                                : "bg-natural-200"
                        }`}
                    ></div>
                    <Typography
                        color={complianceFilled ? "primary.500" : "natural.700"}
                        variant="body2"
                        fontWeight={500}
                    >
                        Compliance
                    </Typography>

                    <Typography
                        color={complianceFilled ? "primary.500" : "natural.500"}
                        variant="body2"
                        fontWeight={500}
                    >
                        Please provide your name and email
                    </Typography>
                </div>

                <div className="w-80">
                    <div
                        className={`h-1 bg-natural-200 mb-2.5 ${
                            contactInfoFilled
                                ? "bg-primary-500"
                                : "bg-natural-200"
                        }`}
                    ></div>
                    <Typography
                        color={
                            contactInfoFilled ? "primary.500" : "natural.700"
                        }
                        variant="body2"
                        fontWeight={500}
                    >
                        Contact Information
                    </Typography>

                    <Typography
                        color={
                            contactInfoFilled ? "primary.500" : "natural.500"
                        }
                        variant="body2"
                        fontWeight={500}
                    >
                        Please provide your name and email
                    </Typography>
                </div>
            </div> */}

            <div className="">
                <form onSubmit={handleSubmit(submitShipperFrom, handleErrors)}>
                    <div className=" border border-solid border-natural-200 overflow-y-auto rounded-xl mt-8 p-4 ">
                        <div className="bg-natural-25 p-4 rounded-xl">
                            <div>
                                <div className="flex flex-col gap-8">
                                    <div className="flex gap-4 mb-6 font-semibold">
                                        <LabelledTextField
                                            label="Freight Booking Reference Number*"
                                            placeholder="This number is user assigned, IE: March 3 Jade Roller"
                                            className=" "
                                            inputRef={refBookingReferenceNumber}
                                            {...RegisterBookingReferenceNumber}
                                            error={Boolean(
                                                errors.freight_booking_reference_number
                                            )}
                                            autoComplete="new-reference"
                                            helperText={
                                                errors.freight_booking_reference_number &&
                                                errors
                                                    .freight_booking_reference_number
                                                    .message
                                            }
                                        />
                                        <div className="w-full">
                                            <Typography className="pb-[3px]" fontWeight={600}>
                                            Pick up date
                                            </Typography>
                                            <DatePicker
                                                minDate={new Date()}
                                                placeholder="Enter Date"
                                                format="MM/DD/YYYY"
                                                onChange={(date) => {
                                                    handleChangeValue(
                                                        "shipment_ready_date",
                                                        date
                                                    );
                                                }}
                                                value={shipment_ready_date}
                                            />
                                            {errors.shipment_ready_date && (
                                                <FormHelperText error>
                                                    {
                                                        errors
                                                            .shipment_ready_date
                                                            .message
                                                    }
                                                </FormHelperText>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                    <div className="flex items-center flex-row gap-2">
                                            <div className="bg-natural-200 rounded-full">
                                                <img src={Location} alt="location" />
                                            </div>
                                        <Typography fontSize={18} fontWeight={600} variant="body2" color="natural.900">
                                            Origin and Destination
                                        </Typography>
                                    </div>

                                        <div className="my-1">
                                            <LabelledTextField
                                                label="Please Provide The Complete Factory Pickup Address"
                                                className="my-4"
                                                placeholder="Address..*"
                                                inputRef={refAdditionalAddress}
                                                {...RegisterAdditionalAddress}
                                                error={errors.full_address}
                                                helperText={
                                                    errors.full_address?.message
                                                }
                                                autoComplete="new-reference-address"
                                            />
                                        </div>

                                        <div className="flex gap-4 my-4">
                                            <LabelledTextField
                                                label="Supplier Contact Name"
                                                placeholder="Name"
                                                inputRef={refSupplierName}
                                                {...RegisterSupplierName}
                                                error={Boolean(
                                                    errors.supplier_contact_name
                                                )}
                                                autoComplete="new-name"
                                                helperText={
                                                    errors.supplier_contact_name &&
                                                    errors.supplier_contact_name
                                                        .message
                                                }
                                            />
                                            <LabelledTextField
                                                label="Supplier Contact Phone Number"
                                                placeholder="Phone number"
                                                autoComplete="new-phone"
                                                inputRef={refSupplierPhone}
                                                {...RegisterSupplierPhone}
                                                error={Boolean(
                                                    errors.supplier_contact_phone
                                                )}
                                                helperText={
                                                    errors.supplier_contact_phone &&
                                                    errors
                                                        .supplier_contact_phone
                                                        .message
                                                }
                                            />
                                        </div>

                                        <div className="mt-8">
                                            {/* <Typography
                                                variant="h5"
                                                fontFamily="Sora"
                                                fontWeight={400}
                                                color="natural.800"
                                            >
                                                Delivery Location
                                            </Typography> */}
                                            <div>
                                                <div className="my-1">
                                                    <LabelledTextField
                                                        label="Amazon Warehouse Address"
                                                        placeholder="Ship to address from your amazon shipping plan, including warehouse number"
                                                        className="my-4"
                                                        autoComplete="new-warehouse-address"
                                                        error={Boolean(
                                                            Array.isArray(
                                                                errors?.delivery_location
                                                            ) &&
                                                                errors
                                                                    .delivery_location[0]
                                                                    ?.full_address
                                                        )}
                                                        helperText={
                                                            Array.isArray(
                                                                errors?.delivery_location
                                                            ) &&
                                                            errors
                                                                .delivery_location[0]
                                                                ?.full_address &&
                                                            errors
                                                                .delivery_location[0]
                                                                ?.full_address
                                                                .message
                                                        }
                                                        onChange={(e) =>
                                                            handleAdditinalAddress(
                                                                e.target.value,
                                                                0
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* {deliveryLocationSetFields?.length <
                                            3 && (
                                            <div className="flex gap-4 items-center mt-6">
                                                <Typography
                                                    fontSize={18}
                                                    fontWeight={500}
                                                    color="natural.700"
                                                >
                                                    Shipping to multiple
                                                    warehouses?
                                                </Typography>

                                                <div>
                                                    <Button
                                                        variant="natural-200"
                                                        fullWidth
                                                        onClick={() =>
                                                            append({
                                                                formatted_address_delivery:
                                                                    "",
                                                            })
                                                        }
                                                    >
                                                        Click here
                                                    </Button>
                                                </div>
                                            </div>
                                        )} */}
                                    </div>

                                    <div>
                                    <div className="flex-col gap-2">
                                        <div className="flex items-center flex-row gap-2">
                                                <div className="bg-natural-200 rounded-full w-[30px]">
                                                    <img src={Truck} alt="truck" />
                                                </div>
                                        <Typography color="natural.900" fontSize={18} fontWeight={500}>
                                            Cargo
                                        </Typography>
                                        </div>
                                    </div>
                                        <div className="flex gap-4 my-4 ">
                                            <LabelledTextField
                                                label="Product Name*"
                                                placeholder="Product name"
                                                inputRef={refProductName}
                                                {...RegisterProductName}
                                                value={product_name}
                                                error={Boolean(
                                                    errors.product_name
                                                )}
                                                autoComplete="new-product-name"
                                                helperText={
                                                    errors.product_name &&
                                                    errors.product_name.message
                                                }
                                            />
                                            <LabelledTextField
                                                label="Main competitor ASIN*"
                                                placeholder="ASIN"
                                                type="text"
                                                inputRef={refCompetitorAsin}
                                                {...RegisterCompetitorAsin}
                                                value={main_competitor_asin}
                                                error={Boolean(
                                                    errors.main_competitor_asin
                                                )}
                                                autoComplete="new-asin"
                                                helperText={
                                                    errors.main_competitor_asin &&
                                                    errors.main_competitor_asin
                                                        .message
                                                }
                                            />
                                        </div>

                                        <div className="flex gap-4 my-4 w-1/2">
                                                    <LabelledTextField
                                                        label="Amazon Warehouse Address"
                                                        placeholder="Enter Address"
                                                        className="my-4 w-1/2"
                                                        autoComplete="new-warehouse-address"
                                                        error={Boolean(
                                                            Array.isArray(
                                                                errors?.delivery_location
                                                            ) &&
                                                                errors
                                                                    .delivery_location[0]
                                                                    ?.full_address
                                                        )}
                                                        helperText={
                                                            Array.isArray(
                                                                errors?.delivery_location
                                                            ) &&
                                                            errors
                                                                .delivery_location[0]
                                                                ?.full_address &&
                                                            errors
                                                                .delivery_location[0]
                                                                ?.full_address
                                                                .message
                                                        }
                                                        onChange={(e) =>
                                                            handleAdditinalAddress(
                                                                e.target.value,
                                                                0
                                                            )
                                                        }
                                                    />
                                        </div>
                                        
                                        {cargoSetFields?.map((field, index) => {
                                            return (
                                                <div key={index}>
                                                    {index > 0 &&
                                                        cargoSetFields?.length >
                                                            1 && (
                                                            <div>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={
                                                                                isRemoveChecked
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                handleTogglePackageRemove(
                                                                                    e
                                                                                        .target
                                                                                        .checked,
                                                                                    index
                                                                                )
                                                                            }
                                                                        />
                                                                    }
                                                                    label="Add another Amazon warehouse"
                                                                />
                                                            </div>
                                                        )}

                                                   
                                                    <div className="flex gap-4 mt-8">
                                                        <LabelledTextField
                                                            label="Carton Dimensions (CM)"
                                                            placeholder="Length"
                                                            type="number"
                                                            autoComplete="new-carton-dimensions-length"
                                                            onChange={(e) => {
                                                                handleCargoField(
                                                                    e,
                                                                    index,
                                                                    "carton_dimensions_length"
                                                                );
                                                            }}
                                                            value={
                                                                field?.carton_dimensions_length
                                                            }
                                                            error={Boolean(
                                                                Array.isArray(
                                                                    errors?.packages
                                                                ) &&
                                                                    errors
                                                                        .packages[
                                                                        index
                                                                    ]
                                                                        ?.carton_dimensions_length
                                                            )}
                                                            helperText={
                                                                Array.isArray(
                                                                    errors?.packages
                                                                ) &&
                                                                errors.packages[
                                                                    index
                                                                ]
                                                                    ?.carton_dimensions_length &&
                                                                errors.packages[
                                                                    index
                                                                ]
                                                                    ?.carton_dimensions_length
                                                                    .message
                                                            }
                                                        />

                                                        <LabelledTextField
                                                            label=" "
                                                            placeholder="Width"
                                                            className="  mt-6"
                                                            type="number"
                                                            onChange={(e) => {
                                                                handleCargoField(
                                                                    e,
                                                                    index,
                                                                    "carton_dimensions_width"
                                                                );
                                                            }}
                                                            autoComplete="new-carton-dimensions-width"
                                                            value={
                                                                field?.carton_dimensions_width
                                                            }
                                                            error={Boolean(
                                                                Array.isArray(
                                                                    errors?.packages
                                                                ) &&
                                                                    errors
                                                                        .packages[
                                                                        index
                                                                    ]
                                                                        ?.carton_dimensions_width
                                                            )}
                                                            helperText={
                                                                Array.isArray(
                                                                    errors?.packages
                                                                ) &&
                                                                errors.packages[
                                                                    index
                                                                ]
                                                                    ?.carton_dimensions_width &&
                                                                errors.packages[
                                                                    index
                                                                ]
                                                                    ?.carton_dimensions_width
                                                                    .message
                                                            }
                                                        />

                                                        <LabelledTextField
                                                            label=" "
                                                            placeholder="height"
                                                            type="number"
                                                            className="  mt-6"
                                                            onChange={(e) => {
                                                                handleCargoField(
                                                                    e,
                                                                    index,
                                                                    "carton_dimensions_height"
                                                                );
                                                            }}
                                                            autoComplete="new-carton-dimensions-height"
                                                            value={
                                                                field?.carton_dimensions_height
                                                            }
                                                            error={Boolean(
                                                                Array.isArray(
                                                                    errors?.packages
                                                                ) &&
                                                                    errors
                                                                        .packages[
                                                                        index
                                                                    ]
                                                                        ?.carton_dimensions_height
                                                            )}
                                                            helperText={
                                                                Array.isArray(
                                                                    errors?.packages
                                                                ) &&
                                                                errors.packages[
                                                                    index
                                                                ]
                                                                    ?.carton_dimensions_height &&
                                                                errors.packages[
                                                                    index
                                                                ]
                                                                    ?.carton_dimensions_height
                                                                    .message
                                                            }
                                                        />

                                                        <LabelledTextField
                                                            label="Weight Per Carton (KG)"
                                                            placeholder="Kg"
                                                            type="number"
                                                            onChange={(e) => {
                                                                handleCargoField(
                                                                    e,
                                                                    index,
                                                                    "weight_per_carton_kg"
                                                                );
                                                            }}
                                                            autoComplete="new-weight-per-carton-kg"
                                                            value={
                                                                field?.weight_per_carton_kg
                                                            }
                                                            error={Boolean(
                                                                Array.isArray(
                                                                    errors?.packages
                                                                ) &&
                                                                    errors
                                                                        .packages[
                                                                        index
                                                                    ]
                                                                        ?.weight_per_carton_kg
                                                            )}
                                                            helperText={
                                                                Array.isArray(
                                                                    errors?.packages
                                                                ) &&
                                                                errors.packages[
                                                                    index
                                                                ]
                                                                    ?.weight_per_carton_kg &&
                                                                errors.packages[
                                                                    index
                                                                ]
                                                                    ?.weight_per_carton_kg
                                                                    .message
                                                            }
                                                        />
                                                    </div>
                                                     {index > 0 && (
                                                        <div
                                                            key={index}
                                                            className="flex gap-4 my-4 w-1/2"
                                                        >
                                                            <LabelledTextField
                                                                label="Amazon Warehouse Address"
                                                                placeholder="Enter Address"
                                                                className="my-4"
                                                                autoComplete="new-warehouse-address"
                                                                error={Boolean(
                                                                    Array.isArray(
                                                                        errors?.delivery_location
                                                                    ) &&
                                                                        errors
                                                                            .delivery_location[
                                                                            index
                                                                        ]
                                                                            ?.full_address
                                                                )}
                                                                helperText={
                                                                    Array.isArray(
                                                                        errors?.delivery_location
                                                                    ) &&
                                                                    errors
                                                                        .delivery_location[
                                                                        index
                                                                    ]
                                                                        ?.full_address &&
                                                                    errors
                                                                        .delivery_location[
                                                                        index
                                                                    ]
                                                                        ?.full_address
                                                                        .message
                                                                }
                                                                onChange={(e) =>
                                                                    handleAdditinalAddress(
                                                                        e.target
                                                                            .value,
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    )}

                                                    <div className="flex gap-4 my-4 ">
                                                        <LabelledTextField
                                                            label="Total Cost of Goods"
                                                            placeholder="$"
                                                            type="number"
                                                            onChange={(e) => {
                                                                handleCargoField(
                                                                    e,
                                                                    index,
                                                                    "total_cost_of_goods"
                                                                );
                                                            }}
                                                            autoComplete="new-total-cost-of-goods"
                                                            value={
                                                                field?.total_cost_of_goods
                                                            }
                                                            error={Boolean(
                                                                Array.isArray(
                                                                    errors?.packages
                                                                ) &&
                                                                    errors
                                                                        .packages[
                                                                        index
                                                                    ]
                                                                        ?.total_cost_of_goods
                                                            )}
                                                            helperText={
                                                                Array.isArray(
                                                                    errors?.packages
                                                                ) &&
                                                                errors.packages[
                                                                    index
                                                                ]
                                                                    ?.total_cost_of_goods &&
                                                                errors.packages[
                                                                    index
                                                                ]
                                                                    ?.total_cost_of_goods
                                                                    .message
                                                            }
                                                        />
                                                        <LabelledTextField
                                                            label="# of Cartons"
                                                            placeholder="No."
                                                            type="number"
                                                            onChange={(e) => {
                                                                handleCargoField(
                                                                    e,
                                                                    index,
                                                                    "number_of_cartons"
                                                                );
                                                            }}
                                                            value={
                                                                field?.number_of_cartons
                                                            }
                                                            autoComplete="new-number-of-cartons"
                                                            error={Boolean(
                                                                Array.isArray(
                                                                    errors?.packages
                                                                ) &&
                                                                    errors
                                                                        .packages[
                                                                        index
                                                                    ]
                                                                        ?.number_of_cartons
                                                            )}
                                                            helperText={
                                                                Array.isArray(
                                                                    errors?.packages
                                                                ) &&
                                                                errors.packages[
                                                                    index
                                                                ]
                                                                    ?.number_of_cartons &&
                                                                errors.packages[
                                                                    index
                                                                ]
                                                                    ?.number_of_cartons
                                                                    .message
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {cargoSetFields?.length < 5 && (
                                            <div>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={
                                                                isAddChecked
                                                            }
                                                            onChange={(e) =>
                                                                handleTogglePackage(
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    }
                                                    label="Add another Amazon warehouse"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <Typography
                                            variant="h5"
                                            fontFamily="Sora"
                                            fontWeight={400}
                                            color="natural.800"
                                        >
                                            Compliance
                                        </Typography>

                                        <LabelledTextField
                                            label="Detailed product description"
                                            placeholder="Product description will be used to ensure proper tariff calculation and import rates."
                                            className=" my-4"
                                            multiline
                                            rows={3}
                                            inputRef={refDetailedDescription}
                                            {...RegisterDetailedDescription}
                                            error={Boolean(
                                                errors.detailed_product_description
                                            )}
                                            autoComplete="new-detailed-description"
                                            helperText={
                                                errors.detailed_product_description &&
                                                errors
                                                    .detailed_product_description
                                                    .message
                                            }
                                        />

                                        <div>
                                            <Typography
                                                variant="h6"
                                                fontFamily="Sora"
                                                color="natural.800"
                                                fontWeight={600}
                                            >
                                                Does your shipment contain any
                                                of the following goods?
                                            </Typography>

                                            <div className="flex flex-col">
                                                <ComplianceCheckboxes
                                                    options={complianceOptions}
                                                    setValue={setValue}
                                                    compliance={compliance}
                                                    errors={errors}
                                                    trigger={trigger}
                                                />

                                                <LabelledTextField
                                                    placeholder="Additional Notes"
                                                    className=" my-4"
                                                    multiline
                                                    rows={4}
                                                    inputRef={
                                                        refAdditionalNotes
                                                    }
                                                    {...RegisterAdditionalNotes}
                                                    // error={Boolean(
                                                    //     errors.additional_notes
                                                    // )}
                                                    autoComplete="new-additional-notes"
                                                    // helperText={
                                                    //     errors.additional_notes &&
                                                    //     errors.additional_notes
                                                    //         .message
                                                    // }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <Typography
                                            variant="h5"
                                            fontFamily="Sora"
                                            fontWeight={400}
                                            color="natural.800"
                                        >
                                            Contact Information
                                        </Typography>

                                        <div className="flex gap-4 my-4 ">
                                            <LabelledTextField
                                                label="First Name*"
                                                placeholder="Enter your first name"
                                                inputRef={refFirstName}
                                                {...RegisterFirstName}
                                                error={Boolean(
                                                    errors.first_name
                                                )}
                                                helperText={
                                                    errors.first_name &&
                                                    errors.first_name.message
                                                }
                                                autoComplete="new-first-name"
                                            />
                                            <LabelledTextField
                                                label="Last Name*"
                                                placeholder="Enter your last name"
                                                inputRef={refLastName}
                                                {...RegisterLastName}
                                                error={Boolean(
                                                    errors.last_name
                                                )}
                                                helperText={
                                                    errors.last_name &&
                                                    errors.last_name.message
                                                }
                                                autoComplete="new-last-name"
                                            />
                                        </div>

                                        <LabelledTextField
                                            label="Email*"
                                            placeholder="Enter your email.."
                                            className="my-4"
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
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="my-8 text-center flex flex-col items-center ">
                        <div className="min-w-[352px] mb-6">
                            <BorderButton
                                variant="contained-outlined"
                                size="large"
                                fullWidth
                                type="submit"
                            >
                                {" "}
                                Submit{" "}
                            </BorderButton>
                        </div>

                        <Typography
                            fontSize={18}
                            fontWeight={400}
                            color="secondary.900"
                            className="underline"
                        >
                            Terms of Service
                        </Typography>
                    </div>
                    <SubmitModal open={open} handleClose={handleCloseModal} />
                </form>
            </div>
        </div>
    );
};

export default Quotes;
