import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { parseTextWithUrls } from 'utils/format';

const AnnouncementCard = ({ time, fullName, text }) => {
 
  return (
    <Card sx={{ width: '100%', margin: 2, padding: 2}}>
      <CardContent className='pt-0'>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: 'black', marginRight: 2 }}>
            {fullName?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h6">{fullName}</Typography>
              <Typography variant="body2" color="textSecondary">A New Announcement</Typography>
              <Typography variant="body2" color="textSecondary">{time}</Typography>
            </Box>
          </Box>
        </Box>
        <Typography variant="body1" sx={{ marginTop: 2 ,marginLeft: 7}}>
          {parseTextWithUrls(text)}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default AnnouncementCard;
