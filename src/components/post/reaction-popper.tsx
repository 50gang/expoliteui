import { IReactionTypes, IReactionUI } from "@/libs/types/reaction.types";
import { Box, Fade, Paper, Popper } from "@mui/material";

interface IReactionPopperProps {
  id: string | undefined;
  open: boolean;
  anchorEl: HTMLElement | null;
  reactions: IReactionUI[];
  onSelect: (reaction: IReactionTypes) => void;
}

export default function ReactionPopper({
  id,
  open,
  anchorEl,
  reactions,
  onSelect,
}: IReactionPopperProps) {
  return (
    <Popper
      id={id}
      open={open}
      anchorEl={anchorEl}
      placement="top-start"
      transition
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper sx={{ display: "flex" }}>
            {reactions.map((reactions) => (
              <Box
                onClick={() => onSelect(reactions.name)}
                key={reactions.name}
                sx={{
                  fontSize: "1.5rem",
                  p: 1,
                  borderRadius: "50%",
                  cursor: "pointer",
                  border: "none",
                  background: "transparent",
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.3)",
                    backgroundColor: "rgba(0, 0, 0, 0.05",
                  },
                }}
              >
                {reactions.emoji}
              </Box>
            ))}
          </Paper>
        </Fade>
      )}
    </Popper>
  );
}
