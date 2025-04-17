import React from "react";
import { Typography } from "@mui/material";
import Section from "../../components/Section";
import CreateUserSection from "../../features/admin/CreateUserSection";
import ListUsersSection from "../../features/admin/ListUsersSection";

const Accounts: React.FC = () => {
  return (
    <div className="flex w-full p-4 gap-4 ">
      <div className="w-8/12 flex flex-col gap-4">
        <div className="relative flex gap-4">
          <Section title="Number of active accounts">
            <Typography variant="h5" className="">
              Number
            </Typography>
          </Section>

          <Section title="Section title">
            <Typography variant="h5" className="">
              Additional Section
            </Typography>
          </Section>
        </div>

        <ListUsersSection />
      </div>

      <div className="w-5/12 flex-col space-y-4">
        <CreateUserSection />

        <Section title="Workforce Distribution">
          <Typography variant="h5" className="">
            Bar/Pie Chart
          </Typography>
        </Section>
      </div>
    </div>
  );
};

export default Accounts;
