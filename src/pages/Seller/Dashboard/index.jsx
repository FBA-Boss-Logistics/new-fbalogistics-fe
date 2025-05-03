import { Avatar, IconButton, Typography, useTheme } from "@mui/material";

import EDITICON from "assets/svg/editicon.svg"
import ProductImage from "assets/images/testphoto12.png";

import DataTableCustom from "components/Table/DataTableCustom";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import { FetchUserDetailApi } from "queries/Auth";
import { formatDate, formatName } from "utils";
import { FetchSellerRecentOrderDetailApi } from "queries/Seller";
import { format } from "date-fns";
import NewDashboard from "./New";
import { FetchSellerDashboardAnalyticsApi } from "queries/Seller";
import ShipmentStat from 'components/New/ShipmentStat'
import ShipmentCard from 'components/New/ShipmentCard'
import CreateSampleShipment from "../Booking/SampleShipment/New/CreateSampleShipment";
import { routes } from "routes/RouteConstants";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import DashboardStats from "./dashboardStats";
import ActionTable from "components/Table/ActionTable";
import { SellerContext, useSeller } from "../Context/SellerContext";
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

    // const [createSampleShipment, setCreateSampleShipment] = useState(false);
    const {createSampleShipment, setCreateSampleShipment} = useSeller();
    useEffect(() => {
        console.log("sellerContext", createSampleShipment)
    }, [createSampleShipment])

    const createShipment = () => {
        setCreateSampleShipment(true);
    };

    const handleCreateSampleShipment = () => {
        setCreateSampleShipment(false);
    };

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
            Cell: ({ row: { original } }) => {
                const action = [
                    {
                        name: "More info",
                        onClick: () => {
                            const Orderid = original.id;
                            navigate(
                                `/seller/booking/recentorderstatus/${Orderid}`
                            );
                        },
                        visible: true,
                    },
                ];
                return(
                <>
                <IconButton
                    onClick={() => {
                        const Orderid = original.id;
                        navigate(
                            `/seller/booking/recentorderstatus/${Orderid}`
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
                <ActionTable action={action} />
                </>
            )
        },
        },
    ];
    const {data:sellerDashboardAnalytics} = FetchSellerDashboardAnalyticsApi()
    const analytics = sellerDashboardAnalytics?.data

    // useEffect(() => {
    //     console.log("analytics", analytics)
    //     console.log("sellerDashboardAnalytics", sellerDashboardAnalytics)
    // }, [analytics])

    return (
        <>
            {/* {createSampleShipment && (
                <CreateSampleShipment
                    isOpen={createSampleShipment}
                    onClose={handleCreateSampleShipment}
                    title="Create Sample Shipment"
                    description="Create a sample shipment to test the shipment process."
                />
            )} */}
            <DashboardStats/>
       

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ShipmentCard
              title="New Shipment"
              description="Ready to get started with a new shipment? Click the button below to request a quote."
              buttonText="New shipment"
              imageType="new"
              onClick={() => navigate(routes.QUOTES.pathname)}
            />
            <ShipmentCard
              title="Sample Shipment"
              description="Ready to get started with a new sample shipment? Click the button below to begin."
              buttonText="Sample shipment"
              imageType="sample"
              onClick={createShipment}
            />
          </div>

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Announcements</h2>
              <Button className="hidden md:block" onClick={() => navigate(routes.ANNOUNCEMENT.pathname)} >
                View all announcements
              </Button>
              </div>
          

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-medium mb-4">Shipping Agent</h2>
            <p className="text-sm text-gray-600 mb-4">
              Other FBA Boss Academy students, hope you are all doing well. Here is the latest news regarding the
              situation of Amazon warehouse over capacity in the USA. The following warehouses have had a serious
              explosion of requirements. There will be delays in getting delivery appointments. ABOUT FCFS MG2 (BDL1)
              MG2 is not accepting any new shipments. FCFS is not accepting any new shipments. The following warehouses
              are having serious delays and appointments are increasing at the following warehouses: ABE1 LGB7 DFW6 DFW8
              MDW2 CLT2 ABE3 AVP1 TEB3 PHL4 MEM2 LBL1 BCL5 BDL1 BFL1 PHL5 PHL7 BFL1. The current storage situation of
              OVER CUBE and other warehouses on receiving appointments is also not ideal. With the arrival of the peak
              season ahead for the big promotion, Amazon warehouses have also issued notices about their working
              operations in November.
            </p>
            <div className="text-xs text-gray-500 mb-4">December 1, 2023</div>
            <Button >
              Read more
            </Button>
          </div>
            {/* <NewDashboard/> */}
            {/* <div className="flex justify-between items-start border-2  border-natural-200 border-solid p-4 rounded-xl m-4">
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
                <div className="flex gap-2">
                    <Typography>Edit</Typography>
                    <img src={EDITICON} alt="edit"/>
                </div>
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
            </div> */}
        </>
    );
}
