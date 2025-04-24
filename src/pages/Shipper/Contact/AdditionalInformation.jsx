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
export function AdditionalInformation({additionalNotes}) {

    if(!additionalNotes) return <></>
    return (
        <Card className="p-4 space-y-4">
            <div className="bg-natural-25 p-2 flex-col justify-start items-start gap-2 flex">
                <div className="flex items-center flex-row gap-2">
                    <div className="bg-natural-200 rounded-full w-[30px]">
                        <img src={Note} alt="note" />
                    </div>
                    <Typography
                        color="natural.800"
                    variant="body2"
                    fontWeight={500}
                >
                    Additional Notes
                </Typography>
                </div>
                <Typography
                    color="natural.500"
                    variant="body2"
                    fontWeight={500}
                >
                    {additionalNotes}
                </Typography>
            </div>
        </Card>
    );
}