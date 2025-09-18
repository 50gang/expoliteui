"use client";

import { Box, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRef, useState } from "react";
import VideoPreview from "./video-preview";
import { OndemandVideo } from "@mui/icons-material";

interface VideoUploadFormProps {
  onUpload: (files: File[]) => void;
}

export default function VideoUploadForm({ onUpload }: VideoUploadFormProps) {
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setVideoPreviews((prev) => [...prev, ...newPreviews]);
      setVideoFiles((prev) => [...prev, ...files]);
      onUpload([...videoFiles, ...files]);
    }
  };

  const handleRemove = (index: number) => {
    URL.revokeObjectURL(videoPreviews[index]);
    setVideoPreviews((prev) => prev.filter((_, i) => i !== index));
    setVideoFiles((prev) => prev.filter((_, i) => i !== index));
    if (inputRef.current) inputRef.current.value = "";
    onUpload(videoFiles.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ mt: 2 }}>
      <input
        type="file"
        accept="video/*"
        ref={inputRef}
        style={{ display: "none" }}
        multiple
        onChange={handleFileChange}
      />

      <Button
        variant="outlined"
        onClick={() => inputRef.current?.click()}
        fullWidth
        sx={{ mb: 2 }}
      >
        Upload Video{videoPreviews.length > 1 ? "s" : ""}
      </Button>
        {/* { text: "Watch", icon: <OndemandVideo />, path: "/watch" } */}
      

      {videoPreviews.length > 0 && (
        <VideoPreview
          videosPreview={videoPreviews}
          onRemove={(index) => {
            URL.revokeObjectURL(videoPreviews[index]);
            setVideoPreviews((prev) => prev.filter((_, i) => i !== index));
            setVideoFiles((prev) => prev.filter((_, i) => i !== index));
          }}
        />
      )}
    </Box>
  );
}
