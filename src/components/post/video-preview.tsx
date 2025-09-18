import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

interface IVideoPreviewProps {
  videosPreview: string[];
  onRemove?: (index: number) => void;
}

export default function VideoPreview({
  videosPreview,
  onRemove,
}: IVideoPreviewProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr", // mobile
          sm: videosPreview.length === 1 ? "1fr" : "1fr 1fr", // tablet
          md:
            videosPreview.length === 1
              ? "1fr"
              : videosPreview.length === 2
              ? "1fr 1fr"
              : "1fr 1fr 1fr", // desktop
        },
        gap: 2,
        mb: 2,
      }}
    >
      {videosPreview.map((item, index) => (
        <Box
          key={index}
          sx={{
            position: "relative",
            borderRadius: 2,
            overflow: "hidden",
            bgcolor: "#000",
            height: { xs: 250, sm: 300, md: videosPreview.length === 1 ? 400 : 300 },
          }}
        >
          <video
            src={item}
            controls
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
              backgroundColor: "#000",
            }}
          />
          {onRemove && (
            <IconButton
              onClick={() => onRemove(index)}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: "rgba(0,0,0,0.5)",
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.7)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      ))}
    </Box>
  );
}
