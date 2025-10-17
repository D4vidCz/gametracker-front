export default function Header() {
  return (
    <header className="app-header">
      <div className="container">
        <h1>GameTracker</h1>
        <nav>
          <button className="btn">Library</button>
          <button className="btn">Stats</button>
          <button className="btn">Add Game</button>
        </nav>
      </div>
    </header>
  );
}
