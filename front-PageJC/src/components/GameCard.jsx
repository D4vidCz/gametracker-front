import { Link } from 'react-router-dom';

export default function GameCard({ game }) {
  const cover = game?.coverUrl;
  const hasHttp = typeof cover === 'string' && (cover.startsWith('http://') || cover.startsWith('https://'));

  return (
    <article className="game-card">
      {hasHttp ? (
        <img src={cover} alt={`${game.title} cover`} className="game-cover" />
      ) : (
        <div className="game-cover placeholder">
          {/* Placeholder SVG sencillo */}
          <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#020617" />
            <g fill="#1e293b" />
            <text x="50%" y="50%" dy="8" fill="#7dd3fc" fontSize="20" fontFamily="Arial, sans-serif" textAnchor="middle">No image</text>
            <text x="50%" y="65%" dy="8" fill="#94a3b8" fontSize="12" fontFamily="Arial, sans-serif" textAnchor="middle">{game?.platform || ''}</text>
          </svg>
        </div>
      )}

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
