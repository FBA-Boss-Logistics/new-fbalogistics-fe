import React from 'react'
import NewShipmentIcon from 'assets/svg/NewShipment.svg'
import NewIcon from 'assets/svg/changeIcon.svg' 
import { Button } from 'components/ui/button'
import { useNavigate } from 'react-router-dom'
import { routes } from 'routes/RouteConstants'
import { FetchUserDetailApi } from 'queries/Auth'
export const HeroSection = () => {
   const { data: userInfo, isLoading } = FetchUserDetailApi();
   
   const handleRedirect = () => {
    if(userInfo?.data?.groups === "Seller"){
      navigate(routes.SELLERDASHBOARD.pathname)
    }else if(userInfo?.data?.groups === "Shipper"){
      navigate(routes.SHIPPERDASHBOARD.pathname)
    }else{
      // window.location.href = "https://freightshark.co"
      window.location.href = import.meta.env.VITE_REACT_APP_WEB_REDIRECT
    }
   }
   const navigate = useNavigate();
  return (
    <div className='flex justify-between items-center py-[62px] md:px-[80px] px-[25px]' >
      <div className='flex flex-col gap-[21px] md:w-[560px] w-[200px] ps-[32px]'>
         <h1 className='md:text-[40.8px] text-[24px] font-bold md:w-[405px] w-[200px] mb-[20px] leading-none'>
         We've Rebranded!
         </h1>
         <h2 className='md:text-[25.5px] text-[20px] font-semibold md:w-[455.27px] w-[220px] leading-none'>
         FBA Boss Logistics is now Freight 
         Shark
         </h2>
         <p className='text-[#000000] font-normal md:w-[400px] md:text-[15.3px] text-[17px] mb-[3px] whitespace-no-wrap'>
         We're excited to announce our evolution to better serve
         Amazon FBA Sellers with improved logistics services and the 
         same great team you trust.
         </p>
         <Button size="lg" className='   rounded-lg md:w-[180px] w-full h-[42px]' onClick={handleRedirect}>
                   Go to dashboard
               </Button>
      </div>
      <div className='flex md:w-[560px] w-[200px] items-center justify-center py-[32px] pe-[136px]'>
        <img width='256px' src={NewIcon} className='hidden md:block' />
      </div>
    </div>
  )
}
