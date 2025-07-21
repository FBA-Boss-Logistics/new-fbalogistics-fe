import React from 'react'
import fbaLogo from "assets/svg/FBALogo.svg";
import { Button } from 'components/ui/button';
import HeadingComponent from './partials/nav';
import { HeroSection } from './partials/HeroSection';
// import { MainSection } from './partials/MainSection';
import { MainSection } from './partials/new/MainSection';
import Footer from './partials/Footer';

const index = () => {
  return (
    <div>
    <HeadingComponent/>
    <HeroSection/>
    <MainSection/>
    <Footer/>
    
   
    
    </div>
  )
}

export default index