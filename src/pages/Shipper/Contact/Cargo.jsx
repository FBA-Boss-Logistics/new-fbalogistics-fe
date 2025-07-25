import { Chip, Typography } from "@mui/material";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import Truck from "assets/svg/truck.svg";
import ModalComponent from "components/New/ModalComponent";
import DataTableCustom from "components/Table/DataTableCustom";
import { Button } from "components/ui/button";
import { Card } from "components/ui/card";
import { Input } from "components/ui/input";
import { AlertCircle, ChevronDown, ExternalLink, Package } from "lucide-react";
import { FetchUserDetailApi } from "queries/Auth";
import { useState } from "react";
import { UpdatePackageTrackingNumberApi } from "queries/Shipper";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const trackingNumberSchema = yup.object().shape({
    trackingNumber: yup.number()
    .required("Required")
    .typeError("Must be a number"),
    
});


export function Cargo({ productName, packages,shipmentData, asinNumber }) {
   const [cargoOpen, setCargoOpen] = useState(true);
   const { data: userInfo, isLoading } = FetchUserDetailApi();
   const { mutate: updatePackageTrackingNumber } = UpdatePackageTrackingNumberApi();
   const [packageId, setPackageId] = useState("");
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(trackingNumberSchema),
      mode: "onChange",
   });
   const columns = [
      {
          Header: "Carton Dimensions (CM)",
          accessor: "carton_dimensions_length",
          footer: "Carton Dimensions (CM)",
          Cell: ({ row: { original } }) => (
             <div className="flex gap-4 py-4  ">
                  <Chip
                      label={`L - ${original.carton_dimensions_length}`}
                      className="bg-natural-200 text-natural-400"
                  />
                  <Chip
                      label={`W - ${original.carton_dimensions_width}`}
                      className="bg-natural-200 text-natural-400"
                  />
                  <Chip
                      label={`H - ${original.carton_dimensions_height}`}
                      className="bg-natural-200 text-natural-400"
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
      {
          Header: "Tracking Link",
          accessor: "tracking_link",
          footer: "Tracking Link",
          Cell: ({ row: { original } }) => (
              <div className="flex-grow p-2">
              {original.tracking_link ? (
                   <a
                   href={original.tracking_link}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-natural-500 text-sm hover:underline flex items-top gap-1"
               >
                   Open <ExternalLink className="w-4 h-4 hover:text-primary" />
               </a>
              ) : (
              <>
               {userInfo?.data?.groups === "Shipper" ? (
                  <Typography
                      variant="body2"
                      fontWeight={400}
                      color="primary"
                      onClick={() => {
                      setOpenModal(true)
                      setPackageId(original.id)
                      }}
                      style={{ cursor: 'pointer',hover: {textDecoration: 'underline'} }}
                  >
                      + Add 
                  </Typography>
              ) : (
                  <Typography
                      variant="body2"
                      fontWeight={400}
                      color="natural.500"
                  >
                      N/A
                  </Typography>
              )}
              </>
              )}
              </div>
          ),
      },
      
   
   ]
   const [openModal, setOpenModal] = useState(false);
   const handleCloseModal = () => {
    setOpenModal(false);
   }
   
   const handleAddTrackingNumber = (data) => {
    console.log("add tracking number", trackingNumber);
    console.log("packageId", packageId);
    updatePackageTrackingNumber({
        id: packageId,
        tracking_number: data.trackingNumber
    },{
        onSuccess: () => {
            handleCloseModal()
            setTrackingNumber("")
            reset()
            setPackageId("")
        },
        onError: (error) => {
            console.log("error", error.response.data.message);
            
        }
    })
         
    
   }
   const [trackingNumber, setTrackingNumber] = useState("");
   const { ref: refTrackingNumber, ...TrackingNumber } = register("trackingNumber");
    return (
    <>
    <ModalComponent open={openModal} onClose={handleCloseModal} title="Add Tracking Number">
         
            <form onSubmit={handleSubmit(handleAddTrackingNumber)} className="flex flex-col  items-end justify-end h-full gap-4">
                <Input
                label="Tracking Number"
                placeholder="Enter Tracking Number"
               ref={refTrackingNumber}
               {...TrackingNumber}
                
               
                />
                {errors.trackingNumber && (
                    <p className="text-xs text-red-500 flex items-center gap-1 ">
                        <AlertCircle className="h-3 w-3" />
                        {errors.trackingNumber.message}
                    </p>
                )}
                   <div className="flex flex-col md:flex-row-reverse gap-2 w-full h-['20ox'] ">
                    <Button className="rounded-full border-2 border-primary md:flex-1" size="lg" onClick={()=>{
                        handleSubmit(handleAddTrackingNumber)
                    }}>Save</Button>
                    <Button className="rounded-full border-2 border-primary md:flex-1" variant="outline" size="lg" onClick={()=>{
                        handleCloseModal()
                    }}>Cancel</Button>
                </div>
            </form>
        </ModalComponent>
        <Card className="p-4 space-y-4">
            <Collapsible open={cargoOpen} onOpenChange={setCargoOpen}>
            <CollapsibleTrigger className="flex items-center w-full">
           
                <div className="flex items-center flex-row gap-2 w-full">
                        <div className="bg-natural-200 rounded-full w-[30px]">
                            <img src={Truck} alt="truck" />
                        </div>
                <Typography color="natural.900" fontSize={18} fontWeight={500}>
                    Cargo
                </Typography>
                <ChevronDown className={`ml-auto h-5 w-5 transition-transform ${cargoOpen ? "rotate-180" : ""}`} />
                </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
            <div className="flex flex-col gap-2 mt-6">
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

                <DataTableCustom
                data={shipmentData?.packages}
                columns={columns}
                paginationFooter={false}
                headerGroup={false}
                pageNumber={false}
                paginationData={shipmentData?.paginationInformationShipment}
                date={false}
            />

            </div>
            </CollapsibleContent>
            </Collapsible>
        </Card>
   </>
    );
}
