import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchGameById } from '../api/games';

export default function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGameById(id)
      .then(g => setGame(g))
      .catch(() => setError('No se encontró el juego'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="center">Cargando...</p>;
  if (error) return <p className="center error">{error}</p>;
  if (!game) return null;

  return (
    <section className="container">
      <Link to="/" className="btn ghost">← Volver</Link>
      <div style={{display:'flex', gap:'1rem', marginTop:'1rem', alignItems:'flex-start'}}>
        <img src={game.coverUrl || '/placeholder.png'} alt={game.title} style={{width:260, borderRadius:8}} />
        <div>
          <h2>{game.title}</h2>
          <p className="meta">{game.platform} • {game.releaseDate}</p>
          <p><strong>Horas jugadas:</strong> {game.hoursPlayed}</p>
          <p><strong>Puntuación:</strong> ⭐ {game.score}</p>
          <p><strong>Géneros:</strong> {game.genres?.join(', ')}</p>

          <div style={{marginTop:12}}>
            <button className="btn">Marcar como completado</button>
            <button className="btn ghost" style={{marginLeft:8}}>Añadir reseña</button>
          </div>
        </div>
      </div>

      <div style={{marginTop:20}}>
        <h3>Reseñas</h3>
        <p className="muted">Aún no hay reseñas. Prueba agregar una en la demo.</p>
      </div>
    </section>
  );
}
