import { Button } from "components/ui/button";
import NewShipmentIcon from 'assets/svg/NewShipment.svg'
import SampleShipmentIcon from 'assets/svg/SampleShipment.svg'

export default function ShipmentCard({ title, description, buttonText, imageType, onClick }) {
  return (
  <div className="flex flex-wrap flex-col-reverse lg:flex-row items-start lg:items-center w-full bg-white rounded-lg border border-gray-200  p-4">
        <div className="md:flex-1 mb-4 md:mb-0 md:mr-4 w-full">
           <h2 className="text-lg font-medium mb-2">{title}</h2>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          <Button
            variant="outline"
            className="bg-blue-700 text-white hover:text-white border-blue-700 hover:bg-blue-800"
            onClick={onClick}
          >
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
  )
}
