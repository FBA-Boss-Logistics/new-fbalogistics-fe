import { useEffect, useMemo, useState } from "react";
import DataTableCustom from "components/Table/DataTableCustom";
import { Button, Typography } from "@mui/material";
import InfoModal from "../Quotation/InfoModal";
import { useNavigate } from "react-router-dom";

import { RemoveRedEyeOutlined } from "@mui/icons-material";
import { FetchRecentOrderDetailApi } from "queries/Shipper";
import ChatIconWithDot from "components/Comman/ChatWithGreenDot";
import { useChat } from "components/Dashboard/OrderStatus/Chat/ChatContext";

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
                    className="text-natural-500"
                >
                    {original.tracking_link}
                </a>
            ),
        },
        {
            Header: "Final Amount",
            accessor: "final_amount",
            Cell: ({ row: { original } }) => "$" + original.final_amount,
        },
        {
            Header: "Info",
            Cell: ({ row: { original } }) => (
                <Button
                    variant="outlined"
                    className="w-[75px] h-[32px] px-[12px] py-[6px] bg-natural-50"
                    onClick={() => handleOpenModal(original)}
                >
                    <Typography
                        fontWeight={500}
                        fontSize={12}
                        color="natural.900"
                    >
                        Add info
                    </Typography>
                </Button>
            ),
        },
        {
            Header: "Action",
            Cell: ({ row: { original } }) => {
                return (
                    <div className="flex gap-2 items-center">
                        <RemoveRedEyeOutlined
                            fontSize="small"
                            color="secondary.100"
                            className="cursor-pointer"
                            onClick={() => handleClickRoute(original)}
                        />
                        {original.status === "Quotation Accepted" && (
                            <ChatIconWithDot
                                handleClick={handleClickRoute}
                                original={original}
                            />
                        )}
                    </div>
                );
            },
        },
    ];

    const handleOpenModal = (original) => {
        setModalOpen(true);
        setSelectedrowData(original);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <InfoModal
                open={modalOpen}
                onClose={handleCloseModal}
                rowData={selectedrowData}
                tableData={userMessageNotification}
            />

            <DataTableCustom
                data={userMessageNotification}
                columns={columns}
                pageSize={10}
                paginationFooter={true}
                searchBar={true}
                pageNumber={true}
                updateFilters={setRecentOrderListPagination}
                paginationData={paginationInformationShipment}
                isLoading={isLoading}
            />
        </>
    );
}
