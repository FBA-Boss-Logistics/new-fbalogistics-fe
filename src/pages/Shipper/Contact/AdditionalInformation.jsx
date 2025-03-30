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

export function AdditionalInformation({additionalNotes}) {

    if(!additionalNotes) return <></>
    return (
        <div className="border-2  border-natural-100 border-solid p-4 rounded-xl m-4 flex-col gap-4 flex">
            <div className="bg-natural-25 p-2 flex-col justify-start items-start gap-2 flex">
                <Typography
                    color="natural.800"
                    variant="body2"
                    fontWeight={500}
                >
                    Additional Notes
                </Typography>
                <Typography
                    color="natural.500"
                    variant="body2"
                    fontWeight={500}
                >
                    {additionalNotes}
                </Typography>
            </div>
        </div>
    );
}