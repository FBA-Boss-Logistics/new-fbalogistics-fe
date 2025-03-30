import DefaultImg from "assets/svg/default.svg";
import { Typography } from "@mui/material";
export default function Default({ title = "You have no Data Yet!" }) {
    return (
        <div className="m-auto flex flex-col items-center">
            <img src={DefaultImg} alt="default" />
            <Typography
                fontSize={"28px"}
                textAlign={"center"}
                color={"secondary.500"}
            >
                {title}
            </Typography>
        </div>
    );
}
