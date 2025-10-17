import React, { useEffect, useState } from 'react';
import GameCard from '../components/GameCard';
import { fetchGames } from '../api/games';

export default function Library() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGames()
      .then(g => setGames(g))
      .catch(() => setError('No se pudo cargar juegos'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="center">Cargando juegos...</p>;
  if (error) return <p className="center error">{error}</p>;

  return (
    <section className="library container">
      <h2>Mi Biblioteca</h2>
      <div className="grid">
        {games.map(g => <GameCard key={g.id} game={g} />)}
      </div>
    </section>
  );
}
