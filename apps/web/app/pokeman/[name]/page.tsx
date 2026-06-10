'use client';
import { use } from 'react';
import { Container, Button, Typography, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import { usePokemonDetail } from '@pockeman/hooks';
import { PokemonCard, Loader, ErrorState } from '@pockeman/ui';

export default function PokemonDetailPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params);
  const router = useRouter();
  const { pokemon, loading, error } = usePokemonDetail(name);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.back()}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      {loading && <Loader />}

      {error && (
        <ErrorState message={error} onRetry={() => router.refresh()} />
      )}

      {!loading && !error && pokemon && (
        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textTransform: "capitalize" }}
          >
            Pokémon / {name}
          </Typography>
          <PokemonCard pokemon={pokemon} />
        </Box>
      )}
    </Container>
  );
}
