import { createContext, useContext, useState } from "react";

export const SellerContext = createContext();

export const SellerProvider = ({ children }) => {
    const [createSampleShipment, setCreateSampleShipment] = useState(false);
    const [sampleShipment, setSampleShipment] = useState(false);
    return <SellerContext.Provider value={{
        createSampleShipment,
        setCreateSampleShipment,
        sampleShipment,
        setSampleShipment
    }}>
        {children}
    </SellerContext.Provider>
};

export const useSeller = () => {
    return useContext(SellerContext);
};
