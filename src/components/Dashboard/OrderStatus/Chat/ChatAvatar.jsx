import { useTheme } from "@emotion/react";
import { Avatar, Tooltip } from "@mui/material";
import { formatName } from "utils";

const ChatAvatar = ({ name }) => {
    const theme = useTheme();
    const formattedName = name && formatName(name);
    return (
        <div className="relative">
            <Tooltip title={name}>
                <Avatar
                    sx={{
                        width: 32,
                        height: 32,
                        border: 1,
                        bgcolor: theme.palette.primary[100],
                        color: theme.palette.primary[800],
                        borderColor: theme.palette.primary[500],
                        fontWeight: 500,
                        fontSize: "0.75rem",
                        marginLeft: "-32px",
                    }}
                >
                    {formattedName}
                </Avatar>
            </Tooltip>
        </div>
    );
};

export default ChatAvatar;
