import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import BorderButton from "components/BorderButton";
import { useNavigate } from "react-router-dom";
import FormSubmitSvg from "assets/icons/FormSubmitSvg.svg";
import { routes } from "routes/RouteConstants";

const SubmitModal = ({ open, handleClose }) => {
    const navigate = useNavigate();

    const handleNavigateBooking = () => {
        navigate(routes.BOOKING.pathname);
    };
    return (
        <div>
            <Dialog
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth={true}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "365px",
                        },
                    },
                }}
            >
                <DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <div>
                        <img src={FormSubmitSvg} alt="formSubmit" />
                    </div>

                    <div className="w-[316px] mt-5 py-4">
                        <Typography
                            fontSize={18}
                            fontWeight={500}
                            color="natural.500"
                            textAlign="center"
                        >
                            Thank you for submitting your booking request, you
                            will receive your shipment quote in 72 hours.
                        </Typography>
                    </div>

                    <div className="mt-6">
                        <BorderButton
                            variant="contained-outlined"
                            onClick={handleNavigateBooking}
                        >
                            My Booking
                        </BorderButton>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SubmitModal;
