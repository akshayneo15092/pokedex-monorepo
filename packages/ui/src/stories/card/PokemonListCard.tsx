"use client";
import { Card, CardMedia, CardContent, Typography, Stack } from "@mui/material";
import type { PokemonListItem } from "@pockeman/types";
import { TypeBadge } from "../typeBadge/TypeBadge";

interface PokemonListCardProps {
  pokemon: PokemonListItem;
}

export const PokemonListCard = ({ pokemon }: PokemonListCardProps) => (
  <Card
    elevation={1}
    sx={{
      borderRadius: 4,
      transition: "0.25s",
      cursor: "pointer",
      "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
    }}
  >
    <CardMedia
      component="img"
      image={pokemon.imageUrl}
      alt={pokemon.name}
      sx={{ objectFit: "contain", bgcolor: "grey.100", p: 2, height: 140 }}
    />
    <CardContent sx={{ pb: "12px !important" }}>
      <Typography variant="caption" color="text.secondary">
        #{String(pokemon.id).padStart(3, "0")}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ textTransform: "capitalize", lineHeight: 1.2, mb: 1, fontWeight: 600 }}
      >
        {pokemon.name}
      </Typography>
      {pokemon.types && (
        <Stack direction="row" spacing={0.5} sx={{flexWrap:"wrap"}} >
          {pokemon.types.map((t) => <TypeBadge key={t} type={t} />)}
        </Stack>
      )}
    </CardContent>
  </Card>
);
