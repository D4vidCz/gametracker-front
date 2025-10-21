import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Library from './pages/Library';
import GameDetail from './pages/GameDetail';
import AddGame from './pages/AddGame';
import { fetchGames } from './api/games';
function App() {
  const [games, setGames] = useState([]);
  const [loadingGames, setLoadingGames] = useState(true);

  useEffect(() => {
    fetchGames()
      .then(g => setGames(g))
      .catch(() => setGames([]))
      .finally(() => setLoadingGames(false));
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<Library games={games} loading={loadingGames} setGames={setGames} />} />
            <Route path="/games/:id" element={<GameDetail />} />
            <Route path="/add" element={<AddGame setGames={setGames} />} />
            {/* más rutas: /edit/:id, /stats */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
