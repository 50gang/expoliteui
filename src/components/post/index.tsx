"use client";

import { Chat, FavoriteBorder, MoreVert } from "@mui/icons-material";
import ImageIcon from "@mui/icons-material/Image";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CreatePostModal from "./post-modal";
import ImagePreview from "./image-preview";
import UseGetAllPost from "@/libs/tanstack/post/useGetAllPost";
import useInfinteScroll from "@/libs/hooks/useInfiniteScroll";
import PostCard from "./post-card";
import { IPost } from "@/libs/types/post.types";
import PostModal from "./post-modal";
import DeletePostModal from "./delete-post-modal";

export default function PostPage() {
  const [OpenCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // Open Create Post Modal
  const handleClickOpen = () => {
    setOpenCreateModal(true);
  };

  const handleClose = () => {
    setOpenCreateModal(false);
    setSelectedPost(null);
  };

  const handleClickDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  // Delete Post Modal
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = UseGetAllPost();
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const lastPageRef = useRef<HTMLDivElement | null>(null);

  
  const handleDelete = (post: IPost) => {
    handleClickDeleteModal();
  };

  useInfinteScroll({ targetRef: lastPageRef, hasNextPage, fetchNextPage });

  const handleUpdatePost = (post: IPost) => {
    setSelectedPost(post);
    handleClickOpen();
    setSelectedPost(post);
  };

  return (
    <>
      <Paper sx={{ p: 0, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 3,
            cursor: "pointer",
            "&:hover": {
              background: "#f5f5f5",
              boxShadow: "4px 4px 15px rgb(38, 184, 241)",
              borderRadius: "3",
            },
          }}
          onClick={handleClickOpen}
        >
          <IconButton color="primary" aria-label="Add image or video">
            <ImageIcon />
          </IconButton>
          <Typography>What's New?</Typography>
        </Box>
      </Paper>

      {/* Posts */}
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          onUpdate={handleUpdatePost}
          onDelete={handleDelete}
        />
      ))}

      <div ref={lastPageRef}></div>
      {isFetchingNextPage && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}

      <PostModal
        initialValue={selectedPost}
        open={OpenCreateModal}
        handleClose={handleClose}
      />
      <DeletePostModal
        initialValue={selectedPost}
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
      />
    </>
  );
}
