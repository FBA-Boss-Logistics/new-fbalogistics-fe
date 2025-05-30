   import { Badge } from 'components/ui/badge'
import React from 'react'
import Steps from './Steps'
import step1Icon from 'assets/svg/landingPage/step1Icon.svg'
import step2Icon from 'assets/svg/landingPage/step2Icon.svg'
import step3Icon from 'assets/svg/landingPage/step3Icon.svg'
import step4Icon from 'assets/svg/landingPage/step4Icon.svg'
import step5Icon from 'assets/svg/landingPage/step5Icon.svg'


const steps = [
   {
     title: '01',
     subTitle: 'Start by filling out a simple form',
     description: 'Fill in the details of your product, including pickup location, delivery destination, size, number of cartons.etc',
     icon: step1Icon,
   },
   {
     title: '02',
     subTitle: 'Place bids through a simple dashboard',
     description: 'Let Shipping Agents Bid On Your Shipping Needs.',
     icon: step2Icon,
   },
   {
     title: '03',
     subTitle: 'Accept or deny',
     description: 'Our intelligent platform auto-generates the best bid for your needs. Will you accept and seize the day, or deny if it doesn’t fit your expectations? Your shipping, your choice.',
     icon: step3Icon,
   },
   {
     title: '04',
     subTitle: 'Clear communication',
     description: 'After accepting a bid, it’s important to have clear and efficient communication with your chosen shipping agent. That’s why we offer a built-in comment feature over the accepted orders.',
     icon: step4Icon,
   },
   {
     title: '05',
     subTitle: 'Shipment delivered to amazon warehouses   ',
     description: 'Once you’ve selected your preferred shipping agent and agreed on the shipping details, sit back and relax. The selected shipping agent will pick up your products from the designated location and deliver them safely to the specified Amazon warehouses.',
     icon: step5Icon,
   },
   
   
         
 ]
export const MainSection = () => {
  return (
    <div className='bg-primary text-white' id="how-it-works">
      <div className='flex flex-row justify-center items-center px-[80px] pt-[102px] pb-[60px]'>
        <div className='flex flex-col gap-[14px] items-center'>
        <span>
         <Badge variant="outline" className='text-white rounded-full text-[14px] font-normal px-[14px] py-[6px]'>
            Steps
         </Badge>
        </span>
          <h1 className='md:text-[48px] text-[32px] font-bold leading-[56px]'>
            How it works?
          </h1>
        </div>
        
      </div>
      <Steps steps={steps}/>
    </div>
  )
}