import React from 'react'
import { Link } from 'react-router-dom'
import NewSideNavBar from 'components/AppLayout/New/NewSideNavBar'
import NewTopNavBar from 'components/AppLayout/New/NewTopNavBar'

const NewDrawer = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
        <div className='hidden md:block'>
         <NewSideNavBar />
        </div>
        <div className="flex-1">
        <NewTopNavBar />
        <main className="p-6">
            {children}
        </main>
        </div>
    </div>
  )
}

export default NewDrawer
