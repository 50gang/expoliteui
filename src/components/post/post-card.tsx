import { Chat, FavoriteBorder, MoreVert } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import ImagePreview from "./image-preview";
import { IPost } from "@/libs/types/post.types";
import React, { MouseEvent, use, useEffect, useState } from "react";
import ReactionPopper from "./reaction-popper";
import { IReactionTypes, IReactionUI } from "@/libs/types/reaction.types";
import useAddReaction from "@/libs/tanstack/reaction/useAddReaction";
import useDeleteReaction from "@/libs/tanstack/reaction/useDeleteReaction";
import ReactionViewer from "../reaction/reaction-viewer";
import { reactionObj, reactions } from "@/libs/constants/reaction.constant";
import PostCommentAction from "./post.comment.action";
import { useAppDispatch } from "@/libs/redux/hook";
import { set } from "react-hook-form";
import { setPost } from "@/libs/redux/post/postSlice";
import { formatTime } from "@/libs/utils/day";
import VideoPreview from "./video-preview";

interface IPostCardProps {
  post: IPost;
  onUpdate: (post: IPost) => void;
  onDelete: (post: IPost) => void;
}

export default function PostCard({ post, onUpdate, onDelete }: IPostCardProps) {
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // reaction popper
  const [anchorReactionEl, setAnchorReactionEl] = useState<null | HTMLElement>(
    null
  );

  const handleReactionHover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorReactionEl(anchorReactionEl ? null : event.currentTarget);
  };

  const handleReactionLeave = () => {
    setAnchorReactionEl(null);
  };

  const addReactionMutation = useAddReaction({ handleReactionLeave });
  const deleteReactionMutation = useDeleteReaction({ handleReactionLeave });

  const openReaction = Boolean(anchorReactionEl);
  const id = openReaction ? "reaction-popper" : undefined;

  const handleSelectReaction = (reaction: IReactionTypes) => {
    addReactionMutation.mutate({ postId: post._id, type: reaction });
  };

  const handleLikeClick = () => {
    if (post.myReaction) {
      deleteReactionMutation.mutate({ postId: post._id });
    } else {
      handleSelectReaction("like");
    }
  };

  useEffect(() => {
    dispatch(setPost(post));
  }, [post, dispatch]);

  return (
    <>
      <Card key={post._id} sx={{ mb: 3 }}>
        <CardHeader
          avatar={<Avatar src={post.avatar} />}
          action={
            <IconButton
              aria-label="settings"
              id="dropdown-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreVert />
            </IconButton>
          }
          title={post.authorName}
          subheader={formatTime(post.createdAt)}
        />
        <CardContent sx={{ backgroundColor: post.backgroundColor }}>
          <Typography variant="body1">{post.content}</Typography>
        </CardContent>

        {post.mediaFiles.some((m) => m.resource_type === "image") && (
          <ImagePreview
            imagesPreview={post.mediaFiles
              .filter((m) => m.resource_type === "image")
              .map((m) => m.url)}
          />
        )}

        {post.mediaFiles.some((m) => m.resource_type === "video") && (
          <VideoPreview
            videosPreview={post.mediaFiles
              .filter((m) => m.resource_type === "video")
              .map((m) => m.url)}
          />
        )}

        <CardActions
          disableSpacing
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid #eee",
            alignItems: "center",
          }}
        >
          <ReactionViewer post={post} reactionObj={reactionObj} />
          <Box
            sx={{ position: "relative" }}
            onMouseEnter={handleReactionHover}
            onMouseLeave={handleReactionLeave}
          >
            <Button
              aria-describedby={id}
              className="reaction-button"
              onClick={handleLikeClick}
              // startIcon={ post.myReaction ? null : <FavoriteBorder />}
            >
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                {post.myReaction ? (
                  <Typography>{reactionObj[post.myReaction]}</Typography>
                ) : (
                  <FavoriteBorder />
                )}
                {/* 1 Like */}
              </Box>
            </Button>
            <ReactionPopper
              id={id}
              open={openReaction}
              anchorEl={anchorReactionEl}
              reactions={reactions}
              onSelect={handleSelectReaction}
            />
          </Box>
          <PostCommentAction post={post} />
        </CardActions>
      </Card>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "dropdown-button",
          },
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() => {
            onUpdate(post);
            handleClose();
          }}
        >
          Update Post
        </MenuItem>
        <MenuItem
          onClick={() => {
            onUpdate(post);
            onDelete(post);
            handleClose();
          }}
        >
          Delete Post
        </MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
      </Menu>
    </>
  );
}
