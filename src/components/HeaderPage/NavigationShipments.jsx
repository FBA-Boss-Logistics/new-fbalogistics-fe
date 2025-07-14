export default function NavigationShipments({activeTab, setActiveTab}) {
    return (
        <div className="flex flex-wrap gap-2 items-center w-full">
            <div className="flex flex-wrap bg-white rounded-[8px] border border-[#E0E2E7] p-1 w-full sm:w-auto">
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
        </div>

    )
}