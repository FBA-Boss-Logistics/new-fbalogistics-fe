import { useEffect, useMemo, useState } from "react";
import DataTableCustom from "components/Table/DataTableCustom";
import { Button, Typography } from "@mui/material";
import InfoModal from "../Quotation/InfoModal";
import { Link, useNavigate } from "react-router-dom";

import { RemoveRedEyeOutlined } from "@mui/icons-material";
import { FetchRecentOrderDetailApi } from "queries/Shipper";
import ChatIconWithDot from "components/Comman/ChatWithGreenDot";
import { useChat } from "components/Dashboard/OrderStatus/Chat/ChatContext";
import CardComponent from "components/Dashboard/OrderStatus/CardComponent";
import { ChevronRight } from "lucide-react";
import { routes } from "routes/RouteConstants";
import ActionTable from "components/Table/ActionTable";
import { Card } from "components/ui/card";

export default function Orders() {
    const navigate = useNavigate();
    const [recentOrderListPagination, setRecentOrderListPagination] = useState(
        {}
    );
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedrowData, setSelectedrowData] = useState(null);
    const {
        data: recentOrderData,
        dataUpdatedAt,
        isLoading,
    } = FetchRecentOrderDetailApi({ recentOrderListPagination });

    const { recentOrderListData, paginationInformationShipment } =
        useMemo(() => {
            if (dataUpdatedAt) {
                return {
                    recentOrderListData: recentOrderData?.data,
                    paginationInformationShipment:
                        recentOrderData?.pagination_option,
                };
            }
            return {
                recentOrderListData: [],
                paginationInformationShipment: {},
            };
        }, [dataUpdatedAt]);

    const {
        allNotifications,
        userMessageNotification,
        setUserMessageNotification,
        sendCustomMessage,
        userInfo,
    } = useChat();

    useEffect(() => {
        setUserMessageNotification(recentOrderListData);
    }, [recentOrderListData]);

    const handleClickRoute = ({ id }) => {
        if (allNotifications?.length > 0) {
            const notification_id = allNotifications.filter(
                ({ shipment_id }) => shipment_id === id
            )?.[0]?.id;
            if (notification_id) {
                const notificationMsg = {
                    notification_id,
                    user_id: userInfo?.id.toString(),
                };
                sendCustomMessage("mark_notification_read", notificationMsg);
            }
        }
        navigate(`/shipper/dashboard/orders/status/${id}/?src=accepted`);
    };

    const columns = [
        {
            Header: "Shipment ID",
            accessor: "id",
            width: 10,
            Cell: ({ row: { original } }) => (
                <Typography
                    variant="subtitle1"
                    color="natural.500"
                    fontWeight={400}
                >
                    {original.id}
                </Typography>
            ),
        },
        {
            Header: "Customer Name",
            accessor: "user__first_name",
            Cell: ({ row: { original } }) => (
                <Typography
                    variant="subtitle1"
                    color="natural.500"
                    fontWeight={400}
                >
                    {original.user.first_name} {original.user.last_name}
                </Typography>
            ),
        },
        {
            Header: "Tracking Link",
            accessor: "alibaba_number",
            Cell: ({ row: { original } }) => (
                <a
                    href={original.tracking_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-natural-500 text-sm"
                >
                    {original.tracking_link ?? "N/A"}
                </a>
            ),
        },
        {
            Header: "Final Amount",
            accessor: "final_amount",
            Cell: ({ row: { original } }) => (
                <Typography
                    variant="subtitle1"
                    color="natural.500"
                    fontWeight={400}
                >
                    ${original.final_amount}
                </Typography>
            ),
        },
        {
            Header: "Info",
            Cell: ({ row: { original } }) => (
                <Button
                    variant="text"
                    className=" "
                    onClick={() => handleOpenModal(original)}
                >
                    <Typography
                        fontWeight={400}
                        variant="subtitle1"
                        color="natural.900"
                        className="text-sm hover:underline"
                    >
                        Add info
                    </Typography>
                </Button>
            ),
        },
        {
            Header: "Action",
            Cell: ({ row: { original } }) => {
                const action = [
                    {
                        name: "View Shipment",
                        onClick: () => handleDetailShipment(original.id),
                        visible: true,
                    },
                    {
                        name: "Open Chat",
                        onClick: () => handleClickRoute(original),
                        visible: true,
                    }
                ];
                return (
                    <>
                    <div className=" gap-2 items-center hidden md:flex">
                        <RemoveRedEyeOutlined
                            fontSize="small"
                            color="secondary.100"
                            className="cursor-pointer"
                            onClick={() => handleDetailShipment(original.id)}
                        />
                        {original.status === "Quotation Accepted" && (
                            <ChatIconWithDot
                                handleClick={handleClickRoute}
                                original={original}
                            />
                        )}
                    </div>
                    {/* <div className="flex gap-2 items-center justify-center md:hidden w-full">
                 
                        <Button onClick={() => {
                            handleClickRoute(original)
                    }} className="block md:hidden w-full text-blue-600  " variant="text">
                        More info
                    </Button>
                    </div> */}
                    <ActionTable action={action} />
                    </>
                );
            },
        },
        // {
        //     Header: "Action2",
        //     Cell: ({ row: { original } }) => {
        //         return (
        //             <>
        //             <div className="flex gap-2 items-center justify-center md:hidden w-full">
        //                  {original.status === "Quotation Accepted" && (
        //                     <Button
        //                         variant="text"
        //                         className="block md:hidden w-full text-blue-600 " 
        //                         onClick={() => handleClickRoute(original)}
        //                     >
        //                         Chat
        //                     </Button>
        //                 )}
        //             </div>
        //             </>
        //         );
        //     },
        // },
    ];

    const handleOpenModal = (original) => {
        setModalOpen(true);
        setSelectedrowData(original);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleDetailShipment = (id) => {
        // if (srcQueryParam === "accepted") {
            navigate(`/shipper/bid/${id}/?src=phone`);
        // } else {
        //     navigate(`/shipper/bid/${id}`);
        // }
    };

    return (
        <>
            <InfoModal
                open={modalOpen}
                onClose={handleCloseModal}
                rowData={selectedrowData}
                tableData={userMessageNotification}
            />

            <div className="block md:hidden">
                <h1 className="text-2xl font-semibold text-zinc-800 mb-2">Current Shipments</h1>
                <div className="flex items-center text-sm mb-6">
                <Link to={routes.SHIPPERDASHBOARD.pathname} className="text-blue-600 hover:underline">
                    Dashboard
                </Link>
                <ChevronRight className="h-4 w-4 inline" />
                <span className="text-gray-500">Current Shipments</span>
                </div>
            </div>

            <Card className="overflow-hidden">
                <DataTableCustom
                    data={userMessageNotification}
                    columns={columns}
                    pageSize={10}
                    paginationFooter={true}
                    headerGroup={true}
                    pageNumber={true}
                    updateFilters={setRecentOrderListPagination}
                    paginationData={paginationInformationShipment}
                    isLoading={isLoading}
                    heading="Current Shipments"
                />
            </Card>
        </>
    );
}
