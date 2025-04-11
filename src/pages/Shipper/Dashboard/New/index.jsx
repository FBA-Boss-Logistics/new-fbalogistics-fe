import React from 'react'
import ShipmentStat from 'components/New/ShipmentStat'
import ShipmentCard from 'components/New/ShipmentCard'
import { Button } from "@/components/ui/button"

import { Package} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Quotation from '../Quotation/New'

const NewDashboard = () => {

 
  return (
  <>
   <Card className="w-full border-1">
      <CardHeader className=" ">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <Package className="h-5 w-5" />
            Pending Quotations
          </CardTitle>
          {/* <Button>Add Shipment</Button> */}
        </div>
      </CardHeader>
      <CardContent className="px-4">
        <Quotation/>
      </CardContent>
    </Card>
  </>
  )
}

export default NewDashboard

