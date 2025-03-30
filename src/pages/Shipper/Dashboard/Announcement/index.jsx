import { Button } from "@mui/material";
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
            <div className="relative w-full h-[calc(100vh_-_110.8px)]">
                {isLoading && <Loader />}
                {announcementList?.length > 0 && (
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
                )}

                {announcementList?.length > 0 && (
                    <div className="h-full overflow-y-scroll pt-1">
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
                    </div>
                )}
            </div>
        </>
    );
}
