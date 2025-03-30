import React, { createContext, useContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [userMessageNotification, setUserMessageNotification] = useState([]);
    const [allNotifications, setAllNotification] = useState([]);
    const [sendCustomMessage, setSendCustomMessage] = useState(() => () => {});
    const [userInfo, setUserInfo] = useState({});
    const [announcementList, setAnnouncementList] = useState();


  return (
    <ChatContext.Provider
      value={{
        userInfo,
        userMessageNotification,
        setUserMessageNotification,
        allNotifications,
        setAllNotification,
        sendCustomMessage,
        setSendCustomMessage,
        setUserInfo,
        setAnnouncementList,
        announcementList,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => useContext(ChatContext);