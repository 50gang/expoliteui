import { useAppSelector } from "@/libs/redux/hook";
import { IConversation } from "@/libs/types/conversation.types";
import { formatTime } from "@/libs/utils/day";
import { DeleteOutline } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import DeleteConfirmModel from "./delete-confirm-model";

interface IConversationItemProps {
  conversation: IConversation;
}

export default function ConversationItem({
  conversation,
}: IConversationItemProps) {
  const user = useAppSelector((state) => state.user.data);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Link
        href={`/conversations/${conversation._id}?name=${conversation.participants[0].name}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ListItem
          disablePadding
          divider
          secondaryAction={
            <Typography variant="caption" color="text.secondary">
              {formatTime(conversation.lastMessageAt)}
            </Typography>
          }
        >
          <ListItemButton>
            <ListItemAvatar>
              <Avatar
                src={conversation.participants[0].avatarUrl}
                alt={conversation.participants[0].name}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box
                  component="span"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: conversation.isLastMessageSeen
                      ? "normal"
                      : "bold",
                  }}
                >
                  {conversation.participants[0].name}
                  <Typography
                    color="primary"
                    sx={{
                      ml: 1,
                      fontSize: 10,
                      display: conversation.isLastMessageSeen
                        ? "none"
                        : "inline-block",
                    }}
                  >
                    &#9679;
                  </Typography>
                </Box>
              }
              secondary={
                <Typography
                  sx={{
                    fontWeight: conversation.isLastMessageSeen
                      ? "normal"
                      : "bold",
                  }}
                >
                  {conversation.senderLastMessageId === user._id
                    ? "You"
                    : conversation.senderLastMessage}
                  : {conversation.lastMessage}
                </Typography>
              }
              slotProps={{
                primary: {
                  fontWeight: "regular",
                },
                secondary: {
                  noWrap: true,
                  fontWeight: "regular",
                  color: "text.secondary",
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </Link>
      <IconButton>
        <DeleteOutline color="error" />
      </IconButton>

      {open && (
        <DeleteConfirmModel
          open={open}
          handleClose={handleClose}
          conversationId={conversation._id}
        />
      )}
    </Box>
  );
}
