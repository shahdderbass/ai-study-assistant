import "./SideBar.css";

function Sidebar({ currentPage, setCurrentPage, handleLoadSessions }) {
  return (
    <aside className="sidebar">
      <div className="logo-card">
        <div className="cloud">☁️</div>
        <h2>StudyAI</h2>
      </div>

      <nav className="nav-menu">
        {/* <button className="nav-item active">
          ⌂ <span>Home</span>
        </button> */}
        <button
            className={`nav-item ${currentPage === "home" ? "active" : ""}`}
            onClick={() => setCurrentPage("home")}
        >
            ⌂ <span>Home</span>
        </button>

        <button className="nav-item">
          ▤ <span>Summary</span>
        </button>

        <button className="nav-item">
          ? <span>Quiz</span>
        </button>

        {/* <button className="nav-item">
          ◷ <span>History</span>
        </button> */}

        <button
            className={`nav-item ${currentPage === "history" ? "active" : ""}`}
            onClick={() => {
                setCurrentPage("history");
                handleLoadSessions();
            }}
        >
            ◷ <span>History</span>
        </button>

        <button className="nav-item">
          ⚙ <span>Settings</span>
        </button>
      </nav>

      <div className="sidebar-decoration">
        🌿
        <p>
          Better notes
          <br />
          Brighter future ♡
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;