import { useAppDispatch, useAppSelector } from "@/libs/redux/hook";
import useUploadSingle from "@/libs/tanstack/upload/useUploadSingle";
import useUploadAvatar from "@/libs/tanstack/user/useUploadAvatar";
import { PhotoCamera } from "@mui/icons-material";
import { Avatar, Box, Button, useTheme } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { updateUser } from "@/libs/redux/users/userSlice";
const CustomAvatar = dynamic(() => import('../navbar/custom-avatar'), {
    ssr: false,
})

export default function AvatarSection() {
    const user = useAppSelector(state => state.user.data);
    const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const uploadFile = useUploadSingle();
  const uploadAvatar = useUploadAvatar();
  

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const avatarFile = e.target.files?.[0];
    if (avatarFile) {
      const res = await uploadFile.mutateAsync(avatarFile);
      const avatarRes = await uploadAvatar.mutateAsync(res.data);

      dispatch(updateUser({avatarUrl: avatarRes.data.avatarUrl}))
    }
  };


  return (
    <Box sx={{ position: "relative", mb: 3 }}>
      <input type="file" hidden ref={inputRef} onChange={handleAvatarChange} />
      <CustomAvatar avatarUrl={user.avatarUrl || ''} />
      <Button
        onClick={() => inputRef.current?.click()}
        variant="contained"
        size="small"
        sx={{
          minWidth: "unset",
          width: 36,
          height: 36,
          borderRadius: "50%",
          position: "absolute",
          bottom: 5,
          right: 5,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        }}
      >
        <PhotoCamera fontSize="small" />
      </Button>
    </Box>
  );
}
