import { IComment } from "@/libs/types/comments.types";
import { formatTime } from "@/libs/utils/day";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { MouseEvent, use, useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { MoreHoriz } from "@mui/icons-material";
import CommentInput from "./comment-input";
import { useAppSelector } from "@/libs/redux/hook";
import useDeletePost from "@/libs/tanstack/post/useDeletePost";
import useDeleteComment from "@/libs/tanstack/comment/useDeleteComment";

interface ICommentItemFieldProps {
  comment: IComment;
  handleClickReply?: () => void;
}

export default function CommentItemField({
  comment,
  handleClickReply,
}: ICommentItemFieldProps) {
  const user = useAppSelector((state) => state.user.data);

  const deleteCommentMutation = useDeleteComment();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [selectedComment, setSelectedComment] = useState<IComment>();

  const handleUpdate = () => {
    setSelectedComment(comment);
    handleClose();
  };

  const handleDelete = () => {
    handleClose();
    deleteCommentMutation.mutate(comment._id)
  }

  const handleCancelUpdate = () => {
    setSelectedComment(undefined);
  };

  return (
    <>
      <Box sx={{ display: "flex", mb: 1 }}>
        <Avatar
          sx={{
            width: handleClickReply ? 36 : 32,
            height: handleClickReply ? 36 : 32,
            mr: 1.5,
          }}
        >
          {comment.userCommentName.charAt(0)}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Paper
            elevation={0}
            sx={{
              p: 1.5,
              borderRadius: 3,
              backgroundColor: "grey.100",
            }}
          >
            <Typography variant="subtitle2">
              {comment.userCommentName}
            </Typography>
            {selectedComment ? (
              <CommentInput
                initialValue={selectedComment}
                placeholder="Edit comment"
                onCancel={handleCancelUpdate}
              />
            ) : (
              <Typography
                variant="body2"
                sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
              >
                {comment.content}
              </Typography>
            )}
          </Paper>

          {/* Comment actions */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 0.5,
              ml: 1,
            }}
          >
            {handleClickReply && (
              <Button
                onClick={handleClickReply}
                size="small"
                sx={{
                  minWidth: "auto",
                  p: 0.5,
                  mr: 1,
                  color: "text.secondary",
                }}
              >
                Reply
              </Button>
            )}
            <Typography variant="caption" color="text.secondary">
              {formatTime(comment.createdAt)}
            </Typography>
            {user._id === comment.userCommentId && (
              <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreHoriz />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem onClick={handleUpdate}>
          <ListItemIcon
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SettingsOutlinedIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>

        <MenuItem onClick={handleDelete}>
          <ListItemIcon
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DeleteOutlinedIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </>
  );
}
