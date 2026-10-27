import { useState } from "react";

function CodeViewer({ files = [] }) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!files || files.length === 0) return null;

  const currentFile = files[activeTab] || files[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-viewer-container">
      <div className="code-viewer-header">
        <div className="code-viewer-tabs">
          {files.map((file, idx) => (
            <button
              key={file.filename}
              type="button"
              className={`code-tab-btn ${activeTab === idx ? "active" : ""}`}
              onClick={() => setActiveTab(idx)}
            >
              <span className="file-icon">📄</span>
              <span className="file-name">{file.filename}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="copy-btn"
          onClick={handleCopy}
          title="Copy code to clipboard"
        >
          {copied ? "✓ Copied!" : "📋 Copy"}
        </button>
      </div>
      <div className="code-viewer-body">
        <pre className="code-pre">
          <code>{currentFile.code}</code>
        </pre>
      </div>
    </div>
  );
}

export default CodeViewer;
