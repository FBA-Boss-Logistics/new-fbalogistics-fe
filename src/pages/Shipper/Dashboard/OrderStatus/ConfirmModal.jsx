import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import OrderSvg from "assets/svg/check-circle-broken.svg";

export default function ConfirmModal({ open, onClose, handleYes }) {
    return (
        <Dialog
            open={open}
            sx={{
                zIndex: 99999999999,
            }}
        >
            <DialogTitle>
                <div className="flex justify-between">
                    <div className="flex justify-stretch items-center gap-2">
                        <img src={OrderSvg} alt="svg" />
                        <Typography className="text-natural-800 font-bold">
                            Shipment Complete
                        </Typography>
                    </div>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent className="flex flex-col gap-4">
                <DialogContentText className="mb-2">
                    <Typography className="text-natural-800">
                        Are you sure you want to mark this shipment complete?
                    </Typography>
                </DialogContentText>
                <div className="flex items-center gap-2 ">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 flex items-center justify-center rounded-full hover:bg-[#fff] cursor-pointer border"
                    >
                        No
                    </button>
                    <button
                        onClick={handleYes}
                        style={{ color: "white" }}
                        className="flex-1 py-3 flex items-center justify-center rounded-full hover:bg-primary-500 cursor-pointer border-primary-600 border border-solid bg-primary-600"
                    >
                        Yes
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
