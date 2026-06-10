'use client';
import React from 'react';
import {
  Container,
  Button,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import { usePokemonDetail, usePokemonList } from '@pockeman/hooks';
export default function PokemonDetailPage({ params }: { params: { name: string } }) {
  const router = useRouter();
  const { pokemon, loading, error } = usePokemonDetail(params.name);
console.log(pokemon, loading, error);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()} sx={{ mb: 2 }}>
        Back
      </Button> */}
    
      {error && <Alert severity="error">{error}</Alert>}

      {/* <PokemonCard 
      id={1}
      image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png`}
      type='Grass/Poison'
      name='Pikachu'
      /> */}
    
    </Container>
  );
}
