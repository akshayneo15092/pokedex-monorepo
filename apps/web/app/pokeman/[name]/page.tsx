'use client';

import { Container, Button, Typography, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter, useParams } from 'next/navigation';
import { usePokemonDetail } from '@pokeman/hooks';
import { PokemonCard, Loader, ErrorState } from '@pokeman/ui';

export default function PokemonDetailPage() {
  const router = useRouter();
  const params = useParams();

  const name = params.name as string;

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
        <ErrorState
          message={error}
          onRetry={() => router.refresh()}
        />
      )}

      {!loading && !error && pokemon && (
        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textTransform: 'capitalize' }}
          >
            Pokémon / {name}
          </Typography>

          <PokemonCard pokemon={pokemon} />
        </Box>
      )}
    </Container>
  );
}