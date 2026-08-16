function SummaryOutput({summary}){

  return (
    <div className="summary-output">
      {summary || "Your generated summary will appear here..."}
    </div>
  );
}

export default SummaryOutput
