export const maskAmount = (amount, defaultValue = 0) => {
    return amount
        ? amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        : defaultValue;
};
