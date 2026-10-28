import { useState } from "react";

const matrixData = [
  {
    id: 1,
    concept: "Lifting state up",
    icon: "🔄",
    apis: ["useState", "props"],
    useWhen: "Two or more sibling components must share or synchronize the same data.",
    avoidWhen: "Only one component needs the data (keep state local to that component).",
    exampleScenario: "A form input in one component updating a live card preview in a sibling component."
  },
  {
    id: 2,
    concept: "React Router",
    icon: "🗺️",
    apis: ["BrowserRouter", "Routes", "Route", "Link"],
    useWhen: "The app needs several distinct pages, deep-linkable URLs, and browser history navigation.",
    avoidWhen: "A single view with simple tab toggle or modal without URL navigation is enough.",
    exampleScenario: "Multi-page portfolio or dashboard: /home, /about, /contact, /dashboard."
  },
  {
    id: 3,
    concept: "useContext",
    icon: "🌐",
    apis: ["createContext", "useContext", "Provider"],
    useWhen: "Many deeply nested levels need the same global data (such as theme, auth user, or locale).",
    avoidWhen: "Data only passes through 1 or 2 levels, where standard props are much simpler and clearer.",
    exampleScenario: "Dark/Light mode switch or logged-in user profile needed across header, sidebar, and cards."
  },
  {
    id: 4,
    concept: "useCallback",
    icon: "⚡",
    apis: ["useCallback", "React.memo"],
    useWhen: "A callback function is passed down to a memoized child component or used in a hook dependency array.",
    avoidWhen: "The function is only used locally inside the component or the child component is not wrapped in memo.",
    exampleScenario: "Passing a button click handler from a complex dashboard to a heavy memoized list item."
  }
];

function QuickReference({ onSelectLesson }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = matrixData.filter(
    (item) =>
      item.concept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.useWhen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.avoidWhen.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="lesson-container">
      {/* Header */}
      <header className="lesson-header">
        <div className="lesson-badge">Course Summary • Architecture Guide</div>
        <h1 className="lesson-title">Quick Reference &amp; Decision Guide</h1>
        <p className="lesson-subtitle">
          "Start with <code>useState</code> and <code>props</code>, and reach for the others only when the problem matches." Use this matrix to pick the exact right tool for your React application.
        </p>
      </header>

      {/* Decision Tree / Rule of Thumb Banner */}
      <div className="card rule-banner-card">
        <div className="rule-icon">🎯</div>
        <div className="rule-content">
          <h3>The React State &amp; Architecture Rule of Thumb</h3>
          <p>
            1. Keep state as local as possible. <br />
            2. If two siblings need it → <strong>Lift State Up</strong> to their parent. <br />
            3. If deeply nested children need it → <strong>useContext</strong> to prevent prop drilling. <br />
            4. If child is memoized and re-rendering needlessly → <strong>useCallback</strong>. <br />
            5. If you have distinct URLs and page screens → <strong>React Router</strong>.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="search-filter-bar">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search patterns, use-cases, or APIs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="results-count">Showing {filtered.length} of 4 patterns</span>
      </div>

      {/* Interactive Matrix Cards */}
      <div className="matrix-cards-grid">
        {filtered.map((item) => (
          <div key={item.id} className="card glass-card matrix-card">
            <div className="matrix-card-header">
              <span className="matrix-icon">{item.icon}</span>
              <div>
                <h3 className="matrix-title">{item.concept}</h3>
                <div className="matrix-apis">
                  {item.apis.map((api) => (
                    <span key={api} className="api-chip"><code>{api}</code></span>
                  ))}
                </div>
              </div>
            </div>

            <div className="matrix-body">
              <div className="matrix-section use-when">
                <div className="section-label">✅ Use it when:</div>
                <p>{item.useWhen}</p>
              </div>

              <div className="matrix-section avoid-when">
                <div className="section-label">❌ Avoid it when:</div>
                <p>{item.avoidWhen}</p>
              </div>

              <div className="matrix-section example-scenario">
                <div className="section-label">💡 Real-World Scenario:</div>
                <p>{item.exampleScenario}</p>
              </div>
            </div>

            <div className="matrix-footer">
              <button
                type="button"
                className="btn-open-lesson"
                onClick={() => onSelectLesson(item.id)}
              >
                Go to Lesson {item.id} Live Demo →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Full Comparison Table from Docx */}
      <div className="card glass-card mt-6">
        <div className="card-header">
          <h2 className="card-title">
            <span className="icon">📊</span> Complete Hands-On Reference Table
          </h2>
        </div>
        <div className="table-responsive">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Concept</th>
                <th>Use it when</th>
                <th>Avoid it when</th>
              </tr>
            </thead>
            <tbody>
              {matrixData.map((row) => (
                <tr key={row.id}>
                  <td>
                    <strong>{row.concept}</strong>
                    <div className="table-apis">
                      {row.apis.map((a) => (
                        <code key={a}>{a}</code>
                      ))}
                    </div>
                  </td>
                  <td className="text-green-accent">{row.useWhen}</td>
                  <td className="text-red-accent">{row.avoidWhen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default QuickReference;
