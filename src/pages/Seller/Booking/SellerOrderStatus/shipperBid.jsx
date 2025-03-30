import { Typography } from "@mui/material";
import DataTableCustom from "components/Table/DataTableCustom";
import {
    FetchQuotationDetailApi,
    UpdateQuotationStatusDetailApi,
} from "queries/Seller";
import { memo, useCallback, useState } from "react";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "routes/RouteConstants";
import { convertIntoUnix } from "pages/Shipper/Dashboard/Quotation/utils";
import useCountdownTimer from "pages/Shipper/Dashboard/Quotation/useCountdownTimer";
import StarGernator from "./StarGernator";

const Timer = memo(function Timer({ refetch, created_at }) {
    const createdAtTimeStamp = convertIntoUnix(created_at);
    const { hours, minutes, seconds } = useCountdownTimer(createdAtTimeStamp);
    if (hours === "00" && minutes === "00" && seconds === "00") {
        refetch();
    }
    return (
        <div className="flex">
            <div className="border-natural-50 border-solid p-1">
                <Typography color={"natural.700"}>{hours}h</Typography>
            </div>
            <div className="border-natural-50 border-solid p-1">
                <Typography color={"natural.700"}>{minutes}m</Typography>
            </div>
            <div className="border-natural-50 border-solid p-1">
                <Typography color={"natural.700"}>{seconds}s</Typography>
            </div>
        </div>
    );
});

export default function ShipperBid({ created_at }) {
    const [adminPagination, setAdminPagination] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        data: quotationData,
        dataUpdatedAt,
        isLoading,
        refetch,
    } = FetchQuotationDetailApi({ id, adminPagination });
    const { mutate: updateQuotationInfo } = UpdateQuotationStatusDetailApi();
    const { quotationListData, paginationInformation } = useMemo(() => {
        if (dataUpdatedAt) {
            return {
                quotationListData: quotationData?.data,
                paginationInformation: quotationData?.pagination_option,
            };
        }
        return {
            quotationListData: [],
            paginationInformation: {},
        };
    }, [dataUpdatedAt]);

    const handleStatusChange = (id, status) => {
        const payload = {
            user_id: id,
            is_accepted: status,
        };
        updateQuotationInfo({ payload });
        navigate(routes.SELLERRECENTORDERBOOKING.pathname);
    };

    /** @type import('@tanstack/react-table').ColumnDef<any> */ //for autosuggestions
    const columns = [
        {
            Header: "Biding Ends In:",
            Cell: useCallback(() => {
                return <Timer refetch={refetch} created_at={created_at} />;
            }, []),
        },
        {
            Header: "Shipping Agent",
            accessor: "user__first_name",
            Cell: ({ row: { original } }) => (
                <Typography
                    variant="subtitle2"
                    fontWeight={400}
                    color="natural.400"
                    className="font-bold select-none"
                >
                    <StarGernator
                        length={
                            original?.user?.first_name?.length +
                            original?.user?.last_name?.length
                        }
                    />
                </Typography>
            ),
        },
        {
            Header: "Email",
            accessor: "Email",
            Cell: ({ row: { original } }) => (
                <Typography
                    color="natural.400"
                    fontWeight={400}
                    className="select-none"
                >
                    {" "}
                    <StarGernator length={original?.user?.email?.length} />
                </Typography>
            ),
        },
        {
            Header: () => (
                <div>
                    <Typography
                        variant="body2"
                        fontWeight={500}
                        color="natural.900"
                    >
                        Quotation Amount
                    </Typography>

                    <div className="flex gap-8 mt-2">
                        <Typography
                            variant="body2"
                            fontWeight={600}
                            color="primary.700"
                            className="w-12"
                        >
                            Pickup
                        </Typography>

                        <Typography
                            variant="body2"
                            fontWeight={600}
                            color="success.500"
                            className="w-12"
                        >
                            Fast
                        </Typography>

                        <Typography
                            variant="body2"
                            fontWeight={600}
                            color="natural.600"
                            className="w-12"
                        >
                            Normal
                        </Typography>
                    </div>
                </div>
            ),
            accessor: "original",
            Cell: ({ row: { original } }) => (
                <div className="flex gap-8">
                    <Typography
                        variant="body2"
                        fontWeight={400}
                        color="natural.400"
                        className="w-12 select-none"
                    >
                        <StarGernator
                            length={original?.pickup_amount?.length}
                        />
                    </Typography>

                    <Typography
                        variant="body2"
                        fontWeight={400}
                        color="natural.400"
                        className="w-12 select-none"
                    >
                        <StarGernator length={original?.fast_amount?.length} />
                    </Typography>

                    <Typography
                        variant="body2"
                        fontWeight={400}
                        color="natural.400"
                        className="w-12 select-none"
                    >
                        <StarGernator
                            length={original?.normal_amount?.length}
                        />
                    </Typography>
                </div>
            ),
        },
    ];

    return (
        <>
            <div>
                <Typography variant="h6">Shipper Bid</Typography>
            </div>

            <DataTableCustom
                data={quotationListData}
                columns={columns}
                paginationFooter={true}
                searchBar={false}
                pageNumber={true}
                isLoading={isLoading}
                paginationData={paginationInformation}
                updateFilters={setAdminPagination}
                shipperBid={true}
            />
        </>
    );
}
