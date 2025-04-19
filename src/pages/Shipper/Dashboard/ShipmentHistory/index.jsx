import { useMemo, useState } from "react";

import DataTableCustom from "components/Table/DataTableCustom";
import { Button, IconButton, Typography } from "@mui/material";

import InfoModal from "../Quotation/InfoModal";
import { Link, useNavigate } from "react-router-dom";

import { RemoveRedEyeOutlined } from "@mui/icons-material";
import { FetchShipmentHistoryDetailApi } from "queries/Shipper";
import CardComponent from "components/Dashboard/OrderStatus/CardComponent";
import { routes } from "routes/RouteConstants";
import { ChevronRight } from "lucide-react";

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
                <>
                <IconButton
                    onClick={() => {
                        const clickedOrderId = original?.id;

                        navigate(
                            `/shipper/dashboard/orders/shipmenthistories/status/${clickedOrderId}/?src=accepted`
                        );
                    }}
                    className="hidden md:block"
                >
                    {" "}
                    <RemoveRedEyeOutlined
                        fontSize="small"
                        color="secondary.100"
                    />
                </IconButton>
                <Button onClick={() => {
                            const clickedShipmentId = original.id;
                            navigate(`/shipper/dashboard/orders/shipmenthistories/status/${clickedShipmentId}/?src=accepted`);
                }} className="block md:hidden w-full text-blue-600 bg-white hover:bg-gray-50 h-9" variant="outline">
                    More info
                </Button>
                </>
            ),
        },
    ];

    const [modalOpen, setModalOpen] = useState(false);

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    return (
        <>

            <div className="block md:hidden">
                <h1 className="text-2xl font-semibold text-zinc-800 mb-2">Shipments History</h1>
                <div className="flex items-center text-sm mb-6">
                <Link to={routes.SHIPPERDASHBOARD.pathname} className="text-blue-600 hover:underline">
                    Dashboard
                </Link>
                <ChevronRight className="h-4 w-4 inline" />
                <span className="text-gray-500">Shipments History</span>
                </div>
            </div>
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
