import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GameForm from '../components/GameForm';

export default function EditGame({ games = [], setGames }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Buscar el juego con ese id
  const gameToEdit = games.find(g => g.id === id);

  if (!gameToEdit) {
    return (
      <section className="container" style={{ paddingTop: '1rem' }}>
        <h2>Editar juego</h2>
        <p className="muted">Juego no encontrado o datos aún cargando...</p>
      </section>
    );
  }

  function handleUpdate(updatedGame) {
    setGames(prev =>
      prev.map(g => (g.id === updatedGame.id ? updatedGame : g))
    );
    navigate('/');
  }

  return (
    <section className="container" style={{ paddingTop: '1rem' }}>
      <h2>Editando: {gameToEdit.title}</h2>
      <GameForm onSubmit={handleUpdate} initial={gameToEdit} />
    </section>
  );
}
