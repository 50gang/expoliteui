import { Box, Paper } from "@mui/material";

interface IBgColorSeletor {
    colors: string[];
    selectedColor: string;
    onSelect: (color: string) => void
}
export default function BgColorSelector({colors, selectedColor, onSelect}: IBgColorSeletor) {
  return (
    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
      {colors.map((color) => (
        <Paper
          key={color}
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: selectedColor === color ? '2px, solid, #1976d2': '2px, solid, #ddd',
            cursor: 'pointer',
            background: color,
          }}
          onClick={() => onSelect(color)}
        ></Paper>
      ))}
    </Box>
  );
}
