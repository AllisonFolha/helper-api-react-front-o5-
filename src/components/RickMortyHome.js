import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Card, CardContent, CardMedia } from '@mui/material';
import axios from 'axios';

function RickMortyHome() {
  const [characterId, setCharacterId] = useState('');
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setCharacterId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar se o ID é um número inteiro positivo
    const isValidId = /^[1-9]\d*$/.test(characterId);
    if (!isValidId) {
      setError('Por favor, insira um ID de personagem válido (número inteiro positivo).');
      return;
    }

    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${characterId}`);
      setCharacter(response.data);
      setError(null);
    } catch (error) {
      console.error('Erro ao buscar o personagem:', error);
      setCharacter(null);
      setError('Erro ao buscar o personagem. Por favor, tente novamente.');
    }
  };

  const handleClear = () => {
    setCharacterId('');
    setCharacter(null);
    setError(null);

  };

  const handleCharacterDetails = (id) => {
    window.location.href = `/character/${id}`;
  };

  return (
    <Container>
    <Typography variant="h2" align="center" gutterBottom>
      The Rick and Morty API
    </Typography>
    <Typography variant="h4" align="center" gutterBottom>
      Buscar Personagem por ID
    </Typography>
    <form onSubmit={handleSubmit}>
        <TextField
          label="ID do Personagem"
          variant="outlined"
          fullWidth
          value={characterId}
          onChange={handleChange}
          margin="normal"
          error={error !== null}
          helperText={error}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
      >
        Buscar
      </Button>
    </form>
    {character && (
      <div style={{ display: 'flex', marginTop: '20px' }}>
        <Card>
          <CardMedia
            component="img"
            height="300"
            image={character.image}
            alt={character.name}
            style={{ objectFit: 'contain', width: '300px' }}
          />
        </Card>
        <Card style={{ marginLeft: '20px', flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {character.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              ID: {character.id}<br />
              Status: {character.status}<br />
              Espécie: {character.species}<br />
              Tipo: {character.type}<br />
              Gênero: {character.gender}<br />
              Origem: {character.origin.name}<br />
              Localização: {character.location.name}<br />
              Número de episódios: {character.episode.length}<br />
              Criado em: {new Date(character.created).toLocaleString()}<br />
              URL: <a href={character.url} target="_blank" rel="noopener noreferrer">{character.url}</a>
            </Typography>
          </CardContent>
        </Card>
      </div>
    )}
  </Container>
  );
}

export default RickMortyHome;
