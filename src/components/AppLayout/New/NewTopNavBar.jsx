import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, CreditCard, LogOut, Settings, User,Menu } from "lucide-react"
import { Button } from 'components/ui/button'
import NotificationItem from "@/components/New/NotificationItem"
import { Sheet, SheetContent, SheetTrigger } from 'components/ui/sheet'
import NewSideNavBar from './NewSideNavBar'
import LogoFBA from 'assets/images/logo.png'
import { FetchUserDetailApi, useLogOutApiQuery } from 'queries/Auth'
import { useNavigate } from 'react-router-dom'
import ProfileIcon from '../ProfileIcon';
import { useSidebar } from 'Context/SidebarContext'
import { routes } from 'routes/RouteConstants'
const NewTopNavBar = ({menu, dashboard}) => {
  const navigate = useNavigate();

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
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const { data: userInfo } = FetchUserDetailApi();
  const isSeller = userInfo?.data?.groups === "Seller";
  return (
    <div>
       <header className="flex md:hidden items-center justify-between p-4 bg-white border-b">
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <button className="p-2">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <NewSideNavBar menu={menu} dashboard={dashboard} />
          </SheetContent>
        </Sheet>

        <div className="flex items-center justify-center flex-1">
          {/* <span className="text-xl font-bold text-blue-900">FBA BOSS</span> */}
          <img src={LogoFBA} width={'120px'}  alt="plane moving" onClick={() => isSeller ? navigate(routes.SELLERDASHBOARD.pathname) : navigate(routes.SHIPPERDASHBOARD.pathname)} />

        </div>
        <ProfileIcon />
      </header>
      <header className="hidden md:flex items-center justify-between p-4 bg-white border-b">
            <div className="w-72"></div>
            <ProfileIcon />
          </header>
    </div>
  )
}

export default NewTopNavBar
