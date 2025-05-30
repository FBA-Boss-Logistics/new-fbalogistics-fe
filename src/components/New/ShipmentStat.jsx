
import { Circle, Package, PackageCheck } from "lucide-react"
import activeShipment from 'assets/svg/activeshipmentCardIcon.svg'
import sampleShipment from 'assets/svg/sampleCardIcon.svg'
import completeShipment from 'assets/svg/completeCardIcon.svg'

export default function ShipmentStat({ title, count, icon, color, textColor }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex flex-row md:flex-col gap-4 items-start md:justify-between">
        <div >
          {icon === "active" && <img src={activeShipment} className="h-12 w-12" />}
          {icon === "sample" && <img src={sampleShipment} className="h-12 w-12" />}
          {icon === "complete" && <img src={completeShipment} className="h-12 w-12" />}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-3xl font-semibold mt-1">{count}</p>
        </div>
      </div>
    </div>
  )
}
