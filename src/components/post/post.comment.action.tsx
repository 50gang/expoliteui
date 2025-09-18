import { Chat } from "@mui/icons-material";
import { Button } from "@mui/material";
import CommentModal from "../comments/comment-modal";
import { useState } from "react";
import { IPost } from "@/libs/types/post.types";
import { useAppDispatch } from "@/libs/redux/hook";
import { setPost } from "@/libs/redux/post/postSlice";

interface IPostCommentActionProps {
    post: IPost;
}

export default function PostCommentAction({ post }: IPostCommentActionProps) {
  const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
     
    const handleClickOpen = () => {
        dispatch(setPost(post));
        setOpen(true);  
    };
    
    const handleClose = () => {
        setOpen(false);
    };

  return (
    <>
      <Button startIcon={<Chat />} onClick={handleClickOpen}> Comments</Button>;
      {open && <CommentModal open={open} handleClose={handleClose}/>}
    </>
  );
}
