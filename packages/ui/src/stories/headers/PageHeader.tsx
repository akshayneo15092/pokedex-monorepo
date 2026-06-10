"use client";
import {
  Box,
  Typography,
} from "@mui/material";

interface Props {
  title: string;
  subtitle?: string;
}

export const PageHeader = ({
  title,
  subtitle,
}: Props) => {
  return (
    <Box>
      <Typography
        variant="h3"
        sx={{ fontWeight: 700 }}
      >
        {title}
      </Typography>

      <Typography
        color="text.secondary"
        
      >
        {subtitle}
      </Typography>
    </Box>
  );
};