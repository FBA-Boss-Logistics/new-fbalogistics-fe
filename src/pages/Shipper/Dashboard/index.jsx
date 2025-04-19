import { Card, CardContent } from "components/ui/card";
import Quotation from "./Quotation";
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, Package} from "lucide-react"
import { routes } from "routes/RouteConstants";

const Dashboard = () => {
    return (
        <>
            <div className="block md:hidden">
                <h1 className="text-2xl font-semibold text-zinc-800 mb-2">Pending Quotations</h1>
                <div className="flex items-center text-sm mb-6">
                <Link to={routes.SHIPPERDASHBOARD.pathname} className="text-blue-600 hover:underline">
                    Dashboard
                </Link>
                <ChevronRight className="h-4 w-4 inline" />
                <span className="text-gray-500">Pending Quotations</span>
                </div>
            </div>
            <Card className="overflow-hidden">
                {/* <CardContent className=""> */}
                    <Quotation/>
                {/* </CardContent> */}
            </Card>
        </>
    );
};

export default Dashboard;
