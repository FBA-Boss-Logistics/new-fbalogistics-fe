import React from 'react'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { routes } from 'routes/RouteConstants'

const HeaderPage = ({title, pathname,home}) => {
  return (
    <div>
    <h1 className="text-2xl font-semibold text-zinc-800 mb-2">{title}</h1>
    <div className="flex items-center text-sm">
    <Link to={home=='shipment' ? routes.SHIPPERDASHBOARD.pathname : routes.SELLERDASHBOARD.pathname} className="text-primary hover:underline">
        Dashboard
    </Link>
    <ChevronRight className="h-4 w-4 inline" />
    <span className="text-gray-500">{pathname}</span>
    </div>
</div>
  )
}

export default HeaderPage;