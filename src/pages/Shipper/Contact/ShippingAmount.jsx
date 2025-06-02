import { Grid, Typography, Button } from '@mui/material';
import { UpdateQuotationStatusApi } from 'queries/Seller';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
import { Info } from 'lucide-react';
import { useEffect, useState } from 'react';
import ModalComponent from 'components/New/ModalComponent';

const ShippingAmount = ({shippingAmount, quotationId, shipmentData}) => {
const navigate = useNavigate();

  const { mutate: updateQuotationStatus } = UpdateQuotationStatusApi();

  const handleAcceptClick = () => {
    const payload = {
        quotationId: quotationId,
        data: {
            shipment_status: "Quotation Accepted"
        }
    }
    updateQuotationStatus({payload},{onSuccess:()=>{
        navigate("/seller/booking")
    }});
  }

  const handleDeclineClick = () => {
    const payload = {
        quotationId: quotationId,
        data: {
            shipment_status: "Shipment Cancelled",
            is_accepted: false,
            cancel_reason: cancelReason
        }
    }
    updateQuotationStatus({payload},
        {onSuccess:()=>{
            setCancelReason('');
            navigate("/seller/booking/cancelledorders")
        }});
  }
  
  const [openModal, setOpenModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [status, setStatus] = useState('');
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  
  const handleOpenModal = ({status}) => {
    setOpenModal(true);
    setStatus(status);
  };
  
  const handleStatusChange = () => {

    if(status === "accept"){
      handleAcceptClick();
    }else{
      handleDeclineClick();
    }
  }
  
  

  return (
    <>
      <ModalComponent open={openModal} onClose={handleCloseModal} title={status === "accept" ? "Accept estimate" : "Decline estimate"}>
            <div className="flex flex-col  items-start justify-start h-full gap-4">
                {/* <textarea value={cancelReason} onChange={(e)=>setCancelReason(e.target.value)} className="w-full h-full border-1 border-natural-100 border-solid rounded-xl"></textarea> */}
                {status === "accept" ? (
                    <div>
                        <p>Are you sure you want to accept this estimate?</p>
                    </div>
                ) : (
                    <div className='flex flex-col gap-4 w-full'>
                        <p>Are you sure you want to decline this estimate?</p>
                        <textarea
                                                value={cancelReason}
                                                onChange={(e) =>
                                                    setCancelReason(e.target.value)
                                                }
                                                rows={7}
                                                placeholder="Enter your Cancel Reason"
                                                className="border border-solid border-[#00000050] outline-none w-full p-4 rounded-md"
                                            />
                    </div>
                )}
                <div className="flex flex-col md:flex-row-reverse gap-2 w-full h-['20ox'] ">
                    <Button className="rounded-full border-2 border-primary md:flex-1" size="lg" onClick={()=>{
                        console.log(cancelReason)
                        handleStatusChange()
                        handleCloseModal()
                    }}>{status === "accept" ? "Accept estimate" : "Decline estimate"}</Button>
                    <Button className="rounded-full border-2 border-primary md:flex-1" variant="outline" size="lg" onClick={()=>{
                        handleCloseModal()
                    }}>Cancel</Button>
                </div>
            </div>
        </ModalComponent>
     <Card className="">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Estimate Details</h3>
                    <Info className="h-4 w-4 text-gray-400" />
                  </div>
                  <CardDescription>Sales performance by location</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center border-b py-4">
                      <span className="text-sm">Shipment ID</span>
                      <span className="font-medium">{shipmentData?.id}</span>
                    </li>
                    <li className="flex justify-between items-center border-b py-4">
                      <span className="text-sm">Winning Bid</span>
                      <span className="font-medium">{shipmentData?.total_amount}</span>
                    </li>
                    <li className="flex justify-between items-center border-b py-4">
                      <span className="text-sm">Shipping Agent</span>
                      <span className="font-medium">{shipmentData?.user?.first_name}</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex flex-col space-y-3 pt-4">
                  <Button
                  onClick={() => handleOpenModal({status:"accept"})}
                   className="w-full bg-green-600 hover:bg-green-600">Accept estimate</Button>
                  <Button
                    className="w-full bg-red-600 text-white hover:bg-red-600"
                    onClick={() => handleOpenModal({status:"decline"})}
                  >
                    Decline
                  </Button>
                </CardFooter>
              </Card>
    </>
    // <Grid 
    //     container 
    //     className="rounded-xl flex-col gap-4 flex"
    //     direction="column"
        
    // >
    //     <Grid item className="bg-natural-100 py-[10px] px-3 rounded-t-lg">
    //         <Typography
    //             variant="body1" // You can adjust the variant as needed
    //             fontFamily="Inter"
    //             fontSize={18}
    //             fontWeight={600}
    //             lineHeight="28px"
    //             color="natural.900"
    //         >
    //             Shipment Amount
    //         </Typography>
    //     </Grid>
    //     <Grid
    //         container
    //         direction="row" 
    //         className="p-3 flex justify-between"
    //     >
    //         <Grid item>
    //             <Typography
    //                 fontFamily="Sora"
    //                 fontSize={28}
    //                 fontWeight={600}
    //                 lineHeight="36px"
    //                 letterSpacing="-0.56px"
    //                 sx={{
    //                   color: 'var(--primary-primary-5-main, #E9B744)',
    //                 }}
    //             >
    //                 {`$${shippingAmount}`}
    //             </Typography>
    //         </Grid>
    //         <Grid item>
    //             <Grid container className="flex gap-4">
    //                 <Button 
    //                     variant="contained"
    //                     className="px-14 hover:outline hover:outline-2 hover:outline-primary-500 hover:outline-offset-[3px]"
    //                     onClick={() => handleAcceptClick()}
    //                 >
    //                     Accept
    //                 </Button>
    //                 <Button
    //                     className="px-14 text-natural-900 border-2 border-solid border-natural-200 bg-natural-100 shadow-sm hover:bg-natural-100 hover:outline hover:outline-2 hover:outline-natural-900 hover:outline-offset-[3px]"
    //                     onClick={() => handleDeclineClick()}
    //                 >
    //                     Decline
    //                 </Button>
    //             </Grid>
    //         </Grid>
    //     </Grid>
    // </Grid>

    
  )
}

export default ShippingAmount
