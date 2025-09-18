"use client";

import useCreateOrGetConversation from "@/libs/tanstack/conversation/useCreateOrGetConversation";
import useGetMyFriends from "@/libs/tanstack/friend/useGetMyFriends";
import { IFriendRequest } from "@/libs/types/friend.types";
import {
  Bookmark,
  Chat,
  Event,
  FavoriteBorder,
  Group,
  Home,
  MoreVert,
  OndemandVideo,
  Person,
  Storefront,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RightSidebar() {
  const { data: friends } = useGetMyFriends();
  const createOrGetConversation = useCreateOrGetConversation();
  const router = useRouter();
  
  const handleChat = async (friend: IFriendRequest) => {
    const data = await createOrGetConversation.mutateAsync(friend._id);
    router.push(`/conversations/${data.data._id}?name=${friend.senderName}`);
  };

  return (
    <Box
      sx={{
        width: 240,
        flexShrink: 0,
        display: { xs: "none", lg: "block" },
        mt: 8,
        p: 2,
        position: "sticky",
        maxHeight: "100vh",
        top: 64,
        overflowY: "auto",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Contacts
      </Typography>
      <List>
        {friends.slice(0, 6).map((friend) => (
          <ListItem key={friend._id} disablePadding>
              <ListItemButton onClick={() => handleChat(friend)}>
                <ListItemAvatar>
                  <Box sx={{ position: "relative", display: "inline-block" }}>
                    <Avatar
                      alt={friend.senderName}
                      src={friend.senderAvatarUrl}
                    />
                    {friend.isOnline && (
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 2,
                          right: 2,
                          width: 10,
                          height: 10,
                          bgcolor: "#44b700",
                          borderRadius: "50%",
                          border: "2px solid white",
                        }}
                      />
                    )}
                  </Box>
                </ListItemAvatar>
                <ListItemText primary={friend.senderEmail} />
              </ListItemButton>
            </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" sx={{ mb: 2 }}>
        Upcoming Events
      </Typography>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold">
            Web Dev Meetup
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tomorrow at 6:00 PM
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            15 people going
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold">
            Birthday Party
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Saturday at 8:00 PM
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            8 people going
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
