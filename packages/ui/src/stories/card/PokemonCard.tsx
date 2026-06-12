"use client";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Grid,
  Paper,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import type { Pokemon } from "@pokeman/types";
import { formatStatName, formatHeight, formatWeight, getOfficialArtworkUrl } from "@pokeman/utils";
import { TypeBadge } from "../typeBadge/TypeBadge";
import { StatBar } from "../statBar/StatBar";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const image =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ??
    pokemon.sprites?.front_default ??
    getOfficialArtworkUrl(pokemon.id);

  const regularAbilities = pokemon.abilities.filter((a) => !a.is_hidden);
  const hiddenAbilities = pokemon.abilities.filter((a) => a.is_hidden);

  return (
    <Card elevation={2} sx={{ borderRadius: 4, overflow: "hidden" }}>
      <Grid container>

        {/* ── Left panel ── */}
        <Grid size={{ xs: 12, md: 5 }}>
          {/* Image + types */}
          <Paper
            elevation={0}
            sx={{ bgcolor: "grey.100", p: 3, textAlign: "center" }}
          >
            <Box
              component="img"
              src={image}
              alt={pokemon.name}
              sx={{ width: "100%", maxWidth: 220, mx: "auto", display: "block" }}
            />
            <Stack
               style={{
                flexWrap: "wrap",
                justifyContent: "center",
                marginTop: "16px",
              }}
            >
              {pokemon.types.map(({ type }) => (
                <TypeBadge key={type.name} type={type.name} size="medium" />
              ))}
            </Stack>
          </Paper>

          {/* Physical info */}
          <Paper elevation={0} sx={{ bgcolor: "grey.50", p: 2 }}>
            <Grid container style={{  }}>
              <Grid size={6}>
                <Typography variant="caption" color="text.secondary">Height</Typography>
                <Typography style={{ fontWeight: 600 }}>{formatHeight(pokemon.height)}</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="caption" color="text.secondary">Weight</Typography>
                <Typography style={{ fontWeight: 600 }}>{formatWeight(pokemon.weight)}</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="caption" color="text.secondary">Base XP</Typography>
                <Typography style={{ fontWeight: 600 }}>{pokemon.base_experience}</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="caption" color="text.secondary">Pokédex #</Typography>
                <Typography style={{ fontWeight: 600 }}>#{String(pokemon.id).padStart(3, "0")}</Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Abilities */}
          <Paper elevation={0} sx={{ bgcolor: "grey.50", p: 2, mt: 0.5 }}>
            <Typography variant="caption" color="text.secondary"  sx={{ mb: 1 , display:"block"}}>
              Abilities
            </Typography>
            <Stack direction="row" spacing={0.5} style={{display:"block"}} useFlexGap>
              {regularAbilities.map(({ ability }) => (
                <Chip
                  key={ability.name}
                  label={ability.name.replace("-", " ")}
                  size="small"
                  variant="filled"
                  sx={{ textTransform: "capitalize", mb: 0.5 }}
                />
              ))}
            </Stack>
            {hiddenAbilities.length > 0 && (
              <>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, mb: 0.5,  display:"block" }}>
                  Hidden Ability
                </Typography>
                <Stack direction="row" spacing={0.5}  useFlexGap style={{flexWrap:"wrap"}}>
                  {hiddenAbilities.map(({ ability }) => (
                    <Chip
                      key={ability.name}
                      label={ability.name.replace("-", " ")}
                      size="small"
                      variant="outlined"
                      sx={{ textTransform: "capitalize" }}
                    />
                  ))}
                </Stack>
              </>
            )}
          </Paper>
        </Grid>

        {/* ── Right panel ── */}
        <Grid size={{ xs: 12, md: 7 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
              #{String(pokemon.id).padStart(3, "0")}
            </Typography>
            <Typography
              variant="h4"
             
              sx={{ textTransform: "capitalize", mb: 0.5 ,  fontWeight:700}}
            >
              {pokemon.name}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Base stats */}
            <Typography variant="h6"  sx={{ mb: 1.5 , fontWeight:600}}>
              Base Stats
            </Typography>
            <Stack spacing={1.5}>
              {pokemon.stats.map(({ stat, base_stat }) => (
                <StatBar
                  key={stat.name}
                  label={formatStatName(stat.name)}
                  value={Math.min(base_stat, 100)}
                />
              ))}
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Sprites row */}
            <Typography variant="h6"  sx={{ mb: 1 , fontWeight:600}}>
              Sprites
            </Typography>
            <Stack direction="row" spacing={1} style={{ alignItems:"center"}}>
              {pokemon.sprites?.front_default && (
                <Box
                  component="img"
                  src={pokemon.sprites.front_default}
                  alt={`${pokemon.name} front`}
                  sx={{ width: 72, height: 72, imageRendering: "pixelated" }}
                />
              )}
            </Stack>
          </CardContent>
        </Grid>

      </Grid>
    </Card>
  );
};
