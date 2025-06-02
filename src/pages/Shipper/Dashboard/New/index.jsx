import React from 'react'
import ShipmentStat from 'components/New/ShipmentStat'
import ShipmentCard from 'components/New/ShipmentCard'
import { Button } from "@/components/ui/button"

import { ArrowRight, ChevronRight, Package} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Quotation from '../Quotation'
import { Link } from 'react-router-dom'

const NewDashboard = () => {

 
  return (
  <>
   <Card className=" border-1 hidden md:block">
      {/* <CardHeader className=" ">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <Package className="h-5 w-5" />
            Pending Quotations
          </CardTitle>
          <Button>Add Shipment</Button>
        </div>
      </CardHeader> */}
      {/* <CardContent className=""> */}
        <Quotation/>
      {/* </CardContent> */}
    </Card>
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-zinc-800 mb-2">Pending Quotations</h1>

          <div className="flex items-center text-sm mb-6">
            <Link href="/dashboard" className="text-blue-600 hover:underline">
              Dashboard
            </Link>
            <ChevronRight className="h-4 w-4 inline" />
            <span className="text-gray-500">Pending Quotations</span>
          </div>

          {/* <Card className="overflow-hidden">
           
          </Card> */}
        </div>
  </>
  )
}

export default NewDashboard

