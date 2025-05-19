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
import { Card } from "components/ui/card";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";

export function Compliance({productDescription, shipmentGoods}) {
    const [showMore, setShowMore] = useState(true);
    return (
        <Card className="p-4 space-y-4">
            <Collapsible open={showMore} onOpenChange={setShowMore}>
            <CollapsibleTrigger className="flex items-center w-full ">
            <div className="flex items-center flex-row  gap-2">
                <div className="bg-natural-200 rounded-full w-[30px] ">
                    <img src={ComplianceIcon} width={40} alt="compliance" />
                </div>

                <Typography color="natural.900" fontSize={18} fontWeight={500}>
                    Compliance
                </Typography>
            </div>
            <ChevronDown className={`ml-auto h-5 w-5 transition-transform ${showMore ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
            <div className="flex md:flex-row flex-col gap-2 justify-between mt-6">
                <div className="bg-natural-25  p-2 flex-col justify-start items-start gap-2 flex rounded-lg">
                    <Typography
                        color="natural.800"
                        variant="body3"
                        fontWeight={500}
                    >
                        Product Description
                    </Typography>
                    <Typography
                        color="natural.500"
                        variant="body3"
                        fontWeight={500}
                    >
                        {productDescription}
                    </Typography>
                </div>
                <div className="bg-natural-25 w-fit lg:w-1/2 p-2 flex-col justify-start items-start gap-2 flex rounded-lg">
                    <Typography
                        color="natural.800"
                        variant="body3"
                        fontWeight={500}
                    >
                        Shipment Contain Any of The Following Goods
                    </Typography>

                    <div className="flex gap-2 flex-wrap w-full">
                        
                       {shipmentGoods.map(goods => <div
                        key={goods}
                        className="text-success-500 text-sm font-normal leading-tight bg-natural-25 border-success-500 underline"
                        >
                            {goods}
                        </div>)}
                    </div>

                   
                </div>
            </div>
            </CollapsibleContent>
            </Collapsible>
        </Card>
    );
}