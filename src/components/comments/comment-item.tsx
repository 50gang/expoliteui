"use client";

import { IComment } from "@/libs/types/comments.types";
import { formatTime } from "@/libs/utils/day";
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CommentInput from "./comment-input";
import { set } from "react-hook-form";
import CommentItemField from "./comment-item-field";

interface ICommentItemProps {
  comment: IComment;
  selectedComment: string;
  setSelectedComment: (comment: string) => void;
}

export default function CommentItem({
  comment,
  selectedComment,
  setSelectedComment,
}: ICommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [parentCommentId, setParentCommentId] = useState<string>();
  const [replyToUserId, setReplyToUserId] = useState<string>();

  const handleClickReply = () => {
    setIsReplying(true);
    setSelectedComment(comment._id);
    setParentCommentId(comment._id);
    setReplyToUserId(comment.userCommentId);
  };

  const handleCancelReplyMode = () => {
    setIsReplying(false);
    setParentCommentId(undefined);
    setReplyToUserId(undefined);
  };

  return (
    <Box key={comment._id} sx={{ mb: 2 }}>
      <ListItem alignItems="flex-start" sx={{ px: 0, py: 1 }}>
        <Box sx={{ width: "100%" }}>
          <CommentItemField
            comment={comment}
            handleClickReply={handleClickReply}
          />
          {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <Box sx={{ ml: 4, mt: 1 }}>
                {comment.replies.map((reply) => (
                  <CommentItemField
                    key={reply._id}
                    comment={reply}
                    handleClickReply={handleClickReply}
                  />
                ))}
              </Box>
            )}

            {/* <Box key={reply._id} sx={{ display: "flex", mb: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, mr: 1.5 }}>
                      {reply.userCommentName.charAt(0)}
                    </Avatar>
                    <Box sx={{ width: "100%" }}>
                      <CommentItemField
                        comment={reply}
                        // handleClickReply={handleClickReply}
                      />
                    </Box>
                  </Box> */}

            {selectedComment === comment._id && isReplying && (
              <CommentInput
                onCancel={handleCancelReplyMode}
                isReplyMode={isReplying}
                placeholder={`Reply to ${comment.userCommentName}...`}
                parentCommentId={parentCommentId}
                replyToUserId={replyToUserId}
              />
            )}
        </Box>
      </ListItem>
    </Box>
  );
}
