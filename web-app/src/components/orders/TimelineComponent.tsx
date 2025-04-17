import React from "react";
import InfoCard from "./InfoCard";
import { Box, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

type Props = {
  createdAt: string;
  approvedAt?: string;
  expectedCompletion: string;
  actualCompletion?: string;
};

const formatDate = (dateString?: string) =>
  dateString ? new Date(dateString).toLocaleString() : "—";

const TimelineComponent: React.FC<Props> = ({
  createdAt,
  approvedAt,
  expectedCompletion,
  actualCompletion,
}) => {
  return (
    <InfoCard
      title="Timeline"
      icon={<CalendarTodayIcon className="text-celestial" fontSize="small" />}
    >
      <Box className="relative pl-2">
        <Box className="absolute top-6 bottom-6 left-5 w-px bg-slate-200" />

        <Box className="flex gap-4 mb-4 relative z-10">
          <Box className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
            <Box className="w-3 h-3 rounded-full bg-indigo-500" />
          </Box>
          <Box>
            <Typography className="font-medium">Created</Typography>
            <Typography className="text-slate-500 text-sm">
              {formatDate(createdAt)}
            </Typography>
          </Box>
        </Box>

        {approvedAt && (
          <Box className="flex gap-4 mb-4 relative z-10">
            <Box className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
              <Box className="w-3 h-3 rounded-full bg-indigo-500" />
            </Box>
            <Box>
              <Typography className="font-medium">Approved</Typography>
              <Typography className="text-slate-500 text-sm">
                {formatDate(approvedAt)}
              </Typography>
            </Box>
          </Box>
        )}

        <Box className="flex gap-4 mb-4 relative z-10">
          <Box className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
            <Box className="w-3 h-3 rounded-full bg-indigo-500" />
          </Box>
          <Box>
            <Typography className="font-medium">Expected Completion</Typography>
            <Typography className="text-slate-500 text-sm">
              {formatDate(expectedCompletion)}
            </Typography>
          </Box>
        </Box>

        {actualCompletion && (
          <Box className="flex gap-4 relative z-10">
            <Box className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
              <Box className="w-3 h-3 rounded-full bg-green-500" />
            </Box>
            <Box>
              <Typography className="font-medium">Completed</Typography>
              <Typography className="text-slate-500 text-sm">
                {formatDate(actualCompletion)}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </InfoCard>
  );
};

export default TimelineComponent;
