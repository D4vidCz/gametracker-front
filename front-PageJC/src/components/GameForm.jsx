import React, { useState } from "react";
import "../styles/GameForm.css";


export default function GameForm({ onSubmit, initial = {} }) {
  const [form, setForm] = useState({
    titulo: initial.titulo || "",
    genero: initial.genero || "",
    plataforma: initial.plataforma || "",
    añoLanzamiento: initial.añoLanzamiento || "",
    desarrollador: initial.desarrollador || "",
    imagenPortada: initial.imagenPortada || "",
    descripcion: initial.descripcion || "",
    completado: initial.completado || false
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="form-juego">
      <label>Título:</label>
      <input name="titulo" value={form.titulo} onChange={handleChange} required />

      <label>Género:</label>
      <input name="genero" value={form.genero} onChange={handleChange} required />

      <label>Plataforma:</label>
      <input name="plataforma" value={form.plataforma} onChange={handleChange} required />

      <label>Año de Lanzamiento:</label>
      <input type="number" name="añoLanzamiento" value={form.añoLanzamiento} onChange={handleChange} required />

      <label>Desarrollador:</label>
      <input name="desarrollador" value={form.desarrollador} onChange={handleChange} />

      <label>Imagen (URL):</label>
      <input name="imagenPortada" value={form.imagenPortada} onChange={handleChange} />

      <label>Descripción:</label>
      <textarea name="descripcion" value={form.descripcion} onChange={handleChange} />

      <label>
        <input type="checkbox" name="completado" checked={form.completado} onChange={handleChange} />
        ¿Completado?
      </label>

      <button type="submit">Guardar</button>
    </form>
  );
}
