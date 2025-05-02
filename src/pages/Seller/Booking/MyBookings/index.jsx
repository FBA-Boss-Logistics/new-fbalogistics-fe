import { useEffect, useMemo, useState } from "react";
import DataTableCustom from "components/Table/DataTableCustom";
import ProductImage from "assets/images/testphoto12.png";
import EyeIcon from "assets/svg/Eye.svg";
import {  Typography } from "@mui/material";
import { Button } from "components/ui/button";
import { useNavigate } from "react-router-dom";
import BookingsTopNav from "../BookingsTopNav";
import { FetchSellerShipmentDetailApi } from "queries/Seller";
import { formatDate } from "utils";
import { format } from "date-fns";
import ChatIconWithDot from "components/Comman/ChatWithGreenDot";
import { useChat } from "components/Dashboard/OrderStatus/Chat/ChatContext";
import HeaderPage from "components/HeaderPage";
import DashboardStats from "pages/Seller/Dashboard/dashboardStats";
import { Card } from "components/ui/card";
import ActionTable from "components/Table/ActionTable";
export default function MyBooking() {
    const navigate = useNavigate();
    const [sellerShipmentListPagination, setSellerShipmentListPagination] =
        useState({});
    const [selectedSellerShipmentListDate, setSelectedSellerShipmentListDate] =
        useState(null);
    const initialDate = selectedSellerShipmentListDate
        ? format(new Date(selectedSellerShipmentListDate), "yyyy-MM-dd")
        : null;
    const {
        data: sellerShipmentData,
        dataUpdatedAt,
        isLoading,
    } = FetchSellerShipmentDetailApi({
        sellerShipmentListPagination,
        initialDate,
    });

    const {
        allNotifications,
        userMessageNotification,
        setUserMessageNotification,
        sendCustomMessage,
        userInfo
      } = useChat();

    const { sellerShipmentListData, paginationInformation } = useMemo(() => {
        if (dataUpdatedAt) {
            return {
                sellerShipmentListData: sellerShipmentData?.data,
                paginationInformation: sellerShipmentData?.pagination_option,
            };
        }
        return {
            sellerShipmentListData: [],
            paginationInformation: {},
        };
    }, [dataUpdatedAt]);


    useEffect(()=> {
        setUserMessageNotification(sellerShipmentListData);
    },[sellerShipmentListData]);
   

    const handleClick = ({status , id}) => {
        if(allNotifications?.length > 0){
          const notification_id  =  allNotifications.filter(({shipment_id})=> shipment_id === id)?.[0]?.id;
          if(notification_id){
            const notificationMsg = {
                notification_id,
                user_id : userInfo?.id.toString(),
            }
            sendCustomMessage("mark_notification_read", notificationMsg)
          }
        }
        if (status === "Quotation Approved") {
            navigate(
                `/seller/booking/order/status/${id}/?src=pendingorders`
            );
        } else if (status === "Quotation Accepted") {
            navigate(
                `/seller/booking/recentorderstatus/${id}/?src=currentShipments`
            );
        } else {
            navigate(
                `/seller/booking/order/status/${id}/?src=newshipment`
            );
        }
    };
 
    /** @type import('@tanstack/react-table').ColumnDef<any> */ //for autosuggestions
    const columns = [
        {
            Header: "Shipment ID",
            accessor: "id",
            width: 10,
            Cell: ({ row: { original } }) => (
                <Typography
                variant="subtitle2"
                color="natural.500"
                fontWeight={400}
                >
                    {original.id}
                </Typography>
            ),
        },
        {
            Header: "Status",
            accessor: "status",
            Cell: ({ row: { original } }) => (
                <Typography
                variant="subtitle2"
                color="natural.500"
                fontWeight={400}
                >
                    {original.status}
                </Typography>
            ),
        },
        {
            Header: "Shipment Date",
            accessor: "shipment_ready_date",
            Cell: ({ row: { original } }) => (
                <Typography
                variant="subtitle2"
                color="natural.500"
                fontWeight={400}
                >
                    {formatDate(original.shipment_ready_date)}
                </Typography>
            ),
        },
        {
            Header: "Product Name",
            accessor: "product_name",
            Cell: ({ row: { original } }) => (
                    <Typography
                variant="subtitle2"
                color="natural.500"
                fontWeight={400}
                >
                    {original.product_name}
                </Typography>
               
            ),
        },
       
        {
            Header: "Pickup Location",
            accessor: "pickup_location",
            Cell: ({ row: { original } }) => (
                <Typography
                variant="subtitle2"
                color="natural.500"
                fontWeight={400}
                >
                    {formatDate(original.pickup_location?.full_address)}
                </Typography>
            ),
        },
    
        {
            Header: "Action",
            Cell: ({ row: { original } }) => {
                console.log(original.status)
                const action = [
                    {
                        name: "View shipment",
                        onClick: () => handleClick(original),
                        visible: true,
                    },
                    {
                        name: "Open chat",
                        onClick: () => handleClick(original),
                        visible: original.status === "Quotation Accepted",
                    },
                ];
                return (
                    <>
                    <div className="md:flex hidden gap-2 items-center w-full">
                        <img
                            src={EyeIcon}
                            className="cursor-pointer "
                            onClick={() => handleClick(original)}
                            alt="EyeIcon"
                        />
                        {original.status === "Quotation Accepted" && (
                            <ChatIconWithDot handleClick={handleClick} className="md:block hidden" original={original} />
                        )}
                    </div>
                    <ActionTable action={action} />
                    </>
                );
            },
        },
    ];
    
    return (
        <div>
            {/* <div className="py-4 border border-natural-100 border-solid border-x-0 border-t-0">
            </div> */}
            <DashboardStats />
            {/* <SellerTopNav /> */}
                <HeaderPage title="Active Shipments" pathname="Active Shipments" home="seller" />
                <Card className="mt-6 overflow-hidden">
                <DataTableCustom
                    data={userMessageNotification}
                    columns={columns}
                    paginationFooter={true}
                    searchBar={true}
                    paginationData={paginationInformation}
                    isLoading={isLoading}
                    updateFilters={setSellerShipmentListPagination}
                    date={true}
                    pageNumber={true}
                    setSelectedDate={setSelectedSellerShipmentListDate}
                    selectedDate={selectedSellerShipmentListDate}
                    heading="Current Shipments"
                />
                </Card>
        </div>
    );
}
