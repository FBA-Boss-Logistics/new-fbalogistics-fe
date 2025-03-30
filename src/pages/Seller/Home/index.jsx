
import SellerDashboard from '../Dashboard'
import SellerTopNav from '../SellerTopNav'

const Home = () => {
  return (
    <div>
    {/* <div className='py-4 border border-natural-100 border-solid border-x-0 border-t-0'>
      <SellerTopNav />
    </div> */}
    <div className="h-[calc(100vh_-_76.8px)] overflow-y-scroll">
         <SellerDashboard/>
    </div>
    
  </div>
  )
}

export default Home