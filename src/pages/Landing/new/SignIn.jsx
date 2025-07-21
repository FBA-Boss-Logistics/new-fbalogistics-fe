import React, { useState } from 'react'
import image from 'assets/images/LandingPage/Image.webp'
import sharkLogo from "assets/svg/SharkLogo.svg";
import fbaLogo from "assets/svg/FBALogo.svg";
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
import { useLoginQuery } from 'queries/Auth';
import HandleErrorResponse from 'utils/HandleErrorResponse';
import { CommonFormValidations } from 'components/Form/CommonFormValidations';
const { email, password } = CommonFormValidations;

const LoginFormSchema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().required('Password is required'),
});
const SignIn = () => {
    const navigate = useNavigate();
    const { mutate: loginQuery } = useLoginQuery();
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
    resolver: yupResolver(LoginFormSchema),
   });
   
   const submitHandler = (formData) => {
    const { email, password } = formData;
    console.log(formData);
    const payloadShipper = { email, password, group: "Shipper" };
    const payloadSeller = { email, password, group: "Seller" };
    if (activeTab === "Shipment Agent") {
      loginQuery(payloadShipper, {
        onSuccess: () => {
          navigate(routes.SHIPPERDASHBOARD.pathname);
        },
        onError: (err) => {
          HandleErrorResponse(err, setError);
        },
      });
    } else {
         loginQuery(payloadSeller, {
            onSuccess: () => {
                navigate(routes.SELLERDASHBOARD.pathname);
            },
            onError: (err) => {
                HandleErrorResponse(err, setError);
            },
        });
    }
   };
   const { ref: refRegisterEmail, ...RegisterEmail } = register("email");
   const { ref: refRegisterPassword, ...RegisterPassword } =
       register("password");
   
   


  return (
  <>
  <ForgotPasswordModal
                open={openForgotPasswordModal}
                handleClose={() => setOpenForgotPasswordModal(false)}
            />
    <div className=" w-full h-screen flex flex-row items-center justify-center">
        <img src={image} alt="logo" className=' h-screen object-cover  w-full   hidden lg:block'  width={700} height={1024}  />
      <div className=" w-full  h-full flex flex-col items-center justify-start md:gap-[80px] gap-[50px] px-[80px] py-[20px] md:py-[99px]">
      {/*for logo */}
         <img src={sharkLogo} alt="logo" className='w-[131.93px] h-auto cursor-pointer' onClick={() => navigate(routes.HOME.pathname)} />
         {/*for section */}
       <div className='w-screen md:w-full h-full flex flex-col items-center justify-start gap-4'>
         <h1 className='font-bold text-black text-center text-[24px] md:text-[26px] w-full'>
            Login into your account
         </h1>
         <div className='w-screen px-[20px] md:px-0 md:w-[400px] h-full flex flex-col items-start justify-start gap-4 '>
         <Tabs defaultValue={activeTab} className="w-full flex flex-col items-start justify-center gap-[14px]">
           <TabsList className='w-full h-[42px] bg-[#F2F5FC]'>
             <TabsTrigger value="Shipment Agent" className='w-full h-full text-primary ' onClick={() => setActiveTab('Shipment Agent')}>Shipment Agent</TabsTrigger>
             <TabsTrigger value="Customer" className='w-full h-full text-primary ' onClick={() => setActiveTab('Customer')}>Customer</TabsTrigger>
           </TabsList>
         </Tabs>
         <form onSubmit={handleSubmit(submitHandler)} id="login-form" className='w-full flex flex-col items-start justify-start gap-4'>
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
            <Button variant="link" className=' pl-0 font-normal' onClick={() => setOpenForgotPasswordModal(true)}>I forgot my password</Button>
             <Button className='w-full h-[46px] bg-primary text-white ' type="submit" form="login-form">Login</Button>
             <div className='w-full  flex flex-col items-center justify-center gap-4'>
               <Label className='text-black text-[16px] font-semibold'>Don&apos;t have an account?</Label>
               <Button  variant="secondary" onClick={() => navigate(routes.SIGNUP.pathname)} className=' w-full h-[46px] text-primary text-[16px] font-semibold pl-0 '>Sign Up</Button>
             </div>
          
         </div>
         
         </div>
      </div>
    </div>
    
</>
  )
}

export default SignIn