import React, { useEffect, useState } from "react";
import { fetchGames, deleteGame } from "../api/games";
import GameCard from "../components/GameCard";
import "../styles/Library.css";

export default function Library() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtros
  const [search, setSearch] = useState("");
  const [filterGenero, setFilterGenero] = useState("Todos");
  const [filterPlataforma, setFilterPlataforma] = useState("Todos");
  const [filterEstado, setFilterEstado] = useState("Todos");
  const [filterAño, setFilterAño] = useState("Todos");

  useEffect(() => {
    fetchGames()
      .then(data => setGames(data))
      .catch(() => setError("Error al cargar juegos"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando juegos...</p>;
  if (error) return <p>{error}</p>;

  // 🔽 Obtener opciones únicas
  const generos = ["Todos", ...new Set(games.map(g => g.genero))];
  const plataformas = ["Todos", ...new Set(games.map(g => g.plataforma))];
  const años = ["Todos", ...new Set(games.map(g => g.añoLanzamiento).sort((a, b) => b - a))];

  // 🔍 Filtrado dinámico
  const filteredGames = games.filter(g => {
    const matchSearch = g.titulo.toLowerCase().includes(search.toLowerCase());
    const matchGenero = filterGenero === "Todos" || g.genero === filterGenero;
    const matchPlataforma =
      filterPlataforma === "Todos" || g.plataforma === filterPlataforma;
    const matchEstado =
      filterEstado === "Todos" ||
      (filterEstado === "Completados" && g.completado) ||
      (filterEstado === "Pendientes" && !g.completado);
    const matchAño = filterAño === "Todos" || g.añoLanzamiento === Number(filterAño);
    return matchSearch && matchGenero && matchPlataforma && matchEstado && matchAño;
  });

  return (
    <section className="library container">
      <h2>🎮 Mi Biblioteca</h2>

      {/* 🧭 Controles de filtrado */}
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select value={filterGenero} onChange={e => setFilterGenero(e.target.value)}>
          {generos.map(g => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <select value={filterPlataforma} onChange={e => setFilterPlataforma(e.target.value)}>
          {plataformas.map(p => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <select value={filterAño} onChange={e => setFilterAño(e.target.value)}>
          {años.map(a => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>

        <select value={filterEstado} onChange={e => setFilterEstado(e.target.value)}>
          <option value="Todos">Todos</option>
          <option value="Completados">Completados</option>
          <option value="Pendientes">Pendientes</option>
        </select>
      </div>

      {/* 📦 Lista de juegos */}
      {filteredGames.length === 0 ? (
        <p className="muted">No se encontraron juegos con esos filtros.</p>
      ) : (
        <div className="grid">
          {filteredGames.map(g => (
            <GameCard
              key={g._id}
              game={g}
              onDelete={async (id) => {
                await deleteGame(id);
                setGames(prev => prev.filter(x => x._id !== id));
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
