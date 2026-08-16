function NotesInput({notes, setNotes}){         // pass props

    return(
        <>
            <textarea 
            className="notes-input"
            placeholder="Paste your notes here..."
            value={notes}
            onChange= {(event) => setNotes(event.target.value)}
            />
        </>
    );
}

export default NotesInput