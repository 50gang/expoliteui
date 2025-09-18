"use client";

import useGetAllUsers from "@/libs/tanstack/user/useGetAllUsers";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import UserCard from "../people/user-card";
import useGetFriendPendingRequest from "@/libs/tanstack/friend/useGetFriendPendingRequest";
import InvitationCard from "./invitation-card";

export default function Invitations() {
  const { data: requests } = useGetFriendPendingRequest();

  return (
    <>
      {/* Title */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Friends
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Accept / Decline Requests
        </Typography>
      </Box>

      {/* User Card */}
      <Grid container spacing={3}>
        {requests.map((requests) => (
          <InvitationCard key={requests._id} request={requests}/>
        ))}
      </Grid>
    </>
  );
}
