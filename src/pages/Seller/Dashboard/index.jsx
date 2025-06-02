import ShipmentCard from 'components/New/ShipmentCard'
import { routes } from "routes/RouteConstants";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import DashboardStats from "./dashboardStats";
import { useNavigate } from 'react-router-dom';
import { useSeller } from '../Context/SellerContext';
import { fetchAnnouncementDetailApi } from 'queries/Shipper';
import { useChat } from 'components/Dashboard/OrderStatus/Chat/ChatContext';
import AnnouncementDataList from 'pages/Shipper/Dashboard/Announcement/AnnouncementDataList';
import Loader from 'components/Loader';
export default function SellerDashboard() {
    const {createSampleShipment, setCreateSampleShipment} = useSeller();
    const [announcementListPagination, setAnnouncementListPagination] = useState({ per_page: 1 });
    const {data, isLoading, refetch} = fetchAnnouncementDetailApi({
        announcementListPagination,
    });
    
    const createShipment = () => {
        setCreateSampleShipment(true);
    };
    const navigate = useNavigate();
    
    const {setAnnouncementList, announcementList} = useChat();

    const { announcementDataList, paginationInformation } = useMemo(() => {
        if (data?.data.data) {
            return {
                announcementDataList: data?.data,
                paginationInformation: data?.data?.pagination_option,
            };
        }
        return {
            announcementDataList: [],
            paginationInformation: {},
        };
    }, [data?.data.data]);

    useEffect(() => {
        setAnnouncementList(announcementDataList?.data);
    }, [announcementDataList]);
  
    return (
        <>
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
 
          {/* announcements */}
            <div className="flex flex-col gap-4">
                {isLoading && <Loader />}
                {announcementList?.length > 0 && (
                    // <div className="h-[calc(100vh_-_110.8px)] overflow-y-scroll pt-1">
                        <AnnouncementDataList
                            isLoading={isLoading}
                            announcementDataList={announcementList}
                            setAnnouncementListPagination={
                                setAnnouncementListPagination
                            }
                            announcementListPagination={
                                announcementListPagination
                            }
                            paginationFooter={false}
                        />
                    // </div>
                )}
            <Button className="block md:hidden bg-orange-500 mx-4 hover:bg-orange-600 rounded-full" size="lg" onClick={() => navigate(routes.ANNOUNCEMENT.pathname)} >
                View all announcements
            </Button>
            </div>

        </>
    );
}
