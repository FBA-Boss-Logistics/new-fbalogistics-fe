import { useEffect, useMemo, useState } from "react";

import DataTableCustom from "components/Table/DataTableCustom";
import { IconButton, Typography } from "@mui/material";

import InfoModal from "../Quotation/InfoModal";
import { useNavigate } from "react-router-dom";

import { RemoveRedEyeOutlined } from "@mui/icons-material";
import { FetchSampleShipmentDetailApi } from "queries/Seller";
import { formatDate } from "utils";
import ChatIconWithDot from "components/Comman/ChatWithGreenDot";
import { useChat } from "components/Dashboard/OrderStatus/Chat/ChatContext";
import CardComponent from "components/Dashboard/OrderStatus/CardComponent";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { routes } from "routes/RouteConstants";
import { Button } from "components/ui/button";
import ActionTable from "components/Table/ActionTable";

export default function SampleShipmentTable() {
    const navigate = useNavigate();
    const [sellerShipmentPagination, setSellerShipmentPagination] = useState(
        {}
    );
    const [modalOpen, setModalOpen] = useState(false);
    
    const {
        data: orderData,
        dataUpdatedAt,
        isLoading,
    } = FetchSampleShipmentDetailApi({ sellerShipmentPagination });

    const {
        allNotifications,
        userMessageNotification,
        setUserMessageNotification,
        sendCustomMessage,
        userInfo
      } = useChat();

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
        navigate(`/shipper/dashboard/orders/status/${id}/?src=sampleShipments`);
    };


    const { pastOrderListData, paginationInformationShipment } = useMemo(() => {
        if (dataUpdatedAt) {
            return {
                pastOrderListData: orderData?.data?.data,
                paginationInformationShipment:
                    orderData?.data?.pagination_option,
            };
        }
        return {
            pastOrderListData: [],
            paginationInformationShipment: {},
        };
    }, [dataUpdatedAt]);

    useEffect(()=> {
        setUserMessageNotification(pastOrderListData);
    },[pastOrderListData]);


    /** @type import('@tanstack/react-table').ColumnDef<any> */ //for autosuggestions
    const columns = [
        {
            Header: "S No.",
            accessor: "id",
            width: 10,
            Cell: ({ row: { original } }) => (
                <Typography
                    variant="subtitle1"
                    color="natural.500"
                    fontWeight={400}
                >
                    {original?.id}
                </Typography>
            ),
        },
        {
            Header: "Seller ID",
            accessor: "sellerId",
            Cell: ({ row: { original } }) => (
                <Typography
                    variant="subtitle1"
                    color="natural.500"
                    fontWeight={400}
                >
                    {original?.seller?.id}
                </Typography>
            ),
        },
        {
            Header: "Product Name",
            accessor: "user__first_name",
            Cell: ({ row: { original } }) => (
                <Typography
                    variant="subtitle1"
                    color="natural.500"
                    fontWeight={400}
                >
                    {original?.product_name}
                </Typography>
            ),
        },
        {
            Header: "Shipment Date",
            accessor: "alibaba_number",
            Cell: ({ row: { original } }) => (
                <Typography className="text-natural-500">
                    {formatDate(original?.created_at?.split("T")?.[0])}
                </Typography>
            ),
        },
        {
            Header: "Amount of Samples",
            accessor: "final_amount",
            Cell: ({ row: { original } }) => (
                <Typography className="text-natural-500">
                    {original?.quantity}
                </Typography>
            ),
        },
        {
            Header: "Sample Delivery Address",
            accessor: "address",
            Cell: ({ row: { original } }) => (
                <Typography className="text-natural-500">
                    {original?.address}
                </Typography>
            ),
        },
        {
            Header: "Status",
            accessor: "status",
            Cell: ({ row: { original } }) => (
                <Typography className="text-natural-500">
                    {original?.status}
                </Typography>
            ),
        },
        {
            Header: "Action",

            Cell: ({ row: { original } }) => {
                    const action = [
                        {
                            name: "View Shipment",
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
                    <div className=" gap-2 items-center hidden md:flex">
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
                )
            },
        },
        
    ];

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            {/* {makePayment && (
                <MakePaymentModal open={makePayment} onClose={handleClose} />
            )} */}
             <div className="block md:hidden">
                <h1 className="text-2xl font-semibold text-zinc-800 mb-2">Sample Shipment</h1>
                <div className="flex items-center text-sm mb-6">
                <Link to={routes.SHIPPERDASHBOARD.pathname} className="text-blue-600 hover:underline">
                    Dashboard
                </Link>
                <ChevronRight className="h-4 w-4 inline" />
                <span className="text-gray-500">Sample Shipment</span>
                </div>
            </div>
            <InfoModal open={modalOpen} onClose={handleCloseModal} />
            <CardComponent>
                <DataTableCustom
                    data={userMessageNotification}
                    columns={columns}
                    pageSize={10}
                    paginationFooter={true}
                    searchBar={true}
                    pageNumber={true}
                    updateFilters={setSellerShipmentPagination}
                    paginationData={paginationInformationShipment}
                    isLoading={isLoading}
                    heading="Sample Shipment"
                />
            </CardComponent>
        </>
    );
}
