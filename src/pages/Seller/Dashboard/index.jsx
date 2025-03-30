import { Avatar, IconButton, Typography, useTheme } from "@mui/material";

// import EDITICON from "assets/svg/editicon.svg"
import ProductImage from "assets/images/testphoto12.png";

import DataTableCustom from "components/Table/DataTableCustom";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import { FetchUserDetailApi } from "queries/Auth";
import { formatDate, formatName } from "utils";
import { FetchSellerRecentOrderDetailApi } from "queries/Seller";
import { format } from "date-fns";

export default function SellerDashboard() {
    const [
        sellerHomeRecentOrderPagination,
        setSellerHomeRecentOrderPagination,
    ] = useState({});
    const [
        selectedSellerHomeRecentOrderDate,
        setSelectedSellerHomeRecentOrderDate,
    ] = useState(null);
    // Assuming formData?.shipment_ready_date is in "MM/DD/YYYY" format
    const initialsellerHomeRecentOrderDate = selectedSellerHomeRecentOrderDate
        ? format(new Date(selectedSellerHomeRecentOrderDate), "yyyy-MM-dd")
        : null;
    const {
        data: sellerHomeRecentOrderData,
        dataUpdatedAt,
        isLoading,
    } = FetchSellerRecentOrderDetailApi({
        sellerHomeRecentOrderPagination,
        initialsellerHomeRecentOrderDate,
    });
    const { sellerHomeListData, paginationInformation } = useMemo(() => {
        if (dataUpdatedAt) {
            return {
                sellerHomeListData: sellerHomeRecentOrderData?.data,
                paginationInformation:
                    sellerHomeRecentOrderData?.pagination_option,
            };
        }
        return {
            sellerHomeListData: [],
            paginationInformation: {},
        };
    }, [dataUpdatedAt]);

    const theme = useTheme();
    const navigate = useNavigate();

    const { data: userInfo } = FetchUserDetailApi();
    const fullName = userInfo?.data.first_name + " " + userInfo?.data.last_name;
    const phone = userInfo?.data?.profile?.phone;

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
            footer: "Product Name",
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
                <Typography
                    variant="subtitle1"
                    color="natural.500"
                    fontWeight={400}
                >
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
            Cell: ({ row: { original } }) => (
                <IconButton
                    onClick={() => {
                        const Orderid = original.id;
                        navigate(
                            `/seller/booking/recentorderstatus/${Orderid}`
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

    return (
        <div>
            <div className="flex justify-between items-start border-2  border-natural-200 border-solid p-4 rounded-xl m-4">
                <div className="flex justify-center gap-8 pl-8 pr-8 items-center">
                    <div>
                        <Avatar
                            sx={{
                                width: 99,
                                height: 96,
                                bgcolor: theme.palette.primary[100],
                                color: theme.palette.primary[800],
                                border: 3,
                                fontSize: 36,
                                borderColor: theme.palette.primary[500],
                                fontWeight: 500,
                            }}
                        >
                            {formatName(fullName)}
                        </Avatar>
                    </div>
                    <div className="flex gap-14">
                        <div className="flex-col gap-2 flex">
                            <Typography
                                color="natural.400"
                                variant="body1"
                                fontWeight={500}
                            >
                                Name
                            </Typography>
                            <Typography
                                color="natural.500"
                                fontSize={18}
                                fontWeight={400}
                            >
                                {userInfo?.data.first_name}{" "}
                                {userInfo?.data.last_name}
                            </Typography>
                        </div>
                        <div className="flex-col gap-2 flex">
                            <Typography
                                color="natural.400"
                                variant="body1"
                                fontWeight={500}
                            >
                                Email
                            </Typography>
                            <Typography
                                color="natural.500"
                                fontSize={18}
                                fontWeight={400}
                            >
                                {userInfo?.data.email}
                            </Typography>
                        </div>
                        <div className="flex-col gap-2 flex">
                            <Typography
                                color="natural.400"
                                variant="body1"
                                fontWeight={500}
                            >
                                Phone
                            </Typography>
                            <Typography
                                color="natural.500"
                                fontSize={18}
                                fontWeight={400}
                            >
                                {phone}
                            </Typography>
                        </div>
                    </div>
                </div>
                {/* <div className="flex gap-2">
                    <Typography>Edit</Typography>
                    <img src={EDITICON} alt="edit"/>
                </div> */}
            </div>

            <div className="m-4">
                <DataTableCustom
                    data={sellerHomeListData}
                    columns={columns}
                    updateFilters={setSellerHomeRecentOrderPagination}
                    paginationFooter={true}
                    searchBar={true}
                    pageNumber={true}
                    paginationData={paginationInformation}
                    isLoading={isLoading}
                    date={true}
                    setSelectedDate={setSelectedSellerHomeRecentOrderDate}
                    selectedDate={selectedSellerHomeRecentOrderDate}
                />
            </div>
        </div>
    );
}
