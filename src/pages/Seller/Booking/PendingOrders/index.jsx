import { useMemo, useState } from "react";
import DataTableCustom from "components/Table/DataTableCustom";
import ProductImage from "assets/images/testphoto12.png";
import EyeIcon from "assets/svg/Eye.svg";
import { IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BookingsTopNav from "../BookingsTopNav";
import { FetchSellerPendingShipmentDetailApi } from "queries/Seller";
import { formatDate } from "utils";
import { format } from "date-fns";
import ActionTable from "components/Table/ActionTable";

export default function PendingOrders() {
    const [sellerShipmentListPagination, setSellerShipmentListPagination] =
        useState({});
    const [selectedSellerShipmentListDate, setSelectedSellerShipmentListDate] =
        useState(null);
    const initialDate = selectedSellerShipmentListDate
        ? format(new Date(selectedSellerShipmentListDate), "yyyy-MM-dd")
        : null;
    let {
        data: sellerShipmentData,
        dataUpdatedAt,
        isLoading,
    } = FetchSellerPendingShipmentDetailApi({
        sellerShipmentListPagination,
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
            Header: "Wining Bid",
            accessor: "total_amount",
            Cell: ({ row: { original } }) => (
                <Typography>{original.quotation.total_amount}</Typography>
            ),
        },

        {
            Header: "Action",
            Cell: ({ row: { original } }) => {
                const action = [
                    {
                        name: "More info",
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
        navigate(`/seller/booking/order/status/${id}/?src=pendingorders`);
    };

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
                    Pending Shipments
                </Typography>

                <DataTableCustom
                    data={sellerShipmentListData}
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
