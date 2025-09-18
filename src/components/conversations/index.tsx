"use client";

import { useAppSelector } from "@/libs/redux/hook";
import useGetMyConversation from "@/libs/tanstack/conversation/useGetMyConversations";
import { IConversation } from "@/libs/types/conversation.types";
import { formatTime } from "@/libs/utils/day";
import { DeleteOutline } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import Link from "next/link";
import ConversationItem from "./item";

export default function Conversations() {
  const user = useAppSelector((state) => state.user.data);
  const { data: conversations } = useGetMyConversation();

  const filteredConversations = conversations
    .map((conversations) => {
      return {
        ...conversations,
        participants: conversations.participants.filter(
          (p) => p._id !== user._id
        ),
      };
    })
    .filter((conversation) => conversation.lastMessage) as IConversation[];

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 3 }}
      >
        Conversations
      </Typography>

      <Paper elevation={2}>
        <List
          sx={{ width: "100%", bgcolor: "background.paper", borderRadius: 1 }}
        >
          {filteredConversations.map((conversation) => (
            <ConversationItem
              key={conversation._id}
              conversation={conversation}
            />
          ))}
        </List>
      </Paper>
    </Box>
  );
}
