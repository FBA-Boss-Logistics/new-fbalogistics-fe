import { Skeleton, Typography } from "@mui/material";
import Dot from "assets/svg/Dot.svg";

export function OrderDateStatus({ status, isLoading }) {
    return (
        <div className="flex gap-3 justify-center items-center">
            <Typography>Status</Typography>
            {/* <Chip avatar={<img alt="Dot" src={Dot} className="border-solid bg-primary-500"    />} label="Complete" className="bg-success-100 text-success-700" /> */}
            <div className="flex  bg-success-50  h-10 rounded-[140px] gap-2 py-1 px-6 text-success-700 text-center items-center">
                <img src={Dot} alt="dot" />
                <Typography>
                    {isLoading ? (
                        <Skeleton animation="wave" width={150} />
                    ) : (
                        status
                    )}
                </Typography>
            </div>
        </div>
    );
}

export default function OrderDate({ Label, Date, isLoading }) {
    return (
        // <div className="flex justify-between">
        <div className="w-max flex border-1 border-success-500  border-solid h-10 rounded-[140px] gap-8 pl-3 pr-1 py-1 text-start items-center">
            <div className="">
                <Typography color="success.800">{Label}</Typography>
            </div>
            <div className="bg-success-50 rounded-[130px] pl-2 pr-10 py-1">
                <Typography fontWeight={500} color="success.800">
                    {isLoading ? (
                        <Skeleton animation="wave" width={200} />
                    ) : (
                        Date
                    )}
                </Typography>
            </div>
        </div>
    );
}
