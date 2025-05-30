import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import Loader from "components/Loader";
import { Card, CardContent, CardHeader } from "components/ui/card";
import { UpdateShipmentStatusApi } from "queries/Shipper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "routes/RouteConstants";

export default function OrderRadioGroup({ OrderStatusData, id, isLoading }) {
    const searchParams = new URLSearchParams(window.location.search);
    const srcQueryParam = searchParams.get("src");
    const navigate = useNavigate();
    const radioOptions1 = [
        {
            value: "Quotation Received",
            label: "Quote Received",
        },
        {
            value: "Quotation Accepted",
            label: "Quote Accepted",
        },
        { value: "Shipment Completed", label: "Shipment Completed" },
        srcQueryParam === "accepted" && {
            value: "Shipment Cancelled",
            label: "Shipment Cancelled",
        },
    ];
    const radioOptions2 = [
        {
            value: "Quotation Received",
            label: "Shipment Pending",
        },
        {
            value: "Quotation Accepted",
            label: "Shipment Completed",
        },
    ];

    const radioOptions =
        srcQueryParam === "sampleShipments" ? radioOptions2 : radioOptions1;

    const [selectedValue, setSelectedValue] = useState(
        OrderStatusData?.status || ""
    );

    const { mutate: updateStatus } = UpdateShipmentStatusApi();

    const handleRadioChange = (e) => {
        setSelectedValue(e.target.value);
        const payload = {
            data: {
                status: e.target.value,
            },
            id,
        };

        updateStatus({ payload });

        e.target.value === "Shipment Completed" &&
            navigate(routes.SHIPPERPASTORDERS.pathname);
        e.target.value === "Shipment Cancelled" &&
            navigate(routes.SHIPPERDASHBOARD.pathname);
    };

    useEffect(() => {
        setSelectedValue(OrderStatusData?.status || "");
    }, [OrderStatusData]);

    return (
        <div className="border-1 border-primary-100 border-solid rounded-xl bg-natural-25">
            {!isLoading ? (
                <>
                    <Card>
                    <CardHeader>
                        <div className="">
                            <Typography color="primary.900" fontWeight={600}>
                                Status
                            </Typography>
                        </div>
                    </CardHeader>
                    <CardContent>

                    <div className="p-3 flex flex-col ">
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={selectedValue}
                            onChange={handleRadioChange}
                            name="radio-buttons-group"
                        >
                            {radioOptions.map((option, index) => (
                                <FormControlLabel
                                    key={option.value}
                                    value={option.value}
                                    control={<Radio />}
                                    label={option.label}
                                    disabled={index === 0}
                                />
                            ))}
                        </RadioGroup>
                    </div>
                    </CardContent>
                    </Card>
                </>
            ) : (
                <div>
                    <Loader />
                </div>
            )}
        </div>
    );
}
