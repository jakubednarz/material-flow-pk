import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../../features/Sidebar";
import TopBar from "../../features/TopBar";
import Profile from "./ProfilePage";
import Accounts from "./AccountsPage";
import ActivityHistory from "./ActivityHistoryPage";
import PersonIcon from "@mui/icons-material/Person";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import InventoryManagementPage from "./InventoryManagementPage";
import WarehouseOperationsPage from "./WarehouseOperationsPage";
import MonitoringAnalyticsPage from "./MonitoringAnalyticsPage";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import MoveDownRoundedIcon from "@mui/icons-material/MoveDownRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";

const AdminDashboard: React.FC = () => {
  const menuItems = [
    {
      id: 1,
      path: "/",
      group: "Main panel",
      name: "Dashboard",
      icon: <DashboardRoundedIcon />,
    },
    {
      id: 2,
      path: "/profile",
      group: "Main panel",
      name: "Profile",
      icon: <PersonIcon />,
    },
    {
      id: 4,
      path: "/accounts",
      group: "Human resources",
      name: "Accounts",
      icon: <GroupRoundedIcon />,
    },
    {
      id: 5,
      path: "/activity-history",
      group: "Human resources",
      name: "Activity History",
      icon: <HistoryRoundedIcon />,
    },
    {
      id: 6,
      path: "/inventory-management",
      group: "Warehouse",
      name: "Inventory Management",
      icon: <InventoryRoundedIcon />,
    },
    {
      id: 7,
      path: "/warehouse-operations",
      group: "Warehouse",
      name: "Warehouse Operations",
      icon: <MoveDownRoundedIcon />,
    },
    {
      id: 8,
      path: "/monitoring-analytics",
      group: "Warehouse",
      name: "Monitoring & Analytics",
      icon: <BarChartRoundedIcon />,
    },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TopBar />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar menuItems={menuItems} />
        <div className="flex-grow h-full overflow-auto">
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/activity-history" element={<ActivityHistory />} />
            <Route
              path="/inventory-management"
              element={<InventoryManagementPage />}
            />
            <Route
              path="/warehouse-operations"
              element={<WarehouseOperationsPage />}
            />
            <Route
              path="/monitoring-analytics"
              element={<MonitoringAnalyticsPage />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
