import { useEffect, useState } from "react";
import { addZeroInSingleDigit, convertIntoUnix } from "./utils";

const totalDurationInMiliSeconds = 72 * 3600 * 1000;
const initialTimeLeft = {
    hours: "00",
    minutes: "00",
    seconds: "00",
};

function useCountdownTimer(unixTimestamp) {
    const [timeLeft, setTimeLeft] = useState(initialTimeLeft);

    useEffect(() => {
        let timerInterval;
        const calculateTimeLeft = () => {
            const currentTimeStamp = convertIntoUnix();
            const remainingMilliseconds =
                unixTimestamp + totalDurationInMiliSeconds - currentTimeStamp;

            // Convert milliseconds to seconds
            const remainingSeconds = Math.floor(remainingMilliseconds / 1000);
            if (remainingSeconds <= 0) {
                clearInterval(timerInterval);
                setTimeLeft(initialTimeLeft);
            } else {
                const hoursTime = Math.floor(
                    remainingSeconds / 3600
                ).toString();
                const minutesTime = Math.floor(
                    (remainingSeconds % 3600) / 60
                ).toString();
                const secondsTime = (remainingSeconds % 60).toString();
                const hours = addZeroInSingleDigit(hoursTime);
                const minutes = addZeroInSingleDigit(minutesTime);
                const seconds = addZeroInSingleDigit(secondsTime);

                setTimeLeft({ hours, minutes, seconds });
            }
        };
        calculateTimeLeft();
        timerInterval = setInterval(calculateTimeLeft, 1000);
        return () => {
            clearInterval(timerInterval);
        };
    }, [unixTimestamp]);

    return timeLeft;
}

export default useCountdownTimer;
