import React from 'react'
import NewShipmentIcon from 'assets/svg/NewShipment.svg'
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
      navigate(routes.LOGIN.pathname)
    }
   }
   const navigate = useNavigate();
  return (
    <div className='flex justify-between items-center pt-[102px] pb-[102px] md:pb-[254px]   md:px-[80px] px-[25px]' >
      <div className='flex flex-col gap-[21px]'>
         <h1 className='md:text-[64px] text-[36px] font-bold md:w-[686px] w-[325px] leading-none'>
         Logistics for
         Amazon FBA Sellers!
         </h1>
         <p className='text-slate-500 md:w-[400px] md:text-[14px] text-[17px]'>
         Let shipping agents compete for your business and get the best deals for your product deliveries.
         </p>
         <Button size="lg" className='   rounded-lg md:w-[180px] w-full h-[42px]' onClick={handleRedirect}>
                   Get Started
               </Button>
      </div>
      <img width='462px' src={NewShipmentIcon} className='hidden md:block' />
    </div>
  )
}