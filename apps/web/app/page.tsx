'use client';
import React, { useState, useMemo } from 'react';
import { Container, Grid, TextField, Box, Button, Typography, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';
import { usePokemonList } from '@pockeman/hooks';
import type { PokemonListItem } from '@pockeman/types';
import { PokemonListCard, Loader, ErrorState, EmptyState, PageHeader } from '@pockeman/ui';

export default function Home() {
  const { items, loading, error, hasMore, loadMore } = usePokemonList();
  const [search, setSearch] = useState('');
  const router = useRouter();

  const filtered = useMemo<PokemonListItem[]>(
    () => items.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())),
    [items, search]
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PageHeader title="Pokédex" subtitle="Discover and explore all Pokémon" />

      <TextField
        fullWidth
        placeholder="Search Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ my: 3 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />

      {error && <ErrorState message={error} onRetry={() => window.location.reload()} />}

      {!error && filtered.length === 0 && !loading && <EmptyState />}

      <Grid container spacing={3}>
        {filtered.map((pokemon) => (
          <Grid key={pokemon.id} size={{ xs: 6, sm: 4, md: 3 }}>
            <Box onClick={() => router.push(`/pokeman/${pokemon.name}`)}>
              <PokemonListCard pokemon={pokemon} />
            </Box>
          </Grid>
        ))}
      </Grid>

      {loading && <Box sx={{ mt: 4 }}><Loader /></Box>}

      {!loading && hasMore && !search && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button variant="contained" onClick={loadMore} size="large">
            Load More
          </Button>
        </Box>
      )}

      {!hasMore && (
        <Typography sx={{ mt: 4 }}>
          All Pokémon loaded!
        </Typography>
      )}
    </Container>
  );
}
