import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import "./signin.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { LabelledTextField, PasswordField } from "components";
import * as yup from "yup";
import { CommonFormValidations } from "components/Form/CommonFormValidations";
import { useForm } from "react-hook-form";
import ForgotPasswordModal from "pages/ForgotPassword/ForgotPasswordModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "routes/RouteConstants";
import BorderButton from "components/BorderButton";
import { useLocation } from "react-router-dom/dist";
import { useLoginQuery } from "queries/Auth";
import HandleErrorResponse from "utils/HandleErrorResponse";
const { email, password } = CommonFormValidations;
const LoginFormSchema = yup.object().shape({
    email,
    password,
});
const SignIn = () => {
    const { mutate: loginQuery } = useLoginQuery();
    const navigate = useNavigate();
    const location = useLocation();

    const currentUrl = location.pathname;
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(LoginFormSchema),
    });

    const [openForgotPasswordModal, setOpenForgotPasswordModal] =
        useState(false);
    const submitHandler = (formData) => {
        const { email, password } = formData;
        const payloadShipper = { email, password, group: "Shipper" };
        const payloadSeller = { email, password, group: "Seller" };
        if (currentUrl.includes("shipper")) {
            loginQuery(payloadShipper, {
                onSuccess: () => {
                    navigate(routes.SHIPPERDASHBOARD.pathname);
                },
                onError: (err) => {
                    HandleErrorResponse(err, setError);
                },
            });
        } else {
            loginQuery(payloadSeller, {
                onSuccess: () => {
                    navigate(routes.SELLERDASHBOARD.pathname);
                },
                onError: (err) => {
                    HandleErrorResponse(err, setError);
                },
            });
        }
    };

    const handleClick = () => {
        if (currentUrl.includes("seller")) {
            navigate(routes.SELLERSIGNUP.pathname);
        } else if (currentUrl.includes("shipper")) {
            navigate(routes.SHIPPERSIGNUP.pathname);
        }
    };
    const { ref: refRegisterEmail, ...RegisterEmail } = register("email");
    const { ref: refRegisterPassword, ...RegisterPassword } =
        register("password");

    return (
        <div className="flex justify-end signin-bg">
            <ForgotPasswordModal
                open={openForgotPasswordModal}
                handleClose={() => setOpenForgotPasswordModal(false)}
            />
            <form
                onSubmit={handleSubmit(submitHandler)}
                className="flex-col flex w-1/3 p-4 gap-6 m-32"
            >
                <Typography fontWeight={600} fontFamily={"Sora"} variant="h4">
                    Log in
                </Typography>

                <LabelledTextField
                    label="Email"
                    placeholder="Enter your email"
                    inputRef={refRegisterEmail}
                    {...RegisterEmail}
                    error={Boolean(errors.email)}
                    helperText={errors.email && errors.email.message}
                />
                <div>
                    <PasswordField
                        label="Password"
                        type="password"
                        variant="outlined"
                        placeholder="Enter your password"
                        inputRef={refRegisterPassword}
                        {...RegisterPassword}
                        error={Boolean(errors.password)}
                        helperText={errors.password && errors.password.message}
                    />
                    <div className="flex items-center justify-between cursor-pointer">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    disableRipple
                                    sx={{
                                        color: "natural.400",
                                    }}
                                />
                            }
                            label={
                                <Typography
                                    variant="body2"
                                    color="natural.500"
                                    className="mt-0.5"
                                >
                                    Remember for 30 days
                                </Typography>
                            }
                        />
                        <Button
                            onClick={() => setOpenForgotPasswordModal(true)}
                            variant="text"
                        >
                            Forgot Password?
                        </Button>
                    </div>
                </div>
                <div>
                    {/* for submitting */}
                    <BorderButton
                        type="submit"
                        variant="contained-outlined"
                        fullWidth
                    >
                        Log in
                    </BorderButton>
                    {/* <Button fullWidth onClick={() => navigate(routes.SHIPPERDASHBOARD.pathname)}>
                        Log in
                    </Button> */}
                    <Button
                        variant="text"
                        color="natural"
                        className="mt-2"
                        fullWidth
                        onClick={handleClick}
                    >
                        <Typography>New User? </Typography> &nbsp;
                        <Typography
                            color="primary.800"
                            className="font-semibold"
                        >
                            {" "}
                            Sign Up Now
                        </Typography>
                    </Button>
                </div>
                <Typography
                    color="natural.500"
                    fontWeight={400}
                    variant="subtitle2"
                    align="center"
                >
                    By using this website you agree to the FBA Boss Logistics{" "}
                    <span className="text-primary-800 font-semibold cursor-pointer">
                        {" "}
                        Terms of service
                    </span>{" "}
                    and{" "}
                    <span className="text-primary-800 font-semibold cursor-pointer">
                        Privacy Policy
                    </span>
                </Typography>
            </form>
        </div>
    );
};

export default SignIn;
