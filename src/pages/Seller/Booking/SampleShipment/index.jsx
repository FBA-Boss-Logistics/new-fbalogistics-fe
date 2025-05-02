import { useEffect, useMemo, useState } from "react";
import DataTableCustom from "components/Table/DataTableCustom";
import ProductImage from "assets/images/testphoto12.png";
import { IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BookingsTopNav from "../BookingsTopNav";
import { FetchSampleShipmentDetailApi } from "queries/Seller";
import { formatDate } from "utils";
import PaymentModal from "./PaymentModal";
import { format } from "date-fns";
import ChatIconWithDot from "components/Comman/ChatWithGreenDot";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import { useChat } from "components/Dashboard/OrderStatus/Chat/ChatContext";
import ActionTable from "components/Table/ActionTable";

export default function SampleShipment() {
    const navigate = useNavigate();
    const [sellerShipmentPagination, setSellerShipmentPagination] = useState(
        {}
    );

    const [makePayment, setMakePayment] = useState(false);

    const handleClose = () => {
        setMakePayment(false);
    };

    const [selectedSellerShipmentDate, setSelectedSellerShipmentDate] =
        useState(null);
    // Assuming formData?.shipment_ready_date is in "MM/DD/YYYY" format
    const initialDate = selectedSellerShipmentDate
        ? format(new Date(selectedSellerShipmentDate), "yyyy-MM-dd")
        : null;

    const {
        data: sampleShipmentData,
        dataUpdatedAt,
        isLoading,
    } = FetchSampleShipmentDetailApi({
        sellerShipmentPagination,
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
                sellerShipmentListData: sampleShipmentData?.data?.data,
                paginationInformation:
                    sampleShipmentData?.data?.pagination_option,
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
                    <span className="ml-1.5">{original?.product_name}</span>
                </div>
            ),
        },
        {
            Header: "Shipment Date",
            accessor: "shipment_ready_date",
            Cell: ({ row: { original } }) => (
                <Typography>
                    {formatDate(original?.created_at?.split("T")?.[0])}
                </Typography>
            ),
        },
        {
            Header: "Amount of Samples",
            accessor: "pickup_location",
            Cell: ({ row: { original } }) => (
                <Typography>{original?.quantity}</Typography>
            ),
        },

        {
            Header: "Sample Delivery Address",
            accessor: "address",
            Cell: ({ row: { original } }) => (
                <Typography>{original?.address}</Typography>
            ),
        },
        {
            Header: "Status",
            accessor: "status",
            Cell: ({ row: { original } }) => (
                <Typography>{original?.status}</Typography>
            ),
        },
        {
            Header: "Action",
            Cell: ({ row: { original } }) => {
                const action = [
                    {
                        name: "More info",
                        onClick: () => handleClick(original),
                        visible: true,
                    },
                    {
                        name: "Open Chat",
                        onClick: () => handleClick(original),
                        visible: true,
                    },
                ];
                return(
                    <>
                    <div className="md:flex hidden gap-2 items-center">
                        <IconButton onClick={() => handleClick(original)}>
                        <RemoveRedEyeOutlined
                            fontSize="small"
                            color="secondary.100"
                        />
                    </IconButton>
                    <ChatIconWithDot handleClick={handleClick} original={original} /> 
                </div>

                    <ActionTable action={action} />
                </>
            )},
        }
    ];

    const handleClick = ({id}) => {
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
        navigate(
            `/seller/booking/recentorderstatus/${id}/?src=sampleShipments`
        );
    };

    return (
        <>
            {makePayment && (
                <PaymentModal open={makePayment} onClose={handleClose} />
            )}
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
                        Sample Shipments
                    </Typography>

                    <DataTableCustom
                        data={userMessageNotification}
                        columns={columns}
                        paginationFooter={true}
                        searchBar={true}
                        updateFilters={setSellerShipmentPagination}
                        paginationData={paginationInformation}
                        isLoading={isLoading}
                        pageNumber={true}
                        date={true}
                        setSelectedDate={setSelectedSellerShipmentDate}
                        selectedDate={selectedSellerShipmentDate}
                    />
                </div>
            </div>
        </>
    );
}
