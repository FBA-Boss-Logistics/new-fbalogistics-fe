import Close from "@mui/icons-material/Close";
import { Avatar, useTheme } from "@mui/material";
import { useState } from "react";
import { formatName } from "utils";
import { Button } from "components/ui/button";
export default function AnnouncementModel({
    openModel,
    SetOpenModel,
    content,
    isForm = false,
    handleSend,
}) {
    const [announcementText, setAnnouncementText] = useState("");
    const theme = useTheme();
   const [announcementTitle, setAnnouncementTitle] = useState("");
    function handleSubmit(e) {
        e.preventDefault();
        handleSend(announcementText, announcementTitle);
    }
    return (
        <>
            {openModel && (
                <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50 bg-[#00000099]">
                    <div className="w-[500px] p-5 rounded-lg flex flex-col gap-5 bg-[#fff]">
                        <div className="flex items-center justify-between">
                            <p className="text-lg">Announcement</p>
                            <Close
                                className="cursor-pointer"
                                onClick={() => SetOpenModel(false)}
                            />
                        </div>
                        {!isForm && (
                            <>
                                <div className="bg-[#fafafa] p-4 rounded-lg">
                                    <p>{content}</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <p className="text-lg">Send by</p>
                                    <div className="flex gap-2">
                                        <Avatar
                                            sx={{
                                                width: 44,
                                                height: 44,
                                                border: 1,
                                                bgcolor:
                                                    theme.palette.primary[100],
                                                color: theme.palette
                                                    .primary[800],
                                                borderColor:
                                                    theme.palette.primary[500],
                                                fontWeight: 500,
                                            }}
                                            alt="Avatar"
                                            className={
                                                "border border-solid w-11 h-11"
                                            }
                                        >
                                            {formatName("Leslie Alexander")}
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <p>Leslie Alexander (Admin)</p>
                                            <p className="text-sm text-[#00000050]">
                                                2:20pm
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {isForm && (
                            <>
                                <form
                                    onSubmit={handleSubmit}
                                    id="form-announcement"
                                    className="flex flex-col gap-6"
                                >
                                    <input
                                        value={announcementTitle}
                                        onChange={(e) =>
                                            setAnnouncementTitle(e.target.value)
                                        }
                                        placeholder="Enter your Announcement Title"
                                        className="border border-solid border-[#00000050] outline-none w-full p-4 rounded-md"
                                    />
                                    <textarea
                                        value={announcementText}
                                        onChange={(e) =>
                                            setAnnouncementText(e.target.value)
                                        }
                                        rows={7}
                                        placeholder="Enter your Announcement"
                                        className="border border-solid border-[#00000050] outline-none w-full p-4 rounded-md"
                                    />
                                    <div className="flex gap-2">
                                        <Button
                                           variant="outline"
                                            className="flex-1"
                                            onClick={() => {
                                                SetOpenModel(false);
                                                setAnnouncementText("");
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            id="form-announcement"
                                            className="flex-1"
                                        >
                                            Send
                                        </Button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
