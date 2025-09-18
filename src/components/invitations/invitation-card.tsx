import { Person } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { Iuser } from "../../../global";
import useSendFriendRequest from "@/libs/tanstack/friend/useSendFriendRequest";
import useCancelFriendRequest from "@/libs/tanstack/friend/useCancelFriendRequest";
import { IFriendRequest } from "@/libs/types/friend.types";
import useAcceptFriendRequest from "@/libs/tanstack/friend/useAcceptFriendRequest";
import useRejectFriendRequest from "@/libs/tanstack/friend/useRejectFriendRequest";

interface IInvitationCardProps {
  request: IFriendRequest;
}

export default function InvitationCard({ request }: IInvitationCardProps) {
  const { _id, senderName, senderEmail, senderAvatarUrl, senderCoverPhoto } =
    request;

    const acceptFriendRequest = useAcceptFriendRequest();
    const rejectFriendRequest = useRejectFriendRequest();

    const handleAccept = () => {
      acceptFriendRequest.mutate(request._id)
    };

    const handleReject = () => {
      rejectFriendRequest.mutate(request._id)
    }

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Card
        key={_id}
        sx={{
          flexBasis: "30%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 6,
          },
        }}
      >
        {/* Cover photo */}
        <CardMedia
          component="div"
          sx={{
            height: 100,
            backgroundColor: "#e0e0e0",
            position: "relative",
          }}
          image={senderCoverPhoto || ""}
        />

        {/* Avatar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: -5,
          }}
        >
          <Avatar
            src={senderAvatarUrl || undefined}
            sx={{
              width: 80,
              height: 80,
              border: "4px solid #fff",
              backgroundColor: "#1976d2",
            }}
          >
            {!senderAvatarUrl && <Person sx={{ fontSize: 40 }} />}
          </Avatar>
        </Box>

        <CardContent
          sx={{
            flexGrow: 1,
            textAlign: "center",
            pt: 2,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box sx={{ mb: "auto" }}>
            <Typography gutterBottom variant="h5" component="div">
              {senderName}
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={1}>
              {senderEmail}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}></Box>
          <Button fullWidth variant="contained" color="success" onClick={handleAccept}>
            Acccept
          </Button>
          <Button fullWidth variant="outlined" color="warning" onClick={handleReject}>
            Reject
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}
