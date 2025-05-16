import { useChat } from "components/Dashboard/OrderStatus/Chat/ChatContext";
import Loader from "components/Loader";
import AnnouncementModel from "components/Models/AnnouncementModel";
import Default from "pages/Default";
import AnnouncementDataList from "pages/Shipper/Dashboard/Announcement/AnnouncementDataList";
import { fetchAnnouncementDetailApi } from "queries/Shipper";
import { useEffect, useMemo, useState } from "react";

export default function index() {
    const [announcementListPagination, setAnnouncementListPagination] =
        useState({
            per_page: 50,
        });

    const { data, isLoading } = fetchAnnouncementDetailApi({
        announcementListPagination,
    });

    const { setAnnouncementList, announcementList } = useChat();

    const { announcementDataList, paginationInformation } = useMemo(() => {
        if (data?.data) {
            return {
                announcementDataList: data?.data,
                paginationInformation: data?.data?.pagination_option,
            };
        }
        return {
            announcementDataList: [],
            paginationInformation: {},
        };
    }, [data?.data]);

    useEffect(() => {
        setAnnouncementList(announcementDataList?.data);
    }, [announcementDataList]);

    const dataLength = data?.data?.data?.length;

    if (!dataLength && !isLoading) {
        return (
            <div className="h-[calc(100vh_-_76.8px)] overflow-y-scroll flex items-center justify-center m-10">
                <Default title="You have no announcement yet!" />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {isLoading && <Loader />}
            {/* <AnnouncementModel
                SetOpenModel={() => {}}
                openModel={false}
                content={
                    "Hi there! I just placed an order for a product on your website. When can I expect it to be delivered?"
                }
            /> */}
            {dataLength && (
                <div className="flex-grow">
                    <AnnouncementDataList
                        isLoading={isLoading}
                        announcementDataList={announcementList}
                        paginationInformation={paginationInformation}
                        setAnnouncementListPagination={
                            setAnnouncementListPagination
                        }
                        
                        announcementListPagination={announcementListPagination}
                    />
                </div>
            )}
        </div>
    );
}
