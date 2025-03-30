import OrderDate from "components/Dashboard/OrderStatus/OrderDate";
import OrderDetails from "components/Dashboard/OrderStatus/OrderDetails";
import PastStatus from "components/Dashboard/OrderStatus/PastStatus";
import ShippingAddress from "components/Dashboard/OrderStatus/ShippingAddress";
import { OrderDateStatus } from "components/Dashboard/OrderStatus/OrderDate";
import { useParams } from "react-router-dom";
import { FetchAllShipmentOrderDetailApi } from "queries/Shipper";
import { formatDateString } from "utils";
import ErrorUi from "pages/Seller/Booking/SellerOrderStatus/ErrorUi";
import Loader from "components/Loader";
export default function ShipmentHistoryStatus() {
    const { id } = useParams();
    const {
        data: OrderStatusData,
        isLoading,
        error,
    } = FetchAllShipmentOrderDetailApi(id);
    const isQuotationDeclined = Boolean(
        OrderStatusData?.data?.status === "Quotation Approved" &&
            OrderStatusData?.data?.quotation.is_accepted === false
    );

    const getDate = () => {
        if (isQuotationDeclined) {
            return formatDateString(OrderStatusData?.data?.created_at, "long");
        }
        return formatDateString(OrderStatusData?.data?.updated_at, "long");
    };

    if (
        error?.status_code === 400 &&
        error?.message === "Bad Request" &&
        (error?.errors?.[0]?.message ===
            "You are not authorised to view this shipment"||
            error?.errors?.[0]?.message === "You cannot view this shipment right now.")
    ) {
        return <ErrorUi url={"/shipper/dashboard/orders/shipment-histories"} content={error?.errors?.[0]?.message}/>;
    }

    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center w-[80vw] h-full">
                    {" "}
                    <Loader />{" "}
                </div>
            ) : (
                <div className="flex flex-col gap-6 w-full">
                    <div className="flex justify-between ">
                        <OrderDate
                            Label={
                                isQuotationDeclined
                                    ? ""
                                    : "You have assigned this order on"
                            }
                            Date={getDate()}
                            isLoading={isLoading}
                        />
                        <OrderDateStatus
                            status={
                                isQuotationDeclined
                                    ? "Quotation Declined"
                                    : OrderStatusData?.data.status
                            }
                            isLoading={isLoading}
                        />
                    </div>
                    <ShippingAddress OrderStatusData={OrderStatusData?.data} />
                    <div className="w-full flex gap-4">
                        <div className="w-full">
                            <OrderDetails
                                OrderStatusData={OrderStatusData?.data}
                                isLoading={isLoading}
                                isQuotationDeclined={isQuotationDeclined}
                            />
                        </div>

                        {/* <PastStatus status={OrderStatusData?.data?.status} /> */}
                    </div>
                </div>
            )}
        </>
    );
}
