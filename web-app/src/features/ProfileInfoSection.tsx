import React from "react";
import Section from "../components/Section";
import { CardContent, Typography, Divider, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ProfileItem from "../components/users/ProfileItem";
import { User } from "../types/User";
import EditUserForm from "../components/forms/EditUserForm";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../hooks/useAuth";

const ProfileInfoSection: React.FC = () => {
  const { currentUser } = useAuth();
  const { users = [], updateUser } = useUsers();
  const user = users.find((u) => u.username === currentUser?.username) as User;
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleUserUpdate = async (updatedUser: User) => {
    await updateUser(updatedUser);
    setIsDialogOpen(false);
  };

  return (
    <div className="w-1/2 p-4">
      <Section title="Profile Information">
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <Typography variant="h4" className="font-bold">
              {user.first_name} {user.last_name}
            </Typography>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              sx={{ bgcolor: "#36a0fc" }}
              size="small"
              onClick={() => setIsDialogOpen(true)}
            >
              Edit
            </Button>
          </div>

          <Divider />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ProfileItem label="Username" value={user.username} />
            <ProfileItem label="Email" value={user.email} />
            <ProfileItem label="Phone Number" value={user.phone_number} />
            <ProfileItem label="Address" value={user.address} />
            <ProfileItem label="PESEL" value={user.pesel} />
            <ProfileItem label="Role" value={user.role} />
            <ProfileItem
              label="Status"
              value={user.disabled ? "Disabled" : "Active"}
            />
          </div>
        </CardContent>

        <EditUserForm
          isOpen={isDialogOpen}
          user={user}
          onClose={handleDialogClose}
          onSubmit={handleUserUpdate}
          withDisabledToggle={true}
        />
      </Section>
    </div>
  );
};

export default ProfileInfoSection;
