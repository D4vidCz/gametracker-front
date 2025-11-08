import React, { useState } from "react";
import "../styles/AddReview.css";

export default function AddReview({ gameId, onAdd }) {
  const [form, setForm] = useState({
    puntuacion: 5,
    textoReseña: "",
    horasJugadas: 0,
    dificultad: "Normal",
    recomendaria: false,
  });

  const [loading, setLoading] = useState(false);
  const [errores, setErrores] = useState([]); // ✅ aquí guardaremos los mensajes del backend

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrores([]); // limpia errores previos

    try {
      const res = await fetch("http://localhost:4000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          juegoId: gameId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Si el backend envía validaciones específicas
        if (data.errores && Array.isArray(data.errores)) {
          setErrores(data.errores);
        } else {
          setErrores(["Error al crear la reseña."]);
        }
        throw new Error("Error de validación");
      }

      onAdd(data); // agrega la nueva reseña en el componente padre

      // ✅ Reseteamos el formulario
      setForm({
        puntuacion: 5,
        textoReseña: "",
        horasJugadas: 0,
        dificultad: "Normal",
        recomendaria: false,
      });
    } catch (err) {
      console.error("❌ Error al crear la reseña:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="add-review">
      <h4>Agregar reseña</h4>

      {/* 🧩 Mostrar errores si existen */}
      {errores.length > 0 && (
        <div className="error-box">
          {errores.map((err, i) => (
            <p key={i} className="error-msg">⚠️ {err}</p>
          ))}
        </div>
      )}

      <label>Puntuación:</label>
      <select
        value={form.puntuacion}
        onChange={(e) => setForm({ ...form, puntuacion: Number(e.target.value) })}
      >
        {[5, 4, 3, 2, 1].map((n) => (
          <option key={n} value={n}>
            {n} ⭐
          </option>
        ))}
      </select>

      <label>Comentario:</label>
      <textarea
        required
        value={form.textoReseña}
        onChange={(e) => setForm({ ...form, textoReseña: e.target.value })}
      />

      <label>Horas jugadas:</label>
      <input
        type="number"
        min="0"
        value={form.horasJugadas}
        onChange={(e) =>
          setForm({ ...form, horasJugadas: Number(e.target.value) })
        }
      />

      <label>Dificultad:</label>
      <select
        value={form.dificultad}
        onChange={(e) => setForm({ ...form, dificultad: e.target.value })}
      >
        {["Fácil", "Normal", "Difícil"].map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={form.recomendaria}
          onChange={(e) =>
            setForm({ ...form, recomendaria: e.target.checked })
          }
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
