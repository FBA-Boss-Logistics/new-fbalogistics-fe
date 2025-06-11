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
import { Card } from "components/ui/card";
import CardComponent from "components/Dashboard/OrderStatus/CardComponent";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react";



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

    const [originOpen, setOriginOpen] = useState(true)
    const [cargoOpen, setCargoOpen] = useState(true)
    const [contactInfoOpen, setContactInfoOpen] = useState(true)
    const [complianceOpen, setComplianceOpen] = useState(true)
    const [cargoCount, setCargoCount] = useState(1);

    const handleAddCargoSetField = () => {
         if(cargoSetFields.length < 10 && cargoCount < 10) {
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
    
    const handleChangeCargoSetField = (e) => {
   //  console.log(e.target.value)
      //   setCargoCount(e.target.value)
        console.log(e.target.value,"e.target.value")
        var currentCount = cargoSetFields.length;
        var newCargoCount = parseInt(e.target.value)
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
            cargoRemove(i);
            deliveryLocationRemove(i);
          }
        }
       
    };
    return (    
        <div>
            {/* <div className="py-4">
                <TopNavBar />
            </div> */}
            <div className="flex flex-row justify-between items-center mb-6">
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
                    <Button asChild variant="outline" className=" border-2 hidden lg:flex font-semibold border-gray-400 text-gray-500">
                        <Link to={routes.SELLERDASHBOARD.pathname}>
                            <X className="h-4 w-4 " />
                            Cancel
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="">
                <form onSubmit={handleSubmit(submitShipperFrom, handleErrors)}>
                
                    <div>
                        <div className="flex flex-col gap-6  font-semibold">
                            {/* Shipment Details Section */}
                            <CardComponent className="px-6 py-2">
                                <div className="flex flex-wrap lg:flex-nowrap gap-4 mb-6 font-semibold">
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
                                    {/* collapsable section */}
                                    <Collapsible open={originOpen} onOpenChange={setOriginOpen}>
                                    <CollapsibleTrigger className="flex items-center w-full  text-left  rounded-md">
                                        <div className="flex items-center flex-row gap-2">
                                                <div className="bg-natural-200 rounded-full">
                                                    <img src={Location} alt="location" />
                                                </div>
                                            <Typography fontSize={18} fontWeight={600} variant="body2" color="natural.900">
                                                Origin and Destination
                                            </Typography>
                                        </div>
                                    <ChevronDown className={`ml-auto h-5 w-5 transition-transform ${originOpen ? "rotate-180" : ""}`} />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
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

                                        <div className="flex flex-wrap lg:flex-nowrap gap-4 ">
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
                                    </CollapsibleContent>
                                    </Collapsible>
                                    
                            </CardComponent>
                            <CardComponent className="px-6 pt-2">
                                 <div className="flex items-center gap-2 my-4 justify-between">
                                     <label htmlFor="cargoCountSelect" className="mr-2">Warehouse quantity:</label>
                                     <select
                                         id="cargoCountSelect"
                                         className="border-2 border-gray-400 text-gray-500 p-1 px-2 rounded-md"
                                         value={cargoCount}
                                         onChange={(e) => handleChangeCargoSetField(e)}
                                     >
                                         {[...Array(10).keys()].map((num) => (
                                             <option key={num + 1} value={num + 1}>
                                                 {num + 1}
                                             </option>
                                         ))}
                                     </select>
                                 </div>
                            </CardComponent>
                            {/* Cargo Section */}
                            <CardComponent className="px-6 pt-2">
                                {/* collapsable section */}
                                    <Collapsible open={cargoOpen} onOpenChange={setCargoOpen}>
                                    <CollapsibleTrigger className="flex items-center w-full  text-left  rounded-md">
                                        <div className="flex items-center flex-row gap-2">
                                                <div className="bg-natural-200 rounded-full w-[30px]">
                                                    <img src={Truck} alt="truck" />
                                                </div>
                                        <Typography color="natural.900" fontSize={18} fontWeight={600}>
                                            Cargo
                                        </Typography>
                                        </div>
                                        
                                    <ChevronDown className={`ml-auto h-5 w-5 transition-transform ${cargoOpen ? "rotate-180" : ""}`} />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                   
                                    <div className="flex flex-wrap lg:flex-nowrap gap-4 my-4 ">
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
               
                                    <div className="flex gap-4  lg:w-1/2">
                                                <LabelledTextField
                                                    label="Amazon Warehouse Address"
                                                    placeholder="Enter Address"
                                                    className=" w-1/2"
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
                                                        <hr className="mt-9" />
                                                    )}
                                                    

                                                
                                                <div className="flex flex-wrap lg:flex-nowrap gap-4 mt-8">
                                                    <LabelledTextField
                                                        label="Carton Lenght"
                                                        placeholder="CM"
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
                                                        label="Carton Width"
                                                        placeholder="CM"
                                                        className="6"
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
                                                        label="Carton Height"
                                                        placeholder="CM"
                                                        type="number"
                                                        className=""
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
                                                        label="Carton Weigth"
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
                                                        className="flex gap-4 my-4 lg:w-1/2"
                                                    >
                                                        <LabelledTextField
                                                            label={`Amazon Warehouse Address (${index + 1})`}
                                                            placeholder="Enter Address"
                                                            className=""
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

                                                <div className="flex flex-wrap lg:flex-nowrap gap-4 my-4 ">
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
                                    </CollapsibleContent>
                                    </Collapsible>
                            {/* complience Section */}
                            </CardComponent>


                            {/* contact information Section */}
                              {/* contact information Section */}
                              <CardComponent className="px-6 py-2">
                                {/* collapsable section */}
                                    <Collapsible open={contactInfoOpen} onOpenChange={setContactInfoOpen}>
                                    <CollapsibleTrigger className="flex items-center w-full  text-left  rounded-md">
                                        <div className="flex-col gap-2 ">
                                            <div className="flex items-center flex-row gap-2">
                                                <div className="bg-natural-200 rounded-full w-[30px]">
                                                    <img src={Location} alt="truck" />
                                                </div>
                                        <Typography color="natural.900" fontSize={18} fontWeight={600}>
                                            Contact Information
                                        </Typography>
                                        </div>
                                    </div>
                                    <ChevronDown className={`ml-auto h-5 w-5 transition-transform ${contactInfoOpen ? "rotate-180" : ""}`} />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                <div className="flex flex-wrap lg:flex-nowrap gap-4 my-4  font-semibold ">
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
                                    className=""
                                    inputRef={refEmail}
                                    {...RegisterEmail}
                                    error={Boolean(errors.email)}
                                    helperText={
                                        errors.email &&
                                        errors.email.message
                                    }
                                    autoComplete="new-email"
                                />
                                </CollapsibleContent>
                                </Collapsible>
                            </CardComponent>
                            <CardComponent className="px-6 py-2">
                                {/* collapsable section */}
                                <Collapsible open={complianceOpen} onOpenChange={setComplianceOpen}>
                                    <CollapsibleTrigger className="flex items-center w-full  text-left  rounded-md">
                                            <div className="flex-col gap-2 ">
                                                <div className="flex items-center flex-row gap-2">
                                                        <div className="bg-natural-200 rounded-full w-[30px]">
                                                            <img src={Truck} alt="truck" />
                                                        </div>
                                                <Typography color="natural.900" fontSize={18} fontWeight={600}>
                                                    Complience
                                                </Typography>
                                                </div>
                                            </div>
                                        <ChevronDown className={`ml-auto h-5 w-5 transition-transform ${complianceOpen ? "rotate-180" : ""}`} />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
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
                                                        placeholder="Add your comments"
                                                        className=""
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
                                    </CollapsibleContent>
                                </Collapsible>
                            </CardComponent>
                          
                        </div>
                    </div>
                 

                    <div className="my-8 text-center lg:text-right lg:items-end flex flex-col gap-4 items-center ">
                            <Button size="lg" className="rounded-full md:w-[242px] w-full" >
                                Submit
                            </Button>
                            <Button asChild variant="outline" size="lg" className=" md:hidden rounded-full border-primary text-primary md:w-[242px] w-full">
                                <Link to={routes.SELLERDASHBOARD.pathname}>
                                <X className="h-4 w-4" />
                                    Cancel
                                </Link>
                            </Button>

                    </div>
                    <SubmitModal open={open} handleClose={handleCloseModal} />
                </form>
            </div>
        </div>
    );
};

export default Quotes;
