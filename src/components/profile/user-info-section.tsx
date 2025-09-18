import { useAppDispatch, useAppSelector } from "@/libs/redux/hook";
import { updateUser } from "@/libs/redux/users/userSlice";
import useUpdateUser from "@/libs/tanstack/user/useUpdateUser";
import { Edit, Save } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function UserInfoSection() {
  const user = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();

  const updateUserMutation = useUpdateUser();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const res = await updateUserMutation.mutateAsync({
      id: user._id,
      data: { name, bio },
    });
    dispatch(
      updateUser({
        bio: res.data.bio,
        name: res.data.name,
      })
    );

    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing) 
      setName(user.name);
      setBio(user.bio || "");
  }, [ user]);

  return (
    <>
      <Box sx={{ width: "100%", textAlign: "center", mb: 3 }}>
        <Box sx={{ mb: 2 }}>
          {isEditing ? (
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <Typography variant="h4" fontWeight="bold">
              {name}
            </Typography>
          )}
        </Box>

        <Box>
          {isEditing ? (
            <TextField
              label="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          ) : (
            <Typography variant="body1" sx={{ mt: 1, color: "text.secondary" }}>
              {bio}
            </Typography>
          )}
        </Box>
      </Box>

      {isEditing ? (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<Save />}
            sx={{ mb: 3 }}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            startIcon={<Save />}
            sx={{ mb: 3 }}
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        </Box>
      ) : (
        <Button
          variant="outlined"
          startIcon={<Edit />}
          sx={{ mb: 3 }}
          onClick={handleEdit}
        >
          Edit Profile
        </Button>
      )}
    </>
  );
}
