import { Link } from 'react-router-dom';

export default function GameCard({ game }) {
  return (
    <article className="game-card">
      <img src={game.coverUrl || '/placeholder.png'} alt={`${game.title} cover`} className="game-cover" />
      <div className="game-info">
        <h3>{game.title}</h3>
        <p className="meta">{game.platform} • {game.releaseDate?.slice(0,4) || '—'}</p>
        <div className="card-actions">
          <span className="score">⭐ {game.score ?? 0}</span>
          <Link to={`/games/${game.id}`}>
            <button className="btn small">Ver</button>
          </Link>
          <button className="btn small ghost">Editar</button>
        </div>
      </div>
    </article>
  );
}
