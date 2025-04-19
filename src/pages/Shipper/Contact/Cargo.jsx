// import { Chip, Typography } from "@mui/material";
// import Truck from "assets/svg/truck.svg";

// export function Cargo({ productName, packages, asinNumber }) {
//     return (
//         <div className="border-2  border-natural-100 border-solid p-4 rounded-xl m-4  flex-col gap-4 flex">
//             <div className="flex-col gap-2">
//                 <div className="flex justify-between">
//                     <div className="w-8 h-8 p-1 bg-natural-100 rounded-full border-4 border-natural-100 justify-center  gap-2 inline-flex">
//                         <div className="bg-natural-200 rounded-full">
//                             <img src={Truck} alt="truck" />
//                         </div>
//                     </div>
//                 </div>

//                 <Typography color="natural.900" fontSize={18} fontWeight={500}>
//                     Cargo
//                 </Typography>
//             </div>
//             <div className="flex flex-col gap-2">
//                 <div className="flex gap-4 ">
//                     <div className=" bg-natural-25 p-2 flex-col gap-2 flex w-1/2 rounded-lg">
//                         <Typography
//                             variant="body2"
//                             fontWeight={500}
//                             color="natural.800"
//                         >
//                             Product Name
//                         </Typography>
//                         <Typography
//                             color="natural.500"
//                             fontWeight={400}
//                             variant="body2"
//                         >
//                             {productName}
//                         </Typography>
//                     </div>

//                     <div className="bg-natural-25 p-2 flex-col gap-2 flex w-1/2 rounded-lg">
//                         <Typography
//                             variant="body2"
//                             fontWeight={500}
//                             color="natural.800"
//                         >
//                             ASIN
//                         </Typography>
//                         <Typography
//                             color="natural.500"
//                             fontWeight={400}
//                             variant="body2"
//                         >
//                             {asinNumber}
//                         </Typography>
//                     </div>
//                 </div>

//                 <div className="flex flex-col gap-2">
//                     {packages.map((packageName) => {
//                         return (
//                             <div
//                                 key={packageName.id}
//                                 className="flex flex-col gap-2"
//                             >
//                                 <div className="flex">
//                                     <div>
//                                         <div className="bg-natural-25 py-2 pl-2 pr-24 rounded-tl-lg">
//                                             <Typography
//                                                 variant="body2"
//                                                 fontWeight={500}
//                                                 color="natural.800"
//                                             >
//                                                 Carton Dimensions (CM)
//                                             </Typography>
//                                         </div>
//                                         <div className="flex gap-2">
//                                             <Chip
//                                                 label={`L - ${packageName.carton_dimensions_length}`}
//                                                 className="bg-natural-700 text-primary-100"
//                                             />
//                                             <Chip
//                                                 label={`W - ${packageName.carton_dimensions_width}`}
//                                                 className="bg-natural-700 text-primary-100"
//                                             />
//                                             <Chip
//                                                 label={`H - ${packageName.carton_dimensions_height}`}
//                                                 className="bg-natural-700 text-primary-100"
//                                             />
//                                         </div>
//                                     </div>

//                                     <div>
//                                         <div className="bg-natural-25 py-2  pr-24 w-full">
//                                             <Typography
//                                                 variant="body2"
//                                                 fontWeight={500}
//                                                 color="natural.800"
//                                             >
//                                                 Weight Per Carton (KG)
//                                             </Typography>
//                                         </div>
//                                         <Typography
//                                             color="natural.500"
//                                             variant="body2"
//                                             fontWeight={500}
//                                         >
//                                             {`${packageName.weight_per_carton_kg}kg`}
//                                         </Typography>
//                                     </div>

//                                     <div>
//                                         <div className=" bg-natural-25 py-2 pr-24">
//                                             <Typography
//                                                 variant="body2"
//                                                 fontWeight={500}
//                                                 color="natural.800"
//                                             >
//                                                 Total Cost of Goods
//                                             </Typography>
//                                         </div>
//                                         <Typography
//                                             color="natural.500"
//                                             fontWeight={400}
//                                             variant="body2"
//                                         >
//                                             {`$${packageName.total_cost_of_goods}`}
//                                         </Typography>
//                                     </div>

//                                     <div>
//                                         <div className="bg-natural-25 py-2 pr-24 rounded-tr-lg">
//                                             <Typography
//                                                 variant="body2"
//                                                 fontWeight={500}
//                                                 color="natural.800"
//                                             >
//                                                 # of Cartons
//                                             </Typography>
//                                         </div>

//                                         <Typography
//                                             color="natural.500"
//                                             fontWeight={400}
//                                             variant="body2"
//                                         >
//                                             {`${packageName.number_of_cartons}`}
//                                         </Typography>
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </div>
//     );
// }

import { Chip, Typography } from "@mui/material";
import Truck from "assets/svg/truck.svg";
import DataTableCustom from "components/Table/DataTableCustom";
import { Package } from "lucide-react";

const columns = [
    {
        Header: "Carton Dimensions (CM)",
        accessor: "carton_dimensions_length",
        footer: "Carton Dimensions (CM)",
        Cell: ({ row: { original } }) => (
           <div className="flex gap-2">
                <Chip
                    label={`L - ${original.carton_dimensions_length}`}
                    className="bg-natural-700 text-primary-100"
                />
                <Chip
                    label={`W - ${original.carton_dimensions_width}`}
                    className="bg-natural-700 text-primary-100"
                />
                <Chip
                    label={`H - ${original.carton_dimensions_height}`}
                    className="bg-natural-700 text-primary-100"
                />
           </div>
        ),
    },
    {
        Header: "Weight Per Carton (KG)",
        accessor: "weight_per_carton_kg",
        footer: "Weight Per Carton (KG)",
        Cell: ({ row: { original } }) => (
            <div className="flex-grow p-2">
            <Typography
            color="natural.500"
            fontWeight={400}
            variant="body2"
        >
            {`${original.weight_per_carton_kg} kg`}
        </Typography>
        </div>
        ),
    },
    {
        Header: "Total Cost of Goods",
        accessor: "total_cost_of_goods",
        footer: "Total Cost of Goods",
        Cell: ({ row: { original } }) => (
            <div className="flex-grow p-2">
            <Typography
                variant="body2"
                fontWeight={500}
                color="natural.800"
            >
                {original.total_cost_of_goods}
            </Typography>
            </div>
        ),
    },
    {
        Header: "Number of Cartons",
        accessor: "number_of_cartons",
        footer: "Number of Cartons",
        Cell: ({ row: { original } }) => (
            <div className="flex-grow p-2">
            <Typography
                variant="body2"
                fontWeight={500}
                color="natural.800"
            >
                {original.number_of_cartons}
            </Typography>
            </div>
        ),
    },
    {
        Header: "Chargeable Weight",
        accessor: "chargeable_weight",
        footer: "Chargeable Weight",
        Cell: ({ row: { original } }) => (
            <div className="flex-grow p-2">
            <Typography
                variant="body2"
                fontWeight={400}
                color="natural.500"
            >
                {original.chargeable_weight}
            </Typography>
            </div>
        ),
    },
    {
        Header: "Delivery Location",
        accessor: "delivery_location",
        footer: "Delivery Location",
        Cell: ({ row: { original } }) => (
            <div className="flex-grow p-2">
                <Typography
                    variant="body2"
                    fontWeight={400}
                    color="natural.500"
            >
                {original.delivery_location}
            </Typography>
            </div>
        ),
    },

]



export function Cargo({ productName, packages,shipmentData, asinNumber }) {
    return (
        <div className="border-2 border-natural-100 border-solid p-4 rounded-xl m-4 flex-col gap-4 flex">
            <div className="flex-col gap-2">
                <div className="flex justify-between">
                    <div className="w-8 h-8 p-1 bg-natural-100 rounded-full border-4 border-natural-100 justify-center gap-2 inline-flex">
                        <div className="bg-natural-200 rounded-full">
                            <img src={Truck} alt="truck" />
                        </div>
                    </div>
                </div>

                <Typography color="natural.900" fontSize={18} fontWeight={500}>
                    Cargo
                </Typography>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                    <div className="bg-natural-25 p-2 flex-col gap-2 flex w-1/2 rounded-lg">
                        <Typography
                            variant="body2"
                            fontWeight={500}
                            color="natural.800"
                        >
                            Product Name
                        </Typography>
                        <Typography
                            color="natural.500"
                            fontWeight={400}
                            variant="body2"
                        >
                            {productName}
                        </Typography>
                    </div>

                    <div className="bg-natural-25 p-2 flex-col gap-2 flex w-1/2 rounded-lg">
                        <Typography
                            variant="body2"
                            fontWeight={500}
                            color="natural.800"
                        >
                            ASIN
                        </Typography>
                        <Typography
                            color="natural.500"
                            fontWeight={400}
                            variant="body2"
                        >
                            {asinNumber}
                        </Typography>
                    </div>
                </div>

                {/* <table className="table-auto">
                    <thead>
                        <tr className="bg-natural-25">
                            <th className="flex-grow  p-2 ">
                                <Typography
                                    variant="body2"
                                    fontWeight={500}
                                    color="natural.800"
                                    textAlign={"left"}
                                >
                                    Carton Dimensions (CM)
                                </Typography>
                            </th>
                            <th className="flex-grow p-2">
                                <Typography
                                    variant="body2"
                                    fontWeight={500}
                                    color="natural.800"
                                    textAlign={"left"}
                                >
                                    Weight Per Carton (KG)
                                </Typography>
                            </th>
                            <th className="flex-grow p-2">
                                <Typography
                                    variant="body2"
                                    fontWeight={500}
                                    color="natural.800"
                                    textAlign={"left"}
                                >
                                    Total Cost of Goods
                                </Typography>
                            </th>
                            <th className="flex-grow p-2">
                                <Typography
                                    variant="body2"
                                    fontWeight={500}
                                    color="natural.800"
                                    textAlign={"left"}
                                >
                                    # of Cartons
                                </Typography>
                            </th>
                            <th className="flex-grow p-2">
                                <Typography
                                    variant="body2"
                                    fontWeight={500}
                                    color="natural.800"
                                    textAlign={"left"}
                                >
                                    Chargeable Weight
                                </Typography>
                            </th>
                            <th className="flex-grow p-2">
                                <Typography
                                    variant="body2"
                                    fontWeight={500}
                                    color="natural.800"
                                    textAlign={"left"}
                                >
                                    Delivery Location
                                </Typography>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages?.map((packageName) => (
                            <tr key={packageName.id}>
                                <td className="flex gap-2 p-2">
                                    <Chip
                                        label={`L - ${packageName.carton_dimensions_length}`}
                                        className="bg-natural-700 text-primary-100"
                                    />
                                    <Chip
                                        label={`W - ${packageName.carton_dimensions_width}`}
                                        className="bg-natural-700 text-primary-100"
                                    />
                                    <Chip
                                        label={`H - ${packageName.carton_dimensions_height}`}
                                        className="bg-natural-700 text-primary-100"
                                    />
                                </td>
                                <td className="flex-grow p-2">
                                    <Typography
                                        color="natural.500"
                                        fontWeight={400}
                                        variant="body2"
                                    >
                                        {`${packageName.weight_per_carton_kg} kg`}
                                    </Typography>
                                </td>
                                <td className="flex-grow p-2">
                                    <Typography
                                        color="natural.500"
                                        fontWeight={400}
                                        variant="body2"
                                    >
                                        {`$${packageName.total_cost_of_goods}`}
                                    </Typography>
                                </td>
                                <td className="flex-grow p-2">
                                    <Typography
                                        color="natural.500"
                                        fontWeight={400}
                                        variant="body2"
                                    >
                                        {`${packageName?.number_of_cartons}`}
                                    </Typography>
                                </td>
                                <td className="flex-grow p-2">
                                    <Typography
                                        color="natural.500"
                                        fontWeight={400}
                                        variant="body2"
                                    >
                                        {`${packageName?.chargeable_weight}`}
                                    </Typography>
                                </td>
                                <td className="flex-grow p-2">
                                    <Typography
                                        color="natural.500"
                                        fontWeight={400}
                                        variant="body2"
                                    >
                                        {`${packageName?.delivery_location}`}
                                    </Typography>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table> */}

                <DataTableCustom
                data={shipmentData?.packages}
                columns={columns}
                paginationFooter={false}
                searchBar={false}
                pageNumber={false}
                paginationData={shipmentData?.paginationInformationShipment}
                date={false}
            />

            </div>
        </div>
    );
}
