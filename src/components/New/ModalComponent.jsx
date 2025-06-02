import React, { useEffect, useRef, useState } from 'react'
// import { useSeller } from 'pages/Seller/Context/SellerContext';
import defaultLogo from "assets/svg/sampleShipmentModalIcon.svg"


const ModalComponent = ({
    open,
    onClose,
    children,
    title,
    logo=defaultLogo,
    
}) => {

    const [isMobile, setIsMobile] = useState(false)
  const dialogRef = useRef(null)
//   const {setCreateSampleShipment} = useSeller();

  // Detect mobile screen
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)

    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && open) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [open])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target) && open) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])


  return (
    <>
    {open && <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" />}

    {open && (
      <div
        className={`fixed z-50 inset-x-0   bottom-0 ${isMobile ? "animate-slide-up" : "animate-fade-in"} md:inset-0 md:flex md:items-center md:justify-center `}
      >
        <div
          ref={dialogRef}
        
          className={`bg-white rounded-lg shadow-xl w-full rounded-t-xl max-h-[90vh] overflow-auto md:max-w-xl md:w-full md:mx-3`}
        >
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">   
                  <img src={logo} alt="logo" className="w-10 h-10" />
                  <h2 className="text-mdb md:text-xl font-semibold text-gray-900">{title}</h2>
              </div>
              <button onClick={() => onClose()} className="text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
         
          </div>
          
                 {/* Content */}
          <div className="p-6">
          {children}
          </div>
        </div>
      </div>
     )}
     </>
  
  )
}

export default ModalComponent