import React from "react";
import { useNavigate } from "react-router-dom";
import { createGame } from "../api/games";
import GameForm from "../components/GameForm";

export default function AddGame() {
  const navigate = useNavigate();

  async function handleCreate(newGame) {
    await createGame(newGame);
    navigate("/");
  }

  return (
    <section className="container" style={{ paddingTop: "1rem" }}>
      <h2>Agregar Nuevo Juego</h2>
      <GameForm onSubmit={handleCreate} />
    </section>
  );
}
