"use client";

import { List } from "@mui/material";
import CommentItem from "./comment-item";
import { IComment } from "@/libs/types/comments.types";
import useGetAllComment from "@/libs/tanstack/comment/useGetAllComment";
import { useAppSelector } from "@/libs/redux/hook";
import { useState } from "react";

export default function CommentList() {
  const post = useAppSelector((state) => state.post.data);

  const { data: comments } = useGetAllComment({ postId: post._id });
  const [selectedComment, setSelectedComment] = useState("");

  return (
    <List sx={{ p: 0 }}>
      {comments.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          selectedComment={selectedComment}
          setSelectedComment={setSelectedComment}
        />
      ))}
    </List>
  );
}
