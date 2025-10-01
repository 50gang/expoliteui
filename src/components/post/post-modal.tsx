"use client";

import CloseIcon from "@mui/icons-material/Close";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import ImageIcon from "@mui/icons-material/Image";
import {
  Box,
  Button,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import BgColoSelector from "./bg-color-selector";
import ImagePreview from "./image-preview";
import { useMutation } from "@tanstack/react-query";
import postApi from "@/libs/apis/post.api";
import { toast } from "react-toastify";
import { fileApi } from "@/libs/apis/file.api";
import UseCreatePost from "@/libs/tanstack/post/useCreatePost";
import { IPost } from "@/libs/types/post.types";
import UseUpdatePost from "@/libs/tanstack/post/useUpdatePost";
import { IMediaFiles } from "../../../global";
import VideoPreview from "./video-preview";
import VideoUploadForm from "./videoUploadForm";

interface ICreatePostModalProps {
  initialValue: IPost | null;
  open: boolean;
  handleClose: () => void;
}

const backgroundColors = [
  "#ffffff", // white (default)

  "#f1f8e9", // soft lime
  "#edeef0", // off-white gray
  "#f9fbe7", // light lime
  "#f0f4c3", // pale olive
  "#ffe082", // soft amber
  "#ffcc80", // warm orange
  "#ffab91", // salmon
  "#bcaaa4", // taupe
  "#e6ee9c", // yellow green
  "#dcedc8", // light moss green

  // === Black / Dark shades ===
  "#000000", // black
  "#212121", // near black
  "#424242", // dark gray
  "#616161", // medium gray
  "#757575", // soft gray
  "#9e9e9e", // neutral mid-gray

    // Extra soft pastels
    "#e1f5fe", // very light cyan
    "#ede7f6", // lavender
    "#fce4ec", // light pink
    "#e0f2f1", // mint green
    "#fff9c4", // pale yellow
    "#ffe0b2", // peach
    "#c8e6c9", // pale green
    "#d1c4e9", // lilac
    "#b3e5fc", // sky blue
    "#ffccbc", // coral
    "#cfd8dc", // cool gray
    "#f5f5f5", // neutral gray

    // === Secondary Colors ===
    "#03a9f4", // cyan
    "#8bc34a", // light green
    "#ff9800", // orange
    "#9c27b0", // purple
    "#00bcd4", // teal
    "#cddc39", // lime
    "#e91e63", // pink
    "#009688", // deep teal
    "#ffc107", // amber
    "#673ab7", // deep purple

    // === Tertiary Colors (mixes) ===
    "#ff5722", // red-orange
    "#4caf50", // fresh green
    "#2196f3", // blue
    "#795548", // brown
    "#607d8b", // blue-gray
    "#ffb300", // vivid amber
    "#ad1457", // dark pink
    "#1e88e5", // vivid blue
    "#43a047", // deep green
    "#6d4c41", // rich brown

    // Slightly richer tones for variety
    "#81d4fa", // medium sky blue
    "#4fc3f7", // brighter cyan
    "#aed581", // fresh green
    "#ba68c8", // medium purple
    "#ff8a65", // deep coral
    "#ffd54f", // bright yellow
    "#a1887f", // mocha
    "#90caf9", // soft blue
    "#ce93d8", // orchid
    "#f48fb1", // rose pink

    // More muted natural tones
    "#f0f2f5", // light gray
    "#e7f3ff", // light blue
    "#fff4e5", // light orange
    "#e8f4d9", // light green
    "#ffebee", // light red
    "#f3e5f5", // light purple
    "#fff8e1", // light yellow
];

function getRandomBgColors(count: number) {
  return backgroundColors
    .sort(() => 0.5 - Math.random()) // shuffle
    .slice(0, count);                // take "count" colors
}


export default function PostModal({
  initialValue,
  open,
  handleClose,
}: ICreatePostModalProps) {
  const [selectedBgColor, setSelectedBgColor] = useState(backgroundColors[0]);
  const [showBgColorSelector, setshowBgColorSelector] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);

const randomBgColors = getRandomBgColors(15); // e.g. 10 random colors

  const [mediaFiles, setMediaFiles] = useState<IMediaFiles[]>([]);

  const createPostMutation = UseCreatePost({ files: [...imageFiles, ...videoFiles], handleClose });
  const updatePostMutation = UseUpdatePost({
    id: initialValue?._id ?? "",
    mediaFiles,
    handleClose,
    files: imageFiles,
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      // Separate images and videos
      const imageFilesArray = filesArray.filter((file) =>
        file.type.startsWith("image/")
      );
      const videoFilesArray = filesArray.filter((file) =>
        file.type.startsWith("video/")
      );

      setImageFiles((prev) => [...prev, ...imageFilesArray]);
      setVideoFiles((prev) => [...prev, ...videoFilesArray]);

      const newImagesPreview = imageFilesArray.map((file) =>
        URL.createObjectURL(file)
      );
      setImagesPreview((prev) => [...prev, ...newImagesPreview]);

      const newVideoPreview = videoFilesArray.map((file) =>
        URL.createObjectURL(file)
      );
      setVideoPreviews((prev) => [...prev, ...newVideoPreview]);
    }
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagesPreview[index]);
    setImagesPreview((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index: number) => {
    URL.revokeObjectURL(videoPreviews[index]);
    setVideoPreviews((prev) => prev.filter((_, i) => i !== index));
    setVideoFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  // //   if (e.target.files) {
  // //     const filesArray = Array.from(e.target.files);
  // //     setImageFiles([...imageFiles, ...filesArray]);
  // //     // setVideoFiles([...videoFiles, ...filesArray])

  // //     const newImagesPreview = filesArray.map((file) =>
  // //       URL.createObjectURL(file)
  // //     );

  // //     setImagesPreview([...imagesPreview, ...newImagesPreview]);

  // //     // const newVideoPreview = filesArray.map((file) =>
  // //     //   URL.createObjectURL(file)
  // //     // );
  // //     // setVideoPreviews([...videoPreviews, ...newVideoPreview])
  // //   }

  // //   // blob
  // // };

  // const removeImage = (index: number) => {
  //   const newImagesPreview = [...imagesPreview];
  //   URL.revokeObjectURL(newImagesPreview[index]);
  //   newImagesPreview.splice(index, 1);
  //   setImagesPreview(newImagesPreview);

  //   const oldImagesCount = mediaFiles.length;

  //   if (index >= oldImagesCount) {
  //     const newImageFiles = [...imageFiles];

  //     const imageRemoveIndex = index - oldImagesCount;
  //     newImageFiles.splice(imageRemoveIndex, 1);
  //     setImageFiles(newImageFiles);
  //   } else {
  //     const newImageFiles = [...imageFiles];

  //     newImageFiles.splice(index, 1);
  //     setImageFiles(newImageFiles);
  //   }

  //   if (initialValue) {
  //     const newMediaFiles = [...mediaFiles];
  //     newMediaFiles.splice(index, 1);
  //     setMediaFiles(newMediaFiles);
  //   }
  // };

  // const removeVideo = (index: number) => {
  //   const newVideoPreview = [...imagesPreview];
  //   URL.revokeObjectURL(newVideoPreview[index]);
  //   newVideoPreview.splice(index, 1);
  //   setVideoPreviews(newVideoPreview);

  //   const oldVideoCount = mediaFiles.length;

  //   if (index >= oldVideoCount) {
  //     const newVideoFiles = [...videoFiles];

  //     const videoRemoveIndex = index - oldVideoCount;
  //     newVideoFiles.splice(videoRemoveIndex, 1);
  //     setImageFiles(newVideoFiles);
  //   } else {
  //     const newVideoFiles = [...videoFiles];

  //     newVideoFiles.splice(index, 1);
  //     setImageFiles(newVideoFiles);
  //   }

  //   if (initialValue) {
  //     const newMediaFiles = [...mediaFiles];
  //     newMediaFiles.splice(index, 1);
  //     setMediaFiles(newMediaFiles);
  //   }
  // };

  const handleSubmit = () => {
    const DATA_SUBMIT = {
      content,
      backgroundColor: selectedBgColor,
    };

    createPostMutation.mutate(DATA_SUBMIT);
  };

  // useEffect(() => {
  //   if (initialValue) {
  //     setSelectedBgColor(initialValue.backgroundColor);
  //     setImagesPreview(initialValue.mediaFiles.map((file) => file.url));
  //     setVideoPreviews(initialValue.mediaFiles.map((file) => file.url));
  //     setContent(initialValue.content);
  //     setMediaFiles(initialValue.mediaFiles);
  //   } else {
  //     setSelectedBgColor(backgroundColors[0]);
  //     setImagesPreview([]);
  //     setVideoPreviews([]);
  //     setContent("");
  //     setMediaFiles([]);
  //     setImageFiles([]);
  //     setVideoFiles([]);
  //   }
  // }, [initialValue]);

  useEffect(() => {
    if (initialValue) {
      setSelectedBgColor(initialValue.backgroundColor);

      // separate images and videos
      const imageUrls = initialValue.mediaFiles
        .filter((file) => file.resource_type === "image")
        .map((file) => file.url);

      const videoUrls = initialValue.mediaFiles
        .filter((file) => file.resource_type === "video")
        .map((file) => file.url);

      setImagesPreview(imageUrls);
      setVideoPreviews(videoUrls);
      setContent(initialValue.content);
      setMediaFiles(initialValue.mediaFiles);
    } else {
      setSelectedBgColor(backgroundColors[0]);
      setImagesPreview([]);
      setVideoPreviews([]);
      setContent("");
      setMediaFiles([]);
      setImageFiles([]);
      setVideoFiles([]);
    }
  }, [initialValue]);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{ m: 0, p: 2, textAlign: "center", fontWeight: "bold" }}>
        {initialValue ? "Update Post" : "Create Post"}
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
            bgcolor: (theme) => theme.palette.grey[200],
            "&:hover": {
              bgcolor: (theme) => theme.palette.grey[300],
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />

      <DialogContent sx={{ p: 2 }}>
        <Box
          sx={{
            minHeight: "150px",
            backgroundColor: selectedBgColor,
            borderRadius: 1,
            p: 2,
            mb: 2,
          }}
        >
          <TextField
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            multiline
            placeholder="What's on your mind?"
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: {
                fontSize: "1.2rem",
                backgroundColor: "transparent",
              },
            }}
            sx={{ mb: 2 }}
          />
        </Box>

        {imagesPreview.length > 0 && (
          <ImagePreview imagesPreview={imagesPreview} onRemove={removeImage} />
        )}

        {videoPreviews.length > 0 && (
          <VideoPreview videosPreview={videoPreviews} onRemove={removeVideo} />
        )}

        {/* <VideoUploadForm
          onUpload={(files: File[]) => {
            const videoFilesArray = files.filter((file) =>
              file.type.startsWith("video/")
            );
            setVideoFiles(videoFilesArray);
            setVideoPreviews(
              videoFilesArray.map((file) => URL.createObjectURL(file))
            );
          }}
        /> */}

        {showBgColorSelector && (
          <BgColoSelector
            colors={randomBgColors}
            selectedColor={selectedBgColor}
            onSelect={setSelectedBgColor}
          />
        )}

        <Box
          sx={{
            border: "1px solid #ddd",
            borderRadius: 2,
            p: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography>Add to your post</Typography>
          <Box>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              style={{ display: "none" }}
              ref={inputRef}
              onChange={handleFileChange}
            />
            <IconButton
              color="primary"
              aria-label="Add image or video"
              onClick={() => inputRef.current?.click()}
            >
              <ImageIcon />
            </IconButton>
            <IconButton
              color="secondary"
              aria-label="Change background color"
              onClick={() => setshowBgColorSelector(!showBgColorSelector)}
            >
              <FormatColorFillIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, justifyContent: "center" }}>
        <Button
          fullWidth
          variant="contained"
          disabled={!content || createPostMutation.isPending}
          loading={createPostMutation.isPending || updatePostMutation.isPending}
          onClick={handleSubmit}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          {initialValue ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
