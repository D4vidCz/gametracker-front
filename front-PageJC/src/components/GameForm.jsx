import React, { useState } from "react";
import "../styles/GameForm.css";

export default function GameForm({ onSubmit, initial = {}, onToggleCompletado }) {
  const [form, setForm] = useState({
    titulo: initial.titulo || "",
    genero: initial.genero || "",
    plataforma: initial.plataforma || "",
    añoLanzamiento: initial.añoLanzamiento || "",
    desarrollador: initial.desarrollador || "",
    imagenPortada: initial.imagenPortada || "",
    descripcion: initial.descripcion || "",
    completado: initial.completado || false,
  });

  const [preview, setPreview] = useState(initial.imagenPortada || "");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setForm({ ...form, imagenPortada: reader.result });
    };
    reader.readAsDataURL(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setForm({ ...form, imagenPortada: reader.result });
    };
    reader.readAsDataURL(file);
  }

  async function handleToggleCompletado() {
    const nuevoEstado = !form.completado;
    setForm({ ...form, completado: nuevoEstado });

    if (initial._id && onToggleCompletado) {
      await onToggleCompletado(initial._id, nuevoEstado);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="form-juego">
      <h2 className="form-title">{initial._id ? "Editar Juego" : "Agregar Juego"}</h2>

      <label>Título:</label>
      <input name="titulo" value={form.titulo} onChange={handleChange} required />

      <label>Género:</label>
      <input name="genero" value={form.genero} onChange={handleChange} required />

      <label>Plataforma:</label>
      <input name="plataforma" value={form.plataforma} onChange={handleChange} required />

      <label>Año de Lanzamiento:</label>
      <input
        type="number"
        name="añoLanzamiento"
        value={form.añoLanzamiento}
        onChange={handleChange}
        required
      />

      <label>Desarrollador:</label>
      <input name="desarrollador" value={form.desarrollador} onChange={handleChange} />

      {/* 🖼️ Zona de carga de imagen */}
      <label>Imagen de portada:</label>
      <div
        className="upload-box"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {preview ? (
          <img src={preview} alt="Vista previa" className="preview-img" />
        ) : (
          <p>Arrastra una imagen aquí o haz clic para seleccionarla</p>
        )}
        <input
          type="file"
          accept="image/*"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <label htmlFor="fileInput" className="btn small">
          Seleccionar imagen
        </label>
      </div>

      <label>Descripción:</label>
      <textarea
        name="descripcion"
        value={form.descripcion}
        onChange={handleChange}
      />

      {/* ✅ Botón dinámico de completado */}
      <div className="completado-box">
        <button
          type="button"
          className={`btn-toggle ${form.completado ? "done" : "pending"}`}
          onClick={handleToggleCompletado}
        >
          {form.completado ? "✅ Completado" : "⏳ Pendiente"}
        </button>
      </div>

      <button type="submit" className="btn">Guardar</button>
    </form>
  );
}
