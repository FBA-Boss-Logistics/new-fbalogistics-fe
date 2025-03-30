import { useEffect, useReducer, useRef, useCallback } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { getLocalStorageItem } from "./useLocalStorage";
import { localStorageKeys } from "constants";
import { useLocation, useParams } from "react-router-dom";
import { useChat } from "components/Dashboard/OrderStatus/Chat/ChatContext";

const messageHistoryReducer = (state, action) => {
    const userRole = getLocalStorageItem(localStorageKeys.USER_DETAILS);
    switch (action.type) {
        case "SET_MESSAGES":
            return {
                ...state,
                data: action.payload,
            };
        case "ADD_MESSAGE":
            return {
                ...state,
                data: {
                    ...state.data,
                    messages: [
                        ...state.data.messages,
                        {
                            ...action.payload,
                            is_read: action.payload.read_by?.includes(
                                userRole.id
                            )
                                ? true
                                : false,
                        },
                    ],
                },
            };
        case "EDIT_MESSAGE":
            return {
                ...state,
                data: {
                    ...state.data,
                    messages: state.data.messages?.map((message) =>
                        message.id === action.payload.id
                            ? action.payload
                            : message
                    ),
                },
            };
        case "ADD_REACTION":
            return {
                ...state,
                data: {
                    ...state.data,
                    messages: state.data.messages?.map((message) => {
                        if (message.id !== action.payload.message) {
                            return message;
                        }
                        const existingReactionIndex =
                            message.reactions?.findIndex(
                                (reaction) =>
                                    reaction.user.id === action.payload.user.id
                            );

                        let updatedReactions;
                        if (existingReactionIndex >= 0) {
                            updatedReactions = message.reactions.map(
                                (reaction, index) =>
                                    index === existingReactionIndex
                                        ? action.payload
                                        : reaction
                            );
                        } else {
                            updatedReactions = [
                                ...(message.reactions || []),
                                action.payload,
                            ];
                        }
                        return {
                            ...message,
                            reactions:
                                message.reactions?.length === 0
                                    ? [action.payload]
                                    : updatedReactions,
                        };
                    }),
                },
            };
        case "DELETE_MESSAGE":
            return {
                ...state,
                data: {
                    ...state.data,
                    messages: state.data.messages.filter(
                        (message) => message.id !== action.payload
                    ),
                },
            };
        case "READ_MESSAGES":
            return {
                ...state,
                data: {
                    ...state.data,
                    messages: state.data.messages.map((msg) => {
                        if (
                            !msg.is_read ||
                            msg.read_by?.includes(userRole.id)
                        ) {
                            const updatedReadBy = msg.read_by?.includes(
                                action.payload.user
                            )
                                ? msg.read_by
                                : [...(msg.read_by || []), action.payload.user];
                            const finalReadBy = updatedReadBy.includes(
                                userRole.id
                            )
                                ? updatedReadBy
                                : [...updatedReadBy, userRole.id];

                            return {
                                ...msg,
                                is_read: true,
                                read_by: finalReadBy,
                            };
                        }
                        return msg;
                    }),
                },
            };
        case "READ_NOTIFICATIONS":
            return {
                ...state,
                data: (() =>
                    state.data.map(
                        (notification) =>
                            notification.id ===
                            action.payload.id ? {...notification, is_read : true} : notification
                    ))(),
            };
        case "RECEIVED_NOTIFICATIONS":
            return {
                ...state,
                data: (() => {
                    const existingIndex = state.data.findIndex(
                        ({ shipment_id }) =>
                            shipment_id === action.payload?.shipment_id
                    );

                    if (existingIndex !== -1 && action.payload?.notification_type !== "Announcement") {
                        const updatedData = [...state.data];
                        updatedData.splice(existingIndex, 1);
                        return [action.payload, ...updatedData];
                    } else {
                        return [action.payload, ...state.data];
                    }
                })(),
            };
        default:
            return state;
    }
};

const useChatWebSocket = (socketUrl, chatData) => {
    const { setUserMessageNotification, setAnnouncementList, userInfo } = useChat();
    const { id } = useParams();
    const searchParams = new URLSearchParams(window.location.search);
    const srcQueryParam = searchParams.get("src");
    const initialState = { ...(chatData?.data || {}) };
    const [messageHistory, dispatch] = useReducer(
        messageHistoryReducer,
        initialState
    );
    const reconnectAttemptsRef = useRef(0);
    const location = useLocation();
    const currentUrl = location.pathname;

    const handleMessage = useCallback(
        (event) => {
            const message = JSON.parse(event.data);
            switch (message.event_type) {
                case "message_sent":
                    dispatch({ type: "ADD_MESSAGE", payload: message.data });
                    break;
                case "message_read":
                    dispatch({ type: "READ_MESSAGES", payload: message.data });
                    break;
                case "message_deleted":
                    dispatch({
                        type: "DELETE_MESSAGE",
                        payload: message.data.id,
                    });
                    break;
                case "message_edited":
                    dispatch({ type: "EDIT_MESSAGE", payload: message.data });
                    break;
                case "reaction_added":
                    dispatch({ type: "ADD_REACTION", payload: message.data });
                    break;
                case "message_replied":
                    dispatch({ type: "ADD_MESSAGE", payload: message.data });
                    break;
                case "notification_read":
                    dispatch({
                        type: "READ_NOTIFICATIONS",
                        payload: message.data,
                    });
                    break;
                case "unread_count":
                    break;
                case "notification":
                    break;
                case "send_notification":
                    if(message.data?.notification_type === "Announcement") {
                        message.data?.user.id !== userInfo?.id &&  dispatch({
                            type: "RECEIVED_NOTIFICATIONS",
                            payload: message.data,
                        });
                        return;
                    }
                    if (!id && !srcQueryParam) {
                        dispatch({
                            type: "RECEIVED_NOTIFICATIONS",
                            payload: message.data,
                        });
                        setUserMessageNotification((prevNotifications) =>
                            prevNotifications.map((userMsgNotif) =>
                                (userMsgNotif.id === message.data?.shipment_id || userMsgNotif.id === message.data?.sample_shipment_id) &&
                                ((userMsgNotif.freight_booking_reference_number &&
                                    message.data.notification_type ===
                                        "Shipment") ||
                                    (!userMsgNotif.freight_booking_reference_number &&
                                        message.data.notification_type ===
                                        "Sample Shipment"))
                                    ? {
                                          ...userMsgNotif,
                                          message_count:
                                              userMsgNotif.message_count + 1,
                                      }
                                    : userMsgNotif
                            )
                        );
                    } else if (
                        srcQueryParam &&
                        id &&
                        id != message.data.shipment_id
                    ) {
                        dispatch({
                            type: "RECEIVED_NOTIFICATIONS",
                            payload: message.data,
                        });
                    }
                    break;
                case "announcement_created":
                    if (message.data?.sender.id !== userInfo?.id) {
                        currentUrl?.split('/')?.includes('announcement') && setAnnouncementList((prevList) => [message.data, ...(prevList || [])]);
                    }
                   
                    break;
                case "mark_read":
                    break;
                default:
                    console.log("Unknown message type:", message.event_type);
            }
        },
        [id, srcQueryParam, userInfo?.id]
    );

    const handleOpen = useCallback(() => {
        console.log("WebSocket connected");
        reconnectAttemptsRef.current = 0;
    }, []);

    const handleClose = useCallback(() => {
        console.log("WebSocket disconnected");
    }, []);

    const handleError = useCallback((error) => {
        console.error("WebSocket error:", error);
    }, []);

    const shouldReconnect = useCallback((closeEvent) => {
        if (reconnectAttemptsRef.current < 5) {
            reconnectAttemptsRef.current += 1;
            return true;
        }
        return false;
    }, []);

    const { sendMessage, readyState } = useWebSocket(socketUrl, {
        onOpen: handleOpen,
        onClose: handleClose,
        onError: handleError,
        onMessage: handleMessage,
        shouldReconnect: shouldReconnect,
        reconnectInterval: 1000,
    });

    useEffect(() => {
        dispatch({ type: "SET_MESSAGES", payload: chatData?.data || [] });
    }, [chatData]);

    const sendCustomMessage = useCallback(
        (action, data) => {
            try {
                const message = JSON.stringify({ action, ...data });
                sendMessage(message);
            } catch (error) {
                console.error("Failed to send message:", error);
            }
        },
        [sendMessage]
    );

    const connectionStatus = {
        [ReadyState.CONNECTING]: "Connecting",
        [ReadyState.OPEN]: "Open",
        [ReadyState.CLOSING]: "Closing",
        [ReadyState.CLOSED]: "Closed",
        [ReadyState.UNINSTANTIATED]: "Uninstantiated",
    }[readyState];

    return {
        messageData: messageHistory,
        sendCustomMessage,
        connectionStatus,
    };
};

export default useChatWebSocket;
