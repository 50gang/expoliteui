import { IPost } from "@/libs/types/post.types";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import ReactionModal from "./reaction-modal";

interface IReactionViewerProps {
  post: IPost;
  reactionObj: Record<string, string>;
}

export default function ReactionViewer({
  post,
  reactionObj,
}: IReactionViewerProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const totalReactions = Object.values(post.reactionCount ?? {}).reduce(
    (prev, curr) => prev + curr,
    0
  );

  return (
    <>
      {totalReactions > 0 ? (
        <Box
          onClick={handleClickOpen}
          sx={{
            display: "flex",
            mb: 1,
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          {Object.entries(post.reactionCount ?? {}).map(([type, count]) => {
            return (
              count > 0 && (
                <Typography key={type}>{reactionObj[type]}</Typography>
              )
            );
          })}
          <Typography>{totalReactions}</Typography>
        </Box>
      ) : (
        <Box sx={{ height: "10px" }}></Box>
      )}

      {open && (
        <ReactionModal post={post} open={open} handleClose={handleClose} />
      )}
    </>
  );
}
