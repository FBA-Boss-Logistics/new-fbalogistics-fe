import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CommonFormValidations } from "components/Form/CommonFormValidations";
import { LabelledTextField } from "components";
import { usePostSampleShipmentDetail } from "queries/Seller";
import { useQueryClient } from "@tanstack/react-query";
import HandleSuccessResponse from "utils/HandleSuccessResponse";

const { productName, quantity, address } = CommonFormValidations;
const SampleShipmentFormSchema = yup.object().shape({
    productName,
    quantity,
    address,
});

const CreateSampleShipment = ({ open, onClose }) => {
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(SampleShipmentFormSchema),
        mode: "onChange",
    });
    const { ref: refProductName, ...ProductName } = register("productName");
    const { ref: refQuantity, ...Quantity } = register("quantity");
    const { ref: refAddress, ...Address } = register("address");

    const { mutate: postSampleShipmentDetail } = usePostSampleShipmentDetail();

    const submitHandler = (formData) => {
        const { productName, quantity, address } = formData;
        const data = {
            product_name: productName,
            quantity,
            address,
        };

        postSampleShipmentDetail(data, {
            onSuccess: () => {
                HandleSuccessResponse(data);
                queryClient.invalidateQueries("FETCH_SAMPLE_SHIPMENTS");
                onClose();
            },
        });
    };
    const submitHandlerError = (formData) => {
        console.log("form error :", formData);
    };

    return (
        <div>
            <Dialog
                open={open}
                sx={{
                    zIndex: 99999999999,
                }}
            >
                <DialogTitle>
                    <div className="flex justify-between gap-8">
                        <div className="flex justify-between items-center text-natural-600">
                            <Typography className="text-natural-500 font-medium">
                                Sample Shipment Form
                            </Typography>
                        </div>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent className="min-w-full">
                    <DialogContentText className="mb-2">
                        <form
                            onSubmit={handleSubmit(
                                submitHandler,
                                submitHandlerError
                            )}
                        >
                            <Grid item className="flex flex-col gap-6">
                                <Grid item>
                                    <LabelledTextField
                                        label={
                                            <Typography className="text-natural-900 font-semibold">
                                                Product Name
                                                <span className="text-error-500">
                                                    *
                                                </span>
                                            </Typography>
                                        }
                                        placeholder="Enter product name"
                                        className="dark-placeholder !h-[60px]"
                                        inputRef={refProductName}
                                        maxLength={50}
                                        {...ProductName}
                                        error={Boolean(errors.productName)}
                                        helperText={
                                            errors.productName &&
                                            errors.productName.message
                                        }
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item>
                                    <LabelledTextField
                                        label={
                                            <Typography className="text-natural-900 font-semibold">
                                                Amount of samples
                                                <span className="text-error-500">
                                                    *
                                                </span>
                                            </Typography>
                                        }
                                        placeholder="Enter quantity"
                                        className="dark-placeholder !h-[60px]"
                                        inputRef={refQuantity}
                                        maxLength={5}
                                        {...Quantity}
                                        error={Boolean(errors.quantity)}
                                        helperText={
                                            errors.quantity &&
                                            errors.quantity.message
                                        }
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item>
                                    <LabelledTextField
                                        label={
                                            <Typography className="text-natural-900 font-semibold">
                                                Sample delivery address
                                                <span className="text-error-500">
                                                    *
                                                </span>
                                            </Typography>
                                        }
                                        placeholder="Enter address"
                                        className="dark-placeholder !h-[60px]"
                                        inputRef={refAddress}
                                        maxLength={100}
                                        {...Address}
                                        error={Boolean(errors.address)}
                                        helperText={
                                            errors.address &&
                                            errors.address.message
                                        }
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        className="!h-[33px] !mt-4"
                                        disabled={!isValid}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateSampleShipment;
