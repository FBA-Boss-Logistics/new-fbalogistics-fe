function NotificationItem({ title, description, time }) {
    return (
      <div className="flex flex-col p-3 hover:bg-gray-50 cursor-pointer">
        <div className="flex justify-between items-start">
          <h4 className="font-medium text-sm">{title}</h4>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-xs text-gray-600 mt-1">{description}</p>
      </div>
    )
  }
  
  export default NotificationItem
  