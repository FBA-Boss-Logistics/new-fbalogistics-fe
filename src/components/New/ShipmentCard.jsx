import { Button } from "components/ui/button";
import NewShipmentIcon from 'assets/svg/NewShipment.svg'
import SampleShipmentIcon from 'assets/svg/SampleShipment.svg'

export default function ShipmentCard({ title, description, buttonText, imageType }) {
  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-lg font-medium mb-2">{title}</h2>
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:flex-1 mb-4 md:mb-0 md:mr-4">
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          <Button variant="outline" className="bg-blue-700 text-white hover:text-white border-blue-700 hover:bg-blue-800">
            <span className="">+</span> {buttonText}
          </Button>
        
        </div>
        <div className="w-32 h-32 flex-shrink-0">
          {imageType === "new" ? (
            <img
              src={NewShipmentIcon}
              alt="New shipment"
              width={128}
              height={128}
              className="object-contain"
            />
          ) : (
            <img
              src={SampleShipmentIcon}
              alt="Sample shipment"
              width={128}
              height={128}
              className="object-contain"
            />
          )}
        </div>
      </div>
    </div>
  )
}
