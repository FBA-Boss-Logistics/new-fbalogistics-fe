import MuiPhoneNumber from "material-ui-phone-number";

const PhoneNumberField = (props) => {
    const {
        defaultCountry,
        onChange,
        value,

        variant,

        ...rest
    } = props;

    const handlePhoneNumberChange = (value) => {
        onChange(value); // Pass the 'value' object directly to the parent's onChange
    };

    return (
        <>
            <MuiPhoneNumber
                data-cy="user-phone"
                defaultCountry={defaultCountry}
                value={value} // Pass the 'value' object as it is
                countryCodeEditable={false} // Prevent the user from editing the country code manually
                onChange={handlePhoneNumberChange} // Handle phone number change separately
                fullWidth
                variant={variant}
                {...rest}
            />
        </>
    );
};

export default PhoneNumberField;

PhoneNumberField.defaultProps = {
    variant: "outlined",
    defaultCountry: "in",
    label: "",
};
