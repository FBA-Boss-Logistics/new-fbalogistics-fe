import { Button, Typography } from "@mui/material";
import "./signup.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { LabelledTextField, PasswordField } from "components";
import * as yup from "yup";
import { CommonFormValidations } from "components/Form/CommonFormValidations";
import { useForm } from "react-hook-form";
import LockIcon from "assets/icons/lock.svg";
import { useNavigate } from "react-router-dom";
import { routes } from "routes/RouteConstants";
import BorderButton from "components/BorderButton";
import { useLocation } from "react-router-dom/dist";
import { useSignUpQuery } from "queries/Auth";
import HandleErrorResponse from "utils/HandleErrorResponse";

const { first_name, last_name, email, password } = CommonFormValidations;
const SignUpFormSchema = yup.object().shape({
    first_name,
    last_name,
    email,
    password,
});

const SignUp = () => {
    const { mutate: signUpQuery } = useSignUpQuery();

    const navigate = useNavigate();
    const location = useLocation();

    const currentUrl = location.pathname;

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(SignUpFormSchema),
    });

    const submitSignUpFrom = (formData) => {
        if (currentUrl?.includes("seller")) {
            signUpQuery(
                {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email,
                    password: formData.password,
                    groups: "Seller",
                },
                {
                    onSuccess: () => {
                        navigate(routes.SELLERHOME.pathname);
                    },
                    onError: (err) => {
                        HandleErrorResponse(err, setError);
                    },
                }
            );
            navigate(routes.SELLERDASHBOARD.pathname);
        } else {
            signUpQuery(
                {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email,
                    password: formData.password,
                    groups: "Shipper",
                },
                {
                    onSuccess: () => {
                        navigate(routes.SHIPPERLOGIN.pathname);
                    },
                    onError: (err) => {
                        HandleErrorResponse(err, setError);
                    },
                }
            );
        }
    };

    const handleClick = () => {
        if (currentUrl.includes("seller")) {
            navigate(routes.SELLERLOGIN.pathname);
        } else if (currentUrl.includes("shipper")) {
            navigate(routes.SHIPPERLOGIN.pathname);
        }
    };

    const { ref: refRegisterFirstName, ...RegisterFirstName } =
        register("first_name");
    const { ref: refRegisterLastName, ...RegisterLastName } =
        register("last_name");
    const { ref: refRegisterEmail, ...RegisterEmail } = register("email");
    const { ref: refRegisterPassword, ...RegisterPassword } =
        register("password");

    return (
        <div className="flex justify-end signup-bg">
            <form
                onSubmit={handleSubmit(submitSignUpFrom)}
                className="flex-col flex w-1/3 p-4 gap-6 m-32"
            >
                <Typography fontWeight={600} fontFamily={"Sora"} variant="h4">
                    Sign Up
                </Typography>
                <div className="flex gap-2  ">
                    <LabelledTextField
                        label="First name"
                        placeholder="Enter first name"
                        className="w-96 "
                        inputRef={refRegisterFirstName}
                        {...RegisterFirstName}
                        error={Boolean(errors.first_name)}
                        helperText={
                            errors.first_name && errors.first_name.message
                        }
                    />
                    <LabelledTextField
                        label="Last name"
                        placeholder="Enter last name"
                        className="w-96 "
                        inputRef={refRegisterLastName}
                        {...RegisterLastName}
                        error={Boolean(errors.last_name)}
                        helperText={
                            errors.last_name && errors.last_name.message
                        }
                    />
                </div>

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
                        onChange={() => {
                            undefined;
                        }}
                        placeholder="Enter your password"
                        inputRef={refRegisterPassword}
                        {...RegisterPassword}
                        error={Boolean(errors.password)}
                        helperText={errors.password && errors.password.message}
                    />
                    <div className="flex items-center gap-2 mt-3 mb-2">
                        <img src={LockIcon} alt="lock-icon" />
                        <Typography fontWeight={400} color="natural.500">
                            At least 8 character
                        </Typography>
                    </div>
                </div>

                <div>
                    <BorderButton
                        type="submit"
                        variant="contained-outlined"
                        fullWidth
                    >
                        Sign Up
                    </BorderButton>
                    <Button
                        variant="text"
                        color="natural"
                        className="mt-2"
                        fullWidth
                        onClick={handleClick}
                    >
                        <Typography>Already have an account?</Typography> &nbsp;
                        <Typography
                            color="primary.800"
                            className="font-semibold"
                        >
                            {" "}
                            Log in
                        </Typography>
                    </Button>
                </div>
                <Typography
                    color="natural.500"
                    fontWeight={400}
                    variant="subtitle2"
                    align="center"
                >
                    By Continue this you agree FBA Boss Logistics{" "}
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

export default SignUp;
