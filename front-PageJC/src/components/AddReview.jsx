import React, { useState } from "react";
import "../styles/AddReview.css";


export default function AddReview({ gameId, onAdd }) {
  const [form, setForm] = useState({
    puntuacion: 5,
    textoReseña: "",
    horasJugadas: 0,
    dificultad: "Normal",
    recomendaria: false
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          juegoId: gameId // 👈 importante: conecta la reseña al juego correcto
        })
      });

      if (!res.ok) throw new Error("Error al crear reseña");

      const newReview = await res.json();
      onAdd(newReview); // agregamos la reseña al estado del padre
      setForm({ puntuacion: 5, textoReseña: "", horasJugadas: 0, dificultad: "Normal", recomendaria: false }); // limpiamos
    } catch (err) {
      console.error(err);
      alert("No se pudo crear la reseña.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="add-review">
      <h4>Agregar reseña</h4>

      <label>Puntuación:</label>
      <select
        value={form.puntuacion}
        onChange={e => setForm({ ...form, puntuacion: Number(e.target.value) })}
      >
        {[5, 4, 3, 2, 1].map(n => (
          <option key={n} value={n}>{n} ⭐</option>
        ))}
      </select>

      <label>Comentario:</label>
      <textarea
        required
        value={form.textoReseña}
        onChange={e => setForm({ ...form, textoReseña: e.target.value })}
      />

      <label>Horas jugadas:</label>
      <input
        type="number"
        min="0"
        value={form.horasJugadas}
        onChange={e => setForm({ ...form, horasJugadas: e.target.value })}
      />

      <label>Dificultad:</label>
      <select
        value={form.dificultad}
        onChange={e => setForm({ ...form, dificultad: e.target.value })}
      >
        {["Fácil", "Normal", "Difícil"].map(d => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <label>
        <input
          type="checkbox"
          checked={form.recomendaria}
          onChange={e => setForm({ ...form, recomendaria: e.target.checked })}
        />
        Recomendaría
      </label>

      <div style={{ marginTop: 10 }}>
        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Agregar reseña"}
        </button>
      </div>
    </form>
  );
}
