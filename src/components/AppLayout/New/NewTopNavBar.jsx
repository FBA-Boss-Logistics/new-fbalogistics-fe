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
import { useLogOutApiQuery } from 'queries/Auth'
import { useNavigate } from 'react-router-dom'
import ProfileIcon from '../ProfileIcon';
const NewTopNavBar = () => {
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
  return (
    <div>
       <header className="flex md:hidden items-center justify-between p-4 bg-white border-b">
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <NewSideNavBar />
          </SheetContent>
        </Sheet>

        <div className="flex items-center justify-center flex-1">
          {/* <span className="text-xl font-bold text-blue-900">FBA BOSS</span> */}
          <img src={LogoFBA} width={'120px'}  alt="plane moving" />

        </div>
        <ProfileIcon />
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative p-0 h-9 w-9">
              <Bell className="h-5 w-5 text-gray-500" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto">
              <NotificationItem
                title="New Shipment Created"
                description="Shipment #12345 has been created successfully"
                time="5 minutes ago"
              />
              <NotificationItem
                title="Shipment Status Updated"
                description="Shipment #12340 status changed to 'In Transit'"
                time="1 hour ago"
              />
              <NotificationItem
                title="Delivery Completed"
                description="Shipment #12335 has been delivered successfully"
                time="Yesterday"
              />
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-blue-700">View all notifications</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </header>
      <header className="hidden md:flex items-center justify-between p-4 bg-white border-b">
            <div className="w-72"></div>
            {/* <div className="flex gap-2 items-center"> */}
            <ProfileIcon />

              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative p-0 h-9 w-9">
                    <Bell className="h-5 w-5 text-gray-500" />
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      3
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-80 overflow-auto">
                    <NotificationItem
                      title="New Shipment Created"
                      description="Shipment #12345 has been created successfully"
                      time="5 minutes ago"
                    />
                    <NotificationItem
                      title="Shipment Status Updated"
                      description="Shipment #12340 status changed to 'In Transit'"
                      time="1 hour ago"
                    />
                    <NotificationItem
                      title="Delivery Completed"
                      description="Shipment #12335 has been delivered successfully"
                      time="Yesterday"
                    />
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="justify-center text-blue-700">View all notifications</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 p-1 h-auto">
                    <div className="flex items-center">
                      <div className="mr-2 text-right">
                        <div className="font-medium">Jack White</div>
                        <div className="text-xs text-gray-500">Manager</div>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium">
                        JW
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div onClick={handleClickLogout} className="flex cursor-pointer items-center ">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
            {/* </div> */}
          </header>
    </div>
  )
}

export default NewTopNavBar
