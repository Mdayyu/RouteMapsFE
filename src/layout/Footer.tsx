import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#f2f2f2",
        textAlign: "center",
        py: 1.5,
        borderTop: "1px solid #ddd"
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © 2026 –<strong>Made Ayu</strong>
      </Typography>
    </Box>
  );
}
