import { Chip, TextField, Typography } from "@mui/material";
import UserIcon from "assets/svg/usericon.svg";
import Location from "assets/svg/location.svg";
import Truck from "assets/svg/truck.svg";
import ComplianceIcon from "assets/svg/compliance.svg";
import TICK from "assets/svg/TICK.svg";
import Quotation from "assets/svg/quotation.svg";
import { useEffect, useState } from "react";
import { CommonFormValidations } from "components/Form/CommonFormValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import BorderButton from "components/BorderButton";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axios } from "service";
import Note from "assets/svg/notes.svg";
import { Card } from "components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
export function AdditionalInformation({additionalNotes}) {
    const [showMore, setShowMore] = useState(true);

    if(!additionalNotes) return <></>
    return (
        <Card className="p-4 space-y-4">
            <Collapsible open={showMore} onOpenChange={setShowMore}>
            <CollapsibleTrigger className="flex items-center w-full">
                <div className="flex items-center flex-row gap-2">
                    <div className="bg-natural-200 rounded-full w-[30px]">
                        <img src={Note} alt="note" />
                    </div>
                    <Typography
                      color="natural.900" fontSize={18} fontWeight={500}
                >
                    Additional Notes
                </Typography>
                </div>
            <ChevronDown className={`ml-auto h-5 w-5 transition-transform ${showMore ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
                <CollapsibleContent>
                <div className=" p-2 flex-col justify-start items-start gap-2 flex mt-6">
                <Typography
                        color="natural.500"
                        variant="body2"
                        fontWeight={500}
                    >
                        {additionalNotes}
                    </Typography>
                </div>
                </CollapsibleContent>
            </Collapsible>
        </Card>
    );
}