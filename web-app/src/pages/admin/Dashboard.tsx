import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../../features/Sidebar";
import TopBar from "../../features/TopBar";
import Profile from "./Profile";
import Settings from "./Settings";
import Accounts from "./Accounts";
import ActivityHistory from "./ActivityHistory";

const AdminDashboard: React.FC = () => {
  const menuItems = [
    {
      id: 1,
      path: "/",
      group: "Main panel",
      name: "Dashboard",
      icon: "/dashboard_icon.png",
    },
    {
      id: 2,
      path: "/profile",
      group: "Main panel",
      name: "Profile",
      icon: "/user_icon.png",
    },
    {
      id: 3,
      path: "/settings",
      group: "Main panel",
      name: "Settings",
      icon: "/setting_icon.png",
    },
    {
      id: 4,
      path: "/accounts",
      group: "Human resources",
      name: "Accounts",
      icon: "/users_icon.png",
    },
    {
      id: 5,
      path: "/activity-history",
      group: "Human resources",
      name: "Activity History",
      icon: "/history_icon.png",
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
            <Route path="/settings" element={<Settings />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/activity-history" element={<ActivityHistory />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
