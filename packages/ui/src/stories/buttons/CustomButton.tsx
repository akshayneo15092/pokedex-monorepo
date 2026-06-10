"use client";
import Button from "@mui/material/Button";

interface CustomButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const CustomButton = ({
  label,
  onClick,
  disabled = false,
}: CustomButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      sx={{
        borderRadius: 3,
        textTransform: "none",
        px: 3,
        py: 1,
        fontWeight: 600,
      }}
    >
      {label}
    </Button>
  );
};