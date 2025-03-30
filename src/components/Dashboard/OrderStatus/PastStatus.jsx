import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import StepIcon from "assets/svg/stepicon.svg";
import LastStepIcon from "assets/svg/laststepicon.svg";
import { useLocation } from "react-router-dom";

function PastStatusConnector() {
    return <div className="h-6 w-[2px] rounded-s-sm bg-[#E9B744] ml-4"></div>;
}

function BookingPastStatusConnector() {
    return <div className="h-6 w-[2px] rounded-s-sm bg-success-500 ml-4"></div>;
}

function PastStatusIcon() {
    return <img src={StepIcon} alt="icon" />;
}

export function CompleteStepIcon() {
    return <img src={LastStepIcon} alt="icon" />;
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
        <div className="w-full border-1 border-natural-100 border-solid rounded-xl bg-natural-25">
            <div className="bg-natural-100 border-natural-100 border-solid rounded-t-xl pt-2 pb-2 pr-3 pl-3 ">
                <Typography color="primary.900" fontWeight={600}>
                    Status
                </Typography>
            </div>
            <div className="p-3 flex flex-col ">
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
        </div>
    );
}
