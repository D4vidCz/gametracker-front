import React from "react";
import { Link } from "react-router-dom";

export default function GameCard({ game, onDelete }) {
  return (
    <div className="card">
      <img src={game.imagenPortada || "/placeholder.jpg"} alt={game.titulo} />
      <h3>{game.titulo}</h3>
      <p><strong>Género:</strong> {game.genero}</p>
      <p><strong>Plataforma:</strong> {game.plataforma}</p>
      <p><strong>Año:</strong> {game.añoLanzamiento}</p>
      <p><strong>Completado:</strong> {game.completado ? "Sí" : "No"}</p>

      <div className="actions">
        <Link to={`/edit/${game._id}`}>Editar</Link>
        <button onClick={() => onDelete(game._id)}>Eliminar</button>
      </div>
    </div>
  );
}
