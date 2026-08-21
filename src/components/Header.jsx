import "./Header.css";

function Header({ handleNewSession, darkMode, setDarkMode }) {
  return (
    <header className="top-header">
      <div>
        <h1>✨ AI Study Assistant</h1>
        <p>Turn your notes into study material 💗</p>
      </div>
        <button 
            className="new-session-button"
            onClick={handleNewSession}
        >
            + New Session
        </button>
            <button
            className="mode-button"
            onClick={() => setDarkMode(!darkMode)}
            >
            {darkMode ? "☀️" : "☾"}
        </button>
    </header>
  );
}

export default Header;