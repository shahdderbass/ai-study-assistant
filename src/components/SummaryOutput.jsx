import ReactMarkdown from "react-markdown";

function SummaryOutput({ summary }) {
  return (
    <div className="summary-output">
      <ReactMarkdown>
        {summary}
      </ReactMarkdown>
    </div>
  );
}

export default SummaryOutput;