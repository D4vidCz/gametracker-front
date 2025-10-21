import React, { useEffect, useState } from 'react';
import GameCard from '../components/GameCard';
import { fetchGames } from '../api/games';

export default function Library({ games: propGames = null, loading: propLoading = null, setGames: propSetGames = null }) {

  const [localGames, setLocalGames] = useState([]);
  const [localLoading, setLocalLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const isControlled = Array.isArray(propGames);

  useEffect(() => {
    if (isControlled) {
      
      setLocalLoading(false);
      return;
    }

    let cancelled = false;
    setLocalLoading(true);
    fetchGames()
      .then(g => {
        if (!cancelled) {
          setLocalGames(g || []);
        }
      })
      .catch(err => {
        console.error('[Library] fetchGames error:', err);
        setError('No se pudo cargar juegos');
      })
      .finally(() => {
        if (!cancelled) setLocalLoading(false);
      });

    return () => { cancelled = true; };
  }, [isControlled]);

  const games = isControlled ? propGames : localGames;
  const loading = propLoading ?? localLoading;

  useEffect(() => {
    console.log('[Library] rendering - games count:', Array.isArray(games) ? games.length : 0);
  }, [games]);

  if (loading) return <p className="center">Cargando juegos...</p>;
  if (error) return <p className="center error">{error}</p>;

  return (
    <section className="library container">
      <h2>Mi Biblioteca</h2>

      {(!Array.isArray(games) || games.length === 0) ? (
        <p className="muted">No hay juegos registrados aún.</p>
      ) : (
        <div className="grid">
          {games.map(g => <GameCard key={g.id} game={g} />)}
        </div>
      )}

      {/* DEBUG: ver contenido del array en la página (útil temporalmente) */}
      {/* <pre style={{color:'white', marginTop:20}}>{JSON.stringify(games, null, 2)}</pre> */}

    </section>
  );
}

