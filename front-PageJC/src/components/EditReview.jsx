import React, { useState } from "react";
import "../styles/EditReview.css";


export default function EditReview({ initial = {}, onCancel, onSave }) {
  const [form, setForm] = useState({
    puntuacion: initial.puntuacion ?? initial.score ?? 5,
    textoReseña: initial.textoReseña ?? initial.comment ?? "",
    horasJugadas: initial.horasJugadas ?? initial.hoursPlayed ?? 0,
    dificultad: initial.dificultad ?? initial.difficulty ?? "Normal",
    recomendaria: initial.recomendaria ?? false
  });

  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave({
        puntuacion: Number(form.puntuacion),
        textoReseña: form.textoReseña,
        horasJugadas: Number(form.horasJugadas) || 0,
        dificultad: form.dificultad,
        recomendaria: Boolean(form.recomendaria)
      });
    } catch (err) {
      console.error("Error en EditReview onSave:", err);
      alert("No se pudo guardar los cambios.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="edit-review">

      <label>Puntuación</label>
      <select value={form.puntuacion} onChange={e => setForm({ ...form, puntuacion: Number(e.target.value) })}>
        {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} ⭐</option>)}
      </select>

      <label>Comentario</label>
      <textarea value={form.textoReseña} onChange={e => setForm({ ...form, textoReseña: e.target.value })} rows={3} required />

      <label>Horas jugadas</label>
      <input type="number" value={form.horasJugadas} onChange={e => setForm({ ...form, horasJugadas: e.target.value })} min="0" />

      <label>Dificultad</label>
      <select value={form.dificultad} onChange={e => setForm({ ...form, dificultad: e.target.value })}>
        {["Fácil","Normal","Difícil"].map(d => <option key={d} value={d}>{d}</option>)}
      </select>

      <label>
        <input type="checkbox" checked={form.recomendaria} onChange={e => setForm({ ...form, recomendaria: e.target.checked })} />
        Recomendaría
      </label>

      <div className="actions">
  <button type="submit" disabled={saving}>
    {saving ? "Guardando..." : "Guardar"}
  </button>
  <button type="button" onClick={onCancel}>Cancelar</button>
</div>

    </form>
  );
}
