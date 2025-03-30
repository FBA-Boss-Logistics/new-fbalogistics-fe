import { useMemo, useState } from "react";
import DataTableCustom from "components/Table/DataTableCustom";
import ProductImage from "assets/images/testphoto12.png";
import EyeIcon from "assets/svg/Eye.svg";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BookingsTopNav from "../BookingsTopNav";
import { FetchSellerCancelledOrderDetailApi } from "queries/Seller";
import { formatDate } from "utils";
import { format } from "date-fns";

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
            Header: "Action",
            Cell: ({ row: { original } }) => (
                <img
                    src={EyeIcon}
                    className="cursor-pointer"
                    onClick={() => handleClick(original.id)}
                    alt="EyeIcon"
                />
            ),
        },
    ];

    const handleClick = (id) => {
        navigate(`/seller/booking/order/status/${id}/?src=cancelledorders`);
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
                    Cancelled Shipments
                </Typography>

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
                />
            </div>
        </div>
    );
}
