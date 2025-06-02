import {CircularProgress} from "@mui/material";
import { Loader2 } from "lucide-react";


export default function Loader({data=""}){
    return(
        <div className=" flex text-center justify-center align-middle m-10">
      {/* <CircularProgress  /> */}
      <div className="flex flex-col items-center justify-center py-12 px-4">
                        <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                        <Loader2 className="h-10 w-10 text-slate-400 animate-spin" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 mb-1">Loading {data}...</h3>
                        <p className="text-sm text-slate-500 text-center mb-6 max-w-md">
                        Please wait while we fetch your {data} data.
                        </p>
                    </div>
        </div>
    )
  
}   