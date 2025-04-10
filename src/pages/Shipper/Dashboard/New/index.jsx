import React from 'react'
import ShipmentStat from 'components/New/ShipmentStat'
import ShipmentCard from 'components/New/ShipmentCard'
import { Button } from '@mui/material'
const NewDashboard = () => {
  return (
    <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ShipmentStat
              title="Active Shipments"
              count={7}
              icon="active"
              color="bg-orange-100"
              textColor="text-orange-500"
            />
            <ShipmentStat
              title="Sample Shipments"
              count={16}
              icon="sample"
              color="bg-amber-100"
              textColor="text-amber-500"
            />
            <ShipmentStat
              title="Complete Shipments"
              count={8}
              icon="complete"
              color="bg-rose-100"
              textColor="text-rose-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ShipmentCard
              title="New Shipment"
              description="Ready to get started with a new shipment? Click the button below to request a quote."
              buttonText="New shipment"
              imageType="new"
            />
            <ShipmentCard
              title="Sample Shipment"
              description="Ready to get started with a new sample shipment? Click the button below to begin."
              buttonText="Sample shipment"
              imageType="sample"
            />
          </div>

          <div className="bg-white rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Announcements</h2>
              <Button variant="outline" className="text-blue-700 border-blue-700">
                View all announcements
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Shipping Agent</h2>
            <p className="text-sm text-gray-600 mb-4">
              Other FBA Boss Academy students, hope you are all doing well. Here is the latest news regarding the
              situation of Amazon warehouse over capacity in the USA. The following warehouses have had a serious
              explosion of requirements. There will be delays in getting delivery appointments. ABOUT FCFS MG2 (BDL1)
              MG2 is not accepting any new shipments. FCFS is not accepting any new shipments. The following warehouses
              are having serious delays and appointments are increasing at the following warehouses: ABE1 LGB7 DFW6 DFW8
              MDW2 CLT2 ABE3 AVP1 TEB3 PHL4 MEM2 LBL1 BCL5 BDL1 BFL1 PHL5 PHL7 BFL1. The current storage situation of
              OVER CUBE and other warehouses on receiving appointments is also not ideal. With the arrival of the peak
              season ahead for the big promotion, Amazon warehouses have also issued notices about their working
              operations in November.
            </p>
            <div className="text-xs text-gray-500 mb-4">December 1, 2023</div>
            <Button variant="outline" className="text-blue-700 border-blue-700">
              Read more
            </Button>
          </div>
    </div>
  )
}

export default NewDashboard

