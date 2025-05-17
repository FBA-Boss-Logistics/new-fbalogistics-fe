import React, { useEffect } from 'react'

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate, useParams } from 'react-router-dom';
import { FetchAnnouncementDetailDataApi } from 'queries/Shipper';
import { useState } from 'react';
import { routes } from 'routes/RouteConstants';
import { formatName } from "utils";
import { Avatar, Badge, useTheme } from '@mui/material';
export default function AnnouncementDetail() {
  const { id } = useParams();
  const { data: announcementData, isLoading, error } = FetchAnnouncementDetailDataApi(id);
  const [announcementDetailData, setAnnouncementDetailData] = useState(null);
  useEffect(() => {
    if (announcementData) {
      console.log('announcementData')
      console.log(announcementData);
      setAnnouncementDetailData(announcementData?.data);
    }
  }, [announcementData]);
  const navigate = useNavigate();
  const theme = useTheme();
  return (

    <>
          <div className="container mx-auto">
      <div className="mb-8">
        <Button
          size="sm"
          className="flex items-center gap-2 text-white "
          onClick={() => {
            navigate(routes.ANNOUNCEMENT.pathname);
          }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to announcements
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <article className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {announcementDetailData?.sender?.first_name} {announcementDetailData?.sender?.last_name}
            </h1>

            <div className="flex items-center text-sm text-yellow-500">
              <span>{announcementDetailData?.timestamp}</span>
              {/* <span className="mx-2">•</span>
              <span>{announcementDetailData?.created_at}</span> */}
            </div>

            <div className="prose max-w-none">
             

              <p>{announcementDetailData?.message}</p>
            </div>
          </article>
        </div>

        <div className="md:col-span-1">
          <Card className="border-0 shadow-none">
            <CardContent className="p-0 flex flex-col items-center text-center">
            <Badge
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    color="success"
                    badgeContent=""
                    variant="dot"
                    
                    >
                <Avatar
                    sx={{
                        width: 34,
                        height: 34,
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
                    {!isLoading ? formatName(announcementDetailData?.sender?.first_name + " " + announcementDetailData?.sender?.last_name) : null}
                
                </Avatar>
              </Badge>
              <h3 className="text-lg font-medium">Angel Zhuang</h3>
              <p className="text-sm text-gray-500 mt-1">
                Contributing Writer
                <br />
                at <span className="font-medium">FBA BOSS</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </>
  )
}

