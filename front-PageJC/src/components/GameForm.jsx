// src/components/GameForm.jsx
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function GameForm({ onSubmit, initial = null }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [platform, setPlatform] = useState(initial?.platform || '');
  const [coverUrl, setCoverUrl] = useState(initial?.coverUrl || '');
  const [releaseDate, setReleaseDate] = useState(initial?.releaseDate || '');
  const [hoursPlayed, setHoursPlayed] = useState(initial?.hoursPlayed || 0);
  const [score, setScore] = useState(initial?.score || 0);
  const [error, setError] = useState(null);

  function validate() {
    if (!title.trim()) return 'Title is required';
    if (!platform.trim()) return 'Platform is required';
    if (Number(hoursPlayed) < 0) return 'Hours must be 0 or greater';
    if (Number(score) < 0 || Number(score) > 5) return 'Score must be between 0 and 5';
    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('[GameForm] handleSubmit triggered');
    const v = validate();
    if (v) {
      setError(v);
      console.warn('[GameForm] validation failed:', v);
      return;
    }

    const newGame = {
      id: initial?.id || uuidv4(), 
      title: title.trim(),
      platform: platform.trim(),
      coverUrl: coverUrl.trim() || null,
      releaseDate: releaseDate || null,
      genres: initial?.genres || [],
      hoursPlayed: Number(hoursPlayed),
      score: Number(score),
      createdAt: initial?.createdAt || new Date().toISOString()
    };

    console.log('[GameForm] newGame prepared:', newGame);

    if (typeof onSubmit === 'function') {
      try {
        onSubmit(newGame);
        console.log('[GameForm] onSubmit called successfully');
      } catch (err) {
        console.error('[GameForm] error calling onSubmit:', err);
      }
    } else {
      console.error('[GameForm] onSubmit is not a function:', onSubmit);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{maxWidth:700}}>
      {error && <p className="error" style={{marginBottom:8}}>{error}</p>}

      <label style={{display:'block', marginBottom:8}}>
        Title *
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Game title" style={{display:'block', width:'100%', padding:8, marginTop:6, borderRadius:6}} />
      </label>

      <label style={{display:'block', marginBottom:8}}>
        Platform *
        <input value={platform} onChange={e => setPlatform(e.target.value)} placeholder="PC, Switch, PS5..." style={{display:'block', width:'100%', padding:8, marginTop:6, borderRadius:6}} />
      </label>

      <label style={{display:'block', marginBottom:8}}>
        Cover image URL
        <input value={coverUrl} onChange={e => setCoverUrl(e.target.value)} placeholder="https://..." style={{display:'block', width:'100%', padding:8, marginTop:6, borderRadius:6}} />
      </label>

      <div style={{display:'flex', gap:12}}>
        <label style={{flex:1}}>
          Release date
          <input type="date" value={releaseDate} onChange={e => setReleaseDate(e.target.value)} style={{display:'block', width:'100%', padding:8, marginTop:6, borderRadius:6}} />
        </label>

        <label style={{width:140}}>
          Hours played
          <input type="number" value={hoursPlayed} min="0" onChange={e => setHoursPlayed(e.target.value)} style={{display:'block', width:'100%', padding:8, marginTop:6, borderRadius:6}} />
        </label>

        <label style={{width:140}}>
          Score (0-5)
          <input type="number" value={score} min="0" max="5" step="1" onChange={e => setScore(e.target.value)} style={{display:'block', width:'100%', padding:8, marginTop:6, borderRadius:6}} />
        </label>
      </div>

      <div style={{marginTop:12}}>
        <button className="btn" type="submit">Save Game</button>
      </div>
    </form>
  );
}
