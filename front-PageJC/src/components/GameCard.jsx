import { Link } from 'react-router-dom';

export default function GameCard({ game, onDelete }) {
  const cover = game?.coverUrl;
  const coverSrc = (typeof cover === 'string' && (cover.startsWith('http') || cover.startsWith('/')))
    ? cover
    : '/placeholder.png';

  function handleDelete() {
    if (window.confirm(`¿Eliminar "${game.title}" de tu biblioteca?`)) {
      onDelete?.(game.id);
    }
  }

  return (
    <article className="game-card">
      <img src={coverSrc} alt={`${game.title} cover`} className="game-cover" />
      <div className="game-info">
        <h3>{game.title}</h3>
        <p className="meta">{game.platform} • {game.releaseDate?.slice(0,4) || '—'}</p>

        <div className="card-actions">
          <span className="score">⭐ {game.score ?? 0}</span>
          <Link to={`/games/${game.id}`}>
            <button className="btn small">Ver</button>
          </Link>

          <Link to={`/edit/${game.id}`}>
            <button className="btn small ghost">Editar</button>
          </Link>

          <button className="btn small danger" onClick={handleDelete}>Eliminar</button>
        </div>
      </div>
    </article>
  );
}
