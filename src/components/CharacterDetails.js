import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardMedia } from '@mui/material';
import axios from 'axios';

function CharacterDetails() {
  const [character, setCharacter] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        setCharacter(response.data);
      } catch (error) {
        console.error('Erro ao buscar o personagem:', error);
      }
    };

    fetchCharacter();
  }, [id]);

  if (!character) {
    return (
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Carregando...
        </Typography>
      </Container>
    );
  }

  <CardMedia
  component="img"
  height="300"
  image={character.image}
  alt={character.name}
  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
/>


  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Detalhes do Personagem
      </Typography>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={character.image}
          alt={character.name}
          style={{ objectFit: 'cover' }}
        />
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
    </Container>
  );
}

export default CharacterDetails;
