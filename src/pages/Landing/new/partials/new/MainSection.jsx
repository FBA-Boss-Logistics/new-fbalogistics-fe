import { Badge } from 'components/ui/badge'
import React from 'react'
   
export const MainSection = () => {
  return (
    <div className='bg-[#F9FAFB] text-black' id="how-it-works">
      <div className='flex flex-col justify-center items-center px-[80px] py-[64px] gap-[24px]'>
        <div className='flex flex-col gap-[8px] border-s-[4px] border-[#3B82F6] bg-[#EFF6FF] ps-[20px] pe-[16px] py-[16px]'>
          <span className='font-bold text-[17px] text-black'>What This Means For You</span>
          <div>
            <ul style={{ listStyleType: 'disc' }} className='flex flex-col gap-2 ps-[16px]'>
                <li>All your data, shipments, and account information remain unchanged</li>
                <li>Same great service and support team you've come to rely on</li>
                <li>Same login credentials and account access</li>
                <li>Enhanced services and capabilities coming soon</li>
            </ul>
          </div>
        </div>
        <div className='flex flex-wrap'>
            <span className='text-[15.3px] font-normal text-center text-black whitespace-pre-line'>
                {`Thank you for your continued trust and partnership. We look forward to serving you as Freight
                Shark with the same dedication and excellence you've experienced with us.`}
            </span>
        </div>
        <div className='flex flex-col mt-[16px] w-full items-center justify-center border-t border-[#E5E7EB] pt-[25px]'>
            <span className='font-semibold text-[13.6px] text-black'>Questions about our rebranding?</span>
            <p className='text-[13.6px] text-black font-normal'>Contact us at 
                <a
                    href="mailto:support@freightshark.com"
                    className='text-[#2563EB] font-normal text-[13.6px]'
                > support@freightshark.com
                </a>
            </p>
        </div>
      </div>
    </div>
  )
}