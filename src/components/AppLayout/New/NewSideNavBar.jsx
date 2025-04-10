import React from 'react'
import { Link } from 'react-router-dom'
import {  Package, CircleUser, PackageCheck, PackageX, LifeBuoy, Settings } from 'lucide-react'
import { LayoutDashboardIcon } from 'lucide-react'

const NewSideNavBar = () => {
  return (
    <div className='hidden md:block'>
       <div className="w-72 bg-white border-r h-screen sticky top-0 flex flex-col">
        <div className="p-6 border-b border-natural-100 ">
            <div className="flex items-center">
            <span className="text-xl font-bold text-blue-900">FBA BOSS</span>
            </div>
        </div>

        <nav className="flex-1 p-4">
            <ul className="space-y-1">
            <li>
                <Link href="#" className="flex items-center p-3 text-blue-900 bg-blue-50 rounded-md font-medium">
                <LayoutDashboardIcon className="mr-3 h-5 w-5" />
                Dashboard
                </Link>
            </li>
            <li>
                <Link href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md">
                <Package className="mr-3 h-5 w-5" />
                Active Shipments
                <span className="ml-auto bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    7
                </span>
                </Link>
            </li>
            <li>
                <Link href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md">
                <CircleUser className="mr-3 h-5 w-5" />
                Sample Shipments
                </Link>
            </li>
            <li>
                <Link href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md">
                <PackageCheck className="mr-3 h-5 w-5" />
                Complete Shipments
                </Link>
            </li>
            <li>
                <Link href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md">
                <PackageX className="mr-3 h-5 w-5" />
                Cancelled Shipments
                </Link>
            </li>
            </ul>
        </nav>

        <div className="p-4 border-t">
            <ul className="space-y-1">
            <li>
                <Link href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md">
                <LifeBuoy className="mr-3 h-5 w-5" />
                Support
                </Link>
            </li>
            <li>
                <Link href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md">
                <Settings className="mr-3 h-5 w-5" />
                Setting
                </Link>
            </li>
            </ul>
        </div>
        </div>
    </div>
  )
}

export default NewSideNavBar
