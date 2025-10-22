import axios from "axios";

const API_URL = "http://localhost:4000/api/games";

// Obtener todos los juegos
export async function fetchGames() {
  const res = await axios.get(API_URL);
  return res.data;
}

// Obtener un juego por ID
export async function fetchGameById(id) {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
}

// Crear un nuevo juego
export async function createGame(game) {
  const res = await axios.post(API_URL, game);
  return res.data;
}

// Actualizar un juego
export async function updateGame(id, game) {
  const res = await axios.put(`${API_URL}/${id}`, game);
  return res.data;
}

// Eliminar un juego
export async function deleteGame(id) {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
}
