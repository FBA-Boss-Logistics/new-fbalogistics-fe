import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { LabelledTextField } from "components";
import warning from "assets/icons/warning-error.svg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CommonFormValidations } from "components/Form/CommonFormValidations";

const { payment } = CommonFormValidations;
const MakePaymentFormSchema = yup.object().shape({
    payment,
});

const MakePaymentModal = ({ open, onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setError,
        watch,
    } = useForm({
        resolver: yupResolver(MakePaymentFormSchema),
        mode: "onChange",
    });
    const { ref: refPayment, ...Payment } = register("payment");

    const submitHandler = (formData) => {
        const { payment } = formData;
        console.log(payment);
    };
    const submitHandlerError = (formData) => {
        console.log("form error :", formData);
    };

    return (
        <div>
            <Dialog
                open={open}
                className="w-"
                sx={{
                    zIndex: 99999999999,
                }}
            >
                <DialogTitle>
                    <div className="flex justify-between">
                        <div className="flex justify-stretch items-center gap-2">
                            <img src={warning} alt="warning" />
                            <Typography className="text-natural-800 font-bold">
                                Irreversible Action
                            </Typography>
                        </div>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText className="mb-2">
                        <form
                            onSubmit={handleSubmit(
                                submitHandler,
                                submitHandlerError
                            )}
                        >
                            <Grid
                                container
                                xs={12}
                                className="flex flex-col justify-between"
                            >
                                <Grid item>
                                    <LabelledTextField
                                        label={
                                            <Typography className="text-natural-700 font-medium">
                                                Total Order Amount
                                                <span className="text-error-500">
                                                    *
                                                </span>
                                            </Typography>
                                        }
                                        placeholder="$ Enter Amount"
                                        className="dark-placeholder !h-[60px]"
                                        inputRef={refPayment}
                                        {...Payment}
                                        error={Boolean(errors.payment)}
                                        helperText={
                                            errors.payment &&
                                            errors.payment.message
                                        }
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item>
                                    <Button
                                        fullWidth
                                        type="submit"
                                        className="!h-[33px] !mt-[30px]"
                                        disabled={!isValid}
                                    >
                                        Send
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

export default MakePaymentModal;
