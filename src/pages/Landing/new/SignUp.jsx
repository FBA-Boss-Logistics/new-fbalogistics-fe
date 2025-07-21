import React, { useState } from 'react'
// import image from 'assets/images/LandingPage/Image.webp'
import image from 'assets/images/LandingPage/Image-change.webp'
import fbaLogo from "assets/svg/FBALogo.svg";
import SharkLogo from "assets/svg/SharkLogo.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Label } from '@radix-ui/react-label';
import ForgotPasswordModal from 'pages/ForgotPassword/ForgotPasswordModal';
import { Alert, AlertDescription } from 'components/ui/alert';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { routes } from 'routes/RouteConstants';
import { useNavigate } from 'react-router-dom';
import { useLoginQuery, useSignUpQuery } from 'queries/Auth';
import HandleErrorResponse from 'utils/HandleErrorResponse';
import { CommonFormValidations } from 'components/Form/CommonFormValidations';
const { first_name, last_name, email, password } = CommonFormValidations;
const SignUpFormSchema = yup.object().shape({
    first_name,
    last_name,
    email,
    password,
});
const SignUp = () => {
    const navigate = useNavigate();
    const { mutate: signUpQuery } = useSignUpQuery();
    const [activeTab, setActiveTab] = useState('Customer');
    const [showPassword, setShowPassword] = useState(false)
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }
    
    const [openForgotPasswordModal, setOpenForgotPasswordModal] =
    useState(false);
      
   const {
      register,
      handleSubmit,
      setError,
      formState: { errors },
   } = useForm({
    resolver: yupResolver(SignUpFormSchema),
   });
   
   const submitSignUpFrom = (formData) => {
      if (activeTab === "Customer") {
          signUpQuery(
              {
                  first_name: formData.first_name,
                  last_name: formData.last_name,
                  email: formData.email,
                  password: formData.password,
                  groups: "Seller",
              },
              {
                  onSuccess: () => {
                      navigate(routes.SELLERHOME.pathname);
                  },
                  onError: (err) => {
                      HandleErrorResponse(err, setError);
                  },
              }
          );
          navigate(routes.SELLERDASHBOARD.pathname);
      } else {
          signUpQuery(
              {
                  first_name: formData.first_name,
                  last_name: formData.last_name,
                  email: formData.email,
                  password: formData.password,
                  groups: "Shipper",
              },
              {
                  onSuccess: () => {
                      navigate(routes.LOGIN.pathname);
                  },
                  onError: (err) => {
                      HandleErrorResponse(err, setError);
                  },
              }
          );
      }
  };
   const { ref: refRegisterEmail, ...RegisterEmail } = register("email");
   const { ref: refRegisterPassword, ...RegisterPassword } =
       register("password");
       const { ref: refRegisterFirstName, ...RegisterFirstName } =
       register("first_name");
   const { ref: refRegisterLastName, ...RegisterLastName } =
       register("last_name");
   
   


  return (
  <>
  <ForgotPasswordModal
                open={openForgotPasswordModal}
                handleClose={() => setOpenForgotPasswordModal(false)}
            />
    <div className=" w-full h-full flex flex-row items-center justify-start">
        <img src={image} alt="logo" className=' h-screen object-cover  w-full hidden lg:block'  width={800} height={1024} />
      <div className=" w-full  h-full max-h-screen  flex flex-col items-center justify-start md:gap-[30px] gap-[50px] px-[80px] py-[20px] md:py-[20px] lg:py-[0px]  overflow-y-auto">
      {/*for logo */}
         <img src={SharkLogo} alt="logo" className='w-[131.93px] h-auto cursor-pointer' onClick={() => navigate(routes.HOME.pathname)} />
         {/*for section */}
       <div className='w-screen md:w-full h-full flex flex-col items-center justify-start gap-4 '>
         <h1 className='font-bold text-black text-center text-[24px] md:text-[26px] w-full'>
         Sign Up
         </h1>
         <div className='w-screen px-[20px] md:px-0 md:w-[400px] h-full flex flex-col items-start justify-start gap-4 '>
         <Tabs defaultValue={activeTab} className="w-full flex flex-col items-start justify-center gap-[14px]">
           <TabsList className='w-full h-[42px] bg-[#F2F5FC]'>
             <TabsTrigger value="Shipment Agent" className='w-full h-full text-primary ' onClick={() => setActiveTab('Shipment Agent')}>Shipment Agent</TabsTrigger>
             <TabsTrigger value="Customer" className='w-full h-full text-primary ' onClick={() => setActiveTab('Customer')}>Customer</TabsTrigger>
           </TabsList>
         </Tabs>
         <form onSubmit={handleSubmit(submitSignUpFrom)} id="login-form" className='w-full flex flex-col items-start justify-start gap-4'>
         <div className='w-full  flex flex-col items-start justify-start gap-4'>
             <Input type="text" ref={refRegisterFirstName} {...RegisterFirstName} placeholder="Enter Your First Name" className='w-full h-[50px]  ' />
             {/* {errors.general && ( */}
             {errors.first_name && (
             <p className="text-xs text-red-500 flex items-center gap-1 ">
              <AlertCircle className="h-3 w-3" />
             {errors.first_name.message}
            </p>
            )}
         </div>
         <div className='w-full  flex flex-col items-start justify-start gap-4'>
             <Input type="text" ref={refRegisterLastName} {...RegisterLastName} placeholder="Enter Your Last Name" className='w-full h-[50px]  ' />
             {/* {errors.general && ( */}
             {errors.last_name && (
             <p className="text-xs text-red-500 flex items-center gap-1 ">
              <AlertCircle className="h-3 w-3" />
             {errors.last_name.message}
            </p>
            )}
         </div>
         <div className='w-full  flex flex-col items-start justify-start gap-4'>
             <Input type="email" ref={refRegisterEmail} {...RegisterEmail} placeholder="Email Address" className='w-full h-[50px]  ' />
             {/* {errors.general && ( */}
             {errors.email && (
             <p className="text-xs text-red-500 flex items-center gap-1 ">
              <AlertCircle className="h-3 w-3" />
             {errors.email.message}
            </p>
            )}
         </div>
            <div className='w-full  flex flex-col items-start justify-start gap-2'> 
                <div className="relative w-full h-[50px] ">
                 <Input
                   id="password"
                   type={showPassword ? "text" : "password"}
                   placeholder="Password"
                   className=" w-full h-[50px] "
                   ref={refRegisterPassword}
                   {...RegisterPassword}
                 />
                 <Button
                   type="button"
                   variant="ghost"
                   size="icon"
                   className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                   onClick={togglePasswordVisibility}
                   aria-label={showPassword ? "hide password" : "show password"}
                 >
                   {showPassword ? (
                     <EyeOff className="h-4 w-4 text-muted-foreground" />
                   ) : (
                     <Eye className="h-4 w-4 text-muted-foreground" />
                   )}
                 </Button>
               </div>
               {errors.password && (
                 <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.password.message}
                 </p>
               )}
               
            </div>
         </form>
             <Button className='w-full h-[46px] bg-primary text-white ' type="submit" form="login-form">Login</Button>
             <div className='w-full  flex flex-col items-center justify-center gap-4'>
               <Label className='text-black text-[16px] font-semibold'>Already have an account??</Label>
               <Button  variant="secondary" className=' w-full h-[46px] text-primary text-[16px] font-semibold pl-0 ' onClick={() => navigate(routes.LOGIN.pathname)}>Sign In</Button>
             </div>
          
         </div>
         
         </div>
      </div>
    </div>
    
</>
  )
}

export default SignUp