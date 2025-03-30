
import React from 'react';
import { Avatar, IconButton, Popover, Typography, List, ListItem, ListItemAvatar, ListItemText, Box, Badge } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import { formatTimestamp, extractNameFromNotification, shortenName } from 'utils';

const NotificationPopup = ({ anchorEl, open, onClose, notifications, handleNotificationListClick }) => {

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            sx={{
                top:20
            }}
        >
            <Box sx={{ width: 400, }}>
                <Typography variant="h6" sx={{ mb: 0, p: 2}}>
                    Notifications
                </Typography>
                <Divider />
                <List>
                    {notifications?.map((notification) => (
                        <ListItem key={notification?.id} sx={{ borderBottom: '1px solid #f0f0f0', alignItems: 'flex-start' }}>
                            <ListItemAvatar>
                                <Avatar>{notification.user?.first_name.charAt(0)}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                            className='cursor-pointer'
                            onClick={() => handleNotificationListClick(notification, true)}
                                primary={`${extractNameFromNotification(notification?.content || " ")}` }
                                secondary={
                                    <>
                                        {(notification?.shipment_id > 0 || notification?.sample_shipment_id > 0) && <Typography
                                            component="span"
                                            variant="body2"
                                            color="textPrimary"
                                            display="block"
                                        >
                                            {`Shipment ID: ${notification?.shipment_id || notification?.sample_shipment_id}`}
                                        </Typography>}
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="textPrimary"
                                            display="block"
                                            
                                        >
                                            {shortenName(notification?.content, 100) || ''}
                                        </Typography>
                                        <Typography
                                            component="span"
                                            variant="caption"
                                            color="textSecondary"
                                            display="block"
                                        >
                                            {formatTimestamp(notification.updated_at)}
                                        </Typography>
                                    </>
                                }
                            />
                            <IconButton size="small" onClick={() => handleNotificationListClick(notification, false)}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Popover>
    );
};

export default NotificationPopup;
