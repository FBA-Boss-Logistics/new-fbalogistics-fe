import ChatBubble from "./ChatBubble";
import {
    FetchSampleShipmentMessageListApi,
    FetchShipmentMessageListApi,
    useUploadFile,
} from "queries/Chat";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import ChatInput from "./ChatInput";
import { getLocalStorageItem } from "hooks";
import { localStorageKeys } from "constants";
import useChatWebSocket from "hooks/useWebSocket";

const fileType =['jpeg', 'jpg', 'gif', 'png', 'webp', 'bmp', 'svg+xml']

export default function ChatWindow() {
    const userRole = getLocalStorageItem(localStorageKeys.USER_DETAILS);
    const token = getLocalStorageItem(localStorageKeys.AUTH_TOKEN);
    const { id } = useParams();
    const { mutate } = useUploadFile();
    const [file, setFile] = useState(null);
    const [editMessage, setEditMessage] = useState({
        isEditMessage: false,
        prevMessage: null,
        messageId: null,
        isReply: false,
    });
    const [reply, setReply] = useState({
        text: null,
        type: null,
        fileName: null,
        id: null,
        isReply: false,
    });
    let chatData = null;
    let isLoading = null;
    const searchParams = new URLSearchParams(window.location.search);
    const srcQueryParam = searchParams.get("src");
    let socketUrl = null;
    
    if (srcQueryParam === "sampleShipments") {
        socketUrl = `${import.meta.env.VITE_REACT_APP_WEB_SOCKET_URL}/sample-shipment-chat/${id}/?token=${token}`;
        const { data: sampleShipChatData, isLoading: loading } =
            FetchSampleShipmentMessageListApi(id);
        chatData = sampleShipChatData;
        isLoading = loading;
    } else {
        socketUrl = `${import.meta.env.VITE_REACT_APP_WEB_SOCKET_URL}/group-chat/${id}/?token=${token}`;
        const { data: shipChatData, isLoading: loading } =
            FetchShipmentMessageListApi(id);
        chatData = shipChatData;
        isLoading = loading;
    }

    const { messageData, sendCustomMessage, connectionStatus } = useChatWebSocket(
        socketUrl,
        chatData
    );

    useEffect(() => {
        const msg = {
            shipment_id: id,
            user_id: userRole.id
        }
        sendCustomMessage("mark_read", msg);
    }, [messageData?.data?.messages, connectionStatus]);

    const handleSendMessage = (message) => {
        file && setFile(null);
        const { isEditMessage, messageId } = editMessage;
        if (isEditMessage) {
            const msg = {
                user_id: userRole.id,
                message_id: messageId,
                new_content: message,
            };
            sendCustomMessage("edit_message", msg);
            setEditMessage({
                isEditMessage: false,
                prevMessage: null,
                messageId: null,
                isReply: false,
            });
        } else if (reply.isReply) {
            const msg = {
                message: message,
                user_id: userRole.id,
                sender_type: userRole.groups,
                reply_to_id: reply.id,
                attachment: file?.id || null,
            };
            sendCustomMessage("reply_to_thread", msg);
            resetReplyAndEditHandler();
            return;
        } else {
            const msg = {
                message: message,
                user_id: userRole.id,
                sender_type: userRole.groups,
                attachment: file?.id || null,
            };
            sendCustomMessage("send_message", msg);
        }
    };

    const deleteMessageHandler = (message) => {
        const msg = {
            user_id: userRole.id,
            message_id: message.id,
        };
        sendCustomMessage("delete_message", msg);
    };

    const fileHandler = (file) => {
        if (file) {
            const fileSize = file.size / 1024;
            const attachment = new FormData();
            attachment.set("attachment", file);
            attachment.set(
                "file_size",
                fileSize > 1024
                    ? `${(fileSize / 1024).toFixed(1)} MB`
                    : `${fileSize.toFixed(1)} KB`
            );
            mutate(attachment, {
                onSuccess: (data) => {
                    setFile(data.data);
                },
            });
        }
    };

    const editMessageHandler = (message, isReply) => {
        setEditMessage({
            isEditMessage: true,
            prevMessage: message.content,
            messageId: message.id,
            isReply,
        });
    };

    const replyMessageHandler = (message) => {
        const { attachment, content, id, sender_type, file_type } = message;
        const msg = {
            type: attachment ? file_type : "text",
            text: content,
            fileName: attachment?.file_name || "",
            file_size: attachment?.file_size,
            id,
            isReply: true,
            sender_type: sender_type === userRole.groups ? "You" : sender_type,
        };
        setReply({ ...msg });
    };

    const resetReplyAndEditHandler = () => {
        editMessage.isEditMessage ? setEditMessage({
            isEditMessage: false,
            prevMessage: null,
            messageId: null,
            isReply :false,
        }) : setReply({
            text: null,
            type: null,
            fileName: null,
            id: null,
            isReply: false,
        });
    };

    const handleReaction = (id, emoji) => {
        const msg = {
            user_id: userRole.id,
            message_id: id,
            reaction: emoji,
        };
        sendCustomMessage("add_reaction", msg);
    };

    const handleCloseImage = ()=>{
        setFile(null)
    }

    return (
        <div className="w-2/3 flex flex-col border-solid border-natural-100 rounded-xl h-full">
            <div className="flex flex-wrap overflow-hidden h-full ">
                <ChatBubble
                    messageData={messageData.data}
                    isLoading={isLoading}
                    currentUserRole={userRole?.groups}
                    editMessageHandler={editMessageHandler}
                    deleteMessageHandler={deleteMessageHandler}
                    handleReaction={handleReaction}
                    replyMessageHandler={replyMessageHandler}
                    isReply={reply.isReply}
                />
            </div>

            <div className="flex flex-col p-4">
                <ChatInput
                    onSendMessage={handleSendMessage}
                    onUploadFile={fileHandler}
                    attachment={file}
                    editMessage={editMessage.prevMessage}
                    replyingTo={reply}
                    resetReplyAndEditHandler={resetReplyAndEditHandler}
                    closeImagePreview={handleCloseImage}
                    acceptedFileType={fileType}
                    messageData={messageData.data}
                />
            </div>    
        </div>
    );
}
