
import { Circle, Package, PackageCheck } from "lucide-react"

export default function ShipmentStat({ title, count, icon, color, textColor }) {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-3xl font-semibold mt-1">{count}</p>
        </div>
        <div className={`${color} ${textColor} p-3 rounded-full`}>
          {icon === "active" && <Package className="h-6 w-6" />}
          {icon === "sample" && <Circle className="h-6 w-6" />}
          {icon === "complete" && <PackageCheck className="h-6 w-6" />}
        </div>
      </div>
    </div>
  )
}
