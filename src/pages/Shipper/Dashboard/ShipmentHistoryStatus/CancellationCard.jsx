import { Typography } from "@mui/material";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Truck from "assets/svg/notes.svg";
import { Card } from "components/ui/card";
export default function CancellationCard({data}) {
    const [cargoOpen, setCargoOpen] = useState(true);
    return (
        <Card className="p-4 space-y-4">
            <Collapsible open={cargoOpen} onOpenChange={setCargoOpen}>
            <CollapsibleTrigger className="flex items-center w-full mb-6">
           
                <div className="flex items-center flex-row gap-2 w-full">
                        <div className="bg-natural-200 rounded-full w-[30px]">
                            <img src={Truck} alt="truck" />
                        </div>
                <Typography color="natural.900" fontSize={18} fontWeight={500}>
                    Cancellation Reason
                </Typography>
                <ChevronDown className={`ml-auto h-5 w-5 transition-transform ${cargoOpen ? "rotate-180" : ""}`} />
                </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
            <div className="flex flex-col gap-2">
                <p>{data?.quotation?.cancel_reason?data?.quotation?.cancel_reason:'No Reason Provided'}</p>

     

            </div>
            </CollapsibleContent>
            </Collapsible>
        </Card>
    )
}