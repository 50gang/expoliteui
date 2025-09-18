import { useAppSelector } from "@/libs/redux/hook";
import { IMessage } from "@/libs/types/message.types";
import { formatTime } from "@/libs/utils/day";
import { Close, DeleteOutline, MoreHoriz } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteConfirmModel from "./delete-confirm-model";
import { memo, useState } from "react";
import Image from "next/image";

interface IMessageCardProps {
  message: IMessage;
}

export default memo(function MessageCard({ message }: IMessageCardProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const user = useAppSelector((state) => state.user.data);

  return (
    <Box
      key={message._id}
      sx={{
        display: "flex",
        justifyContent:
          message.senderId === user._id ? "flex-end" : "flex-start",
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box sx={{ cursor: "pointer" }}>
          <Tooltip title={message.senderName}>
            <Avatar src={message.senderAvatarUrl}></Avatar>
          </Tooltip>
        </Box>
        {message.isDelete && (
          <Box
            sx={{
              maxWidth: "70%",
              p: 2,
              borderRadius: 2,
              bgcolor: "white",
              color: "text.primary",
              boxShadow: 1,
            }}
          >
            <Typography variant="body1">MESSAGE DELETED</Typography>
          </Box>
        )}

        {!message.isDelete && (
          <Box
            sx={{
              maxWidth: "100%",
              p: 2,
              borderRadius: 2,
              bgcolor: message.senderId === user._id ? "primary.main" : "white",
              color: message.senderId === user._id ? "white" : "text.primary",
              boxShadow: 1,
            }}
          >
            {message.mediaFiles && message.mediaFiles.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    justifyContent: "flex-start",
                    maxWidth:
                      message.mediaFiles.length <= 2 ? "3220px" : "100%",
                  }}
                >

                </Box>
                  {message.mediaFiles.map((image) => (
                      <Box
                      key={image}
                        sx={{
                          position: "relative",
                          display: "block",
                          borderRadius: 1,
                          overflow: "hidden",
                          border: "1px solid",
                          borderColor: "divider",
                          width: '200px',
                          height: '200px',
                          flexShrink: 0
                        }}
                      >
                        <Image
                          src={image || 'placeholder.svg'}
                          alt={""}
                          width={200}
                          height={200}
                          style={{ objectFit: "cover", width: '100%', height: '100%', display: 'block' }}
                        />
                      </Box>
                  ))}
              </Box>
            )}

            {message.text && (
              <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                {message.text}
              </Typography>
            )}
            <Typography
              variant="caption"
              sx={{
                display: "block",
                textAlign: "right",
                mt: 0.5,
                opacity: 0.8,
              }}
            >
              {formatTime(message.createdAt)}
            </Typography>
          </Box>
        )}

        <Box>
          <Box>
            {message.senderId === user._id && !message.isDelete && (
              <IconButton onClick={handleClickOpen} >
                <DeleteOutline color="error" />
              </IconButton>
            )}

            {open && (
              <DeleteConfirmModel
                open={open}
                handleClose={handleClose}
                messageId={message._id}
                conversationId={message.conversation}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
});
