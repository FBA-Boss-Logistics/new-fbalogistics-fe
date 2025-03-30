export const showAddress = (location) => {
    const { street_address, city, state, country, zip_code } = location;
    const addressComponents = [];

    if (street_address !== null) {
        addressComponents.push(street_address);
    }

    if (city !== null) {
        addressComponents.push(city);
    }

    if (state !== null) {
        addressComponents.push(state);
    }

    if (country !== null) {
        addressComponents.push(country);
    }

    if (zip_code !== null) {
        addressComponents.push(zip_code);
    }

    return addressComponents.join(" ");
};
