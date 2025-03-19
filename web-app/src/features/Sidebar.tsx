import { useState } from "react";
import { Typography } from "@mui/material";
import NavButton from "../components/nav/NavButton";
import { Link } from "react-router-dom";

interface MenuItem {
  id: number;
  path: string;
  group: string;
  name: string;
  icon: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems }) => {
  const [active, setActive] = useState<number | null>(1);

  const groupedItems = menuItems.reduce((groups: { [key: string]: MenuItem[] }, item) => {
    if (!groups[item.group]) {
      groups[item.group] = [];
    }
    groups[item.group].push(item);
    return groups;
  }, {});

  return (
    <div className="w-80 h-screen bg-white text-black flex flex-col py-5 px-2 border-r">
      {Object.keys(groupedItems).map((group, index) => (
        <div key={group} className="mb-4">
          <Typography
            className="text-gray-500 pl-2"
            sx={{
              fontSize: ".75rem",
              fontWeight: "bold",
            }}
          >
            {group}
          </Typography>
         
          <nav className="flex flex-col mt-1">
            {groupedItems[group].map((item) => (
              <Link key={item.id} to={item.path}>
              <NavButton
                key={item.id}
                text={item.name}
                icon={item.icon}
                isActive={active === item.id}
                onClick={() => setActive(item.id)}
              />
              </Link>

            ))}
          </nav>

          {index < Object.keys(groupedItems).length - 1 && (
            <hr className="my-2 border-gray-300" />
          )}

        </div>
      ))}
    </div>
  );
};

export default Sidebar;
