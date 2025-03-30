import { useEffect, useMemo, useState } from "react";
import DataTableCustom from "components/Table/DataTableCustom";
import ProductImage from "assets/images/testphoto12.png";
import EyeIcon from "assets/svg/Eye.svg";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BookingsTopNav from "../BookingsTopNav";
import { FetchSellerShipmentDetailApi } from "queries/Seller";
import { formatDate } from "utils";
import { format } from "date-fns";
import ChatIconWithDot from "components/Comman/ChatWithGreenDot";
import { useChat } from "components/Dashboard/OrderStatus/Chat/ChatContext";

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
        },
        {
            Header: "Product Name",
            accessor: "product_name",
            Cell: ({ row: { original } }) => (
                <div className="flex items-center">
                    <img src={ProductImage} alt="Product" />
                    <span className="ml-1.5">{original.product_name}</span>
                </div>
            ),
        },
        {
            Header: "Shipment Date",
            accessor: "shipment_ready_date",
            Cell: ({ row: { original } }) => (
                <Typography>
                    {formatDate(original.shipment_ready_date)}
                </Typography>
            ),
        },
        {
            Header: "Pickup Location",
            accessor: "pickup_location",
            Cell: ({ row: { original } }) => (
                <Typography>
                    {formatDate(original.pickup_location?.full_address)}
                </Typography>
            ),
        },
        {
            Header: "Status",
            accessor: "status",
            Cell: ({ row: { original } }) => (
                <Typography>{formatDate(original.status)}</Typography>
            ),
        },
        {
            Header: "Action",
            Cell: ({ row: { original } }) => {
                return (
                    <div className="flex gap-2 items-center">
                        <img
                            src={EyeIcon}
                            className="cursor-pointer"
                            onClick={() => handleClick(original)}
                            alt="EyeIcon"
                        />
                        {original.status === "Quotation Accepted" && (
                            <ChatIconWithDot handleClick={handleClick} original={original} />
                        )}
                    </div>
                );
            },
        },
    ];
    
    return (
        <div>
            {/* <div className="py-4 border border-natural-100 border-solid border-x-0 border-t-0">
                <SellerTopNav />
            </div> */}
            <div className="px-4 bg-natural-25 h-[calc(100vh_-_76.8px)] overflow-y-scroll">
                <BookingsTopNav />
                <Typography
                    variant="h6"
                    color="natural.900"
                    fontWeight={500}
                    className="pb-4"
                >
                    Current Shipments
                </Typography>

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
                />
            </div>
        </div>
    );
}
