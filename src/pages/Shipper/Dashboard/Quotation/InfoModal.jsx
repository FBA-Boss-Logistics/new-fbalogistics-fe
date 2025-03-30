import { useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import InputAdornment from "@mui/material/InputAdornment";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateRecentOrderDetailApi } from "queries/Shipper";

const validationSchema = yup.object({
    final_amount: yup
        .number()
        .required("Required")
        .typeError("Must be a number"),
    tracking_link: yup
        .number()
        .required("Required")
        .typeError("Must be a number"),
});

const InfoModal = ({ open, onClose, rowData }) => {
    const { mutate: updateOrderInfo } = UpdateRecentOrderDetailApi();
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (modalFormData) => {
        console.log(modalFormData, "modalFormData");
        const payload = {
            data: {
                tracking_number: modalFormData?.tracking_link,
                final_amount: modalFormData?.final_amount,
            },
            id: rowData.id,
        };
        updateOrderInfo(
            { payload },
            {
                onSuccess: () => {
                    onClose();
                },
            }
        );
    };

    useEffect(() => {
        if (!open) {
            reset();
        }
    }, [open, reset]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="xs">
            <DialogTitle className="flex pb-8">
                Add Info
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography>Final Amount</Typography>
                    <Controller
                        name="final_amount"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                placeholder="Enter Amount"
                                // defaultValue={rowData?.final_amount}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment
                                            position="start"
                                            className="-mr-3"
                                        >
                                            $
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                className="pb-4"
                                error={!!errors.final_amount}
                                helperText={errors.final_amount?.message}
                            />
                        )}
                    />
                    <Typography>Tracking Number</Typography>
                    <Controller
                        name="tracking_link"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                placeholder="Enter Number"
                                // defaultValue={rowData?.alibaba_number}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                className="pb-8"
                                error={!!errors.tracking_link}
                                helperText={errors.tracking_link?.message}
                            />
                        )}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Submit
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};
export default InfoModal;
