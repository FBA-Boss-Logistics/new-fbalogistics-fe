import React from 'react'
import fbaLogo from "assets/svg/FBALogo.svg";
import sharkLogo from "assets/svg/SharkLogo.svg";
import { Button } from 'components/ui/button';
import { routes } from 'routes/RouteConstants';
import { useNavigate } from 'react-router-dom';

const HeadingComponent = () => {
const navigate = useNavigate();
  return (
    <div>
      <div className='flex flex-row items-center justify-center md:justify-between px-[80px] py-[30px] md:border-b-2 border-slate-100'>
         <img width="131.93px" src={sharkLogo} alt="logo" />

         <div className='hidden md:flex flex-row items-center gap-6'>
            <h1 className='l font-bold cursor-pointer' onClick={() => {
              const howItWorks = document.getElementById('how-it-works');
              if (howItWorks) {
                howItWorks.scrollIntoView({ behavior: 'smooth' });
              }
            }}>
               How it works
            </h1>
            <div className='flex flex-row gap-4'>
               <Button variant="outline" size="lg" className=' border-2 border-slate-950 rounded-lg w-[82px] h-[42px]' onClick={() => navigate(routes.SIGNUP.pathname)}>
                   Sign up
               </Button>
               <Button variant="outline" size="lg" className=' border-2 border-slate-950 rounded-lg w-[82px] h-[42px] bg-[#1A2E4C] text-white' onClick={() => navigate(routes.LOGIN.pathname)}> Log in </Button>
               
            </div>
         </div>
      </div>
    
    
    </div>
  )
}

export default HeadingComponent