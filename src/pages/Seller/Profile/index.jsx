import {
    Avatar,
    Button,
    InputAdornment,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import MAIL from "assets/svg/mailicon.svg";
import * as yup from "yup";

import { FetchUserDetailApi, UpdateProfileApi } from "queries/Auth";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";

import PhoneNumberField from "components/Form/PhoneNumber";
import { formatName } from "utils";
import SellerTopNav from "../SellerTopNav";
import ChangePassword from "pages/Shipper/Dashboard/Profile/ChangePassword";
const ProfileUpdateSchema = yup.object().shape({
    first_name: yup
        .string()
        .required("First name is required")
        .matches(/^[A-Za-z ]+$/, "Name must contain only letters")

        .min(2, "Name must be at least 2 characters")
        .max(50, "Name cannot exceed 50 characters"),
    last_name: yup
        .string()
        .required("Last name is required")
        .matches(/^[A-Za-z ]+$/, "Name must contain only letters")

        .min(2, "Name must be at least 2 characters")
        .max(50, "Name cannot exceed 50 characters"),
    email: yup.string().email().required("Email is required"),
    phone: yup
        .string()
        .matches(
            /^[+]?\d{1,3}?[-.\s]?[(]?\d{1,4}[)]?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
            "Mobile number must contain only digits"
        )
        .min(10, "Mobile number must be at least 10 digits")
        .max(15, "Mobile number cannot exceed 15 digits"),
});

export default function SellerProfile() {
    const { data: userInfo, dataUpdatedAt } = FetchUserDetailApi();
    const { mutate: updateProfileInfo } = UpdateProfileApi();
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(ProfileUpdateSchema) });
    const { ref: firstNameRef, ...firstNameReg } = register("first_name");
    const { ref: lastNameRef, ...lastNameReg } = register("last_name");
    const { ref: emailRef, ...emailReg } = register("email");

    const theme = useTheme();

    const submitProfileUpdateForm = (formData1) => {
        delete formData1?.country_code;
        updateProfileInfo({
            ...formData1,
            phone: phone ? `${phone}` : userDataInfo?.profile?.phone,
        });
    };

    const phone = useWatch({
        control,
        name: "phone",
    });

    const submitProfileUpdateError = (formData1) => {
        console.log("Error in Form", formData1);
    };
    const { userDataInfo } = useMemo(() => {
        if (dataUpdatedAt) {
            reset({ ...userInfo?.data });
            return {
                userDataInfo: userInfo?.data,
            };
        } else {
            return {
                userDataInfo: {},
            };
        }
    }, [dataUpdatedAt]);

    const fullName = userDataInfo?.first_name + " " + userDataInfo?.last_name;

    return (
        <div className="overflow-hidden">
            {/* <div className="py-4 border border-natural-100 border-solid border-x-0 border-t-0 ">
                <SellerTopNav />
            </div> */}
            <div className="border-2 border-natural-100 border-solid p-4 rounded-xl m-4">
                <form
                    id="personal-info"
                    onSubmit={handleSubmit(
                        submitProfileUpdateForm,
                        submitProfileUpdateError
                    )}
                >
                    <div className=" flex gap-12">
                        <div className="flex-col gap-2 flex w-80 ">
                            <Typography
                                variant="body1"
                                fontWeight={500}
                                color="natural.900"
                            >
                                Personal Information
                            </Typography>
                            <Typography
                                color="natural.500"
                                fontWeight={400}
                                variant="body2"
                            >
                                Update your Personal Details.
                            </Typography>
                        </div>
                        <div className="flex-col gap-7 flex">
                            <div className="flex gap-2 ">
                                {/* <img
                                src={ES}
                                className="text-black text-4xl font-light leading-10"
                                alt="ES"
                            /> */}

                                <Avatar
                                    sx={{
                                        width: 99,
                                        height: 96,
                                        bgcolor: theme.palette.primary[100],
                                        color: theme.palette.primary[800],
                                        border: 3,
                                        fontSize: 36,
                                        borderColor: theme.palette.primary[500],
                                        fontWeight: 500,
                                    }}
                                >
                                    {formatName(fullName)}
                                </Avatar>

                                <div className="flex-col justify-center align-middle flex">
                                    <Typography className="text-natural-900 text-2xl font-normal leading-loose">
                                        {fullName}
                                    </Typography>
                                    <Typography className="text-natural-500 text-lg font-normal leading-7">
                                        {userDataInfo?.email}
                                    </Typography>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="flex-col gap-2.5 flex">
                                    <Typography
                                        color="natural.900"
                                        variant="body2"
                                        fontWeight={400}
                                    >
                                        First Name
                                        <span className="text-error-500">
                                            *
                                        </span>
                                    </Typography>
                                    <TextField
                                        autoComplete="off"
                                        placeholder="Enter your First Name"
                                        inputRef={firstNameRef}
                                        {...firstNameReg}
                                        defaultValue={userDataInfo?.first_name}
                                        error={Boolean(errors.first_name)}
                                        helperText={
                                            errors.first_name &&
                                            errors.first_name.message
                                        }
                                    />
                                </div>
                                <div className="flex-col gap-2.5 flex">
                                    <Typography
                                        color="natural.900"
                                        variant="body2"
                                        fontWeight={400}
                                    >
                                        Last Name
                                        <span className="text-error-500">
                                            *
                                        </span>
                                    </Typography>
                                    <TextField
                                        autoComplete="off"
                                        placeholder="Enter your Last Name"
                                        inputRef={lastNameRef}
                                        {...lastNameReg}
                                        defaultValue={userDataInfo?.last_name}
                                        error={Boolean(errors.last_name)}
                                        helperText={
                                            errors.last_name &&
                                            errors.last_name.message
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex-col gap-2.5 flex">
                                <Typography
                                    color="natural.900"
                                    variant="body2"
                                    fontWeight={400}
                                >
                                    Email
                                    <span className="text-error-500">*</span>
                                </Typography>
                                <TextField
                                    fullWidth
                                    sx={{
                                        backgroundColor: "#E4E4E7",
                                        borderRadius: "8px",
                                    }}
                                    inputRef={emailRef}
                                    {...emailReg}
                                    disabled
                                    error={Boolean(errors.email)}
                                    defaultValue={userDataInfo?.email}
                                    helperText={
                                        errors.email && errors.email.message
                                    }
                                    autoComplete="off"
                                    placeholder="Enter your Email Address"
                                    id="input-with-icon-textfield"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <img src={MAIL} alt="mail" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <div className="flex-col gap-2.5 flex">
                                    <Typography
                                        color="natural.900"
                                        variant="body2"
                                        fontWeight={400}
                                    >
                                        Mobile
                                        <span className="text-error-500">
                                            *
                                        </span>
                                    </Typography>
                                    <PhoneNumberField
                                        required
                                        onChange={(value) => {
                                            const cleanedPhoneNumber =
                                                value.replace(/[()\s\-]/g, "");
                                            setValue(
                                                "phone",
                                                cleanedPhoneNumber
                                            );
                                        }}
                                        error={Boolean(errors.phone)}
                                        helperText={
                                            errors.phone && errors.phone.message
                                        }
                                        fullWidth
                                        value={userDataInfo?.profile?.phone} // Pass the entire 'phoneValue' object to the PhoneNumberField
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-right m-6">
                        <Button
                            className="w-48 h-9  bg-primary-600 rounded-3xl shadow border border-primary-700 border-solid gap-3 text-center text-natural-50 text-lg font-medium leading-7"
                            type="submit"
                        >
                            Save Details
                        </Button>
                    </div>
                </form>
                <hr className="m-6 bg-natural-200 border-natural-200 border-solid" />
                <hr className="m-6 bg-natural-200 border-natural-200 border-solid" />

                <ChangePassword />
            </div>
        </div>
    );
}
