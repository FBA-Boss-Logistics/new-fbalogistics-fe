import React from 'react'
import fbaLogo from "assets/svg/FBALogo.svg";

import facebookIcon from "assets/svg/landingPage/Facebook.svg"
import instagramIcon from "assets/svg/landingPage/Insta.svg"
import linkedinIcon from "assets/svg/landingPage/Linkedin.svg"
import xIcon from "assets/svg/landingPage/X.svg"


const Footer = () => {
  return (
    <div className='flex md:flex-row flex-col md:py-[24px] gap-[24px] md:px-[80px] py-[16px] px-[25px] md:justify-between justify-start items-start'>
      <img width="131.93px" src={fbaLogo} alt="logo" />
      <hr className='w-full md:hidden' />
      <div className='flex flex-row gap-[24px] order-last md:order-none'>
        <p>fbaboss © {new Date().getFullYear()} </p>
      </div>
      <div className='flex flex-row gap-[24px]'>
           <img src={facebookIcon} className='cursor-pointer' alt="facebook" />
           <img src={instagramIcon} className='cursor-pointer' alt="instagram" />
           <img src={linkedinIcon} className='cursor-pointer' alt="linkedin" />
           <img src={xIcon} className='cursor-pointer' alt="x" />
      </div>
    </div>
  )
}

export default Footer