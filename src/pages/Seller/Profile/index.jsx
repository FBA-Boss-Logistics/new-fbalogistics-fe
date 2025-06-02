import {
    Avatar,
    
    InputAdornment,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import { Button } from "components/ui/button";
import MAIL from "assets/svg/mailicon.svg";
import * as yup from "yup";

import { FetchUserDetailApi, UpdateProfileApi } from "queries/Auth";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo, useRef, useState } from "react";

import PhoneNumberField from "components/Form/PhoneNumber";
import { formatName } from "utils";
import SellerTopNav from "../SellerTopNav";
import ChangePassword from "pages/Shipper/Dashboard/Profile/ChangePassword";
import { Card } from "components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronDown, Trash2, Upload } from "lucide-react";
import profileIcon from "assets/svg/personalIcon.svg"
import passwordIcon from "assets/svg/passwordIcon.svg"
import { PasswordField } from "components";
import Loader from "components/Loader";
import HeaderPage from "components/HeaderPage";
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
    image: yup
        .mixed()
        .nullable()
        .test("fileType", "Unsupported file format", (value) =>{
            if (typeof value === "string") return true;
            if (!value || value.length === 0) {
                return true; 
              }
              return value?.type.startsWith("image/");
        })
        .test("fileSize", "File is too large", (value) =>{
            if (typeof value === "string") return true;
            if (!value || value.length === 0) {
                return true; 
              }
              return value?.size <= 50000000;
        }), // max 5MB
        current_password: yup.string()
        .when("new_password", ([new_password], schema) =>
            new_password
              ? schema.required("Current password is required when changing password")
              : schema.notRequired()
          ),
        new_password: yup
            .string()
            .notRequired()
            .test(
                "passwords-match",
                "Current password and new password must be different",
                function (value) {
                    const { current_password } = this.parent;
                    if (current_password) {
                        return value !== current_password;
                    }
                    return true;
                }
            )
            .test(
                "password-complexity",
                "Password must contain at least 8 characters, one lowercase letter, one uppercase letter, one digit, and one special character",
                (value) => {
                    if (!value) return true;
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%^&*_+]).{8,}$/.test(value);
                }
            ),
        confirm_password: yup
            .string()
            .when("new_password", ([new_password], schema) =>
                new_password
                ? schema.required("Confirm password is required when changing password")
                : schema.notRequired()
            )
            .oneOf([yup.ref("new_password"), null], "Passwords must match"),

    
});

export default function SellerProfile() {
    const { data: userInfo, dataUpdatedAt,isLoading } = FetchUserDetailApi();
    const { mutate: updateProfileInfo } = UpdateProfileApi();
    const imageRef = useRef(null);
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
    const { ref: currentPasswordRef, ...currentPasswordReg } =register("current_password");
    const { ref: newPasswordRef, ...newPasswordReg } = register("new_password");
    const { ref: confirmPasswordRef, ...confirmPasswordReg } =register("confirm_password");
    // const { ref: imageRef, ...imageReg } = register("image");

    const theme = useTheme();

    const submitProfileUpdateForm = (formData1) => {
        console.log("Form Data", formData1);
        console.log("Image Url", imageUrl);
        delete formData1?.country_code;
        updateProfileInfo({
            ...formData1,
            phone: phone ? `${phone}` : userDataInfo?.profile?.phone,
            old_password: formData1.current_password,
            new_password: formData1.new_password,
            // image: image,
        });
    };
    const [imageUrl, setImageUrl] = useState();
    const phone = useWatch({
        control,
        name: "phone",
    });
    

 

    const submitProfileUpdateError = (formData1) => {
        console.log("Error in Form", formData1);
    };
    const { userDataInfo } = useMemo(() => {
        if (dataUpdatedAt) {
            const {image, ...rest} = userInfo?.data;
            reset({...rest});
            setImageUrl(userInfo?.data?.image);
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

    const [cargoOpen, setCargoOpen] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log("File", file);
        setValue("remove_image", false);
        if (file) {
            setValue("image", file);
            
            setImageUrl(URL.createObjectURL(file));
            console.log("Image Url", imageUrl);
        }
        else{
            console.log("No File");
        }
    };

    return (
        <>
        {isLoading ? (
            <div className="flex items-start justify-center h-screen ">
                <Loader className="h-10 w-10 animate-spin" />
            </div>
        ):(
        <form
        id="personal-info"
        onSubmit={handleSubmit(
            submitProfileUpdateForm,
            submitProfileUpdateError
        )}
        className="flex flex-col gap-4"
        >
            <div className="flex flex-col gap-4 overflow-hidden">
                <div className=" flex-row justify-between gap-4 hidden md:flex">
                    <p className="text-natural-900 text-2xl font-[600] leading-loose">Personal Profile</p>
                    <Button form="personal-info" type="submit" className="">Save Changes</Button>
                </div>
                <div className="flex flex-row justify-between gap-4 md:hidden">
                    <HeaderPage title="Personal Profile" home="seller" pathname="profile" />
                </div>
        
                <Card className="p-6">
                            <div className="flex  md:flex-row flex-col md:justify-between justify-center gap-4 ">
                                <div className="flex gap-2  items-center ">
                                    <Avatar
                                        sx={{
                                            width: 64,
                                            height: 64,
                                            bgcolor: theme.palette.primary[200],
                                            color: theme.palette.primary[500],
                                            border: 3,
                                            fontSize: 36,
                                            borderColor: theme.palette.primary[200],
                                            fontWeight: 500,
                                        }}
                                    >
                                        {imageUrl ? <img src={imageUrl} className="w-full h-full object-cover" alt="profile" /> : formatName(fullName)}
                                    </Avatar>

                                    <div className="flex-col justify-center flex ">
                                        <Typography fontSize={20} fontWeight={500} className="text-natural-900  ">
                                            {fullName}
                                        </Typography>
                                        <Typography fontSize={16} fontWeight={400} className="text-natural-400 ">
                                            {userDataInfo?.email}
                                        </Typography>
                                    </div>
                                </div>
                                
                                <div className="flex gap-2 flex-col items-start w-full md:w-auto  "> 
                                    <div className="flex gap-2 flex-row-reverse md:flex-row h-full items-center w-full">
                                    <Button type="button"   variant="outline"  className="gap-2 w-full md:w-auto text-primary" onClick={() => imageRef.current?.click()} >
                                        <Upload className="h-4 w-4" />
                                        Upload
                                    </Button>
                                    <input
                                        type="file"
                                        ref={imageRef}
                                        style={{ display: "none" }}
                                        onChange={handleImageChange}
                                        // {...register("image")} 

                                    />
                                    <Button type="button" variant="outline"  className="gap-2 w-full md:w-auto text-primary" onClick={() => {
                                        setValue("image", null);
                                        setValue("remove_image", true);
                                        setImageUrl(null);
                                    }} >
                                    <Trash2 className="h-4 w-4" />
                                    Remove
                                    </Button>
                                    </div>
                                        {errors.image && <p className="text-error-500 text-xs">{errors.image.message}</p>}
                                  

                                </div>
                            </div>
                </Card>
                <Card className="p-4 space-y-4">
                
                <div className="flex items-center w-full mb-6 gap-2">
                    <div className="bg-natural-200 rounded-full w-[30px]">
                        <img src={profileIcon} alt="truck" />
                    </div>
                    <Typography color="natural.900" fontSize={18} fontWeight={500}>
                        Personal Information
                    </Typography>
                </div>
                {/* <div className="flex flex-col gap-2">
                    <div className="flex gap-4">
                    
                    </div>
                </div> */}
                    <div className="flex md:flex-row flex-col gap-2 ">
                        <div className="flex-col gap-2.5 flex w-full">
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
                                fullWidth
                                helperText={
                                    errors.first_name &&
                                    errors.first_name.message
                                }
                            />
                        </div>
                        <div className="flex-col gap-2.5 flex w-full">
                            <Typography
                                color="natural.900"
                                variant="body2"
                                fullWidth
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
                    <div className="flex md:flex-row flex-col gap-2 w-full">
                        <div className="flex-col gap-2.5 flex w-full">
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
                        </div>

                        <div className="flex-col gap-2.5 flex w-full">
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
            </Card>
                <Card className="p-4 space-y-4">
            
                <div className="flex items-center w-full mb-6 gap-2">
                                <div className="bg-natural-200 rounded-full w-[30px]">
                                    <img src={passwordIcon} alt="truck" />
                                </div>
                        <Typography color="natural.900" fontSize={18} fontWeight={500}>
                            Password
                        </Typography>
                
                    </div>
                    <div className="flex flex-col gap-2 font-semibold">
                        <div className="flex md:flex-row flex-col gap-2">
                        <PasswordField
                            label="Current Password"
                            type="password"
                            required
                            variant="outlined"
                            placeholder="Enter your password"
                            className="dark-placeholder"
                            inputRef={currentPasswordRef}
                            {...currentPasswordReg}
                            error={Boolean(errors.current_password)}
                            helperText={
                                errors.current_password?.message
                            }
                        />
                
            
                        <PasswordField
                            label="New Password"
                            type="password"
                            variant="outlined"
                            placeholder="Enter your password"
                            className="dark-placeholder"
                            inputRef={newPasswordRef}
                            
                            {...newPasswordReg}
                            error={Boolean(errors.new_password)}
                            helperText={errors.new_password?.message}
                        />
                        </div>  
            
                        <div className="flex md:flex-row flex-col gap-2 md:w-1/2">
                        <PasswordField
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            placeholder="Enter your password"
                            className="dark-placeholder "
                            inputRef={confirmPasswordRef}
                            {...confirmPasswordReg}
                            error={Boolean(errors.confirm_password)}
                            helperText={
                                errors.confirm_password?.message
                            }
                        />
                        </div>
                    </div> 

                    
                </Card>
               
                <div className="flex flex-row justify-between gap-4">
                    <Button form="personal-info" type="submit" size="lg" className=" md:hidden w-full rounded-full">Save Changes</Button>
                </div>
            </div>
        </form>
    )}
    </>
    );
}
