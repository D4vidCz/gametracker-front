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
  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};

    if (!form.titulo.trim()) {
      newErrors.titulo = "El título es obligatorio.";
    } else if (form.titulo.length < 3) {
      newErrors.titulo = "El título debe tener al menos 3 caracteres.";
    }

    if (!form.genero.trim()) {
      newErrors.genero = "El género es obligatorio.";
    }

    if (!form.plataforma.trim()) {
      newErrors.plataforma = "La plataforma es obligatoria.";
    }

    if (!form.añoLanzamiento) {
      newErrors.añoLanzamiento = "El año de lanzamiento es obligatorio.";
    } else if (
      form.añoLanzamiento < 1970 ||
      form.añoLanzamiento > new Date().getFullYear()
    ) {
      newErrors.añoLanzamiento = "El año debe estar entre 1970 y el actual.";
    }

    if (form.imagenPortada && form.imagenPortada.startsWith("http")) {
      const urlRegex = /^https?:\/\/.*\.(png|jpg|jpeg|gif|webp)$/i;
      if (!urlRegex.test(form.imagenPortada)) {
        newErrors.imagenPortada = "La URL de la imagen no es válida.";
      }
    }

    if (form.descripcion.length > 500) {
      newErrors.descripcion = "La descripción no puede superar los 500 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

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
    if (validate()) {
      onSubmit(form);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-juego">
      <h2 className="form-title">{initial._id ? "Editar Juego" : "Agregar Juego"}</h2>

      <label>Título:</label>
      <input name="titulo" value={form.titulo} onChange={handleChange} />
      {errors.titulo && <p className="error">{errors.titulo}</p>}

      <label>Género:</label>
      <input name="genero" value={form.genero} onChange={handleChange} />
      {errors.genero && <p className="error">{errors.genero}</p>}

      <label>Plataforma:</label>
      <input name="plataforma" value={form.plataforma} onChange={handleChange} />
      {errors.plataforma && <p className="error">{errors.plataforma}</p>}

      <label>Año de Lanzamiento:</label>
      <input
        type="number"
        name="añoLanzamiento"
        value={form.añoLanzamiento}
        onChange={handleChange}
      />
      {errors.añoLanzamiento && <p className="error">{errors.añoLanzamiento}</p>}

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
      {errors.imagenPortada && <p className="error">{errors.imagenPortada}</p>}

      <label>Descripción:</label>
      <textarea name="descripcion" value={form.descripcion} onChange={handleChange} />
      {errors.descripcion && <p className="error">{errors.descripcion}</p>}

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

      <button type="submit" className="btn">
        Guardar
      </button>
    </form>
  );
}
