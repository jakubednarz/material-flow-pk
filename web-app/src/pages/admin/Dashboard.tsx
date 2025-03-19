import React from 'react';
import Sidebar from '../../features/Sidebar';

const Dashboard: React.FC = () => {

  const menuItems = [
    { id: 1, group: "Main panel", name: "Dashboard", icon: "/dashboard_icon.png" },
    { id: 2, group: "Main panel", name: "Profile", icon: "/user_icon.png" },
    { id: 3, group: "Main panel", name: "Settings", icon: "/setting_icon.png" },
    { id: 4, group: "Human resources", name: "Accounts", icon: "/users_icon.png" },
    { id: 5, group: "Human resources", name: "Activity History", icon: "/history_icon.png" },

  ];

  return (
    <div>
        <Sidebar menuItems={menuItems} />
    </div>
  );
};

export default Dashboard;