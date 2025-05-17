import React from 'react';
// import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { Typography } from '@mui/material';
// import { parseTextWithUrls } from 'utils/format';
// import CardComponent from 'components/Dashboard/OrderStatus/CardComponent';
import { Card, CardContent, CardFooter, CardHeader } from "components/ui/card";
import { Button } from "components/ui/button";
import { useNavigate } from 'react-router-dom';
const AnnouncementCard = ({ time, fullName, text, id, redirect="shipper/dashboard/announcement" }) => {
  console.log("fullName");
  console.log(fullName);
  const navigate = useNavigate();
  return (
    // <CardComponent>
    //   <CardContent className='pt-0'>
    //     <Box display="flex" alignItems="center" justifyContent="space-between">
    //       <Box display="flex" alignItems="center">
    //         <Avatar sx={{ bgcolor: 'black', marginRight: 2 }}>
    //         {fullName?.charAt(0)}
    //         </Avatar>
    //         <Box>
    //           <Typography variant="h6">{fullName}</Typography>
    //           <Typography variant="body2" color="textSecondary">A New Announcement</Typography>
    //           <Typography variant="body2" color="textSecondary">{time}</Typography>
    //         </Box>
    //       </Box>
    //     </Box>
    //     <Typography variant="body1" sx={{ marginTop: 2 ,marginLeft: 7}}>
    //       {parseTextWithUrls(text)}
    //     </Typography>
    //   </CardContent>
    // </CardComponent>

      <Card key={time} className="overflow-hidden border-gray-200 shadow-sm">
        <CardHeader className="pb-0">
            <h2 className="text-lg font-semibold text-gray-900">{fullName ?? "No Name"}</h2>

        </CardHeader>
        <CardContent className="pb-4 pt-4">
            <p className="text-sm text-gray-600 line-clamp-1">{text}</p>
            <p className="mt-2 text-xs text-gray-500">{time}</p>
            <Button  size="sm" className="mt-4" onClick={() => {
              navigate(`${redirect}/${id}`);
            }}>
            Read more
            </Button>
        </CardContent>
      </Card>
  );
}

export default AnnouncementCard;
