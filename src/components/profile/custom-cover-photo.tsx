import { Box } from "@mui/material";

export default function CustomCoverPhoto({coverPhotoUrl} : {coverPhotoUrl: string}) {
  return (
    <Box
      sx={{
        height: 300,
        width: "100%",
        backgroundColor: "#a29f9f",
        backgroundImage: `url(${coverPhotoUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: 2,
        position: "relative",
      }}
    />
  );
}
