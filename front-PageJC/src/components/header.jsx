import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="app-header">
      <div className="container">
        <h1><Link to="/" style={{color:'var(--accent)'}}>GameTracker</Link></h1>
        <nav>
          <Link to="/"><button className="btn">Library</button></Link>
          <Link to="/stats">Stats</Link>
          <Link to="/add"><button className="btn">Add Game</button></Link>
        </nav>
      </div>
    </header>
  );
}
