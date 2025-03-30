import { Grid, Typography, Button } from '@mui/material';
import { UpdateQuotationStatusApi } from 'queries/Seller';
import { useNavigate } from 'react-router-dom';


const ShippingAmount = ({shippingAmount, quotationId}) => {
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
        }
    }
    updateQuotationStatus({payload},
        {onSuccess:()=>{
            navigate("/seller/booking/cancelledorders")
        }});
  }
  return (
    <Grid 
        container 
        className="rounded-xl flex-col gap-4 flex"
        direction="column"
        
    >
        <Grid item className="bg-natural-100 py-[10px] px-3 rounded-t-lg">
            <Typography
                variant="body1" // You can adjust the variant as needed
                fontFamily="Inter"
                fontSize={18}
                fontWeight={600}
                lineHeight="28px"
                color="natural.900"
            >
                Shipment Amount
            </Typography>
        </Grid>
        <Grid
            container
            direction="row" 
            className="p-3 flex justify-between"
        >
            <Grid item>
                <Typography
                    fontFamily="Sora"
                    fontSize={28}
                    fontWeight={600}
                    lineHeight="36px"
                    letterSpacing="-0.56px"
                    sx={{
                      color: 'var(--primary-primary-5-main, #E9B744)',
                    }}
                >
                    {`$${shippingAmount}`}
                </Typography>
            </Grid>
            <Grid item>
                <Grid container className="flex gap-4">
                    <Button 
                        variant="contained"
                        className="px-14 hover:outline hover:outline-2 hover:outline-primary-500 hover:outline-offset-[3px]"
                        onClick={() => handleAcceptClick()}
                    >
                        Accept
                    </Button>
                    <Button
                        className="px-14 text-natural-900 border-2 border-solid border-natural-200 bg-natural-100 shadow-sm hover:bg-natural-100 hover:outline hover:outline-2 hover:outline-natural-900 hover:outline-offset-[3px]"
                        onClick={() => handleDeclineClick()}
                    >
                        Decline
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
  )
}

export default ShippingAmount
