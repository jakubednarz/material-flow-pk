import Section from "../../components/Section";
import { Typography, Box, Card, CardContent } from "@mui/material";
import { Pie, PieChart, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useUsers } from "../../hooks/useUsers";
import CustomPieTooltip from "../../components/charts/CustomPieTooltip";
import renderCustomLabel from "../../components/charts/renderCustomLabel";

const COLORS = ["#4CB9E7", "#96EFFF", "#365486", "#0F1035"];

const WorkforceDistributionSection = () => {
  const { users = [] } = useUsers();

  const roleCounts = users.reduce((acc: Record<string, number>, user) => {
    const role = user.role || "Unknown";
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(roleCounts).map(([role, count]) => ({
    name: role,
    value: count,
    percentage: ((count / users.length) * 100).toFixed(1),
  }));

  return (
    <Section title="Workforce Distribution">
      <Card sx={{ boxShadow: "none", border: "none" }}>
        <CardContent>
          <Box
            display="flex"
            justifyContent="center"
            sx={{ height: 400, width: "100%" }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={180}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="white"
                  strokeWidth={3}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      style={{
                        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </Box>

          <Box mt={3}>
            <Box
              display="grid"
              gridTemplateColumns="repeat(auto-fit, minmax(160px, 1fr))"
              gap={1.5}
            >
              {data.map((item, index) => (
                <Box
                  key={item.name}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: "grey.50",
                    border: "1px solid",
                    borderColor: "grey.200",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      bgcolor: COLORS[index % COLORS.length],
                    }}
                  />
                  <Box flex={1}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.value} members ({item.percentage}%)
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Section>
  );
};

export default WorkforceDistributionSection;
