// src/pages/GameDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGameById } from "../api/games";
import { fetchReviewsByGame, deleteReview, updateReview } from "../api/reviews";
import EditReview from "../components/EditReview"; 
import AddReview from "../components/AddReview";

export default function GameDetail() {
  const { id } = useParams(); 
  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); 

  useEffect(() => {
    let canceled = false;
    async function loadData() {
      setLoading(true);
      try {
        const [gameData, reviewsData] = await Promise.all([
          fetchGameById(id),
          fetchReviewsByGame(id)
        ]);
        if (!canceled) {
          setGame(gameData);
          setReviews(reviewsData || []);
        }
      } catch (err) {
        console.error("Error cargando detalles/reseñas:", err);
      } finally {
        if (!canceled) setLoading(false);
      }
    }
    loadData();
    return () => { canceled = true; };
  }, [id]);

  // Eliminar reseña
  async function handleDeleteReview(reviewId) {
    if (!window.confirm("¿Eliminar esta reseña?")) return;
    try {
      setReviews(prev => prev.filter(r => (r._id || r.id) !== reviewId));
      await deleteReview(reviewId);
    } catch (err) {
      console.error("Error al eliminar reseña:", err);
      alert("No se pudo eliminar la reseña. Reintentá.");

      try {
        const fresh = await fetchReviewsByGame(id);
        setReviews(fresh || []);
      } catch (e) {
        console.error("Error recargando reseñas:", e);
      }
    }
  }

  // Iniciar edición
  function startEdit(reviewId) {
    setEditingId(reviewId);
  }

  // Cancelar edición
  function cancelEdit() {
    setEditingId(null);
  }

  async function handleSaveEdit(reviewId, updatedData) {
    try {
      const updated = await updateReview(reviewId, updatedData);

      setReviews(prev => prev.map(r => ((r._id || r.id) === reviewId ? updated : r)));
      setEditingId(null);
    } catch (err) {
      console.error("Error actualizando reseña:", err);
      alert("No se pudo guardar la reseña editada.");
    }
  }

  if (loading) return <p>Cargando detalles...</p>;
  if (!game) return <p>No se encontró el juego.</p>;

  return (
    <section className="game-detail container">
      <h2>{game.titulo || game.title}</h2>
      <p><strong>Género:</strong> {game.genero || game.genre}</p>
      <p><strong>Plataforma:</strong> {game.plataforma || game.platform}</p>

      <h3>Reseñas</h3>

      {reviews.length === 0 ? (
        <p>No hay reseñas aún.</p>
      ) : (
        <ul>
          {reviews.map(r => {
            const rid = r._id || r.id;

            if (editingId === rid) {
              return (
                <li key={rid}>
                  <EditReview
                    initial={r}
                    onCancel={cancelEdit}
                    onSave={(data) => handleSaveEdit(rid, data)}
                  />
                </li>
              );
            }

            // vista normal de reseña
            return (
              <li key={rid} style={{ marginBottom: 12 }}>
                <p><strong>Puntuación:</strong> {r.puntuacion ?? r.score}/5</p>
                <p><strong>Comentario:</strong> {r.textoReseña ?? r.comment}</p>
                <p><strong>Horas jugadas:</strong> {r.horasJugadas ?? r.hoursPlayed}</p>
                <p><strong>Dificultad:</strong> {r.dificultad ?? r.difficulty}</p>

                <div style={{ marginTop: 8 }}>
                  <button onClick={() => startEdit(rid)} style={{ marginRight: 8 }}>Editar</button>
                  <button onClick={() => handleDeleteReview(rid)} style={{ color: 'red' }}>Eliminar</button>
                </div>
                <hr />
              </li>
            );
          })}
        </ul>
        
      )}
      <AddReview
        gameId={id}
        onAdd={(newReview) => setReviews(prev => [...prev, newReview])}
      />

    </section>
  );
}
