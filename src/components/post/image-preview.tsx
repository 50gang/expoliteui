import { Box, IconButton, ImageList, ImageListItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

interface IImagePreviewProps {
  imagesPreview: string[];
  onRemove?: (index: number) => void;
}

export default function ImagePreview({
  imagesPreview,
  onRemove,
}: IImagePreviewProps) {
  return (
    <ImageList
    sx={{mb: 0}}
      cols={imagesPreview.length === 1 ? 1 : imagesPreview.length === 2 ? 2 : 3}
    >
      {imagesPreview.map((item, index) => (
        <ImageListItem key={index}>
          <Box
            sx={{
              position: "relative",
              height: imagesPreview.length === 1 ? 400 : 300,
              width: "100%",
            }}
          >
            <Image
              alt={`Preview Image ${index + 1}`}
              src={item}
              loading="lazy"
              fill
              style={{
                borderRadius: 8,
                objectFit: "cover",
              }}
            />
            {onRemove && (
              <IconButton
                onClick={() => onRemove(index)}
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  background: "rgba(0,0,0, 0.3)",
                  color: "white",
                  "&:hover": {
                    background: "rgba(0,0,0, 0.5)",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Box>
        </ImageListItem>
      ))}
    </ImageList>
  );
}
