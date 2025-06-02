import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import Loader from "components/Loader";
import { shouldShowProfilePhoto } from "Helper/ChatLogic";
import { useDownloadFile } from "queries/Chat";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { formatDateDivider, formatTimestamp } from "utils";
import ChatAvatar from "./ChatAvatar";
import MessageComponent from "./ChatMessageWithAttachment";
import ReactionChips from "./ReactionChip";

export default function ChatBubble({
    messageData,
    isLoading,
    currentUserRole,
    deleteMessageHandler,
    editMessageHandler,
    handleReaction,
    replyMessageHandler,
    isReply,
}) {
    const location = useLocation();
    let currentDate = null;
    const chatContainerRef = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [emojiAnchorEl, setEmojiAnchorEl] = useState(null);
    const [selectedMessageId, setSelectedMessageId] = useState(null);
    const { mutate } = useDownloadFile();
    const theme = useTheme();

    const previousMessageCountRef = useRef(messageData?.messages?.length);

    useEffect(() => {
        const currentMessageCount = messageData?.messages?.length || 0;
        const shouldScroll =
            currentMessageCount > previousMessageCountRef.current || isReply;
        if (shouldScroll && chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
        }

        if(currentMessageCount > 0 && !isLoading){
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
        
        previousMessageCountRef.current = currentMessageCount;
    }, [messageData?.messages, isReply,isLoading]);

    function downloadFileHandler(id) {
        mutate(id, {
            onSuccess: (data) => {
                window.open(data.data.attachment);
            },
        });
    }

    const handleMenuOpen = (event, messageId) => {
        setAnchorEl(event.currentTarget);
        setSelectedMessageId(messageId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedMessageId(null);
    };

    const handleEmojiButtonClick = (event, id) => {
        if (
            event.target.closest('[aria-label="more"]') ||
            event.target.closest('[aria-label="reply"]') ||
            event.target.closest("a")
        ) {
            return;
        }
        setEmojiAnchorEl(event.currentTarget);
        setSelectedMessageId(id);
    };

    const handleEmojiClose = () => {
        setEmojiAnchorEl(null);
        setSelectedMessageId(null);
    };

    const handleSelectEmoji = (id, emoji) => {
        handleReaction(id, emoji);
        handleEmojiClose();
    };

    useEffect(() => {
        const handleScroll = () => {
            if (emojiAnchorEl) {
                handleEmojiClose();
            }
        };
        const div = chatContainerRef.current;
        if (div) {
            div.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (div) {
                div.removeEventListener("scroll", handleScroll);
            }
        };
    }, [emojiAnchorEl]);

    const isShipperPath = location.pathname.includes("/shipper/");
    const isSellerPath = location.pathname.includes("/seller/");

    const shipperName =
        messageData?.shipper?.first_name +
        " " +
        messageData?.shipper?.last_name;

    const sellerName =
        messageData?.seller?.first_name + " " + messageData?.seller?.last_name;

    const adminName =
        messageData?.admin?.first_name + " " + messageData?.admin?.last_name;

    const userName = {
        Seller: sellerName,
        Admin: adminName,
        Shipper: shipperName,
    };

    return (
        <div
            className="flex gap-3 w-full overflow-y-auto max-h-[calc(100vh)] min-h-full"
            ref={chatContainerRef}
        >
            {isShipperPath ? (
                <div className="p-5 flex flex-col  w-full  ">
                    {!isLoading ? (
                        messageData?.messages?.map((message, i) => {
                            const formattedTime = formatTimestamp(
                                message?.timestamp,
                                true
                            );
                            const formattedDateDivider = formatDateDivider(
                                message?.timestamp
                            );

                            let showDateDivider = false;
                            if (currentDate !== formattedDateDivider) {
                                currentDate = formattedDateDivider;
                                showDateDivider = true;
                            }
                            const isSameUserMessageSender =
                                message.sender_type === currentUserRole;
                            const isCurrentUserMessageSender =
                                shouldShowProfilePhoto(
                                    messageData?.messages,
                                    i,
                                    currentUserRole
                                );
                            return (
                                <div key={message?.id}>
                                    {showDateDivider && (
                                        <div className="text-center my-2 ">
                                            <Typography
                                                color="natural.800"
                                                variant="subtitle2"
                                            >
                                                {formattedDateDivider}
                                            </Typography>
                                        </div>
                                    )}

                                    <div
                                        className={` ${
                                            message?.sender_type === "Seller" ||
                                            message?.sender_type === "Admin"
                                                ? "w-fit"
                                                : "flex flex-col gap-[6px] items-end justify-end mt-1 "
                                        }`}
                                    >
                                        {message?.sender_type === "Seller" && (
                                            <div className="flex my-1">
                                                {/* {isCurrentUserMessageSender && (
                                                    <ChatAvatar
                                                        name={sellerName}
                                                    />
                                                )} */}
                                                <div
                                                    className="flex flex-col pb-1"
                                                    onMouseLeave={
                                                        handleEmojiClose
                                                    }
                                                >
                                                    {isCurrentUserMessageSender && (
                                                        <div className="flex pl-3 justify-between items-start">
                                                            <Typography
                                                                fontSize={14}
                                                                color="natural.800"
                                                                fontWeight={500}
                                                                className="truncate"
                                                                style={{
                                                                    maxWidth:
                                                                        "92px",
                                                                }}
                                                            >
                                                                {sellerName}
                                                            </Typography>
                                                        </div>
                                                    )}
                                                    {
                                                        <MessageComponent
                                                            emojiAnchorEl={
                                                                emojiAnchorEl
                                                            }
                                                            selectedMessageId={
                                                                selectedMessageId
                                                            }
                                                            message={message}
                                                            downloadFileHandler={
                                                                downloadFileHandler
                                                            }
                                                            isCurrentUserMessage={
                                                                !isSameUserMessageSender
                                                            }
                                                            handleMenuOpen={
                                                                handleMenuOpen
                                                            }
                                                            handleMenuClose={
                                                                handleMenuClose
                                                            }
                                                            anchorEl={anchorEl}
                                                            deleteMessageHandler={
                                                                deleteMessageHandler
                                                            }
                                                            editMessageHandler={
                                                                editMessageHandler
                                                            }
                                                            handleEmojiButtonClick={
                                                                handleEmojiButtonClick
                                                            }
                                                            handleEmojiClose={
                                                                handleEmojiClose
                                                            }
                                                            handleSelectEmoji={
                                                                handleSelectEmoji
                                                            }
                                                            replyMessageHandler={
                                                                replyMessageHandler
                                                            }
                                                            userName={userName}
                                                            time={formattedTime}
                                                        />
                                                    }
                                                    {message?.reactions
                                                        ?.length > 0 && (
                                                        <ReactionChips
                                                            reactions={
                                                                message.reactions
                                                            }
                                                            theme={theme}
                                                            isCurrentUserMsg={
                                                                isSameUserMessageSender
                                                            }
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {message?.sender_type === "Admin" && (
                                            <div className="flex my-1">
                                                {isCurrentUserMessageSender && (
                                                    <ChatAvatar
                                                        name={adminName}
                                                    />
                                                )}
                                                <div
                                                    className="flex flex-col pb-1"
                                                    onMouseLeave={
                                                        handleEmojiClose
                                                    }
                                                >
                                                    {isCurrentUserMessageSender && (
                                                        <div className="flex pl-3 justify-between items-start ">
                                                            <Typography
                                                                fontSize={14}
                                                                color="natural.800"
                                                                fontWeight={500}
                                                                className="truncate"
                                                                style={{
                                                                    maxWidth:
                                                                        "92px",
                                                                }}
                                                            >
                                                                {adminName}
                                                            </Typography>
                                                        </div>
                                                    )}
                                                    {
                                                        <MessageComponent
                                                            emojiAnchorEl={
                                                                emojiAnchorEl
                                                            }
                                                            selectedMessageId={
                                                                selectedMessageId
                                                            }
                                                            message={message}
                                                            downloadFileHandler={
                                                                downloadFileHandler
                                                            }
                                                            isCurrentUserMessage={
                                                                !isSameUserMessageSender
                                                            }
                                                            handleMenuOpen={
                                                                handleMenuOpen
                                                            }
                                                            handleMenuClose={
                                                                handleMenuClose
                                                            }
                                                            anchorEl={anchorEl}
                                                            deleteMessageHandler={
                                                                deleteMessageHandler
                                                            }
                                                            editMessageHandler={
                                                                editMessageHandler
                                                            }
                                                            handleEmojiButtonClick={
                                                                handleEmojiButtonClick
                                                            }
                                                            handleEmojiClose={
                                                                handleEmojiClose
                                                            }
                                                            handleSelectEmoji={
                                                                handleSelectEmoji
                                                            }
                                                            replyMessageHandler={
                                                                replyMessageHandler
                                                            }
                                                            userName={userName}
                                                            time={formattedTime}
                                                        />
                                                    }
                                                    {message?.reactions
                                                        ?.length > 0 && (
                                                        <ReactionChips
                                                            reactions={
                                                                message.reactions
                                                            }
                                                            theme={theme}
                                                            isCurrentUserMsg={
                                                                isSameUserMessageSender
                                                            }
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {message?.sender_type === "Shipper" && (
                                            <div className="flex justify-end pb-1 my-1  ">
                                                {isCurrentUserMessageSender && (
                                                    <ChatAvatar
                                                        name={shipperName}
                                                    />
                                                )}
                                                <div
                                                    className="flex flex-col"
                                                    onMouseLeave={
                                                        handleEmojiClose
                                                    }
                                                >
                                                    {
                                                        <MessageComponent
                                                            emojiAnchorEl={
                                                                emojiAnchorEl
                                                            }
                                                            selectedMessageId={
                                                                selectedMessageId
                                                            }
                                                            message={message}
                                                            downloadFileHandler={
                                                                downloadFileHandler
                                                            }
                                                            isCurrentUserMessage={
                                                                !isSameUserMessageSender
                                                            }
                                                            handleMenuOpen={
                                                                handleMenuOpen
                                                            }
                                                            handleMenuClose={
                                                                handleMenuClose
                                                            }
                                                            anchorEl={anchorEl}
                                                            deleteMessageHandler={
                                                                deleteMessageHandler
                                                            }
                                                            editMessageHandler={
                                                                editMessageHandler
                                                            }
                                                            handleEmojiButtonClick={
                                                                handleEmojiButtonClick
                                                            }
                                                            handleEmojiClose={
                                                                handleEmojiClose
                                                            }
                                                            handleSelectEmoji={
                                                                handleSelectEmoji
                                                            }
                                                            replyMessageHandler={
                                                                replyMessageHandler
                                                            }
                                                            userName={userName}
                                                            time={formattedTime}
                                                        />
                                                    }
                                                    {message?.reactions
                                                        ?.length > 0 && (
                                                        <ReactionChips
                                                            reactions={
                                                                message.reactions
                                                            }
                                                            theme={theme}
                                                            isCurrentUserMsg={
                                                                isSameUserMessageSender
                                                            }
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="flex items-center w-full justify-center h-full">
                            <Loader />
                        </div>
                    )}
                </div>
            ) : (
                isSellerPath && (
                    <div className="p-5 flex flex-col w-full gap-2 ">
                        {!isLoading ? (
                            messageData?.messages?.map((message, i) => {
                                const formattedTime = formatTimestamp(
                                    message?.timestamp,
                                    true
                                );
                                const formattedDateDivider = formatDateDivider(
                                    message?.timestamp
                                );

                                let showDateDivider = false;
                                if (currentDate !== formattedDateDivider) {
                                    currentDate = formattedDateDivider;
                                    showDateDivider = true;
                                }
                                const isSameUserMessageSender =
                                    message.sender_type === currentUserRole;

                                const isCurrentUserMessageSender =
                                    shouldShowProfilePhoto(
                                        messageData?.messages,
                                        i,
                                        currentUserRole
                                    );
                                return (
                                    <div key={message?.id}>
                                        {showDateDivider && (
                                            <div className="text-center my-1 mb-6 ">
                                                <Typography
                                                    color="natural.800"
                                                    variant="subtitle2"
                                                    className="text-xs"
                                                >
                                                    <span className="bg-slate-100 rounded-full px-4 py-2">
                                                        {formattedDateDivider}
                                                    </span>
                                                </Typography>
                                            </div>
                                        )}

                                        <div
                                            className={`${
                                                message?.sender_type ===
                                                    "Shipper" ||
                                                message?.sender_type === "Admin"
                                                    ? "w-fit"
                                                    : "flex flex-col gap-[6px] items-end justify-end mt-1 "
                                            }`}
                                        >
                                            {message?.sender_type ===
                                                "Shipper" && (
                                                // <div className="flex bg-yellow-500">
                                                //     {isCurrentUserMessageSender && (
                                                //         <ChatAvatar
                                                //             name={shipperName}
                                                //             active={true}
                                                //         />
                                                //     )}
                                                    <div
                                                        className="flex flex-col "
                                                        onMouseLeave={
                                                            handleEmojiClose
                                                        }
                                                    >
                                                        {/* {isCurrentUserMessageSender && (
                                                            <div className="flex pl-3 justify-between items-start">
                                                                <Typography
                                                                    fontSize={
                                                                        14
                                                                    }
                                                                    color="natural.800"
                                                                    fontWeight={
                                                                        500
                                                                    }
                                                                    className="truncate"
                                                                    style={{
                                                                        maxWidth:
                                                                            "92px",
                                                                    }}
                                                                >
                                                                    {
                                                                        shipperName
                                                                    }
                                                                </Typography>
                                                            </div>
                                                        )} */}
                                                        {
                                                            <MessageComponent
                                                                emojiAnchorEl={
                                                                    emojiAnchorEl
                                                                }
                                                                selectedMessageId={
                                                                    selectedMessageId
                                                                }
                                                                message={
                                                                    message
                                                                }
                                                                downloadFileHandler={
                                                                    downloadFileHandler
                                                                }
                                                                isCurrentUserMessage={
                                                                    !isSameUserMessageSender
                                                                }
                                                                handleMenuOpen={
                                                                    handleMenuOpen
                                                                }
                                                                handleMenuClose={
                                                                    handleMenuClose
                                                                }
                                                                anchorEl={
                                                                    anchorEl
                                                                }
                                                                deleteMessageHandler={
                                                                    deleteMessageHandler
                                                                }
                                                                editMessageHandler={
                                                                    editMessageHandler
                                                                }
                                                                handleEmojiButtonClick={
                                                                    handleEmojiButtonClick
                                                                }
                                                                handleEmojiClose={
                                                                    handleEmojiClose
                                                                }
                                                                handleSelectEmoji={
                                                                    handleSelectEmoji
                                                                }
                                                                replyMessageHandler={
                                                                    replyMessageHandler
                                                                }
                                                                userName={
                                                                    userName
                                                                }
                                                                time={
                                                                    formattedTime
                                                                }
                                                            />
                                                        }
                                                        {message?.reactions
                                                            ?.length > 0 && (
                                                            <ReactionChips
                                                                reactions={
                                                                    message.reactions
                                                                }
                                                                theme={theme}
                                                                isCurrentUserMsg={
                                                                    isSameUserMessageSender
                                                                }
                                                            />
                                                        )}
                                                    </div>
                                                // </div>
                                            )}

                                            {message?.sender_type ===
                                                "Admin" && (
                                                <div className="flex my-1">
                                                    {isCurrentUserMessageSender && (
                                                        <ChatAvatar
                                                            name={adminName}
                                                        />
                                                    )}
                                                    <div
                                                        className="flex flex-col"
                                                        onMouseLeave={
                                                            handleEmojiClose
                                                        }
                                                    >
                                                        {isCurrentUserMessageSender && (
                                                            <div className="flex pl-3 justify-between items-start">
                                                                <Typography
                                                                    fontSize={
                                                                        14
                                                                    }
                                                                    color="natural.800"
                                                                    fontWeight={
                                                                        500
                                                                    }
                                                                    className="truncate"
                                                                    style={{
                                                                        maxWidth:
                                                                            "92px",
                                                                    }}
                                                                >
                                                                    {adminName}
                                                                </Typography>
                                                            </div>
                                                        )}
                                                        {
                                                            <MessageComponent
                                                                emojiAnchorEl={
                                                                    emojiAnchorEl
                                                                }
                                                                selectedMessageId={
                                                                    selectedMessageId
                                                                }
                                                                message={
                                                                    message
                                                                }
                                                                downloadFileHandler={
                                                                    downloadFileHandler
                                                                }
                                                                isCurrentUserMessage={
                                                                    !isSameUserMessageSender
                                                                }
                                                                handleMenuOpen={
                                                                    handleMenuOpen
                                                                }
                                                                handleMenuClose={
                                                                    handleMenuClose
                                                                }
                                                                anchorEl={
                                                                    anchorEl
                                                                }
                                                                deleteMessageHandler={
                                                                    deleteMessageHandler
                                                                }
                                                                editMessageHandler={
                                                                    editMessageHandler
                                                                }
                                                                handleEmojiButtonClick={
                                                                    handleEmojiButtonClick
                                                                }
                                                                handleEmojiClose={
                                                                    handleEmojiClose
                                                                }
                                                                handleSelectEmoji={
                                                                    handleSelectEmoji
                                                                }
                                                                replyMessageHandler={
                                                                    replyMessageHandler
                                                                }
                                                                userName={
                                                                    userName
                                                                }
                                                                time={
                                                                    formattedTime
                                                                }
                                                            />
                                                        }
                                                        {message?.reactions
                                                            ?.length > 0 && (
                                                            <ReactionChips
                                                                reactions={
                                                                    message.reactions
                                                                }
                                                                theme={theme}
                                                                isCurrentUserMsg={
                                                                    isSameUserMessageSender
                                                                }
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {message?.sender_type ===
                                                "Seller" && (
                                                // <div className="flex justify-end my-1">
                                                //     {isCurrentUserMessageSender && (
                                                //         <ChatAvatar
                                                //             name={sellerName}
                                                //             active={true}
                                                //         />
                                                //     )}
                                                    <div
                                                        className="flex flex-col "
                                                        onMouseLeave={
                                                            handleEmojiClose
                                                        }
                                                    >
                                                        {
                                                            <MessageComponent
                                                                emojiAnchorEl={
                                                                    emojiAnchorEl
                                                                }
                                                                selectedMessageId={
                                                                    selectedMessageId
                                                                }
                                                                message={
                                                                    message
                                                                }
                                                                downloadFileHandler={
                                                                    downloadFileHandler
                                                                }
                                                                isCurrentUserMessage={
                                                                    !isSameUserMessageSender
                                                                }
                                                                handleMenuOpen={
                                                                    handleMenuOpen
                                                                }
                                                                handleMenuClose={
                                                                    handleMenuClose
                                                                }
                                                                anchorEl={
                                                                    anchorEl
                                                                }
                                                                deleteMessageHandler={
                                                                    deleteMessageHandler
                                                                }
                                                                editMessageHandler={
                                                                    editMessageHandler
                                                                }
                                                                handleEmojiButtonClick={
                                                                    handleEmojiButtonClick
                                                                }
                                                                handleEmojiClose={
                                                                    handleEmojiClose
                                                                }
                                                                handleSelectEmoji={
                                                                    handleSelectEmoji
                                                                }
                                                                replyMessageHandler={
                                                                    replyMessageHandler
                                                                }
                                                                userName={
                                                                    userName
                                                                }
                                                                time={
                                                                    formattedTime
                                                                }
                                                            />
                                                        }
                                                        {message?.reactions
                                                            ?.length > 0 && (
                                                            <ReactionChips
                                                                reactions={
                                                                    message.reactions
                                                                }
                                                                theme={theme}
                                                                isCurrentUserMsg={
                                                                    isSameUserMessageSender
                                                                }
                                                            />
                                                        )}
                                                    </div>
                                                // </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="flex items-center w-full justify-center h-full">
                                <Loader />
                            </div>
                        )}
                    </div>
                )
            )}
        </div>
    );
}
