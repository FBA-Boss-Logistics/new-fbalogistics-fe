import { Chip, Step, StepLabel, Stepper, Typography } from "@mui/material";
import StepIcon from "assets/svg/stepicon.svg";
import LastStepIcon from "assets/svg/laststepicon.svg";
import { useLocation } from "react-router-dom";
import { Card, CardHeader } from "components/ui/card";

function PastStatusConnector() {
    return <div className="h-6   border-dashed border-l-2 border-primary-500 ml-4"></div>;
}

function BookingPastStatusConnector() {
    return <div className="h-6 border-dashed border-l-2  ml-3"></div>;
}

function PastStatusIcon() {
    return <img src={StepIcon} alt="icon" width={32} />;
}

export function CompleteStepIcon() {
    return <img src={LastStepIcon} alt="icon" width={32} />;
}

export default function PastStatus({ status }) {
    const location = useLocation();

    const currentUrl = location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    const srcQueryParam = searchParams.get("src");
    const isShipmentHistoriesPresent =
        location.pathname.includes("shipmenthistories");
    const radioOptions = [
        { value: "received", label: "Shipment Pending", uniqueId: 0 },
        srcQueryParam !== "sampleShipments" && {
            value: "received",
            label: "Quotation Received",
            uniqueId: 1,
        },
        srcQueryParam !== "sampleShipments" && {
            value: "approved",
            label: "Quotation Approved",
            uniqueId: 100,
        },
        srcQueryParam !== "sampleShipments" && {
            value: "accepted",
            label: "Quotation Accepted",
            uniqueId: 2,
        },
        ((srcQueryParam !== "cancelledorders" &&
            srcQueryParam !== "accepted") ||
            status === "Shipment Completed") && {
            value: "completed",
            label: "Shipment Completed",
            uniqueId: 3,
        },
        (srcQueryParam === "cancelledorders" ||
            status === "Shipment Cancelled") &&
            srcQueryParam !== "sampleShipments" && {
                value: "cancelled",
                label: "Shipment Cancelled",
                uniqueId: 4,
            },
    ];

    return (
        <div >
            <Card className="w-full p-6">
                {/* <CardHeader> */}
                <div className="flex flex-row justify-between">
                    <Typography color="primary.900" fontWeight={600}>
                        Shipment Status
                    </Typography>
                    <Chip label={status} className="bg-primary-200 text-primary-600 border-none font-semibold " variant="outlined" />
                </div>
                {/* </CardHeader> */}
            <div className="flex flex-col ">
                <Stepper
                    activeStep={3}
                    orientation="vertical"
                    connector={
                        currentUrl.includes("/booking/status") ? (
                            <BookingPastStatusConnector />
                        ) : (
                            <PastStatusConnector />
                        )
                    }
                >
                    {radioOptions.map(
                        (el, i) =>
                            el && (
                                <Step key={el.value}>
                                    <StepLabel
                                        StepIconComponent={
                                            i <=
                                            radioOptions.findIndex(
                                                (option) =>
                                                    option.label === status
                                            )
                                                ? CompleteStepIcon
                                                : PastStatusIcon
                                        }
                                    >
                                        <span
                                            style={{
                                                color:
                                                    i <=
                                                    radioOptions.findIndex(
                                                        (option) =>
                                                            option.label ===
                                                            status
                                                    )
                                                        ? "black"
                                                        : "grey",
                                            }}
                                        >
                                            {el.label} 
                                        </span>
                                    </StepLabel>
                                </Step>
                            )
                    )}
                </Stepper>
            </div>
            </Card>
        </div>
    );
}
