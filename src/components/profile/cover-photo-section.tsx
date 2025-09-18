import { useAppDispatch, useAppSelector } from "@/libs/redux/hook";
import { updateUser } from "@/libs/redux/users/userSlice";
import useUploadSingle from "@/libs/tanstack/upload/useUploadSingle";
import useUploadCoverPhoto from "@/libs/tanstack/user/useUploadCoverPhoto";
import { PhotoCamera } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { ChangeEvent, useRef } from "react";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";

const CustomCoverPhoto = dynamic(() => import('./custom-cover-photo'), {
    ssr: false,
})

export default function CoverPhotoSection() {
    const user = useAppSelector((state) => state.user.data);
    const dispatch = useAppDispatch();

    const inputRef = useRef<HTMLInputElement | null>(null);
    const uploadSingle = useUploadSingle();
    const uploadCoverPhoto = useUploadCoverPhoto();

    const handleCoverPhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file) {
            const res = await uploadSingle.mutateAsync(file)
            const coverRes = await uploadCoverPhoto.mutateAsync(res.data)
            dispatch(updateUser({coverPhotoUrl: coverRes.data.coverPhotoUrl}))
        }
    }

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 2 }}>
        Cover Photo
      </Typography>
      <CustomCoverPhoto coverPhotoUrl={user.coverPhotoUrl || ''}/>
      <input type="file" hidden ref={inputRef} onChange={handleCoverPhotoChange }/>
      <Button
      onClick={() => inputRef.current?.click()}
        variant="contained"
        startIcon={<PhotoCamera />}
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        }}
      >
        Edit Cover
      </Button>
    </Box>
  );
}
