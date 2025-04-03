import React from "react";
import Section from "../../components/Section";
import { Typography } from "@mui/material";

type Props = {};

const ReportsAnalyticsPage = (props: Props) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-4">
        <div className="w-1/2 space-y-4">
          <Section title="Number of pending orders (total, internal, external)">
            <Typography variant="h5">Additional Section</Typography>
          </Section>
          <Section title="Number of delayed orders">
            <Typography variant="h5">Additional Section</Typography>
          </Section>
        </div>
        <div className="w-1/2 space-y-4">
          <Section title="Efficiency of realisation">
            <Typography variant="h5">Additional Section</Typography>
          </Section>
          <Section title="Trend charts for all order types">
            <Typography variant="h5">Additional Section</Typography>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalyticsPage;
