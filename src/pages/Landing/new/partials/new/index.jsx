import React from 'react'
import fbaLogo from "assets/svg/FBALogo.svg";
import { Button } from 'components/ui/button';
import HeadingComponent from './nav';
import { HeroSection } from './HeroSection';
import { MainSection } from './MainSection';
// import { MainSection } from './partials/new/MainSection';
import Footer from '../Footer';

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