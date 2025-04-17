import { useMemo, useState } from "react";

import DataTableCustom from "components/Table/DataTableCustom";
import { IconButton, Typography } from "@mui/material";

import InfoModal from "../Quotation/InfoModal";
import { useNavigate } from "react-router-dom";

import { RemoveRedEyeOutlined } from "@mui/icons-material";
import { FetchShipmentHistoryDetailApi } from "queries/Shipper";
import CardComponent from "components/Dashboard/OrderStatus/CardComponent";

export default function ShipmentHistory() {
    const [pastOrderListPagination, setPastOrderListPagination] = useState({});
    const {
        data: pastOrderData,
        dataUpdatedAt,
        isLoading,
    } = FetchShipmentHistoryDetailApi({ pastOrderListPagination });
    const { pastOrderListData, paginationInformationShipment } = useMemo(() => {
        if (dataUpdatedAt) {
            return {
                pastOrderListData: pastOrderData?.data,
                paginationInformationShipment: pastOrderData?.pagination_option,
            };
        }
        return {
            pastOrderListData: [],
            paginationInformationShipment: {},
        };
    }, [dataUpdatedAt]);

    const navigate = useNavigate();

    /** @type import('@tanstack/react-table').ColumnDef<any> */ //for autosuggestions
    const columns = [
        {
            Header: "Shipment ID",
            accessor: "id",
            width: 10,
        Cell: ({ row: { original } }) => (
            <Typography variant="subtitle2" color="natural.500">
                {original.id}
            </Typography>
        ),

        },
        {
            Header: "Customer Name",
            accessor: "user__first_name",
            Cell: ({ row: { original } }) => (
                <Typography
                    variant="subtitle2"
                    color="natural.500"
                    fontWeight={400}
                >
                    {" "}
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
                    className="text-natural-500 "
                >
                    {original.tracking_link}
                </a>
            ),
        },
        {
            Header: "Final Amount",
            accessor: "final_amount",
            Cell: ({ row: { original } }) => (
                <h1 className="text-sm text-natural-500">
                    {"$" + original.final_amount}
                </h1>
            ),
        },

        {
            Header: "Action",

            Cell: ({ row: { original } }) => (
                <IconButton
                    onClick={() => {
                        const clickedOrderId = original?.id;

                        navigate(
                            `/shipper/dashboard/orders/shipmenthistories/status/${clickedOrderId}/?src=accepted`
                        );
                    }}
                >
                    {" "}
                    <RemoveRedEyeOutlined
                        fontSize="small"
                        color="secondary.100"
                    />
                </IconButton>
            ),
        },
    ];

    const [modalOpen, setModalOpen] = useState(false);

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    return (
        <>
            <InfoModal open={modalOpen} onClose={handleCloseModal} />
            <CardComponent>

                <DataTableCustom
                    data={pastOrderListData}
                    columns={columns}
                    pageSize={10}
                    paginationFooter={true}
                    searchBar={true}
                    pageNumber={true}
                    updateFilters={setPastOrderListPagination}
                    paginationData={paginationInformationShipment}
                    isLoading={isLoading}
                    heading="Shipments History"
                    />
            </CardComponent>
        </>
    );
}
