import { Button } from "components/ui/button";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { routes } from "routes/RouteConstants";
import SaveIcon from "assets/svg/checked.svg";
import DownloadInvoiceIcon from "assets/svg/downloadInvoice.svg";
import { FetchSellerInvoiceDetailApi } from "queries/Seller";
import { fetchAllWarehouseDetailApi } from "queries/Shipper";
import PDFCustomer from "components/pdf/PDFCustomer";
import html2pdf from "html2pdf.js";
import { Select, MenuItem } from "@mui/material";

export default function NavigationShipments({activeTab, setActiveTab, id}) {
    const userDetails = JSON.parse(localStorage.getItem("USER_DETAILS"));

    const { data: Data } = FetchSellerInvoiceDetailApi({shipment_id: id});
    const { data: WarehousesData } = fetchAllWarehouseDetailApi(id);
    const invoiceData = Data?.data?.data[0]
    const warehouseData = WarehousesData?.data?.data[0]
    console.log("InvoiceData", invoiceData)
    console.log("WarehousesData", warehouseData)

    const handleDownloadInvoice = () => {
        console.log("Download Invoice")
    }

    const handleDownloadWarehouse = () => {
        console.log("Download Warehouse")
    }

    return (
        <div className="flex flex-wrap gap-2 items-center w-full justify-between">
            {/* Desktop Version */}
            <div className="md:flex hidden flex-wrap bg-white rounded-[8px] border border-[#E0E2E7] p-1 w-auto">
                {["Chat", "Project", "Invoice", "Tracking"].map((tab) => (
                    <button
                        key={tab}
                        className={`${
                            activeTab === tab ? "bg-primary text-white" : "text-[#213E7B]"
                        } px-4 sm:px-5 py-2 text-sm rounded-[6px] font-${activeTab === tab ? "semibold" : "normal"}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            {/* Mobile Version */}
            <div className="md:hidden flex flex-wrap w-auto">
                <Select
                    value={activeTab}
                    className="w-full"
                >
                    <MenuItem value="Chat" onClick={() => setActiveTab("Chat")}>Chat</MenuItem>
                    <MenuItem value="Project" onClick={() => setActiveTab("Project")}>Project</MenuItem>
                    <MenuItem value="Invoice" onClick={() => setActiveTab("Invoice")}>Invoice</MenuItem>
                    <MenuItem value="Tracking" onClick={() => setActiveTab("Tracking")}>Tracking</MenuItem>
                </Select>
            </div>
            {activeTab === "Invoice" && (
                <div className="md:inline-flex hidden text-center flex-row gap-4 items-center ">
                    {invoiceData && userDetails.groups === "Seller" && (
                        <Button variant="outline" size="lg" className=" rounded-[8px] bg-[#213E7B1F] text-[#213E7B] px-[13px] hover:bg-[#213E7B1F]/20 hover:text-[#213E7B]" onClick={handleDownloadInvoice}>
                            <img src={DownloadInvoiceIcon} alt="Download Invoice" className="h-[16.25px] w-[16.25px]" />
                            <span className="font-semibold text-sm">Download <span className="hidden md:inline">PDF Invoice</span></span>
                        </Button>
                    )}
                    {warehouseData && userDetails.groups === "Shipper" && (
                        <>
                            <PDFCustomer data={WarehousesData?.data?.data} />
                            <Button variant="outline" size="lg" className=" rounded-[8px] bg-[#213E7B1F] text-[#213E7B] px-[13px] hover:bg-[#213E7B1F]/20 hover:text-[#213E7B]" onClick={handleDownloadWarehouse}>
                                <img src={DownloadInvoiceIcon} alt="Download Invoice" className="h-[16.25px] w-[16.25px]" />
                                <span className="font-semibold text-sm">Download <span className="hidden md:inline">PDF Invoice</span></span>
                            </Button>
                        </>
                    )}
                    {invoiceData === undefined && userDetails.groups === "Seller" && (
                        <Button type="submit" form="invoice-customer-form" size="lg" className="rounded-[8px] bg-[#37A672] hover:bg-[#37A672]/90 text-white gap-[5.62px] px-[14px]" >
                            <img src={SaveIcon} alt="Save Document" className="h-[8.75px] w-[10.42px]" />
                            <span className="font-semibold text-sm">Save <span className="hidden md:inline">Document</span></span>
                        </Button>
                    )}
                    {warehouseData === undefined && userDetails.groups === "Shipper" && (
                        <Button type="submit" form="invoice-shipper-form" size="lg" className="rounded-[8px] bg-[#37A672] hover:bg-[#37A672]/90 text-white gap-[5.62px] px-[14px]" >
                            <img src={SaveIcon} alt="Save Document" className="h-[8.75px] w-[10.42px]" />
                            <span className="font-semibold text-sm">Save <span className="hidden md:inline">Warehouse</span></span>
                        </Button>
                    )}
                </div>
            )}
        </div>

    )
}