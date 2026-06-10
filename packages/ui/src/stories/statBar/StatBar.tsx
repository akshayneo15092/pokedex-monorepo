"use client";
import { Box, LinearProgress, Typography } from "@mui/material";

interface Props {
  label: string;
  value: number;
}

export const StatBar = ({ label, value }: Props) => (
  <Box sx={{ display: "grid", gridTemplateColumns: "90px 1fr 36px", alignItems: "center", gap: 1 }}>
    <Typography variant="body2" color="text.secondary" noWrap>
      {label}
    </Typography>
    <LinearProgress
      variant="determinate"
      value={value}
      sx={{ height: 8, borderRadius: 4, bgcolor: "grey.200",
        "& .MuiLinearProgress-bar": {
          borderRadius: 4,
          bgcolor: value >= 80 ? "success.main" : value >= 50 ? "warning.main" : "error.main",
        },
      }}
    />
    <Typography variant="body2" sx={{ textAlign: "right", fontWeight: 600 }}>
      {value}
    </Typography>
  </Box>
);
