import React, { useEffect, useState } from "react";
import { fetchGames, deleteGame } from "../api/games";
import GameCard from "../components/GameCard";
import "../styles/Library.css";


export default function Library() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGames()
      .then(data => {
        setGames(data);
      })
      .catch(() => setError("Error al cargar juegos"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando juegos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="library container">
      <h2>Mi Biblioteca</h2>
      {games.length === 0 ? (
        <p>No hay juegos registrados aún.</p>
      ) : (
        <div className="grid">
          {games.map(g => (
            <GameCard
              key={g._id}
              game={g}
              onDelete={async (id) => {
                await deleteGame(id);
                setGames(prev => prev.filter(x => x._id !== id));
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
