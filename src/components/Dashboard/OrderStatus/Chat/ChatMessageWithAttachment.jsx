import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReplyIcon from "@mui/icons-material/Reply";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import LinkifyContent from "components/Comman/LinkifyContent";
import PropTypes from "prop-types";
import { isEmojiHandler, shortenName } from "utils";
import CheckIcon from "./checkIcon";
import EmojiIconPopup from "./EmojiIconPopup";
import PdfIcon from "./PdfIcon";

const MessageComponent = ({
    message,
    downloadFileHandler,
    isCurrentUserMessage,
    anchorEl,
    handleMenuClose,
    handleMenuOpen,
    editMessageHandler,
    deleteMessageHandler,
    selectedMessageId,
    handleEmojiButtonClick,
    handleEmojiClose,
    handleSelectEmoji,
    replyMessageHandler,
    emojiAnchorEl,
    userName,
    time,
}) => {
    const isOnlyEmojiContent = isEmojiHandler(message?.content);
    const background_Color = isCurrentUserMessage
        ? "natural.300"
        : "natural.100";

    return (
        <div
            className={`flex ${isCurrentUserMessage ? "flex-row-reverse" : ""}`}
        >
            {Boolean(emojiAnchorEl) && selectedMessageId === message.id && (
                <EmojiIconPopup
                    message={message}
                    handleSelectEmoji={handleSelectEmoji}
                />
            )}
            <div className="relative flex items-start" key={message.id}>
                {message?.attachment ? (
                    <>
                        {message.content?.length > 0 ? (
                            <>
                                <Box
                                    sx={{
                                        backgroundColor: background_Color,
                                        padding: "10px",
                                        borderRadius: "12px",
                                    }}
                                >
                                    <Typography variant="body2">
                                        {message?.attachment && (
                                            <div
                                                className="flex items-center justify-start mt-1"
                                                onClick={() =>
                                                    downloadFileHandler(
                                                        message.attachment.id
                                                    )
                                                }
                                            >
                                                <PdfIcon
                                                    title={
                                                        message?.attachment
                                                            ?.file_type
                                                    }
                                                />
                                                <div
                                                    className="flex flex-col w-[200px]"
                                                    onMouseEnter={(e) =>
                                                        handleEmojiButtonClick(
                                                            e,
                                                            message.id
                                                        )
                                                    }
                                                >
                                                    <p>
                                                        {shortenName(
                                                            message?.attachment
                                                                ?.file_name,
                                                            15
                                                        )}
                                                        .
                                                        {
                                                            message?.attachment
                                                                ?.file_type
                                                        }
                                                    </p>
                                                    <p className="uppercase font-light">
                                                        {
                                                            message?.attachment
                                                                ?.file_size
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        <LinkifyContent
                                            content={message?.content}
                                        />
                                        <span>
                                            <Typography
                                                fontWeight={400}
                                                fontSize={12}
                                                color="natural.500"
                                                display={"flex"}
                                                justifyContent={"end"}
                                                marginTop={"5px"}
                                                marginRight={"5px"}
                                            >
                                                <CheckIcon
                                                    readBy={
                                                        message.read_by?.length
                                                    }
                                                    time={time}
                                                    isCurrentUser={
                                                        isCurrentUserMessage
                                                    }
                                                />
                                            </Typography>
                                        </span>
                                    </Typography>
                                </Box>
                            </>
                        ) : (
                            <div
                                onClick={() =>
                                    downloadFileHandler(message.attachment.id)
                                }
                                className={`pl-2 ${
                                    !isCurrentUserMessage
                                        ? "ml-2 mr-0"
                                        : "ml-0 mr-2"
                                } py-[6px] flex items-center justify-start gap-1 border-solid bg-natural-${
                                    isCurrentUserMessage ? "300" : "100"
                                } text-xs font-medium cursor-pointer border-2 border-natural-400 rounded-lg max-w-[550px]`}
                            >
                                <PdfIcon
                                    title={message?.attachment?.file_type}
                                />
                                <div
                                    className="flex flex-col w-[200px]"
                                    onMouseEnter={(e) =>
                                        handleEmojiButtonClick(e, message.id)
                                    }
                                >
                                    <p>
                                        {shortenName(
                                            message?.attachment?.file_name,
                                            20
                                        )}
                                        .{message?.attachment?.file_type}
                                    </p>
                                    <p className="uppercase font-light">
                                        {message?.attachment?.file_size}
                                    </p>

                                    <Typography
                                        fontWeight={400}
                                        fontSize={12}
                                        color="natural.500"
                                        display={"flex"}
                                        justifyContent={"end"}
                                        marginTop={"20px"}
                                        marginRight={"5px"}
                                    >
                                        <CheckIcon
                                            readBy={message.read_by?.length}
                                            time={time}
                                            isCurrentUser={isCurrentUserMessage}
                                        />
                                    </Typography>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <Typography
                        sx={{
                            paddingY: "10px",
                            paddingX: "14px",
                            backgroundColor: background_Color,
                            borderRadius: isCurrentUserMessage
                                ? "0 8px 8px 8px"
                                : "8px 0 8px 8px",
                            maxWidth: "550px",
                            minWidth: "100px",
                            marginLeft: isCurrentUserMessage ? "auto" : "10px",
                            marginRight: isCurrentUserMessage ? "5px" : "auto",
                            position: "relative",
                            paddingRight: "20px",
                            display: "inline-block",
                            wordBreak: "break-word",
                        }}
                        fontSize={isOnlyEmojiContent ? 30 : 16}
                    >
                        {message.parent ? (
                            <>
                                <Box
                                    sx={{
                                        backgroundColor: "grey.300",
                                        padding: "10px",
                                        borderRadius: "12px",
                                        marginBottom: "8px",
                                        marginLeft: "10px",
                                        marginRight: "12px",
                                        maxWidth: "550px",
                                        minWidth: "200px",
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        fontWeight="bold"
                                        onMouseEnter={(e) =>
                                            handleEmojiButtonClick(
                                                e,
                                                message.id
                                            )
                                        }
                                    >
                                        {userName[
                                            message.parent?.sender_type
                                        ] || ""}
                                    </Typography>
                                    <Typography variant="body2">
                                        {message?.parent?.attachment && (
                                            <div className="flex items-center justify-start">
                                                <PdfIcon
                                                    title={
                                                        message?.parent
                                                            ?.attachment
                                                            ?.file_type
                                                    }
                                                />
                                                <span className="flex flex-col w-[200px]">
                                                    {shortenName(
                                                        message?.parent
                                                            ?.attachment
                                                            ?.file_name || "",
                                                        20
                                                    )}
                                                    .
                                                    {
                                                        message?.parent
                                                            ?.attachment
                                                            ?.file_type
                                                    }
                                                </span>
                                            </div>
                                        )}

                                        <LinkifyContent
                                            content={message.parent?.content}
                                        />
                                    </Typography>
                                </Box>

                                <Typography variant="body2">
                                    <LinkifyContent
                                        content={message?.content}
                                    />
                                    <Typography
                                        fontWeight={400}
                                        fontSize={12}
                                        color="natural.500"
                                        display={"flex"}
                                        justifyContent={"end"}
                                        marginTop={"5px"}
                                        marginRight={"5px"}
                                    >
                                        <CheckIcon
                                            readBy={message.read_by?.length}
                                            time={time}
                                            isCurrentUser={isCurrentUserMessage}
                                        />
                                    </Typography>
                                </Typography>
                            </>
                        ) : (
                            <span
                                onMouseEnter={(e) =>
                                    handleEmojiButtonClick(e, message.id)
                                }
                            >
                                <LinkifyContent content={message?.content} />
                                <Typography
                                    fontWeight={400}
                                    fontSize={12}
                                    color="natural.500"
                                    display={"flex"}
                                    justifyContent={"end"}
                                    marginTop={"5px"}
                                    marginRight={"5px"}
                                >
                                    <CheckIcon
                                        readBy={message.read_by?.length}
                                        time={time}
                                        isCurrentUser={isCurrentUserMessage}
                                    />
                                </Typography>
                            </span>
                        )}
                    </Typography>
                )}

                {isCurrentUserMessage && (
                    <IconButton
                        aria-label="reply"
                        aria-controls="reply-message"
                        aria-haspopup="true"
                        onClick={() => {
                            replyMessageHandler(message);
                            handleMenuClose();
                        }}
                        className="absolute top-0 right-0"
                        sx={{ marginLeft: "auto" }}
                    >
                        <ReplyIcon />
                    </IconButton>
                )}

                {!isCurrentUserMessage && (
                    <>
                        <IconButton
                            aria-label="more"
                            aria-controls="message-menu"
                            aria-haspopup="true"
                            onClick={(e) => {
                                handleEmojiClose();
                                handleMenuOpen(e, message.id);
                            }}
                            className="absolute top-0 right-0"
                            sx={{ marginLeft: "auto" }}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="message-menu"
                            anchorEl={anchorEl}
                            color="white"
                            keepMounted
                            open={
                                Boolean(anchorEl) &&
                                selectedMessageId === message.id
                            }
                            onClose={handleMenuClose}
                            sx={{
                                "& .MuiPaper-root": {
                                    boxShadow: "none",
                                    backgroundColor: "white",
                                },
                            }}
                        >
                            {message?.read_by?.length < 2 &&
                                !message?.attachment && (
                                    <MenuItem
                                        onClick={() => {
                                            editMessageHandler(message);
                                            handleMenuClose();
                                        }}
                                    >
                                        Edit
                                    </MenuItem>
                                )}
                            <MenuItem
                                onClick={() => {
                                    replyMessageHandler(message);
                                    handleMenuClose();
                                }}
                            >
                                Reply
                            </MenuItem>
                            {message?.read_by?.length < 2 && (
                                <MenuItem
                                    onClick={() => {
                                        deleteMessageHandler(message);
                                        handleMenuClose();
                                    }}
                                >
                                    Delete
                                </MenuItem>
                            )}
                        </Menu>
                    </>
                )}

                {/* {Boolean(emojiAnchorEl) && (
                <Popover
                    id={selectedMessageId}
                    open={
                        Boolean(emojiAnchorEl) &&
                        selectedMessageId === message.id
                    }
                    anchorEl={emojiAnchorEl}
                    onClose={handleEmojiClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    disableAutoFocus={true}
                    disableEnforceFocus={true}
                    disableRestoreFocus={true}
                >
                    <Box display="flex" p={1.5} gap={1} id="emoji-popup">
                        {customEmojis.map((emoji) => (
                            <Button
                                key={emoji}
                                onClick={() =>
                                    handleSelectEmoji(message.id, emoji)
                                }
                                sx={{
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
                </Popover>
            )} */}
            </div>
        </div>
    );
};

MessageComponent.propTypes = {
    message: PropTypes.shape({
        attachment: PropTypes.shape({
            id: PropTypes.string.isRequired,
            file_type: PropTypes.string,
            file_name: PropTypes.string,
            file_size: PropTypes.string,
        }),
        content: PropTypes.string,
    }).isRequired,
    downloadFileHandler: PropTypes.func.isRequired,
};

export default MessageComponent;
