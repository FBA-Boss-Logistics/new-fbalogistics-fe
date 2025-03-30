import { Checkbox, FormControlLabel, FormHelperText } from "@mui/material";

const ComplianceCheckboxes = ({ options,  setValue, compliance, errors,trigger }) => {
    return (
        <>
            {options.map((option, index) => (
                <FormControlLabel
                    key={index}
                    control={
                        <Checkbox
                            onChange={(e) => {
                                const value = e.target.checked;
                                if (value) {
                                    setValue("compliance", [
                                        ...compliance,
                                        option,
                                    ]);
                                } else {
                                    setValue(
                                        "compliance",
                                        compliance?.filter(
                                            (item) => item !== option
                                        )
                                    );
                                }
                                trigger("compliance");
                            }}
                            checked={
                                Array.isArray(compliance) &&
                                compliance?.includes(option)
                            }
                        />
                    }
                    label={option}
                />
            ))}
            {errors.compliance && (
                <FormHelperText error>
                    {errors.compliance.message}
                </FormHelperText>
            )}
        </>
    );
};

export default ComplianceCheckboxes;
