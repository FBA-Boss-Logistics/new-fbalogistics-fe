import DatePicker from "react-multi-date-picker";

export default function BasicDatePicker({ setSelectedDate, selectedDate,handlePageFilters,pageFilters }) {
    const handleDateChange = (date) => {
        setSelectedDate(date);
        if (pageFilters.page !== 1) handlePageFilters("page", 1);
      };
    return (
        <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            placeholder="Select Date"
            format="MM/DD/YYYY"
        />
    );
}
