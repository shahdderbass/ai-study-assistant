function SummaryButton({onSummarize, loading}){

    return (
        <>
            <button 
                className="summary-button"
                onClick={onSummarize} 
                disabled={loading}
            >
                {loading ? "Summarizing..." : "Summarize"}
            </button>
        </>
    );

}

export default SummaryButton