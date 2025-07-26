import {
    Typography,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { LabelledTextField } from "components";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import HandleErrorResponse from "utils/HandleErrorResponse";
import { useParams } from "react-router-dom";
import { Button } from "components/ui/button";
import CardComponent from "components/Dashboard/OrderStatus/CardComponent";
import warehouseIcon from "assets/svg/warehouse.svg";
import HandleSuccessResponse from "utils/HandleSuccessResponse";
import { fetchAllWarehouseDetailApi, UpdateWarehousebyPatchApi, updateWarehousePodDocumentApi, deleteWarehouseDocumentApi, UpdateWarehouseTrackingNumberApi } from "queries/Shipper";
import Loader from "components/Loader";
import TrackingStatus from "../Tracking";
import DocumentIcon from "assets/svg/DocumentIcon.svg";
import { FiDownload } from "react-icons/fi";
import ModalComponent from "components/New/ModalComponent";

const TrackingFormSchema = yup.object().shape({
    pod_document: yup.string().required("Pod document is required"),
    tracking_number: yup.string().required("Tracking number is required"),
});

const Tracking = () => {
    const { id } = useParams();
    const { data: WarehousesData, isLoading: isWarehousesLoading } = fetchAllWarehouseDetailApi(id);
    const { mutate: UpdateWarehouse} = UpdateWarehousebyPatchApi();
    const { mutate: UpdateWarehouseTrackingNumber } = UpdateWarehouseTrackingNumberApi();
    const { mutate: UpdateWarehousePodDocument } = updateWarehousePodDocumentApi();
    const { mutate: DeleteWarehouseDocument } = deleteWarehouseDocumentApi();
    const warehouseData = WarehousesData?.data?.data
    console.log(warehouseData, "warehouseDataInTracking")

    const [files, setFiles] = useState({});
    const [warehouseId, setWarehouseId] = useState(null)

    useEffect(() => {
        if (warehouseData) {
          const updatedValues = warehouseData.map((item) => ({
            id: item?.id,
            shipment: id,
            tracking_number: item?.tracking_number || "",
          }));
          setValue("warehouses", updatedValues);
        }
    }, [warehouseData]);

    const fileInputRef = useRef();
      
    const triggerFileInput = (id) => {
        const input = document.getElementById(`fileInput-${id}`);
        if (input && !files[id]) {
            input.click();
        }
        setWarehouseId(id);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFiles((prevFiles) => ({
                ...prevFiles,
                [warehouseId]: droppedFile,
            }));
        }
    };

    const handleFileInput = (e, warehouseId) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFiles((prevFiles) => ({
                ...prevFiles,
                [warehouseId]: selectedFile,
            }));
        }
        e.target.value = ""; // reset input
    };

    const removeFile = (id) => {
        setFiles((prevFiles) => {
            const { [id]: _, ...rest } = prevFiles;
            return rest;
        });

        const input = document.getElementById(`fileInput-${id}`);
        if (input) input.value = "";
    };

    const handleUploadFile = (warehouseId) => {
        const fileToUpload = files[warehouseId];
        if (!fileToUpload) return;
    
        const formData = new FormData();
        formData.append("pod_document", fileToUpload);
    
        UpdateWarehousePodDocument(
            { id: warehouseId, formData },
            {
                onSuccess: () => {
                    HandleSuccessResponse({ message: "Warehouse document uploaded successfully" });
                },
                onError: (err) => {
                    HandleErrorResponse(err, setError);
                },
            }
        );
    };
    

    const handleDeleteFile = () => {
        DeleteWarehouseDocument(warehouseId, {
            onSuccess: () => {
                HandleSuccessResponse({message: "Warehouse document deleted successfully"});
                setOpenModalDelete(false)
            },
            onError: (err) => {
                HandleErrorResponse(err, setError);
            },
        });
    }

    const downloadFile = (fileUrl) => {
        if (!fileUrl) return;
        const fullUrl = fileUrl.startsWith("http")
            ? fileUrl
            : `${process.env.REACT_APP_API_BASE_URL}${fileUrl}`;
        
        const link = document.createElement("a");
        link.href = fullUrl;
        link.setAttribute("download", "");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // set active input
    const [activeTrackingIndex, setActiveTrackingIndex] = useState(null);

    // Status
    const [status, setStatus] = useState(null)

    // Modal
    const [openModal, setOpenModal] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)

    const handleCloseModal= () => {
        setOpenModal(false)
        setStatus(null)
    }

    const handleCloseModalDelete = () => {
        setOpenModalDelete(false)
    }

    const {
        control,
        setValue,
        setError,
        register,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(TrackingFormSchema),
        defaultValues: {
            warehouses: [
                {
                    id: null,
                    shipment: id,
                    tracking_number: null,
                    tracking_link: null,
                },
            ],
        },
    });

    // ref
    const { ref: refTrackingNumber, ...RegisterTrackingNumber } = register("tracking_number");

    const extractFileName = (url) => {
        if (!url) return "";
        const parts = url.split("/");
        return parts[parts.length - 1]; // returns just the file name
    };

    const handleChangeStatus = () => {
        console.log("selected status", status)
        console.log("warehouse id", warehouseId)
        UpdateWarehouse({
            id: warehouseId,
            status: status === "Shipment Picked Up" ? "Warehouse Picked Up" : status === "Completed" ? "Warehouse Completed" : "Warehouse Pending",
        }, {
            onSuccess: () => {
                HandleSuccessResponse({message: "Warehouse status updated successfully"});
                setOpenModal(false)
            },
            onError: (err) => {
                HandleErrorResponse(err, setError);
            },
        });
    }

    const handleSubmitTracking = (warehouseId) => {
        const warehouses = getValues("warehouses");
        const currentWarehouse = warehouses.find((w) => w.id === warehouseId);
        
        if (!currentWarehouse?.tracking_number) {
            console.warn("Tracking number is empty!");
            return;
        }
    
        console.log("Submitting tracking number", currentWarehouse.tracking_number);
    
        UpdateWarehouseTrackingNumber({
            id: warehouseId,
            tracking_number: currentWarehouse.tracking_number,
        }, {
            onSuccess: () => {
                HandleSuccessResponse({ message: "Tracking number saved!" });
            },
            onError: (err) => {
                HandleErrorResponse(err, setError);
            },
        });
    }

    return (
        <>
            {isWarehousesLoading ? (
                <div className="flex justify-center items-center h-screen w-full">
                    <Loader />
                </div>
            ) : (
                <>
                    {warehouseData.length === 0 ? (
                        <div className="flex justify-center items-center w-full h-[calc(100vh-400px)]">
                            <Typography color="natural.900" fontSize={18} fontWeight={600} className="flex flex-col gap-4 items-center">
                                Shipper has not filled in the warehouse yet, Please wait for the shipper to fill in the warehouse
                            </Typography>
                        </div>
                    ) : (
                        <>
                            <ModalComponent open={openModal} onClose={handleCloseModal} title="Change Status">
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    handleChangeStatus()
                                }} className="flex flex-col h-full gap-4">
                                    Do you want to mark this warehouse as "{status}"?
                                    <div className="flex flex-row gap-4">
                                    <Button
                                        variant="outline"
                                        onClick={handleCloseModal}
                                        size="lg"
                                        className="rounded-[8px] bg-[#213E7B1F] text-[#213E7B] px-[13px] hover:bg-[#213E7B1F]/20 hover:text-[#213E7B]"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="rounded-[8px] bg-[#213E7B1F] text-[#213E7B] px-[13px] hover:bg-[#213E7B1F]/20 hover:text-[#213E7B]"
                                    >
                                        Confirm
                                    </Button>
                                    </div>
                                </form>
                            </ModalComponent>
                            <ModalComponent open={openModalDelete} onClose={handleCloseModalDelete} title="Delete POD Document">
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    handleDeleteFile()
                                }} className="flex flex-col h-full gap-4">
                                    Do you want to delete this POD document?
                                    <div className="flex flex-row gap-4">
                                    <Button
                                        variant="outline"
                                        onClick={handleCloseModalDelete}
                                        size="lg"
                                        className="rounded-[8px] bg-[#213E7B1F] text-[#213E7B] px-[13px] hover:bg-[#213E7B1F]/20 hover:text-[#213E7B]"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="rounded-[8px] bg-[#213E7B1F] text-[#213E7B] px-[13px] hover:bg-[#213E7B1F]/20 hover:text-[#213E7B]"
                                    >
                                        Confirm
                                    </Button>
                                    </div>
                                </form>
                            </ModalComponent>
                            <div className="w-full">
                                <div className="flex flex-col gap-6  font-semibold">
                                    {/* Cargo Section */}
                                    {warehouseData.map((field, index) => {
                                        return (
                                            <CardComponent className="px-6 pt-2" key={index}>
                                                <div className="flex items-center w-full  text-left  rounded-md">
                                                    <div className=" flex md:flex-row flex-col gap-2 justify-between w-full">
                                                        <div className="flex items-center flex-row gap-4 py-[18px]">
                                                            <div className="bg-natural-200 rounded-full w-[30px]">
                                                                <img src={warehouseIcon} alt="truck" />
                                                            </div>
                                                            <div className="flex flex-col gap-[2px]">
                                                                <Typography color="natural.900" fontSize={18} fontWeight={600}>
                                                                    Warehouse#{index + 1}
                                                                </Typography>
                                                                <p className="text-[#667085] text-sm font-normal">
                                                                    Code: {field?.warehouse_code}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <TrackingStatus status={field?.status} />
                                                {!field?.tracking_link ? (
                                                    <div className="flex flex-wrap lg:flex-nowrap gap-4 my-4 md:w-1/2 w-full  font-semibold ">
                                                        <Controller
                                                            control={control}
                                                            name={`warehouses.${index}.tracking_number`}
                                                            render={({ field: controllerField, fieldState }) => (
                                                                <>
                                                                    <LabelledTextField
                                                                            label="Tracking #"
                                                                            placeholder="#"
                                                                            {...controllerField}
                                                                            onFocus={() => setActiveTrackingIndex(index)}
                                                                            onBlur={() => setActiveTrackingIndex(null)}
                                                                            disabled={field?.tracking_number ? true : false}
                                                                            error={!!fieldState.error}
                                                                            helperText={fieldState.error?.message}
                                                                            autoComplete="new-tracking-number"
                                                                            className="gap-[6px] text-sm font-semibold text-[#2E2E2E]"
                                                                        />
                                                                    <div className="relative">
                                                                        {/* Show button only when this input is active */}
                                                                        {activeTrackingIndex === index && (
                                                                            <button
                                                                                type="button"
                                                                                onMouseDown={(e) => {
                                                                                    e.stopPropagation();
                                                                                    handleSubmitTracking(field?.id)
                                                                                }}
                                                                                className="absolute -right-15 top-9 px-3 py-[10px] bg-primary text-white rounded"
                                                                            >
                                                                                Submit
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                </>
                                                            )}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="mt-6">
                                                        <a href={field?.tracking_link} className="text-yellow-500 hover:text-yellow-600 underline">
                                                            <span>{field?.tracking_link}</span>
                                                        </a>
                                                    </div>
                                                )}
                                                <div className="flex flex-col gap-4 my-4 w-full  font-semibold ">
                                                    <div className="space-y-4 w-full flex flex-col gap-4">
                                                        <h2 className="font-semibold text-lg text-[#111827]">Documents</h2>

                                                        {/* File List */}
                                                        {field?.pod_document ? (
                                                        <div className="flex space-y-2">
                                                            <div
                                                                className="flex flex-row gap-3 items-center p-3 rounded-lg border bg-white shadow-sm"
                                                            >
                                                                <div className=" flex flex-row items-center space-x-3">
                                                                    <img src={DocumentIcon} alt="Document" className="text-blue-600 text-xl " />
                                                                    <span className="inline-block font-medium text-sm text-[#111827]
                                                                                    truncate max-w-[100px] sm:max-w-none overflow-hidden whitespace-nowrap">
                                                                        {extractFileName(field?.pod_document)}
                                                                    </span>
                                                                </div>
                                                                <div className="flex flex-row ms-2 items-center space-x-3">
                                                                    <button className="text-gray-600 hover:text-gray-800" onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        downloadFile(field?.pod_document)
                                                                    }}>
                                                                        <FiDownload />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        ) : (
                                                            <span className="text-sm text-gray-800">No document uploaded yet</span>                                                                        
                                                        )}
                                                    </div>
                                                </div>
                                            </CardComponent>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    )
};

export default Tracking;
