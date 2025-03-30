import PastOrderStatusSeller from "../PastOrderStatus";
import PastStatus from "components/Dashboard/OrderStatus/PastStatus";

export default function MyBookingStatus() {
    return (
        <div>
            <PastOrderStatusSeller />
            <div className="m-4">
                <PastStatus />
            </div>
        </div>
    );
}
