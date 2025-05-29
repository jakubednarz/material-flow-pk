import React from "react";
import { Typography } from "@mui/material";
import Section from "../../components/Section";
import CreateUserSection from "../../features/admin/CreateUserSection";
import ListUsersSection from "../../features/admin/ListUsersSection";
import ActiveAccountsSection from "../../features/admin/ActiveAccountsSection";
import WorkforceDistributionSection from "../../features/admin/WorkforceDistributionSection";

const Accounts: React.FC = () => {
  return (
    <div className="flex w-full p-4 gap-4 ">
      <div className="w-8/12 flex flex-col gap-4">
        <div className="relative flex gap-4">
          <ActiveAccountsSection />

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
        <WorkforceDistributionSection />
      </div>
    </div>
  );
};

export default Accounts;
