import React from 'react'
import { Link } from 'react-router-dom'
import {   LifeBuoy, LogOut, LogOutIcon, Settings, User } from 'lucide-react'
import LogoFBA from 'assets/images/logo.png'
import DocumentIcon from 'assets/svg/Documents.svg'
import FeedIcon from 'assets/svg/Feed.svg'
import HistoryIcon from 'assets/svg/History.svg'
import CheckIcon from 'assets/svg/Check.svg'

import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "routes/RouteConstants";



import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Collapse } from "@mui/material";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import LogoutWhite from "assets/icons/LogoutWhite.svg";
import fbaLogo from "assets/svg/FBALogo.svg";
import AnnouncementIcon from "assets/svg/announcement.svg";
import BarIcon from "assets/svg/bar.svg";
import completeIcon from "assets/svg/completeIcon.svg";
import shipmentHistorySvg from "assets/svg/shipmentHistorySvg.svg";
import Shoppingbag from "assets/svg/shopping-bag-02.svg";
import SmapleShipmentIcon from "assets/svg/shoppingbag02.svg";
import DOT from "assets/svg/statusdot.svg";
import AddCircleIcon from "assets/svg/AddCircle.svg";

import { FetchUserDetailApi, useLogOutApiQuery } from "queries/Auth";
import { useSeller } from 'pages/Seller/Context/SellerContext'
import { useSidebar } from 'Context/SidebarContext'

const NewSideNavBar = ({menu, dashboard}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location?.pathname);
  const searchParams = new URLSearchParams(window.location.search);
  const srcQueryParam = searchParams.get("src");

  useEffect(() => {
      if (srcQueryParam === "accepted") {
          setCurrentPath(routes.SHIPPERORDERS.pathname);
      } else if (srcQueryParam === "sampleShipments") {
          setCurrentPath(routes.SHIPPERSAMPLESHIPMENT.pathname);
      } else {
          setCurrentPath(location?.pathname);
      }
  }, [location?.pathname]);

  const { mutate: logoutApi } = useLogOutApiQuery();
  const handleClickLogout = () => {
      logoutApi(null, {
          onSuccess: () => {
              localStorage.clear();
              navigate("/");
          },
          onError: () => {},
      });
  };

  const buttonsData = useMemo(
      () =>menu,
      [location]
  );

  const { data: userinfo } = FetchUserDetailApi();
  const {setCreateSampleShipment} = useSeller();
  const { setIsSidebarOpen } = useSidebar();
  const { data: userInfo } = FetchUserDetailApi();
  const isSeller = userInfo?.data?.groups === "Seller";
  return (
       <div className="w-full md:w-72 bg-white border-r h-screen sticky top-0 flex flex-col">
        <div className="p-6 border-b border-natural-100 ">
            <div className="flex items-center">
            <span className="text-xl font-bold text-blue-900">
            <img

             onClick={() => isSeller ? navigate(routes.SELLERDASHBOARD.pathname) : navigate(routes.SHIPPERDASHBOARD.pathname)}

             src={LogoFBA} width={'70%'} alt="plane moving" />

            </span>
            </div>
        </div>
        <nav className="flex-1 p-4">
        <ul className="space-y-1">
        {buttonsData?.filter((item) => {
                            if (item.label === "Sample Shipment") {
                                if (
                                    dashboard === "seller" || userinfo?.data?.email ===
                                    import.meta.env
                                        .VITE_REACT_APP_SAMPLE_SHIPPER_EMAIL
                                ) {
                                    return true;
                                }
                                return false;
                            }
                            return true;
                            
                        })
                        ?.map(({ icon, label, route, children }, i) => {
                          const isOpen = location.pathname.startsWith(route);
                        
                          return(
                          <>
                             <li key={label}>
                                <a
                                key={label}
                                 onClick={() => {
                                  setCurrentPath(route);
                                  setIsSidebarOpen(false)
                                  navigate(route);
                                }}
                                 className={`flex cursor-pointer items-center p-3 text-blue-900 ${ currentPath === route?'bg-blue-50':''} rounded-md font-medium`}>
                                  <img src={icon} alt="Document" className='mr-3 h-5 w-5' />
                                  {label}
                                </a>
                              </li>
                          </>

                          )        

                        
                        })
                      
                    }
        </ul>
        {dashboard === "seller" && (
            <ul className='space-y-1  border-t mt-4'>
                <li>
                    <Link to={routes.QUOTES.pathname} onClick={() => {
                      setCurrentPath(routes.QUOTES.pathname)
                      setIsSidebarOpen(false)
                    }} className={`flex cursor-pointer items-center p-3 text-blue-900 ${ currentPath === routes.QUOTES.pathname?'bg-blue-50':''} rounded-md font-medium`}>
                <img src={AddCircleIcon} className="mr-3 h-5 w-5" />
                Add Shipment
                </Link>
                </li>
                <li>
                    <Link  onClick={() => {
                      setCreateSampleShipment(true)
                      setIsSidebarOpen(false)
                    }} className={`flex cursor-pointer items-center p-3 text-blue-900 ${ currentPath === routes.SHIPPERPROFILE.pathname?'bg-blue-50':''} rounded-md font-medium`}>
                <img src={AddCircleIcon} className="mr-3 h-5 w-5" />
                Sample Shipment
                </Link>
                </li>

                
            </ul>
        )}
      </nav>
        <div className="p-4 border-t">
            <ul className="space-y-1">
        {/* <li className='block md:hidden'>
                <Link to={routes.SHIPPERPROFILE.pathname} className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md">
                <User className="mr-3 h-5 w-5" />
                Profile
                </Link>
            </li> */}
            <li className='block md:hidden'>
                <a onClick={handleClickLogout} className="flex cursor-pointer items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md">
                <LogOut  className="mr-3 h-5 w-5" />
                Logout
                </a>
            </li>
            <li>
                <Link href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md">
                <LifeBuoy className="mr-3 h-5 w-5" />
                Support
                </Link>
            </li>
            <li>
                <Link to={isSeller ? routes.SELLERPROFILE.pathname : routes.SHIPPERPROFILE.pathname} onClick={() => {
                  setCurrentPath(isSeller ? routes.SELLERPROFILE.pathname : routes.SHIPPERPROFILE.pathname)
                  setIsSidebarOpen(false)
                }} className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md">
                <Settings className="mr-3 h-5 w-5" />
                Settings
                </Link>
            </li>
            </ul>
        </div>
        </div>
  )
}

export default NewSideNavBar
