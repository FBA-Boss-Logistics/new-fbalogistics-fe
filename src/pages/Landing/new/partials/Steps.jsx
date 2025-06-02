import React from 'react'
import step1Icon from 'assets/svg/landingPage/step1Icon.svg'
const Steps = ({steps}) => {
  return (
  <>
  <div className='flex flex-col gap-[24px] pb-[104px]'>
     {steps.map((step, index) => (
       <div key={index} className="bg-[#3C67C1] lg:mx-[136px] mx-[20px] rounded-[24px] md:p-[60px] p-[24px]">
         <div className="flex flex-col md:flex-row  justify-center items-center w-full gap-[24px]  md:h-[170px]">
          <div className='h-full pr-[54px] flex md:justify-center justify-start items-center  w-full md:w-auto  font-bold md:text-[84px] text-[48px]  md:border-r border-[#FFFFFF33] text-[#FFFFFF33]'>
            {step.title}
          </div>
          <hr className="border-[#FFFFFF33] w-full md:hidden" />
          <div className='h-full w-full flex flex-row gap-[28px]  md:max-w-[386px] justify-start items-center  md:flex-1   md:border-r border-[#FFFFFF33] text-[#FFFFFF33]  md:pr-[54px] md:pl-[34px]'>
            <img src={step.icon} alt="svg image" width={48} height={48}/>
            <div className='text-[#FFFFFF] text-[20px] font-[600] max-w-[235px] w-fit'>
            {step.subTitle}
            </div>
          </div>
          <hr className="border-[#FFFFFF33] w-full md:hidden" />
          <div className='flex flex-col gap-[14px]  md:flex-1 md:pl-[34px] font-normal text-[#FFFFFF] text-[18px]'>
          {step.description}
          </div>
   
         </div>
         </div>
       ))}
    </div>
    </>
  )
}

export default Steps