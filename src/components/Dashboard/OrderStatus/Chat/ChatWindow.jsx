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
import { Card, CardContent, CardFooter, CardHeader } from "components/ui/card";
import { Avatar, Typography, useTheme } from "@mui/material";
import { MessageCircle, PackageOpen } from "lucide-react";

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
    const theme = useTheme();

    const formatName = (name) => {
        return name.split(' ').map(word => word[0].toUpperCase()).join('');
    }

    const isShipperPath = location.pathname.includes("/shipper/");
    const isSellerPath = location.pathname.includes("/seller/");


    return (
        <Card className="w-full flex flex-col border-solid border-natural-100 rounded-xl min:h-screen">
            <CardHeader className="flex flex-row gap-2 items-center  p-0 m-4">
            <Avatar
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            border: 1,
                                            bgcolor: theme.palette.primary[100],
                                            color: theme.palette.primary[500],
                                            borderColor: theme.palette.primary[100],
                                            fontWeight: 500,
                                        }}
                                        alt="Avatar"
                                        className={
                                          "border border-solid w-11 h-11"
                                        }
                                    >   
                                        {!isLoading ? (

                                        //     messageData?.data?.seller?.image ?

                                        //     messageData?.data?.shipper?.image ?
                                        //     <img src={isShipperPath ? messageData?.data?.seller?.image : messageData?.data?.shipper?.image} alt="Avatar" className="w-full h-full object-cover" />:
                                        //    formatName(isShipperPath ? messageData?.data?.seller?.first_name + " " + messageData?.data?.seller?.last_name : messageData?.data?.shipper?.first_name + " " + messageData?.data?.shipper?.last_name)

                                        isShipperPath ?(
                                            messageData?.data?.seller?.image ?
                                            <img src={messageData?.data?.seller?.image} alt="Avatar" className="w-full h-full object-cover" />
                                            :
                                            formatName(messageData?.data?.seller?.first_name + " " + messageData?.data?.seller?.last_name)
                                            // formatName(messageData?.data?.shipper?.first_name + " " + messageData?.data?.shipper?.last_name)
                                            // 'text'
                                        ):(
                                            messageData?.data?.shipper?.image ?
                                            <img src={messageData?.data?.shipper?.image} alt="Avatar" className="w-full h-full object-cover" />:
                                            formatName(messageData?.data?.shipper?.first_name + " " + messageData?.data?.shipper?.last_name)
                                        )

                                        ): null}
                                    
                </Avatar>
                
                <Typography variant="p" className="text-slate-900  items-center flex mb-1 pb-1 font-semibold  h-full">  
                    {isShipperPath ? messageData?.data?.seller?.first_name + " " + messageData?.data?.seller?.last_name : messageData?.data?.shipper?.first_name + " " + messageData?.data?.shipper?.last_name}
                 
                </Typography>
            </CardHeader>
            <CardContent className="h-full">

            <div className="flex flex-wrap overflow-hidden ">
                {messageData?.data?.messages?.length > 0 ? (
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
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 px-4 w-full">
                    <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                        {/* <img src={EmptyIcon} alt="EMPTY ICON" /> */}
                      {/* <PackageOpen className="h-10 w-10 text-slate-400" /> */}
                      <MessageCircle className="h-10 w-10 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 mb-1">No messages yet</h3>
                    <p className="text-sm text-slate-500 text-center mb-6 max-w-md">
                    Messages will appear here once they are placed. Check back later for updates.
                    </p>
                  </div>
                )}
            </div>
             
            </CardContent>
            <CardFooter className="border-t border-natural-100 m-0 p-0">
                <div className="flex flex-col p-4 w-full">
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
            </CardFooter>
        </Card>
    );
}
