"use client";
import { Box, Typography } from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

export const EmptyState = () => {
  return (
    <Box>
      <CatchingPokemonIcon
        color="disabled"
        sx={{ fontSize: 70 }}
      />

      <Typography variant="h6">
        No Pokémon Found
      </Typography>

      <Typography color="text.secondary">
        Try another search.
      </Typography>
    </Box>
  );
};