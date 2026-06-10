"use client";
import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

export const Loader = () => {
  return (
    <Box
      style=    {{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        padding: 20,
    }}
    >
      <CircularProgress />
      <Typography>Loading Pokémon...</Typography>
    </Box>
  );
};