import React, { useState } from "react";
import { Link } from "react-router-dom";
import { updateGame } from "../api/games";
import "../styles/GameCard.css";

export default function GameCard({ game, onDelete }) {
  const id = game._id || game.id;
  const [isUpdating, setIsUpdating] = useState(false);
  const [completado, setCompletado] = useState(game.completado);

  // 🔄 Alternar completado
  async function handleToggleCompletado() {
    try {
      setIsUpdating(true);
      const updated = await updateGame(id, { ...game, completado: !completado });
      setCompletado(updated.completado);
    } catch (err) {
      console.error("❌ Error al actualizar el estado:", err);
      alert("Error al cambiar el estado de completado");
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="game-card">
      {/* Solo el área de la imagen y el título es clickeable */}
      <Link to={`/games/${id}`} className="card-top">
        <img
          src={game.imagenPortada || "/placeholder.jpg"}
          alt={game.titulo}
          className="game-img"
        />
        <h3 className="game-title">{game.titulo}</h3>
      </Link>

      <div className="game-info">
        <p><strong>Género:</strong> {game.genero}</p>
        <p><strong>Plataforma:</strong> {game.plataforma}</p>
        <p><strong>Año:</strong> {game.añoLanzamiento}</p>
      </div>

      {/* ✅ Botón completado */}
      <button
        onClick={handleToggleCompletado}
        className={`btn-toggle ${completado ? "done" : "pending"}`}
        disabled={isUpdating}
      >
        {isUpdating ? "⏳ Actualizando..." : completado ? "✅ Completado" : "⏳ Pendiente"}
      </button>

      {/* 🎮 Botones de acción */}
      <div className="actions">
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
