import { Typography, Grid, Button, Box, useMediaQuery } from "@mui/material";
import { useForm } from "react-hook-form";
import { PasswordField } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useChangePasswordQuery } from "queries/Auth";

const ChangePasswordSchema = yup.object().shape({
    current_password: yup.string().required("Current password is required"),
    // .test(
    //     "passwords-match",
    //     "Current password and new password must be different",
    //     function (value) {
    //         const { new_password } = this.parent;
    //         return value !== new_password;
    //     }
    // ),
    new_password: yup
        .string()
        .required("New password is required")
        .test(
            "passwords-match",
            "Current password and new password must be different",
            function (value) {
                const { current_password } = this.parent;
                return value !== current_password;
            }
        )
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%^&*_+]).{8,}$/,
            "Password must contain at least 8 characters, one lowercase letter, one uppercase letter, one digit, and one special character"
        ),
    confirm_password: yup
        .string()
        .required("Confirm password is required")
        .oneOf([yup.ref("new_password"), null], "Passwords must match"),
});

const ChangePassword = () => {
    const isMobileDevice = useMediaQuery((theme) =>
        theme.breakpoints.down("sm")
    );
    const { mutate: ChangePassword } = useChangePasswordQuery();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(ChangePasswordSchema),
    });

    const { ref: currentPasswordRef, ...currentPasswordReg } =
        register("current_password");
    const { ref: newPasswordRef, ...newPasswordReg } = register("new_password");
    const { ref: confirmPasswordRef, ...confirmPasswordReg } =
        register("confirm_password");

    const submitChangePassword = (formData2) => {
        ChangePassword(
            {
                old_password: formData2.current_password,
                new_password: formData2.new_password,
            },
            {
                onSuccess: () => {
                    reset();
                },
            }
        );
    };

    return (
        <>
            {/* <Grid container spacing={2} sx={{ marginTop: 1 }}> */}
                {/* <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Box variant="div" sx={{ width: "90%" }}>
                        <Typography
                            variant="body1"
                            fontWeight={500}
                            color="natural.900"
                        >
                            Passwords
                        </Typography>
                        <Typography
                            color="natural.500"
                            fontWeight={400}
                            variant="body2"
                        >
                            Change the password you use to log in to FBABoss
                            Logistics
                        </Typography>
                    </Box>
                </Grid> */}

                {/* Change Password Form Placed Here  */}
                <div className="w-full">
                    <form
                        id="change-password"
                        className={`flex flex-col gap-6 $`}
                        onSubmit={handleSubmit(submitChangePassword)}
                    >
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
                  
                      
                                <PasswordField
                                    label="Confirm Password"
                                    type="password"
                                    variant="outlined"
                                    placeholder="Enter your password"
                                    className="dark-placeholder"
                                    inputRef={confirmPasswordRef}
                                    {...confirmPasswordReg}
                                    error={Boolean(errors.confirm_password)}
                                    helperText={
                                        errors.confirm_password?.message
                                    }
                                />
                    
                    </form>
                </div>
            {/* </Grid> */}
            {/* <Divider className="py-2 mb-4" /> */}
            <Box variant="div" sx={{ textAlign: "end" }} className="py-2">
                <Button
                    type="submit"
                    form="change-password"
                    variant="contained"
                    sx={{ width: "200px" }}
                >
                    Save Password
                </Button>
            </Box>
        </>
    );
};

export default ChangePassword;
