import { useAppSelector } from "@/libs/redux/hook";
import useCreateComments from "@/libs/tanstack/comment/useCreateComments";
import useUpdateComment from "@/libs/tanstack/comment/useUpdateComment";
import { IComment } from "@/libs/types/comments.types";
import { Avatar, Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

interface ICommentInputProps {
  initialValue?: IComment;
  placeholder?: string;
  isReplyMode?: boolean;
  onCancel?: () => void;
  parentCommentId?: string;
  replyToUserId?: string;
}

export default function CommentInput({
  initialValue,
  parentCommentId,
  replyToUserId,
  onCancel,
  placeholder,
  isReplyMode = false,
}: ICommentInputProps) {
  const post = useAppSelector((state) => state.post.data);
  const [content, setContent] = useState("");

  const createCommentMutation = useCreateComments({
    reset: () => setContent(""),
  });

  const updataeCommentMutation = useUpdateComment({onCancel});

  const handleComment = () => {
    if(initialValue) {
        updataeCommentMutation.mutate({ id: initialValue._id, content });
    } else {
      createCommentMutation.mutate({
      postId: post._id,
      content,
      parentCommentId,
      replyToUserId,
    });
    }

    onCancel?.();
  };

  useEffect(() => {
    if (initialValue) {
      setContent(initialValue.content);
    }
  }, []);

  return (
    <Box sx={{ display: "flex", ml:isReplyMode ? 4 : 0, mt: 1, mb: 3, gap: 1.5 }}>
      <Avatar sx={{ width: 36, height: 36 }}>U</Avatar>
      <Box sx={{ flexGrow: 1 }}>
        <TextField
          fullWidth
          multiline
          placeholder={placeholder ? placeholder : "Add a comment..."}
          variant="outlined"
          size="small"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />
        <Box
          sx={{ display: "flex", gap: 1, justifyContent: "flex-end", mt: 1 }}
        >
          {onCancel && (
            <Button
              onClick={onCancel}
              variant="contained"
              size="small"
              sx={{
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              Cancel
            </Button>
          )}
          <Button
            onClick={handleComment}
            variant="contained"
            size="small"
            disabled={!content}
            sx={{
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            {isReplyMode ? "Reply" : initialValue ? 'Edit' : "Comment"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
