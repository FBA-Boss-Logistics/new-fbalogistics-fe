import { useMemo, useState } from "react";
import DataTableCustom from "components/Table/DataTableCustom";
import EyeIcon from "assets/svg/Eye.svg";
import { IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChatIcon from "assets/svg/ChatIcon.svg";
import BookingsTopNav from "../BookingsTopNav";
import { FetchSellerRecentOrderDetailApi } from "queries/Seller";
import ProductImage from "assets/images/testphoto12.png";
import { formatDate } from "utils";
import { format } from "date-fns";
import { Check } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import ActionTable from "components/Table/ActionTable";

export default function RecentOrderBooking() {
    const [sellerRecentShipmentPagination, setSellerRecentShipmentPagination] =
        useState({});
    const [
        selectedSellerRecentShipmentDate,
        setSelectedSellerRecentShipmentDate,
    ] = useState(null);
    // Assuming formData?.shipment_ready_date is in "MM/DD/YYYY" format
    const initialDate = selectedSellerRecentShipmentDate
        ? format(new Date(selectedSellerRecentShipmentDate), "yyyy-MM-dd")
        : null;
    const {
        data: sellerRecentShipmentData,
        dataUpdatedAt,
        isLoading,
    } = FetchSellerRecentOrderDetailApi({
        sellerRecentShipmentPagination,
        initialDate,
    });
    const { sellerRecentShipmentListData, paginationInformation } =
        useMemo(() => {
            if (dataUpdatedAt) {
                return {
                    sellerRecentShipmentListData:
                        sellerRecentShipmentData?.data,
                    paginationInformation:
                        sellerRecentShipmentData?.pagination_option,
                };
            }
            return {
                sellerRecentShipmentListData: [],
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
                    {original.pickup_location?.full_address}
                </Typography>
            ),
        },

        {
            Header: "Final Amount",
            accessor: "final_amount",
            Cell: ({ row: { original } }) => "$" + original.final_amount,
        },
        {
            Header: "Wining Bid",
            accessor: "total_amount",
            Cell: ({ row: { original } }) =>
                "$" + original.quotation.total_amount,
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
                    <div className="md:flex hidden gap-3">
                        <img
                            src={EyeIcon}
                            className="cursor-pointer"
                    />
                    {/* <img
                        src={ChatIcon}
                        className="cursor-pointer"
                        onClick={() => handleClick(original.id)}
                        alt="ChatIcon"
                    /> */}
                    <ActionTable action={action} />
                </div>
            )},
        },
    ];

    const handleClick = (id) => {
        navigate(
            `/seller/booking/recentorderstatus/${id}/?src=currentShipments`
        );
    };

    return (
        <div>
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
                    data={sellerRecentShipmentListData}
                    columns={columns}
                    paginationFooter={true}
                    searchBar={true}
                    paginationData={paginationInformation}
                    isLoading={isLoading}
                    updateFilters={setSellerRecentShipmentPagination}
                    date={true}
                    pageNumber={true}
                    setSelectedDate={setSelectedSellerRecentShipmentDate}
                    selectedDate={selectedSellerRecentShipmentDate}
                />
            </div>
        </div>
    );
}
