const formatAddress = (addDetails) => {
    const {
        line1 = "-",
        city = "-",
        state = "-",
        postal_code = "-",
        country = "-",
    } = addDetails || {};

    return `${line1 ? `${line1},` : ""} ${city ? `${city},` : ""} ${
        state ? `${state},` : ""
    } ${postal_code ? `${postal_code},` : ""} ${country ? `${country}` : ""}`;
};

const formatTimestamp = (timestamp, isDay= false) => {
    const date = new Date(timestamp);
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const day = days[date.getDay()];
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const meridiem = hours >= 12 ? "pm" : "am";
    const formattedHours = (hours % 12 || 12).toString();
    return  isDay ? `${formattedHours}:${minutes}${meridiem}` : `${day} ${formattedHours}:${minutes}${meridiem}`;
};

const formatDateDivider = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
};

const formatName = (name) => `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;

function getCurrentFormattedTime() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const displayHours = hours % 12 || 12;
    const formattedTime = `${daysOfWeek[dayOfWeek]} ${displayHours}:${
        minutes < 10 ? "0" : ""
    }${minutes}${ampm}`;
    return formattedTime;
}

const formatDateString = (dateString, formatType) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;

    if (formatType === "long") {
        return `${month} ${day
            .toString()
            .padStart(2, "0")} ${year} at ${hours}:${minutes
            .toString()
            .padStart(2, "0")}${ampm}`;
    } else if (formatType === "short") {
        return `${month.slice(0, 3)} ${day
            .toString()
            .padStart(2, "0")} ${year}`;
    } else {
        throw new Error("Invalid format type");
    }
};

// Function to format a date
const formatDate = (inputDate) => {
    const dateParts = inputDate?.split("-"); // Split the input date by hyphens
    if (dateParts?.length === 3) {
        // Check if the date has three parts (year, month, day)
        const [year, month, day] = dateParts;
        return `${month}-${day}-${year}`;
    } else {
        // Invalid date format, return the input as-is
        return inputDate;
    }
};

const formatLongDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0"); // Ensure two digits
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
};

function extractNameFromNotification(message) {
    const regex = /from (.*?):/;
    const match = message.match(regex);
    if (match && match[1]) {
        return match[1].trim();
    }
    return null;
}

function isEmojiHandler(str) {
    const emojiRegex =
      /^[\u{1F600}-\u{1F64F}|\u{1F300}-\u{1F5FF}|\u{1F680}-\u{1F6FF}|\u{1F700}-\u{1F77F}|\u{1F780}-\u{1F7FF}|\u{1F800}-\u{1F8FF}|\u{1F900}-\u{1F9FF}|\u{1FA00}-\u{1FA6F}|\u{1FA70}-\u{1FAFF}|\u{2600}-\u{26FF}|\u{2700}-\u{27BF}]+$/u;
    return emojiRegex.test(str);
  }

  function shortenName(name, maxLength) {
    if (name?.length <= maxLength) {
        return name;
    }

    const keepLength = Math.floor((maxLength - 3) / 2);
    const start = name.slice(0, keepLength);
    const end = name.slice(-keepLength);

    return `${start}...${end}`;
}

const parseTextWithUrls = (text) => {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlPattern);
  
    return parts.map((part, index) =>
      urlPattern.test(part) ? (
        <a key={index} href={part} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      ) : (
        part
      )
    );
  };
  
export {
    formatAddress,
    formatTimestamp,
    formatDateDivider,
    formatName,
    getCurrentFormattedTime,
    formatDateString,
    formatDate,
    formatLongDate,
    extractNameFromNotification,
    isEmojiHandler,
    shortenName,
    parseTextWithUrls,
};
