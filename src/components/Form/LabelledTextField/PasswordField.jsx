import {
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import  { forwardRef, useState } from "react";

const PasswordField = forwardRef((props) => {
    const {
        label,
        variant,
        type,
        startAdornment,
        endAdornment,
        error,
        helperText,
        className,
        required,
        fullWidth,
        size,
        textFieldClass,
        inputRef,
        ...restOfTextFieldProps
    } = props;

    const [showPassword, setShowPassword] = useState(false);

    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    return (
        <FormControl
            className={`${className} ${
                fullWidth ? "w-full" : ""
            } mui-textfield`}
        >
            <Typography
                // shrink
                // disabled={disabled}
                required={required}
                variant="standard"
                sx={{
                    position: "initial",
                }}
                className="!transform-none mb-2 gap-2.5"
            >
                {label}
            </Typography>
            <TextField
                // className="text-base  text-hb_blue-350"
                type={showPassword ? "text" : "password"}
                InputProps={{
                    endAdornment: (
                        <>
                            {type === "password" ? (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleToggleShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        size="small"
                                    >
                                        {showPassword ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ) : endAdornment ? (
                                endAdornment
                            ) : null}
                        </>
                    ),
                    startAdornment: startAdornment ? startAdornment : null,
                }}
                fullWidth={fullWidth}
                className={textFieldClass}
                {...restOfTextFieldProps}
                inputRef={inputRef}
                size={size}
                error={Boolean(error)}
            />
            <FormHelperText
                error={Boolean(error)}
                margin="dense"
                variant={variant}
            >
                {helperText}
            </FormHelperText>
        </FormControl>
    );
});

PasswordField.defaultProps = {
    label: "",
    variant: "standard",
    ref: null,
    startAdornment: null,
    endAdornment: null,
    type: "text",
    error: false,
    helperText: "",
    className: null,
    inputRef: null,
    required: false,
    fullWidth: true,
    size: "medium",
};

export default PasswordField;
