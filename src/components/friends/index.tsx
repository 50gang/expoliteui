"use client";

import useGetMyFriends from "@/libs/tanstack/friend/useGetMyFriends";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import FriendsCard from "./friends-card";

export default function Friends() {
  const { data: friends } = useGetMyFriends();

  return (
    <>
      {/* Title */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Friends List ({friends.length})
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Accept / Decline Requests
        </Typography>
      </Box>

      {/* User Card */}
      <Grid container spacing={3}>
        {friends.map((friend) => (
          <FriendsCard key={friend._id} friend={friend} />
        ))}
      </Grid>
    </>
  );
}
