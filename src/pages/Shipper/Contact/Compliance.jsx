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


export function Compliance({productDescription, shipmentGoods}) {
    return (
        <div className="border-2  border-natural-100 border-solid p-4 rounded-xl m-4">
            <div className="flex-col gap-2">
                <div className=" bg-natural-100 rounded-full border-4 border-natural-100 justify-center  gap-2 inline-flex">
                    <img src={ComplianceIcon} width={40} alt="compliance" />
                </div>

                <Typography color="natural.900" fontSize={18} fontWeight={500}>
                    Compliance
                </Typography>
            </div>
            <div className="flex gap-2 justify-between mt-2">
                <div className="bg-natural-25 w-1/2 p-2 flex-col justify-start items-start gap-2 flex rounded-lg">
                    <Typography
                        color="natural.800"
                        variant="body2"
                        fontWeight={500}
                    >
                        Product Description
                    </Typography>
                    <Typography
                        color="natural.500"
                        variant="body2"
                        fontWeight={500}
                    >
                        {productDescription}
                    </Typography>
                </div>
                <div className="bg-natural-25 w-1/2 p-2 flex-col justify-start items-start gap-2 flex rounded-lg">
                    <Typography
                        color="natural.800"
                        variant="body2"
                        fontWeight={500}
                    >
                        Shipment Contain Any of The Following Goods
                    </Typography>

                    <div className="flex gap-2 flex-wrap">
                        
                       {shipmentGoods.map(goods => <Chip
                            variant="outlined"
                            avatar={<img src={TICK} alt="Avatar" />}
                            label={goods}
                            className="text-success-500 text-sm font-normal leading-tight bg-natural-25 border-success-500"
                        />)}
                    </div>

                   
                </div>
            </div>
        </div>
    );
}