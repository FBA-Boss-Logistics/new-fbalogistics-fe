import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function ErrorUi({url,content})

{
    console.log(url,'url....')
    return (
        <div className="border mt-10 border-solid border-[#000000] max-w-[500px] flex flex-col gap-4 items-center mx-auto p-3 rounded-md h-[110px] justify-center">
            <p className="text-xl font-semibold text-[#00000070]">
                {content}
            </p>
            <Link to={url}>
                <Button>Go to all shipments</Button>
            </Link>
        </div>
    );
}
