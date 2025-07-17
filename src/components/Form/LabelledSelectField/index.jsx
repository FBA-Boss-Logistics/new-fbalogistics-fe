import {
    FormControl,
    FormHelperText,
    InputLabel,
    TextField,
    Tooltip,
} from "@mui/material";
// import { styled } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import React, { forwardRef, useState } from "react";
import { LabelledTextField } from "components";
import { ChevronDown } from "lucide-react";
// import ErrorBoundary from 'components/ErrorBoundary';

const LabelledSelectField = (props) => {
    const {
        selectData,
        label,
        variant,
        error,
        helperText,
        className,
        size,
        placeholder,
        options,
        inputRef,
        multiple,
        required,
        disableCloseOnSelect,
        focusOnError,
        allErrors,
        errorFocusKey,
        openOnFocus,
        tooltip,
        disabled,
        blurOnSelect,
        ...restOfSelectFieldProps
    } = props;

    return (
        <div className="flex flex-col">
            <div>
                <InputLabel
                    // shrink
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
                </InputLabel>
                <Autocomplete
                    popupIcon={<ChevronDown className={"ml-auto h-5 w-5 transition-transform"} />}
                    disableCloseOnSelect={multiple && disableCloseOnSelect}
                    fullWidth
                    sx={{ width: "100%" }}
                    multiple={multiple}
                    size={size}
                    options={options}
                    openOnFocus={openOnFocus}
                    disabled={false}
                    renderInput={(params) => (
                        <Tooltip title={tooltip}>
                            <TextField
                                // label={label}
                                {...params}
                                required={required}
                                shrink
                                disabled={disabled}
                                placeholder={placeholder}
                                inputRef={inputRef}
                                variant="outlined"
                                // style={{
                                //     borderRadius: "4px",
                                //     padding: ".15rem 0",
                                //     width: "100%",
                                // }}
                                sx={{
                                    "& .MuiInputBase-input": {
                                        padding: "5px 11px !important",
                                    },
                                    width: "100%",
                                }}
                                error={Boolean(error)}
                            />
                        </Tooltip>
                    )}
                    {...restOfSelectFieldProps}
                    blurOnSelect={!multiple && blurOnSelect}
                />
            </div>

            <FormHelperText
                error={Boolean(error)}
                margin="dense"
                variant={variant}
                focused={Boolean(error)}
                sx={{ marginLeft: "0px !important" }}
            >
                {helperText}
            </FormHelperText>
        </div>
    );
};

LabelledSelectField.defaultProps = {
    label: "test",
    variant: "outlined",
    ref: null,
    error: false,
    helperText: "",
    className: null,
    placeholder: "",
    options: [],
    size: "small",
    required: false,
    multiple: false,
    disableCloseOnSelect: true,
    focusOnError: false,
    allErrors: null,
    errorFocusKey: "",
    openOnFocus: true,
    tooltip: "",
    blurOnSelect: true,
};

export default LabelledSelectField;
