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
import MoveDownRoundedIcon from "@mui/icons-material/MoveDownRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import IncomingOrdersPage from "./IncomingOrdersPage";
import SuppliersManagementPage from "./SuppliersManagementPage";
import ReportsAnalyticsPage from "./ReportsAnalyticsPage";
import OrdersHistoryPage from "./OrdersHistoryPage";
import OutgoingOrdersPage from "./OutgoingOrdersPage";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import { Icon } from "@mui/material";
import Hello from "../../features/Hello";

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
      id: 3,
      path: "/accounts",
      group: "Human resources",
      name: "Accounts",
      icon: <GroupRoundedIcon />,
    },
    {
      id: 4,
      path: "/activity-history",
      group: "Human resources",
      name: "Activity History",
      icon: <HistoryRoundedIcon />,
    },
    {
      id: 5,
      path: "/inventory-management",
      group: "Warehouse",
      name: "Inventory Management",
      icon: <CategoryRoundedIcon />,
    },
    {
      id: 6,
      path: "/warehouse-operations",
      group: "Warehouse",
      name: "Warehouse Operations",
      icon: <MoveDownRoundedIcon />,
    },
    {
      id: 7,
      path: "/monitoring-analytics",
      group: "Warehouse",
      name: "Monitoring & Analytics",
      icon: <BarChartRoundedIcon />,
    },
    {
      id: 8,
      path: "/incoming-orders",
      group: "Orders Management",
      name: "Incoming Orders",
      icon: (
        <Icon>
          <img src="/internal-link.png" alt="" />
        </Icon>
      ),
    },
    {
      id: 9,
      path: "/outgoing-orders",
      group: "Orders Management",
      name: "Outgoing Orders",
      icon: <LaunchRoundedIcon />,
    },
    {
      id: 10,
      path: "/orders-history",
      group: "Orders",
      name: "Orders History",
      icon: <HistoryRoundedIcon />,
    },
    {
      id: 11,
      path: "/suppliers-management",
      group: "Orders",
      name: "Suppliers Management",
      icon: <LocalShippingRoundedIcon />,
    },
    {
      id: 12,
      path: "/reports-analytics",
      group: "Orders",
      name: "Reports & Analytics",
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
            <Route path="/" element={<Hello />} />
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
            <Route path="/incoming-orders" element={<IncomingOrdersPage />} />
            <Route path="/outgoing-orders" element={<OutgoingOrdersPage />} />
            <Route path="/orders-history" element={<OrdersHistoryPage />} />
            <Route
              path="/suppliers-management"
              element={<SuppliersManagementPage />}
            />
            <Route
              path="/reports-analytics"
              element={<ReportsAnalyticsPage />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
