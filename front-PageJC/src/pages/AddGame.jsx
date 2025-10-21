import React from 'react';
import GameForm from '../components/GameForm';
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from 'react-router-dom';

export default function AddGame({ setGames }) {
  const navigate = useNavigate();

  // handler que recibirá el formulario
  function handleCreate(newGame) {
    const gameWithId = { id: uuidv4(), ...newGame };
    setGames(prev => [newGame, ...prev]); // agrega al inicio
    navigate('/'); // volver a la biblioteca
  }

  return (
    <section className="container" style={{paddingTop: '1rem'}}>
      <h2>Add a new game</h2>
      <GameForm onSubmit={handleCreate} />
    </section>
  );
}
