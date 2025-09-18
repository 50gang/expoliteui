import { Avatar, useTheme } from "@mui/material";

interface ICustomAvatarProps {
  avatarUrl: string;
  width?: number;
  height?: number;
}

export default function CustomAvatar({avatarUrl, width = 160, height = 160}: ICustomAvatarProps) {
  const theme = useTheme();

  return (
    <Avatar
      src={avatarUrl}
      sx={{
        width,
        height,
        border: "4px solid white",
        boxShadow: theme.shadows[3],
      }}
    />
  );
}
