"use client";
import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlined";

interface Props {
  message: string;
  onRetry?: () => void;
}

export const ErrorState = ({
  message,
  onRetry,
}: Props) => {
  return (
    <Box  sx={{
    textAlign: "center",
    py: 5,
  }}>
      <ErrorOutlineIcon
        color="error"
        sx={{ fontSize: 60 }}
      />

      <Typography variant="h6" >
        {message}
      </Typography>

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={onRetry}
      >
        Retry
      </Button>
    </Box>
  );
};