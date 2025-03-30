import React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Box } from "@mui/material";

const EmojiPicker = ({ onSelect }) => {
    return (
        <Box position="absolute" bottom="60px" right="10px">
            <Picker data={data} onEmojiSelect={onSelect} />
        </Box>
    );
};

export default EmojiPicker;
