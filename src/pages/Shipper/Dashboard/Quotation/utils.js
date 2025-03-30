const convertIntoUnix = (timeStamp) => {
    const dateObject = timeStamp ? new Date(timeStamp) : new Date();
    const unixTime = Math.floor(dateObject.getTime());
    return unixTime;
};

function unixIntoTime(unix) {
    const dateObject = new Date(unix); // Convert seconds to milliseconds by multiplying by 1000

    const year = dateObject.getUTCFullYear();
    const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = dateObject.getUTCDate().toString().padStart(2, "0");

    const hours = dateObject.getUTCHours().toString().padStart(2, "0");
    const minutes = dateObject.getUTCMinutes().toString().padStart(2, "0");
    const seconds = dateObject.getUTCSeconds().toString().padStart(2, "0");

    // UTC Date and Time
    return { year, month, day, hours, minutes, seconds };
}

const addZeroInSingleDigit = (time) => {
    return time.length === 1 ? `0${time}` : time;
};

export { convertIntoUnix, unixIntoTime, addZeroInSingleDigit };
