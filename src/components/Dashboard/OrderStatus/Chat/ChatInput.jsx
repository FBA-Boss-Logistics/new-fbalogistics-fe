import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
    TextField,
    IconButton,
    Box,
    InputAdornment,
    Typography,
    Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import CloseIcon from "@mui/icons-material/Close";
import EmojiPicker from "components/Emoji/EmojiPicker";
import PdfIcon from "./PdfIcon";
import { shortenName } from "utils";

const ChatInput = ({
    onSendMessage,
    onUploadFile,
    replyingTo,
    attachment,
    editMessage,
    resetReplyAndEditHandler,
    closeImagePreview,
    acceptedFileType,
    messageData
}) => {
    const { register, handleSubmit, watch, reset, setValue } = useForm();
    const inputRef = useRef(null);
    const message = watch("message", "");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isClosePrevBtn, setIsClosePrevBtn] = useState(false);
    const isImage = acceptedFileType?.includes(attachment?.file_type);

    useEffect(() => {
        editMessage && setValue("message", editMessage);
    }, [editMessage]);

    useEffect(() => {
        inputRef.current.scrollIntoView({ behavior: 'smooth' });
        if(replyingTo.isReply) {
            inputRef.current.focus();
        }
    }, [attachment, messageData?.messages, replyingTo.isReply]);

    useEffect(()=> {
        inputRef.current.focus();
    },[editMessage]);

    const handleSendMessage = (data) => {
        onSendMessage(data.message);
        reset({ message: "" });
    };

    const fileHandler = (event) => {
        setShowEmojiPicker(false);
        const file = event.target.files[0];
        if (file) {
            onUploadFile(file);
        }
    };

    const addEmoji = (emoji) => {
        const messageWithEmoji = message + emoji.native;
        reset({ message: messageWithEmoji });
        inputRef.current.focus();
    };


    const handleImageLoad = () => {
            inputRef.current?.scrollIntoView({ behavior: 'smooth' });
            setIsClosePrevBtn(true);
        };

    const handleCloseReplyEditBtn = () =>{
            reset({ message: "" });
            resetReplyAndEditHandler();
        }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(handleSendMessage)}
            display="flex"
            flexDirection="column"
            position="relative"
        >
            {(replyingTo.isReply || editMessage) && (
                <Paper
                    variant="outlined"
                    style={{
                        padding: "10px",
                        marginBottom: "10px",
                        position: "relative",
                    }}
                >
                    <Typography variant="subtitle2" color="natural.800">
                        {editMessage ? `${editMessage}`  : `Replying to: ${replyingTo.sender_type}` }
                    </Typography>

                    {replyingTo.isReply && <div className="pl-3 mt-1 pr-5 py-[16px] flex items-center justify-start border-solid text-xs font-medium cursor-pointer border-2 border-natural-300 rounded-lg max-w-[650px] ">
                        {replyingTo.type === "text" ? (
                            replyingTo.text
                        ) : (
                            <>
                                <PdfIcon title={replyingTo?.type} />
                                <div className="flex flex-col">
                                    <p>{shortenName(replyingTo?.fileName, 10)}</p>
                                </div>
                            </>
                        )}
                    </div>}

                    <IconButton
                        size="small"
                        style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                        }}
                        onClick={handleCloseReplyEditBtn}
                    >
                        <CloseIcon />
                    </IconButton>
                </Paper>
            )}

            {attachment?.attachment?.length > 0 && (
                <div
                    style={{
                        position: "relative",
                        textAlign: "center",
                        margin: "10px 0",
                    }}
                >
                    {isImage ? (
                        <img
                            src={attachment?.attachment}
                            alt="Preview"
                            style={{
                                width: "350px",
                                maxHeight: "200px",
                                borderRadius: "8px",
                                display: "block",
                                margin: "0 auto",
                            }}
                            value={attachment?.attachment}
                            onLoad={handleImageLoad}
                        />
                    ) : (
                        <div
                            style={{
                                padding: "16px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "2px solid #e0e0e0",
                                borderRadius: "8px",
                                maxWidth: "200px",
                                margin: "0 auto",
                            }}
                        >
                            <PdfIcon title={attachment?.file_type} />
                            <div style={{ flex: "1", marginLeft: "8px" }}>
                                <p>{shortenName(attachment?.file_name, 15)}</p>
                                <p>{attachment?.file_size}</p>
                            </div>
                            <IconButton
                            size="small"
                            style={{
                                position: "absolute",
                                top: "-8px",
                                marginLeft: "200px",
                                backgroundColor: "rgba(255, 255, 255, 0.7)",
                                padding: "2px",
                                borderRadius: "50%",
                                zIndex: 1,
                            }}
                            onClick={closeImagePreview}
                        >
                            <CloseIcon />
                        </IconButton>
                        </div>
                    )}
                    {isClosePrevBtn && attachment?.attachment && (
                        <IconButton
                            size="small"
                            style={{
                                position: "absolute",
                                top: "0px",
                                marginLeft: "145px",
                                backgroundColor: "rgba(255, 255, 255, 0.7)",
                                padding: "2px",
                                borderRadius: "50%",
                                zIndex: 1,
                            }}
                            onClick={()=>{setIsClosePrevBtn(false); closeImagePreview();}}
                        >
                            <CloseIcon />
                        </IconButton>
                    )}
                </div>
            )}

            <TextField
                variant="outlined"
                placeholder="Type your message..."
                fullWidth
                autoComplete="off"
                inputRef={inputRef}
                onFocus={() => !message.trim() && setShowEmojiPicker(false)}
                {...register("message")}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <input
                                accept="*"
                                style={{ display: "none" }}
                                id="icon-button-file"
                                type="file"
                                onChange={fileHandler}
                                value=''
                            />
                            <label htmlFor="icon-button-file">
                                <IconButton color="primary" component="span">
                                    <AttachFileIcon />
                                </IconButton>
                            </label>
                            <IconButton
                                color="primary"
                                onClick={() =>
                                    setShowEmojiPicker(!showEmojiPicker)
                                }
                            >
                                <InsertEmoticonIcon />
                            </IconButton>

                            <IconButton
                                color="primary"
                                type="submit"
                                disabled={!message.trim() && !attachment}
                            >
                                <SendIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            {showEmojiPicker && <EmojiPicker onSelect={addEmoji} />}
        </Box>
    );
};

export default ChatInput;
