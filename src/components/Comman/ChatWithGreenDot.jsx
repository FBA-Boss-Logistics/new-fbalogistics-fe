import React from "react";
import ChatIcon from "../../assets/svg/ChatIcon.svg"; // Adjust the path as needed
import { styled } from "@mui/material/styles";
import { Badge, IconButton } from "@mui/material";

const IconContainer = styled("div")({
    position: "relative",
    display: "inline-block",
    top: "0px",
});

const ChatIconWithDot = ({ handleClick, original }) => (
    <IconContainer>
        <Badge
            badgeContent={original.message_count}
            color="secondary"
            sx={{
                "& .MuiBadge-badge": {
                    color: "white",
                },
            }}
        >
            <IconButton color="inherit"  onClick={() => handleClick(original)}>
                <img
                    src={ChatIcon}
                    className="cursor-pointer w-5"
                    alt="ChatIcon"
                />
            </IconButton>
        </Badge>

    </IconContainer>
);

export default ChatIconWithDot;
