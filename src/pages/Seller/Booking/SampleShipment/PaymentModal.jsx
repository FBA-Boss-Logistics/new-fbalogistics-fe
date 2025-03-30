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
import payment from "assets/icons/confirm-payment.svg";
import * as yup from "yup";

import { CommonFormValidations } from "components/Form/CommonFormValidations";

const { email } = CommonFormValidations;

const PaymentModal = ({ open, onClose }) => {
    const submitHandler = (formData) => {
        console.log("hello");
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
                    <div className="flex justify-between gap-8">
                        <div className="flex justify-stretch items-center gap-2">
                            <img src={payment} alt="payment" />
                            <Typography className="text-natural-500 font-medium">
                                Confirm Payment
                            </Typography>
                        </div>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText className="mb-2">
                        <form>
                            <Grid
                                container
                                xs={12}
                                className="flex flex-col justify-between"
                            >
                                <Grid item>
                                    <Typography className="text-natural-900 font-semibold">
                                        Amount to be paid
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography className="text-natural-900 font-semibold">
                                        $32,00
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button
                                        fullWidth
                                        type="submit"
                                        className="!h-[33px] !mt-[24px]"
                                    >
                                        Pay{" "}
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

export default PaymentModal;
