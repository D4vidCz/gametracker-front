import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/GameCard.css";


export default function GameCard({ game, onDelete }) {
  
  const id = game._id || game.id;
  const navigate = useNavigate();

  return (
    <div className="card" style={{ border: '1px solid #222', padding: 12, borderRadius: 8 }}>
      <Link to={`/games/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img
          src={game.imagenPortada || "/placeholder.jpg"}
          alt={game.titulo}
          style={{ width: '100%', maxHeight: 140, objectFit: 'cover', borderRadius: 6 }}
        />
        <h3 style={{ marginTop: 8 }}>{game.titulo}</h3>
      </Link>

      <p><strong>Género:</strong> {game.genero}</p>
      <p><strong>Plataforma:</strong> {game.plataforma}</p>
      <p><strong>Año:</strong> {game.añoLanzamiento}</p>
      <p><strong>Completado:</strong> {game.completado ? "Sí" : "No"}</p>

      <div className="actions" style={{ marginTop: 8, display: 'flex', gap: 8 }}>
        <Link to={`/games/${id}`} className="btn small">Ver</Link>

        <Link to={`/edit/${id}`} className="btn small ghost">Editar</Link>

        <button
          className="btn small danger"
          onClick={() => onDelete && onDelete(id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
