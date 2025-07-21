import React from 'react'
import sharkLogo from "assets/svg/SharkLogo.svg";

import facebookIcon from "assets/svg/landingPage/Facebook.svg"
import instagramIcon from "assets/svg/landingPage/Insta.svg"
import linkedinIcon from "assets/svg/landingPage/Linkedin.svg"
import xIcon from "assets/svg/landingPage/X.svg"


const Footer = () => {
  return (
    <div className='flex md:flex-row flex-col md:py-[24px] gap-[24px] md:px-[80px] py-[16px] px-[25px] md:justify-between justify-start items-start'>
      <img width="131.93px" src={sharkLogo} alt="logo" />
      <hr className='w-full md:hidden' />
      <div className='flex flex-row gap-[24px] order-last md:order-none'>
        <p>Freight Shark © {new Date().getFullYear()} </p>
      </div>
    </div>
  )
}

export default Footer