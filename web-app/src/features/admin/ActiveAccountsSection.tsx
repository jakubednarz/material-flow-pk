import Section from "../../components/Section";
import { Typography } from "@mui/material";
import { useUsers } from "../../hooks/useUsers";

const ActiveAccountsSection = () => {
  const { users = [], loading } = useUsers();
  const activeUsers = users.filter((user) => !user.disabled);

  return (
    <Section title="Number of active accounts">
      <Typography variant="h5" className="">
        {loading ? "Loading..." : activeUsers.length}
      </Typography>
    </Section>
  );
};

export default ActiveAccountsSection;
