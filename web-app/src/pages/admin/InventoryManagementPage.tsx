import React from "react";
import ResourcesCatalogSection from "../../features/admin/ResourcesCatalogSection";
import PalletTrackingSection from "../../features/admin/PalletTrackingSection";
import WarehouseLocationsSection from "../../features/admin/WarehouseLocationsSection";
import CreateResourceSection from "../../features/admin/CreateResourceSection";

const InventoryManagementPage: React.FC = () => {
  return (
    <div className="flex w-full p-4 gap-4">
      <div className="w-8/12">
        <ResourcesCatalogSection />
      </div>

      <div className="w-5/12 flex-col space-y-4">
        <CreateResourceSection />
        <PalletTrackingSection />
        <WarehouseLocationsSection />
      </div>
    </div>
  );
};

export default InventoryManagementPage;
