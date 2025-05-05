import { Button } from "components/ui/button";
import { FileX } from "lucide-react";
import { FetchUserDetailApi } from "queries/Auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { routes } from "routes/RouteConstants";

const NotFound = () => {
    const { data: userInfo, isLoading } = FetchUserDetailApi();
    const [redirectUrl, setRedirectUrl] = useState(routes.HOME.pathname);
    useEffect(() => {
        console.log(userInfo);
        if (userInfo?.data?.groups === "Shipper") {
            setRedirectUrl(routes.SHIPPERDASHBOARD.pathname);
        }
        if (userInfo?.data?.groups === "Seller") {
            setRedirectUrl(routes.SELLERDASHBOARD.pathname);
        }
    }, [userInfo?.data?.groups]);

    return (
        <div className="flex h-screen w-screen items-center justify-center overflow-hidden">
           <div className="w-full max-w-md mx-auto flex flex-col items-center text-center space-y-6">
           {/* Icon in the center */}
           <div className="rounded-full bg-muted p-6 w-24 h-24 flex items-center justify-center">
             <FileX className="h-12 w-12 text-muted-foreground" />
           </div>
   
           {/* Title and description */}
           <div className="space-y-2">
             <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
             <p className="text-muted-foreground">
               We couldn't find the page you were looking for. It might have been moved or deleted.
             </p>
           </div>
   
           {/* Action button */}
           <Button asChild className="mt-4">
             <Link to={redirectUrl}>Return to home</Link>
           </Button>
         </div>
        </div>
    //      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-background">
         
    //    </div>
    );
};

export default NotFound;
