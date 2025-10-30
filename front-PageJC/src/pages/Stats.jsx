import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Stats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/api/stats")
      .then(res => setStats(res.data))
      .catch(() => setError("Error al cargar estadísticas"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando estadísticas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="container">
      <h2>📊 Estadísticas Generales</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total de Juegos</h3>
          <p>{stats.totalJuegos}</p>
        </div>

        <div className="stat-card">
          <h3>Juegos Completados</h3>
          <p>{stats.juegosCompletados}</p>
        </div>

        <div className="stat-card">
          <h3>Horas Jugadas</h3>
          <p>{stats.totalHorasJugadas}</p>
        </div>

        <div className="stat-card">
          <h3>Promedio de Puntuación</h3>
          <p>{stats.promedioPuntuacion.toFixed(2)}</p>
        </div>
      </div>
    </section>
  );
}
