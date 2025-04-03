import React from "react";
import Section from "../../components/Section";
import { Typography } from "@mui/material";
import ListOrdersSection from "../../features/admin/ListOrdersSection";

const InternalOrdersPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-4">
        <div className="w-1/2">
          <Section>
            <Typography variant="h5">Incoming Internal Orders</Typography>
            <ListOrdersSection />
          </Section>
        </div>
        <div className="w-1/2 space-y-4">
          <Section>
            <Typography variant="h5">Outgoing Internal Orders</Typography>
            <ListOrdersSection />
          </Section>
        </div>
      </div>
    </div>
  );
};

export default InternalOrdersPage;
