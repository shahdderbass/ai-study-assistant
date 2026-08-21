import "./Header.css";

function Header() {
  return (
    <header className="top-header">
      <div>
        <h1>✨ AI Study Assistant</h1>
        <p>Turn your notes into study material 💗</p>
      </div>

      <button className="mode-button">☾</button>
    </header>
  );
}

export default Header;