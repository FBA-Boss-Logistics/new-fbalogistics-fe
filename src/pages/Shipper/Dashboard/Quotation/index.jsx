import {
    memo,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState,
} from "react";
import ProductImage from "assets/images/testphoto12.png";
import DataTableCustom from "components/Table/DataTableCustom";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FetchShipmentDetailApi } from "queries/Shipper";
import { formatDate } from "utils";
import useCountdownTimer from "./useCountdownTimer";
import { convertIntoUnix } from "./utils";
import { format } from "date-fns";
import hammerIcon from 'assets/svg/hammer.svg' 
import { Package} from "lucide-react"
import ActionTable from "components/Table/ActionTable";

const Timer = memo(function Timer({ row, refetch, isLoading }) {
    const createdAtTimeStamp = convertIntoUnix(row.row.original.created_at);
    const { hours, minutes, seconds } = useCountdownTimer(createdAtTimeStamp);
    useEffect(() => {
        if (hours === "00" && minutes === "00" && seconds === "00" && !isLoading) {
            refetch();
        }
    }, [hours, minutes, seconds])
    
    return (
        <div className="flex">
     
            <div className="border-natural-50 border-solid p-1">
                <Typography variant="subtitle2" fontWeight={400}  color={"natural.500"}>{hours}h</Typography>
            </div>
            <div className="border-natural-50 border-solid p-1">
                <Typography variant="subtitle2" fontWeight={400} color={"natural.500"}>{minutes}m</Typography>
            </div>
            <div className="border-natural-50 border-solid p-1">
                <Typography variant="subtitle2" fontWeight={400} color={"natural.500"}>{seconds}s</Typography>
            </div>
        </div>
    );
});

export default function Quotation() {
    const [shipmentListPagination, setShipmentListPagination] = useState({});
    const [selectedShipmentDate, setSelectedShipmentDate] = useState(null);
    // Assuming formData?.shipment_ready_date is in "MM/DD/YYYY" format
    const initialShipmentDate = selectedShipmentDate
        ? format(new Date(selectedShipmentDate), "yyyy-MM-dd")
        : null;

    const {
        data: shipmentData,
        dataUpdatedAt,
        isLoading,
        refetch,
    } = FetchShipmentDetailApi({ shipmentListPagination, initialShipmentDate });
    const { shipmentListData, paginationInformationShipment } = useMemo(() => {
        if (dataUpdatedAt) {
            return {
                shipmentListData: shipmentData?.data,
                paginationInformationShipment: shipmentData?.pagination_option,
            };
        }
        return { shipmentListData: [], paginationInformationShipment: {} };
    }, [dataUpdatedAt]);


    useEffect(() => {
        console.log('this is the shipmentListData')
        console.log(shipmentListData)
    }, [shipmentListData])
    
    const navigate = useNavigate();
    /** @type import('@tanstack/react-table').ColumnDef<any> */ //for autosuggestions
    const columns = [
      //   {
      //       Header: "Biding Ends In:",
      //           Cell: useCallback((row) => {
      //               return <Timer refetch={refetch} row={row} isLoading={isLoading} />;
      //           }, []),
      //   },
        {
            Header: "Product Name",
            accessor: "product_name",
            footer: "Product Name",
            Cell: ({ row: { original } }) => (
               
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
                <Typography
                    variant="subtitle2"
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
                <Typography
                    variant="subtitle2"
                    color="natural.500"
                    fontWeight={400}
                >
                    {" "}
                    {original.pickup_location?.full_address}
                </Typography>
            ),
        },
        {
            Header: "Action",
            Cell: ({ row: { original } }) => {
                const action = [
                    {
                        name: "Bid",
                        onClick: () => {
                            const clickedShipmentId = original.id;
                            navigate(`/shipper/bid/${clickedShipmentId}`);
                        },
                        visible: true,
                    },
                ];
                return (
                <>
                <img className="hidden md:block" src={hammerIcon} alt="" onClick={() => {
                            const clickedShipmentId = original.id;
                            navigate(`/shipper/bid/${clickedShipmentId}`);
                }} />
                {/* <Button onClick={() => {
                            const clickedShipmentId = original.id;
                            navigate(`/shipper/bid/${clickedShipmentId}`);
                }} className="block md:hidden w-full text-blue-600  " variant="text">
                    Bid
                </Button> */}
                <ActionTable action={action} />
                </>
                );
            },
        },
    ];

    
    return (
        <>
            <DataTableCustom
                data={shipmentListData}
                columns={columns}
                paginationFooter={true}
                headerGroup={true}
                pageNumber={true}
                paginationData={paginationInformationShipment}
                isLoading={isLoading}
                updateFilters={setShipmentListPagination}
                date={true}
                setSelectedDate={setSelectedShipmentDate}
                selectedDate={selectedShipmentDate}
                icon={<Package className="h-5 w-5" />}
                heading={"Pending Quotations "}

            />
        </>
    );
}
