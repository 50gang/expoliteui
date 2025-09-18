"use client";

import { useAppSelector } from "@/libs/redux/hook";
import useGetAllMessages from "@/libs/tanstack/message/useGetAllMessages";
import useSendMessage from "@/libs/tanstack/message/useSendMessage";
import { formatTime } from "@/libs/utils/day";
import { ArrowBack, AttachFile, Close, Send } from "@mui/icons-material";
import Image from "next/image";
import {
  AppBar,
  Box,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import MessageCard from "./message-card";
import UseInfinteScroll from "@/libs/hooks/useInfiniteScroll";
import { useSocketContext } from "@/libs/context/socket.context";
import useSeenMessage from "@/libs/tanstack/message/useSeenMessage";

// Mock data for the conversation

export default function ConversationDetail({ id }: { id: string }) {
  
  const socket = useSocketContext();

  //Redux
  const user = useAppSelector((state) => state.user.data);

  // Navigation
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  // React Query
  const { data: messages, hasNextPage, fetchNextPage } = useGetAllMessages(id);
  const lastMessage = messages.length > 0 ? messages[messages.length] : null;
  const seenMessage = useSeenMessage(id);

  // Ref
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  //State
  const [text, setText] = useState("");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const sendMessage = useSendMessage({
    conversationId: id,
    mediaFiles,
    reset: () => {
      setText("");
      setMediaFiles([]);
    },
  });

  const handleSendMessage = () => {
    sendMessage.mutate({ text });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!text) return;

    if (e.key === "Enter" && !e.shiftKey) {
      sendMessage.mutate({ text });
    }
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files?.length === 0) return;
    const attachFiles = Array.from(files);
    setMediaFiles((prev) => [...prev, ...attachFiles]);

    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  const handleRemoveFile = (index: number) => {
    const filteredMediaFiles = mediaFiles.filter((_, i) => i !== index);
    setMediaFiles(filteredMediaFiles);
  };

  useEffect(() => {
    const newImagePreview = mediaFiles.map((file) => URL.createObjectURL(file));
    setImagesPreview(newImagePreview);

    return () => {
      newImagePreview.map((preview) => URL.revokeObjectURL(preview));
    };
  }, [mediaFiles]);

  useEffect(() => {
    socket?.emit("join", id);
  }, [socket, id]);

  useEffect(() => {
    if (!lastMessage) return;

    if (user._id === lastMessage.senderId) return;
    const hasSeen = lastMessage.seenBy.some((u) => u.seenById === user._id);
    if (hasSeen) return;

    seenMessage.mutate(lastMessage._id);
  }, [lastMessage]);

  UseInfinteScroll({ targetRef: lastMessageRef, hasNextPage, fetchNextPage });

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => router.push("/conversations")}
          >
            <ArrowBack />
          </IconButton>

          <Box>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {name}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "#f5f5f5",
          p: 2,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        <Container maxWidth="md" sx={{ flexGrow: 1 }}>
          <div ref={lastMessageRef}></div>
          {messages.map((message) => (
            <MessageCard key={message._id} message={message} />
          ))}
        </Container>
      </Box>

      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderTop: "1px solid",
          borderColor: "divider",
          position: "sticky",
          bottom: 0,
        }}
      >
        {imagesPreview.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Grid container spacing={1}>
              {imagesPreview.map((image, index) => (
                <Grid key={index}>
                  <Box
                    sx={{
                      position: "relative",
                      display: "inline-block",
                      borderRadius: 1,
                      overflow: "hidden",
                      border: "1px solid",
                      borderColor: "divider",
                      width: 80,
                      height: 80,
                    }}
                  >
                    <Image
                      src={image}
                      alt={""}
                      width={80}
                      height={80}
                      style={{ objectFit: "cover" }}
                    />

                    <IconButton
                      onClick={() => handleRemoveFile(index)}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bgcolor: "rgba(0,0,0,0.5)",
                        color: "white",
                        p: 0.5,
                        "&:hover": {
                          bgcolor: "rgba(0,0,0,0.7)",
                        },
                      }}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          fullWidth
          multiline
          minRows={1}
          maxRows={5}
          placeholder="Type a message..."
          variant="outlined"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <input
                    type="file"
                    hidden
                    multiple
                    ref={inputFileRef}
                    onChange={handleFile}
                  />
                  <IconButton
                    onClick={() => inputFileRef.current?.click()}
                    aria-label="Type message..."
                  >
                    <AttachFile color="primary" />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    disabled={!text && !mediaFiles.length}
                    onClick={handleSendMessage}
                    aria-label="Type message..."
                  >
                    <Send />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Paper>
    </Box>
  );
}
