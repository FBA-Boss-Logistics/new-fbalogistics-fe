import { useFormContext } from "react-hook-form";
import OtpInput from "react-otp-input";
import { useEffect, useState } from "react";
import { FormHelperText, Typography } from "@mui/material";
import { intervalToDuration } from "date-fns";
import { useLocalStorage } from "hooks";
import { useInterval } from "hooks/useInterval";

const zeroPad = (num, places) => String(num).padStart(places, "0");

const formattedTime = (seconds) => {
    const duration = intervalToDuration({ start: 0, end: seconds * 1000 });

    return `${zeroPad(duration.minutes, 2)}:${zeroPad(duration.seconds, 2)}`;
};

const InputOtp = ({ handleSubmitResendOtp }) => {
    const [isTimerPlaying, setIsTimerPlaying] = useState(false);
    const [otpTimer, setOtpTimer] = useLocalStorage(
        "otp-timer-forgot-password",
        120
    );
    const [inputOtp, setInputOtp] = useState("");
    const {
        setValue,
        formState: { errors },
    } = useFormContext();
    const handleChangeValue = (field, value, shouldValidate = true) => {
        setValue(field, value, { shouldValidate: shouldValidate });
    };
    useEffect(() => {
        if (inputOtp) {
            handleChangeValue("otp", inputOtp);
        }
    }, [inputOtp]);
    useInterval(
        () => {
            if (otpTimer > 0) {
                setOtpTimer((prevOtpTimer) => prevOtpTimer - 1);
            } else {
                setIsTimerPlaying(false);
            }
        },
        isTimerPlaying ? 1000 : null
    );

    useEffect(() => {
        if (otpTimer > 0) {
            setIsTimerPlaying(true);
        }
    }, []);
    const handleKeyPress = (e) => {
        const pattern = /[0-9]/;
        const inputChar = String.fromCharCode(e.charCode);
        if (!pattern.test(inputChar)) {
            e.preventDefault();
        }
    };
    const handleResendOTP = () => {
        setOtpTimer(120);
        setIsTimerPlaying(true);
        handleSubmitResendOtp();
    };

    return (
        <>
            <Typography fontSize={18} fontWeight={500} marginLeft={1}>
                OTP
            </Typography>
            <OtpInput
                value={inputOtp}
                onChange={setInputOtp}
                numInputs={4}
                renderSeparator={<></>}
                renderInput={(props) => (
                    <input
                        {...props}
                        placeholder="0"
                        type="text"
                        onKeyPress={handleKeyPress}
                        className="!w-20 h-20 border border-primary-500 mx-2 mt-1 mb-1 rounded-lg outline-none text-4xl text-primary-500"
                    />
                )}
            />
            <FormHelperText
                error={Boolean(errors.otp)}
                margin="dense"
                // variant={variant}
                sx={{ marginLeft: "3px" }}
            >
                {errors.otp && errors.otp.message}
            </FormHelperText>
            <Typography
                fontSize={16}
                color="natural.500"
                fontWeight={400}
                textAlign="center"
                className="mt-4 mb-2"
            >
                Please do not share this code with anyone. FBA <br />
                and its associates will never ask for your <br />
                verification code.{" "}
            </Typography>

            <Typography
                fontSize={16}
                color="natural.500"
                fontWeight={400}
                marginLeft={1}
                textAlign="center"
            >
                Didn’t receive the email?{" "}
                {otpTimer > 0 ? (
                    <span className="text-primary-800 font-semibold">
                        {formattedTime(otpTimer)}
                    </span>
                ) : (
                    <span
                        onClick={handleResendOTP}
                        className="text-primary-500 font-semibold cursor-pointer"
                    >
                        Resend OTP
                    </span>
                )}
            </Typography>
        </>
    );
};
export default InputOtp;
