import "./History.css";

function History({ sessions, handleOpenSession, handleDeleteSession }) {
  return (
    <div className="history-page">
      <h1>Study History</h1>

      {sessions.length === 0 ? (
        <p>No saved sessions yet.</p>
      ) : (
        sessions.map((session) => (
          <div key={session._id} className="history-card">
            <h2>{session.title || "Untitled Session"}</h2>
            <p>{session.notes}</p>

            <p>
              Score: {session.score ?? "Not submitted"}
            </p>

            <p>
              {new Date(session.createdAt).toLocaleDateString()}
            </p>

            <button onClick={() => handleOpenSession(session)}>
                Open Session
            </button>

            <button onClick={() => handleDeleteSession(session._id)}>
                Delete
            </button>

          </div>
        ))
      )}
    </div>
  );
}

export default History;