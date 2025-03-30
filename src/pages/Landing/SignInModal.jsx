import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import BorderButton from "components/BorderButton";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { routes } from "routes/RouteConstants";

const SignInModal = ({ open, handleClose }) => {
    const navigate = useNavigate();
    return (
        <div>
            <Dialog
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth={true}
                maxWidth="xs"
            >
                <DialogTitle>
                    <div>
                        <Typography
                            variant="h5"
                            fontFamily="Sora"
                            fontWeight={600}
                            color="primary.10"
                        >
                            {" "}
                            Log in{" "}
                        </Typography>
                    </div>

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
                    <Divider />

                    <div className="mt-12">
                        <BorderButton
                            onClick={() =>
                                navigate(routes.SELLERLOGIN.pathname)
                            }
                            size="large"
                            variant="contained-outlined"
                        >
                            Customer
                        </BorderButton>
                    </div>

                    <div className="pt-6">
                        <BorderButton
                            onClick={() =>
                                navigate(routes.SHIPPERLOGIN.pathname)
                            }
                            size="large"
                            variant="secondary-outlined"
                        >
                            Shipping Agent
                        </BorderButton>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SignInModal;
