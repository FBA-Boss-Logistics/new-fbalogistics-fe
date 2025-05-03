import { useMemo, useState } from "react";
import DataTableCustom from "components/Table/DataTableCustom";
import ProductImage from "assets/images/testphoto12.png";
import EyeIcon from "assets/svg/Eye.svg";
import { Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BookingsTopNav from "../BookingsTopNav";
import { FetchSellerCancelledOrderDetailApi } from "queries/Seller";
import { formatDate } from "utils";
import { format } from "date-fns";
import HeaderPage from "components/HeaderPage";
import DashboardStats from "pages/Seller/Dashboard/dashboardStats";
import ActionTable from "components/Table/ActionTable";

export default function CancelledOrders() {
    const [sellerShipmentPagination, setSellerShipmentPagination] = useState(
        {}
    );
    const [selectedSellerShipmentDate, setSelectedSellerShipmentDate] =
        useState(null);
    // Assuming formData?.shipment_ready_date is in "MM/DD/YYYY" format
    const initialDate = selectedSellerShipmentDate
        ? format(new Date(selectedSellerShipmentDate), "yyyy-MM-dd")
        : null;
    const {
        data: sellerShipmentData,
        dataUpdatedAt,
        isLoading,
    } = FetchSellerCancelledOrderDetailApi({
        sellerShipmentPagination,
        initialDate,
    });
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
    const navigate = useNavigate();

    /** @type import('@tanstack/react-table').ColumnDef<any> */ //for autosuggestions
    const columns = [
        {
            Header: "Shipment ID",
            accessor: "id",
            width: 10,
            Cell: ({ row: { original } }) => (
                <Typography variant="subtitle2" color="natural.500" fontWeight={400}>
                    {original?.id}
                </Typography>
            ),
        },
        {
            Header: "Product Name",
            accessor: "product_name",
            Cell: ({ row: { original } }) => (
                <Typography variant="subtitle2" color="natural.500" fontWeight={400}>
                    {original?.product_name}
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
            Header: "Action",
            Cell: ({ row: { original } }) => {
                const action = [
                    {
                        name: "View Shipment",
                        onClick: () => handleClick(original.id),
                        visible: true,
                    },
                    
                ]
                return (
                    <>
                        <img
                            src={EyeIcon}
                            className="cursor-pointer md:block hidden"
                        onClick={() => handleClick(original.id)}
                            alt="EyeIcon"
                        />
                        <ActionTable action={action} />
                    </>
                )
            },
        },
    ];

    const handleClick = (id) => {
        navigate(`/seller/booking/order/status/${id}/?src=cancelledorders`);
    };

    return (
        <div>
            <DashboardStats />
            <HeaderPage title="Cancelled Shipments" home="shipment" pathname="Cancelled Shipments" />
            <Card className="mt-6 overflow-hidden">
                <DataTableCustom
                    data={sellerShipmentListData}
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
                    heading="Cancelled Shipments"
                />
            </Card>
            {/* </div> */}
        </div>
    );
}
