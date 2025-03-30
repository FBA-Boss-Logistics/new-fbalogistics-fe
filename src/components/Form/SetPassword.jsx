import React from "react";
import LockIcon from "assets/icons/lock.svg";
import PasswordField from "./LabelledTextField/PasswordField";
import { useFormContext } from "react-hook-form";
import { Grid, Typography } from "@mui/material";

const SetPassword = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const { ref: refRegisterPassword, ...RegisterPassword } =
        register("password");

    const { ref: refRegisterConfirmPassword, ...RegisterConfirmPassword } =
        register("confirm_password");

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {" "}
                <PasswordField
                    label="Password"
                    placeholder="Enter your Password"
                    type="password"
                    inputRef={refRegisterPassword}
                    {...RegisterPassword}
                    error={Boolean(errors.password)}
                    helperText={errors.password && errors.password.message}
                />
                <Typography
                    fontWeight={400}
                    fontSize={16}
                    color="gray.700"
                    marginTop={1}
                >
                    Must be at least 8 characters.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {" "}
                <PasswordField
                    label="Confirm Password"
                    placeholder="Enter your Password"
                    type="password"
                    inputRef={refRegisterConfirmPassword}
                    {...RegisterConfirmPassword}
                    error={Boolean(errors.confirm_password)}
                    helperText={
                        errors.confirm_password &&
                        errors.confirm_password.message
                    }
                />
            </Grid>
        </Grid>
    );
};

export default SetPassword;
