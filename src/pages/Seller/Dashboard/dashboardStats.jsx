import ShipmentStat from 'components/New/ShipmentStat';
import { FetchSellerDashboardAnalyticsApi } from 'queries/Seller';
import React from 'react';

const DashboardStats = () => {
    const {data:sellerDashboardAnalytics} = FetchSellerDashboardAnalyticsApi()
    const analytics = sellerDashboardAnalytics?.data

  return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ShipmentStat
              title="Active Shipments"
              count={analytics?.active_shipments || 0}
              icon="active"
              color="bg-orange-100"
              textColor="text-orange-500"
            />
            <ShipmentStat
              title="Sample Shipments"
              count={analytics?.sample_shipments || 0}
              icon="sample"
              color="bg-amber-100"
              textColor="text-amber-500"
            />
            <ShipmentStat
              title="Complete Shipments"
              count={analytics?.completed_shipments || 0}
              icon="complete"
              color="bg-rose-100"
              textColor="text-rose-500"
            />
        </div>
    </>
  );
};

export default DashboardStats;
