import CloseIcon from "@mui/icons-material/Close";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import KeyIcon from "assets/icons/key.svg";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import EmailAddress from "components/Form/EmailAddress";
import InputOtp from "components/Form/InputOtp";
import {
    useSendForgotOtpQuery,
    useSendOtpQuery,
    useSetPasswordQuery,
    useVerifyOtpQuery,
} from "queries/Auth";
import SetPassword from "components/Form/SetPassword";
import { CommonFormValidations } from "components/Form/CommonFormValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import HandleErrorResponse from "Helper/HandleErrorResponse";

const { email, otp, password, confirm_password } = CommonFormValidations;
const EmailSchema = yup.object().shape({
    email,
});

const OtpSchema = yup.object().shape({
    otp,
});

const SetPasswordSchema = yup.object().shape({
    password,
    confirm_password,
});
export default function ForgotPasswordModal({ open, handleClose }) {
    const [manageFormData, setManageFormData] = useState({});
    const [renderScreen, setRenderScreen] = useState({
        putEmail: true,
        getOtp: false,
        setPassword: false,
        success: false,
    });
    // queries
    const { mutate: sendOtpForgot } = useSendForgotOtpQuery();
    const { mutate: sendOtp } = useSendOtpQuery();
    const { mutate: verifyOtp } = useVerifyOtpQuery();
    const { mutate: resetSetPassword } = useSetPasswordQuery();

    

    const formMethods = useForm({
        resolver: yupResolver(
            (renderScreen.putEmail && EmailSchema) ||
                (renderScreen.getOtp && OtpSchema) ||
                (renderScreen.setPassword && SetPasswordSchema)
        ),

        defaultValues: {},
    });

 

    const { handleSubmit, setError,reset } = formMethods;

    const handleCloseReset = () => {
        handleClose();
        reset();
        setRenderScreen({
            putEmail: true,
            getOtp: false,
            setPassword: false,
            success: false,
        })
    }
    //handlers
    const handleFormSubmit = (formData) => {
        setManageFormData(formData);

        if (renderScreen?.putEmail) {
            sendOtpForgot(
                {
                    ...formData,
                    channel: "EMAIL",
                },
                {
                    onSuccess: (resp) => {
                        setRenderScreen({
                            putEmail: false,
                            getOtp: true,
                            setPassword: false,
                            success: false,
                        });
                    },
                    onError: (response) =>
                        HandleErrorResponse(response, setError),
                }
            );
        }
        if (renderScreen?.getOtp) {
            verifyOtp(
                {
                    ...formData,
                    channel: "EMAIL",
                },
                {
                    onSuccess: () => {
                        setRenderScreen({
                            putEmail: false,
                            getOtp: false,
                            setPassword: true,
                            success: false,
                        });
                    },
                    onError: (response) =>
                        HandleErrorResponse(response, setError),
                }
            );
        }
        if (renderScreen?.setPassword) {
            resetSetPassword(
                {
                    ...formData,
                },
                {
                    onSuccess: () => {
                        setRenderScreen({
                            putEmail: false,
                            getOtp: false,
                            setPassword: false,
                            success: true,
                        });
                    },
                    onError: (response) =>
                        HandleErrorResponse(response, setError),
                }
            );
        }
        if (renderScreen.success) {
            handleClose();
        }
    };
    const handleFormSubmitErrors = (errors) => {
        console.log("errors", errors);
    };

    const handleSubmitResendOtp = () => {
        sendOtp(
            {
                ...manageFormData,
                channel: "EMAIL",
                otp_for: "FORGOT_PASSWORD",
            },
            {
                onError: (response) => HandleErrorResponse(response, setError),
            }
        );
    };

    return (
        <div>
            <Dialog
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth={true}
                maxWidth="xs"
            >
                <DialogTitle>
                    <img src={KeyIcon} width="44px" className="m-auto text-primary" />
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseReset}
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
                    <Typography
                        // variant="h5"
                        color="gray.800"
                        fontWeight={500}
                        className="py-4 text-[28px] text-center	"
                    >
                        {renderScreen.success
                            ? "Password reset"
                            : renderScreen.setPassword
                            ? "Set new password"
                            : "Forgot password?"}
                    </Typography>
                    <Typography
                        color="gray.500"
                        className=" mb-8 text-base text-center	"
                    >
                        {renderScreen.putEmail &&
                            "No worries, we’ll send you reset instructions."}
                        {renderScreen.getOtp &&
                            `A verification code was send to ${manageFormData?.email}`}

                        {renderScreen.setPassword &&
                            "Your new password must be different to previously used passwords."}
                    </Typography>
                    <FormProvider {...formMethods}>
                        <form
                            noValidate
                            id="item"
                            onSubmit={handleSubmit(
                                handleFormSubmit,
                                handleFormSubmitErrors
                            )}
                        >
                            {renderScreen.putEmail && (
                                <EmailAddress
                                    inForgot
                                    placeholder="Enter email"
                                    includeLabel
                                />
                            )}
                            {renderScreen.getOtp && (
                                <InputOtp
                                    handleSubmitResendOtp={
                                        handleSubmitResendOtp
                                    }
                                />
                            )}
                            {renderScreen.setPassword && <SetPassword />}
                            {renderScreen.success && (
                                <Typography
                                    color="gray.500"
                                    className="mb-1 text-base text-center	"
                                >
                                    Your password has been successfully reset.
                                </Typography>
                            )}
                            <Button
                                // onClick={handleClose}
                                className="w-full my-8 text-lg bg-primary hover:bg-primary/90 text-white rounded-lg"
                                type="submit"
                                onClick={() => {
                                    if (renderScreen.success) {
                                        handleClose();
                                    } else return;
                                }}
                            >
                                {renderScreen.success
                                    ? "Log in"
                                    : renderScreen.getOtp
                                    ? "Continue"
                                    : "Continue"}
                            </Button>
                        </form>
                    </FormProvider>
                    <Typography
                        onClick={() => {
                            setRenderScreen({
                                putEmail: true,
                                getOtp: false,
                                setPassword: false,
                                success: false,
                            });
                            handleClose();
                        }}
                        className="flex justify-center text-base cursor-pointer text-primary"
                        color="primary.500"
                    >
                        <KeyboardBackspaceOutlinedIcon
                            fontSize="small"
                            className="mx-1"
                        />
                        Back to log in
                    </Typography>
                </DialogContent>
            </Dialog>
        </div>
    );
}
