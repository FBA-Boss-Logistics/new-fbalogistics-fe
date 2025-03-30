import React, { useEffect, useState } from "react";
import {
    Menu,
    Avatar,
    IconButton,
    List,
    ListItemText,
    ListItemIcon,
    ListItemButton,
    useTheme,
    Badge,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Logout from "assets/icons/Logout.svg";
import { useNavigate, useLocation } from "react-router-dom";

import { KeyboardArrowUp } from "@mui/icons-material";
import { FetchUserDetailApi, useLogOutApiQuery } from "queries/Auth";
import { formatName } from "utils";
import NotificationPopup from "./CustomListPopup/NotificatonLIstPopup";
import useChatWebSocket from "hooks/useWebSocket";
import { getLocalStorageItem } from "hooks";
import { localStorageKeys } from "constants";
import { fetchSellerShipmentNotificationsApi } from "queries/Seller";
import { useChat } from "components/Dashboard/OrderStatus/Chat/ChatContext";

const ProfileIcon = () => {
    const token = getLocalStorageItem(localStorageKeys.AUTH_TOKEN);
    const location = useLocation();
    const currentUrl = location.pathname;
    const navigate = useNavigate();
    const [sellerShipmentListPagination, setSellerShipmentListPagination] =
        useState({});
    const [selectedSellerShipmentListDate, setSelectedSellerShipmentListDate] =
        useState(null);
    const initialDate = selectedSellerShipmentListDate
        ? format(new Date(selectedSellerShipmentListDate), "yyyy-MM-dd")
        : null;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { mutate: logoutApi } = useLogOutApiQuery();

    const [notification, setNotification] = useState(null);
    const [notificationLists, setNotificationLists] = useState([]);
    const { data: userInfo, isLoading } = FetchUserDetailApi();

    const { data: notificationsList } = fetchSellerShipmentNotificationsApi({
        sellerShipmentListPagination,
        initialDate,
    });

    const {
        setAllNotification,
        setSendCustomMessage,
        setUserInfo,
    } = useChat();

    const isSeller = userInfo?.data?.groups === "Seller";

    const {
        messageData: notificationListFromSocket,
        sendCustomMessage,
        connectionStatus,
    } = useChatWebSocket(`${import.meta.env.VITE_REACT_APP_WEB_SOCKET_URL}/notifications/${userInfo?.data?.id}/?token=${token}`, notificationsList);

    const { messageData: notificationListWithAnnouncement } = useChatWebSocket(`${import.meta.env.VITE_REACT_APP_WEB_SOCKET_URL}/announcement/`, notificationsList);

    useEffect(() => {
        setUserInfo(userInfo?.data);
    }, [userInfo?.data]);

    const getUniqueNotifications = (dataList1 = [], dataList2 = []) => {
        const map = new Map();
        [...dataList1, ...dataList2].forEach(item => {
            if (map.has(item.id)) {
                const existingItem = map.get(item.id);
                const latestItem = new Date(item.updated_at) > new Date(existingItem.updated_at) ? item : existingItem;
                map.set(item.id, latestItem);
            } else {
                map.set(item.id, item);
            }
        });
        return Array.from(map.values()).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    };


    useEffect(() => {
            const uniqueNotifications = getUniqueNotifications(notificationListFromSocket.data, notificationListWithAnnouncement.data);
            let mergeMsgAndAnnouncementNotification = {data : uniqueNotifications?.filter((item) => !item.is_read) || []};

            setNotificationLists(mergeMsgAndAnnouncementNotification);
            setAllNotification(mergeMsgAndAnnouncementNotification?.data?.map(({ shipment_id, id, sample_shipment_id}) => ({
                        shipment_id : shipment_id || sample_shipment_id,
                        id,
                    }))
            );

            setSendCustomMessage(() => sendCustomMessage);
        
    }, [
        notificationListFromSocket,
        notificationListWithAnnouncement,
        sendCustomMessage,
        setNotificationLists,
        setAllNotification,
        setSendCustomMessage,
    ]);

    const handleClick = (event) => {
        setNotification(event.currentTarget);
    };

    const handleCloseNotification = () => {
        setNotification(null);
    };

    const openNotificationModal = Boolean(notification);

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickProfile = () => {
        if (currentUrl.includes("seller") || currentUrl.includes("quotes")) {
            setAnchorEl(null);
            navigate("/seller/profile");
        } else if (currentUrl.includes("shipper")) {
            setAnchorEl(null);
            navigate("/shipper/profile");
        }
    };

    const handleClickLogout = () => {
        logoutApi(null, {
            onSuccess: () => {
                localStorage.clear();
                setAnchorEl(null);
                navigate("/");
            },
            onError: () => {},
        });
    };

    const handleNotificationListClick = (
        notificationData,
        isClickOnCloseBtn
    ) => {
        if (connectionStatus === "Open") {
            const notificationMsg = {
                notification_id: notificationData.id,
                user_id: userInfo?.data?.id.toString(),
            };
            sendCustomMessage("mark_notification_read", notificationMsg);     

            if (isClickOnCloseBtn) {
                handleCloseNotification();
                const shipment_id = notificationData?.shipment_id || notificationData?.sample_shipment_id;
                let redirectUrl;
                if (notificationData.notification_type === "Shipment") {
                    redirectUrl = isSeller
                        ? `/seller/booking/recentorderstatus/${shipment_id}/?src=currentShipments`
                        : `/shipper/dashboard/orders/status/${shipment_id}/?src=accepted`;
                    navigate(redirectUrl);
                }
                if (notificationData.notification_type === "Sample Shipment") {
                    redirectUrl = isSeller
                        ? `/seller/booking/recentorderstatus/${shipment_id}/?src=sampleShipments`
                        : `/shipper/dashboard/orders/status/${shipment_id}/?src=sampleShipments`;
                        navigate(redirectUrl);
                }
                if(notificationData.notification_type === "Announcement") {
                    navigate(isSeller ? '/seller/announcement' : '/shipper/dashboard/announcement');
                }
            }
        }
    };

    const theme = useTheme();
    const fullName = userInfo?.data.first_name + " " + userInfo?.data.last_name;
    const notificationBellColor = isSeller ? "inherit" : "#4a148c";

    return (
        <div>
            <div>
                <div className=" flex items-center justify-end">
                    <div className="sideOptions flex items-center gap-6 cursor-pointer">
                        { (
                            <Badge
                                badgeContent={
                                    (
                                        notificationLists?.data?.filter(
                                            (notif) => !notif.is_read
                                        ) || []
                                    )?.length
                                }
                                color="secondary"
                                sx={{
                                    "& .MuiBadge-badge": {
                                        color: "white",
                                    },
                                }}
                                onClick={handleClick}
                            >
                                <IconButton
                                    color="inherit"
                                    sx={{
                                        padding:'0px'
                                    }}
                                >
                                    <NotificationsIcon
                                        style={{ color: notificationBellColor }}
                                    />
                                </IconButton>
                            </Badge>
                        )}

                        {notificationLists?.data?.length > 0 &&
                            openNotificationModal && (
                                <NotificationPopup
                                    anchorEl={notification}
                                    open={openNotificationModal}
                                    onClose={handleCloseNotification}
                                    notifications={
                                        notificationLists?.data || []
                                    }
                                    handleNotificationListClick={
                                        handleNotificationListClick
                                    }
                                />
                        )}
                        <div onClick={handleClickMenu} className="flex">
                            <Avatar
                                sx={{
                                    width: 44,
                                    height: 44,
                                    border: 1,
                                    bgcolor: theme.palette.primary[100],
                                    color: theme.palette.primary[800],
                                    borderColor: theme.palette.primary[500],
                                    fontWeight: 500,
                                }}
                                alt="Avatar"
                                className={
                                    location.pathname ===
                                    ("/quotes" || "/booking")
                                        ? "border border-solid w-11 h-11"
                                        : ""
                                }
                            >
                                {!isLoading ? formatName(fullName) : null}
                            </Avatar>
                            {!open ? (
                                <IconButton size="small">
                                    <KeyboardArrowDownIcon
                                        className={
                                            location.pathname ===
                                            ("/quotes" || "/booking")
                                                ? "text-natural-500"
                                                : "text-natural-500"
                                        }
                                    />
                                </IconButton>
                            ) : (
                                <IconButton size="small">
                                    <KeyboardArrowUp
                                        className={
                                            location.pathname ===
                                            ("/quotes" || "/booking")
                                                ? "text-natural-500"
                                                : "text-natural-500"
                                        }
                                    />
                                </IconButton>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
                sx={{
                    marginTop: "18px",
                    padding: "0 !important",
                }}
            >
                <List
                    sx={{ width: "100%", maxWidth: 360, padding: "0" }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <ListItemButton onClick={handleClickProfile} key="1">
                        <ListItemIcon>
                            <Avatar
                                sx={{
                                    width: 44,
                                    height: 44,
                                    border: 1,
                                    bgcolor: theme.palette.primary[100],
                                    color: theme.palette.primary[800],
                                    borderColor: theme.palette.primary[500],
                                    fontWeight: 500,
                                }}
                            >
                                {formatName(fullName)}
                            </Avatar>
                        </ListItemIcon>

                        <ListItemText
                            primary={`${userInfo?.data?.first_name} ${userInfo?.data?.last_name}`}
                            secondary={`${userInfo?.data?.email}`}
                        />
                    </ListItemButton>
                    <ListItemButton onClick={handleClickLogout} key="2">
                        <ListItemIcon>
                            <img src={Logout} alt="svg image" />
                        </ListItemIcon>
                        <ListItemText
                            className="text-error-600"
                            primary="Logout"
                        />
                    </ListItemButton>
                </List>
            </Menu>
        </div>
    );
};

export default ProfileIcon;
