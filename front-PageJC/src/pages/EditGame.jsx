import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchGameById, updateGame } from "../api/games";
import GameForm from "../components/GameForm";

export default function EditGame() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadGame() {
      try {
        if (!id) throw new Error("ID inválido o no recibido");
        const data = await fetchGameById(id);
        setGame(data);
      } catch (err) {
        console.error("❌ Error al cargar el juego:", err);
        setError("No se pudo cargar el juego");
      } finally {
        setLoading(false);
      }
    }
    loadGame();
  }, [id]);

  async function handleUpdate(updatedGame) {
    try {
      await updateGame(id, updatedGame);
      navigate("/");
    } catch (err) {
      console.error("❌ Error al actualizar el juego:", err);
      alert("Error al actualizar el juego");
    }
  }

  if (loading) return <p>Cargando juego...</p>;
  if (error) return <p>{error}</p>;
  if (!game) return <p>Juego no encontrado.</p>;

  return (
    <section className="container" style={{ paddingTop: "1rem" }}>
      <h2>Editando: {game.titulo}</h2>
      <GameForm onSubmit={handleUpdate} initial={game} />
    </section>
  );
}
      