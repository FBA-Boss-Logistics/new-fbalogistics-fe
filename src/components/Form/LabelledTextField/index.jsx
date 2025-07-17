import {
    FormControl,
    FormHelperText,
    InputAdornment,
    InputLabel,
    TextField,
    Typography,
} from "@mui/material";
import React, { forwardRef } from "react";

/**
 * For hide / show password type input: use "PasswordField" component
 */

const LabelledTextFieldBootStrap = forwardRef((props) => {
    const {
        label,
        variant,
        type,
        error,
        helperText,
        className,
        inputRef,
        required,
        fullWidth,
        size,
        name,
        disabled,
        capitalize,
        startIcon,
        maxLength,
        ...restOfTextFieldProps
    } = props;
    return (
        <FormControl
            className={`${className} ${
                fullWidth ? "w-full" : ""
            } mui-textfield`}
            // color="textfield"
        >
            {" "}
            <Typography
                // shrink
                color="natural"
                disabled={disabled}
                required={required}
                variant="standard"
                sx={{
                    position: "initial",
                    // fontSize: "14px",
                }}
                className=" !transform-none mb-[10px] font-semibold text-sm text-[#2E2E2E]"
            >
                {label}
            </Typography>
            <TextField
                type={type}
                className={capitalize ? "capitalize" : ""}
                InputProps={{
                    startAdornment: startIcon ? (
                        <InputAdornment
                            className=" !mr-[-5px]"
                            position="start"
                        >
                            {startIcon}
                        </InputAdornment>
                    ) : null,
                    inputProps: {
                        style: {
                            textTransform: capitalize ? "capitalize" : "none",
                            padding: "11px 17px",
                        },
                        maxLength: maxLength || 1000000,
                    },
                }}
                fullWidth={fullWidth}
                required={required}
                {...restOfTextFieldProps}
                inputRef={inputRef}
                name={name}
                size={size}
                disabled={disabled}
                variant={variant}
                // color="textfield"
                error={Boolean(error)}
            />
            {Boolean(error) && (
                <FormHelperText
                    error={Boolean(error)}
                    margin="dense"
                    variant={variant}
                >
                    {helperText}
                </FormHelperText>
            )}
        </FormControl>
    );
});

LabelledTextFieldBootStrap.defaultProps = {
    label: "",
    variant: "outlined",
    ref: null,
    type: "text",
    error: false,
    helperText: "",
    className: null,
    inputRef: null,
    required: false,
    fullWidth: true,
    size: "medium",
    disabled: false,
};

export default LabelledTextFieldBootStrap;
