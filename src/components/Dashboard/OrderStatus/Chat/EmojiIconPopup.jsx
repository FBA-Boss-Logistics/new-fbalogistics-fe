import { Box, Button } from "@mui/material";
import React from "react";

const customEmojis = ["😀", "😂", "😍", "😢", "😡", "👍"];
export default function EmojiIconPopup({
    message,
    handleSelectEmoji
}) {
    return (
        <Box
            display="flex"
            alignSelf={"center"}
            justifyContent={"center"}
            alignSelfSelf={"center"}
            p={1.5}
            gap={1}
            id="emoji-popup"
            zIndex={10}
            top="50px"
            right="0px"
            border="1px solid black"
            borderRadius="5px"
            transform="translateY(100%)"
            width="300px"
            height="50px"
            marginBottom={message?.reactions?.length > 0 ? "10px" : "0px"}
            marginLeft={ message?.content && message.attachment ? '5px' : '0px'}
            marginRight={ message?.content && message.attachment ? '5px' : '0px'}
        >
            {customEmojis.map((emoji) => (
                <Button
                    key={emoji}
                    onClick={() => handleSelectEmoji(message.id, emoji)}
                    sx={{
                        justifyContent: "flex-end",
                        fontSize: "1.5rem",
                        minWidth: "auto",
                        height: "25px",
                        width: "40px",
                        padding: "0.5rem",
                        boxShadow: "none",
                        backgroundColor: "white",
                        transition: "background-color 0.3s",
                        "&:hover": {
                            backgroundColor: "#f0f0f0",
                        },
                    }}
                >
                    {emoji}
                </Button>
            ))}
        </Box>
    );
}
