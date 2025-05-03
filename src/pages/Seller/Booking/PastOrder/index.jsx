import { useMemo, useState } from "react";
import DataTableCustom from "components/Table/DataTableCustom";
import EyeIcon from "assets/svg/Eye.svg";
import ProductImage from "assets/images/testphoto12.png";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BookingsTopNav from "../BookingsTopNav";
import { FetchSellerPastOrderDetailApi } from "queries/Seller";
import { formatDate } from "utils";
import { format } from "date-fns";
import ActionTable from "components/Table/ActionTable";
import DashboardStats from "pages/Seller/Dashboard/dashboardStats";
import CardComponent from "components/Dashboard/OrderStatus/CardComponent";
import { Card } from "components/ui/card";
import HeaderPage from "components/HeaderPage";

export default function PastOrderBooking() {
    const [
        sellerPastShipmentListPagination,
        setSellerPastShipmentListPagination,
    ] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    // Assuming formData?.shipment_ready_date is in "MM/DD/YYYY" format
    const initialDate = selectedDate
        ? format(new Date(selectedDate), "yyyy-MM-dd")
        : null;
    const {
        data: sellerPastShipmentData,
        dataUpdatedAt,
        isLoading,
    } = FetchSellerPastOrderDetailApi({
        sellerPastShipmentListPagination,
        initialDate,
    });
    const { sellerPastShipmentListData, paginationInformation } =
        useMemo(() => {
            if (dataUpdatedAt) {
                return {
                    sellerPastShipmentListData: sellerPastShipmentData?.data,
                    paginationInformation:
                        sellerPastShipmentData?.pagination_option,
                };
            }
            return {
                sellerPastShipmentListData: [],
                paginationInformation: {},
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
            Header: "Product Name",
            accessor: "product_name",
            Cell: ({ row: { original } }) => (
                // <div className="flex items-center">
                //     <img src={ProductImage} alt="Product" />
                //     <span className="ml-1.5">{original.product_name}</span>
                // </div>
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
            Header: "Shipment Date",
            accessor: "shipment_ready_date",
            Cell: ({ row: { original } }) => (
                <Typography variant="subtitle2" color="natural.500" fontWeight={400}>
                    {formatDate(original.shipment_ready_date)}
                </Typography>
            ),
        },
        {
            Header: "Pickup Location",
            accessor: "pickup_location",
            Cell: ({ row: { original } }) => (
                <Typography variant="subtitle2" color="natural.500" fontWeight={400}>
                    {formatDate(original.pickup_location?.full_address)}
                </Typography>
            ),
        },

        {
            Header: "Final Amount",
            accessor: "final_amount",
            Cell: ({ row: { original } }) => (
                <Typography variant="subtitle2" color="natural.500" fontWeight={400}>
                    ${original.final_amount}
                </Typography>
            ),
        },

        {
            Header: "Action",
            Cell: ({ row: { original } }) => {
                const action = [
                    {
                        name: "View Shipment",
                        onClick: () => handleClick(original.id),
                        visible: true,
                    },
                ];
                return(
                    <>
                    <img
                        src={EyeIcon}
                    className="cursor-pointer md:inline-block hidden"
                    onClick={() => handleClick(original.id)}
                    alt="EyeIcon"
                />
                <ActionTable action={action} />
                </>
            )},
        },
    ];

    const handleClick = (id) => {
        navigate(`/seller/booking/order/status/${id}`);
    };

    // const [modalOpen, setModalOpen] = useState(false);

    // const handleOpenModal = () => {
    //   setModalOpen(true);
    // };

    // const handleCloseModal = () => {
    //   setModalOpen(false);
    // };
    return (
        <div>
            <DashboardStats />
            <HeaderPage title="Completed Shipments" pathname="Completed Shipments" home="seller" />
            <Card className="mt-6 overflow-hidden"> 
                <DataTableCustom
                    data={sellerPastShipmentListData}
                    columns={columns}
                    paginationFooter={true}
                    pageNumber={true}
                    searchBar={true}
                    paginationData={paginationInformation}
                    isLoading={isLoading}
                    updateFilters={setSellerPastShipmentListPagination}
                    date={true}
                    setSelectedDate={setSelectedDate}
                    selectedDate={selectedDate}
                    heading="Completed Shipments"
                />
            </Card>
        </div>
    );
}
