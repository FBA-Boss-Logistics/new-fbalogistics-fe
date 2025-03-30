import { Grid, Typography } from "@mui/material";
import { LabelledTextField } from "components";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useFormContext } from "react-hook-form";

const EmailAddress = ({
    inForgot,
    placeholder = "billinginfo@fba",
    startIcon,
    includeLabel,
}) => {
    const {
        formState: { errors },
        register,
    } = useFormContext();
    // const handleChangeValue = (field, value) => {
    //     setValue(field, value, {
    //         shouldValidate: true,
    //     });
    // };
    const { ref: refRegisterEmail, ...RegisterEmail } = register("email");
    if (inForgot)
        /// this is temporary solution (breaking the design for responsiveness)
        return (
            <LabelledTextField
                label={includeLabel && "Email"}
                placeholder={placeholder}
                startIcon={startIcon ? <MailOutlineIcon /> : null}
                inputRef={refRegisterEmail}
                {...RegisterEmail}
                error={Boolean(errors.email)}
                helperText={errors.email && errors.email.message}
            />
        );
    else
        return (
            <Grid container className="mt-2" spacing={0.5}>
                {!inForgot && (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <Typography
                            variant="subtitle2"
                            fontWeight="400"
                            color="gray.500"
                        >
                            Invoices will be sent to this email address.
                        </Typography>
                    </Grid>
                )}

                <Grid item xs={12} sm={6} md={8} lg={9} xl={10}>
                    <LabelledTextField
                        label={includeLabel && "Email"}
                        placeholder={placeholder}
                        startIcon={startIcon ? <MailOutlineIcon /> : null}
                        inputRef={refRegisterEmail}
                        {...RegisterEmail}
                        error={Boolean(errors.email)}
                        helperText={errors.email && errors.email.message}
                    />
                </Grid>
            </Grid>
        );
};

export default EmailAddress;
