import { Box, Typography, Chip, Paper, useMediaQuery } from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import completed from "../../../../assets/svg/completed.svg"
import pending from "../../../../assets/svg/pending.svg"

const TrackingStatus = ({status}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const steps = [
    { label: "Shipment Pending", completed: status === "Warehouse Pending" || status === "Warehouse Picked Up" || status === "Warehouse Completed" },
    { label: "Shipment Picked Up", completed: status === "Warehouse Picked Up" || status === "Warehouse Completed" },
    { label: "Quotation Received", completed: status === "Warehouse Completed" },
  ]

  const getLabel = (status) => {
    if (isMobile) {
      if (status === "Warehouse Pending") return "Pending";
      if (status === "Warehouse Picked Up") return "On Delivery";
      if (status === "Warehouse Completed") return "Completed";
    } else {
      if (status === "Warehouse Pending") return "Shipment Pending";
      if (status === "Warehouse Picked Up") return "Shipment Picked Up";
      if (status === "Warehouse Completed") return "Shipment Completed";
    }
  }

  const isFirst = (index) => index === 0;
  const isLast = (index) => index === steps.length - 1;

  return (
    <div className="w-full">
    <Paper elevation={0} sx={{ p: 3, mx: "auto", mt: 3, borderRadius: "8px", border: "1px solid #F2F2F2" }}>
      {/* Header Section */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#333" }}>
            Shipment Status
          </Typography>
          <Chip
            label={getLabel(status)}
            sx={{
              backgroundColor: status === "Warehouse Pending" || status === "Warehouse Picked Up" ? "#fff3e0" : "#4FA6831F",
              color: status === "Warehouse Pending" || status === "Warehouse Picked Up" ? "#f57c00" : "#4FA683",
              fontWeight: 400,
              fontSize: "0.75rem",
            }}
          />
        </Box>
        <Typography variant="body2" sx={{ color: "#666" }}>
          Order ID: 122
        </Typography>
      </Box>

      {/* Custom Stepper */}
      <Box sx={{ mt: 4, position: "relative", width: "100%" }}>
        {/* Connector Lines */}
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            // left: "calc(16.67% + 12px)",
            // right: "calc(16.67% + 12px)",
            left: "0",
            right: "0",
            // px: "calc(16.67% / 2 + 12px)", // space around the icons
            height: "4px",
            zIndex: 0,
          }}
        >
          {/* First connector (green) */}
          <Box
            sx={{
              position: "absolute",
              left: 0,
              width: "50%",
              height: "4px",
              backgroundColor: status === "Warehouse Picked Up" || status === "Warehouse Completed" ? "#4FA683" : "#FAFAFA",
              borderRadius: "1px",
            }}
          />
          {/* Second connector (gray) */}
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              width: "50%",
              height: "4px",
              backgroundColor: status === "Warehouse Completed" ? "#4FA683" : "#FAFAFA",
              borderRadius: "1px",
            }}
          />
        </Box>

        {/* Steps */}
        <Box
          className="!shadow-none"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            boxShadow: "none !important",
            position: "relative",
            pb: "20px",
            zIndex: 1,
            flexWrap: "wrap"
          }}
        >
          {steps.map((step, index) => (
            <>
                <Box
                key={index}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "2%",
                }}
                >
                {/* Step Icon */}
                <Box>
                    {step.completed ? (
                        <div className="w-6 h-6 bg-[#4FA683] rounded-full flex items-center justify-center">
                            <img src={completed} alt="completed" className="w-4 h-4" />
                        </div>
                    ) : (
                        <div className="w-6 h-6 bg-[#FAFAFA] rounded-full flex items-center justify-center">
                            <img src={pending} alt="pending" className="w-6 h-6" />
                        </div>
                    )}
                </Box>

                {/* Step Label */}
                <Typography
                    sx={{
                    display: {
                      xs: "none",
                      sm: "inline",
                      md: "inline",
                    },
                    whiteSpace: "nowrap",
                    width: "auto",
                    position: "absolute",
                    fontSize: "14px",
                    color: "#666",
                    fontWeight: 500,
                    mt: "12px",
                    // textAlign: isFirst(index) ? "right" : isLast(index) ? "left" : "center",
                    top: "24px",
                    left: isFirst(index) ? "0%" : isLast(index) ? "100%" : "50%",
                    transform: isFirst(index) ? "translateX(0%)" : isLast(index) ? "translateX(-100%)" : "translateX(-50%)",
                    }}
                >
                    {step.label}
                </Typography>
                </Box>
            </>
          ))}
        </Box>
      </Box>
    </Paper>
    </div>
  )
}

export default TrackingStatus
