import React from "react";
import ResourceMovementsSection from "../../features/admin/ResourceMovementsSection";
import ResourceReservationsSection from "../../features/admin/ResourceReservationsSection";
import ReserveResourceSection from "../../features/admin/ReserveResourceSection";

const WarehouseOperationsPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-4">
        <div className="w-1/2">
          <ResourceMovementsSection />
        </div>
        <div className="w-1/2 space-y-4">
          <ReserveResourceSection />
          <ResourceReservationsSection />
        </div>
      </div>
    </div>
  );
};

export default WarehouseOperationsPage;
