import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../../features/Sidebar";
import TopBar from "../../features/TopBar";
import Profile from "./Profile";
import Settings from "./Settings";
import Accounts from "./Accounts";
import ActivityHistory from "./ActivityHistory";
import PersonIcon from "@mui/icons-material/Person";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";

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
      path: "/settings",
      group: "Main panel",
      name: "Settings",
      icon: <SettingsRoundedIcon />,
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
