import { Card, CardContent } from "components/ui/card";
import Quotation from "./Quotation";

const Dashboard = () => {
    return (
        <div className="w-full">
           <Card className="overflow-hidden">
                {/* <CardContent className=""> */}
                    <Quotation/>
                {/* </CardContent> */}
            </Card>
        </div>
    );
};

export default Dashboard;
