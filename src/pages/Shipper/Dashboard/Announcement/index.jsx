import { useChat } from "components/Dashboard/OrderStatus/Chat/ChatContext";
import Loader from "components/Loader";
import AnnouncementModel from "components/Models/AnnouncementModel";
import Default from "pages/Default";
import {
    fetchAnnouncementDetailApi,
    useCreateAnnouncement,
} from "queries/Shipper";
import { useEffect, useMemo, useState } from "react";
import AnnouncementDataList from "./AnnouncementDataList";
import { ChevronRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { routes } from "routes/RouteConstants";
import { Card, CardContent, CardFooter, CardHeader } from "components/ui/card";
import { Button } from "components/ui/button";


export default function Index() {
    const [announcementListPagination, setAnnouncementListPagination] =
        useState({ per_page: 50 });
    const [open, setOpen] = useState(false);
    const [isForm, setIsForm] = useState(false);
    const { mutate: cretaeAnnouncement } = useCreateAnnouncement();
    const { data, isLoading, refetch } = fetchAnnouncementDetailApi({
        announcementListPagination,
    });

    const { setAnnouncementList, announcementList } = useChat();

    function sendAnnouncement(announcementValue) {
        if (!announcementValue.trim()) return;
        cretaeAnnouncement(
            { message: announcementValue },
            {
                onSuccess: () => {
                    refetch();
                    setOpen(false);
                },
            }
        );
    }

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

            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                    <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                        <Link href="/dashboard" className="hover:text-blue-600">
                        Dashboard
                        </Link>
                        <ChevronRight className="mx-2 h-4 w-4" />
                        <span>Announcements</span>
                    </div>
                    </div>
                    {announcementList?.length > 0 && (

                    <Button
                    onClick={() => {
                        setOpen(true);
                        setIsForm(true);
                    }}
                    className="">
                    <Plus className="md:mr-2 " /> 
                    <span className="hidden md:inline"> Create new announcement</span>
                    </Button>
                    )}
                </div>
            </div>
            
            {announcementDataList?.data?.length === 0 && !isLoading && (
                <div className="h-[calc(100vh_-64px)] w-full overflow-y-scroll flex items-center justify-center">
                    <div className="flex flex-col gap-6 items-center">
                        <Default title="You have no announcement yet! " />
                        <Button
                            onClick={() => {
                                setOpen(true);
                                setIsForm(true);
                            }}
                        >
                            Create New Announcement
                        </Button>
                    </div>
                </div>
            )}

            {open && (
                <AnnouncementModel
                    isForm={isForm}
                    SetOpenModel={setOpen}
                    openModel={open}
                    handleSend={sendAnnouncement}
                    content={
                        "Hi there! I just placed an order for a product on your website. When can I expect it to be delivered?"
                    }
                />
            )}
            <div className="relative w-full h-[calc(100vh_-_210.8px)] overflow-y-scroll">
                {isLoading && <Loader />}
                {/* {announcementList?.length > 0 && (
                    <div className="absolute top-0 right-0 m-10">
                        <Button
                            onClick={() => {
                                setOpen(true);
                                setIsForm(true);
                            }}
                        >
                            Create New Announcement
                        </Button>
                    </div>
                )} */}

                {announcementList?.length > 0 && (
                    // <div className="h-[calc(100vh_-_110.8px)] overflow-y-scroll pt-1">
                        <AnnouncementDataList
                            isLoading={isLoading}
                            announcementDataList={announcementList}
                            paginationInformation={paginationInformation}
                            setAnnouncementListPagination={
                                setAnnouncementListPagination
                            }
                            announcementListPagination={
                                announcementListPagination
                            }
                        />
                    // </div>
                )}
            </div>
        
        </>
    );
}
