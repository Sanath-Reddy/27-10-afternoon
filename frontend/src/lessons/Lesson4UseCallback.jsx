import { useState, useCallback, useRef, useEffect } from "react";
import Child from "../components/Child";
import CodeViewer from "../components/CodeViewer";

const lesson4Files = [
  {
    filename: "src/App.jsx",
    code: `import { useState, useCallback } from "react";
import Child from "./components/Child";

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Rahul");

  const handleClick = useCallback(() => {
    console.log("Child button clicked");
  }, []);

  console.log("Parent component rendered");

  return (
    <main>
      <h1>useCallback Example</h1>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <hr />
      <h2>Name: {name}</h2>
      <button onClick={() => setName("Amit")}>Change Name</button>
      <hr />
      <Child onClick={handleClick} />
    </main>
  );
}

export default App;`
  },
  {
    filename: "src/components/Child.jsx",
    code: `import { memo } from "react";

function Child({ onClick }) {
  console.log("Child component rendered");
  return <button onClick={onClick}>Child Button</button>;
}

export default memo(Child);`
  }
];

function Lesson4UseCallback() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Rahul");
  const [useCallbackEnabled, setUseCallbackEnabled] = useState(true);

  // Activity stream logs
  const [logs, setLogs] = useState([]);
  const parentRenderCountRef = useRef(0);
  const childRenderCountRef = useRef(0);

  parentRenderCountRef.current += 1;
  const currentParentRender = parentRenderCountRef.current;

  // Add log helper
  const addLog = (type, message) => {
    const time = new Date().toLocaleTimeString().split(" ")[0];
    setLogs((prev) => [
      { id: Math.random().toString(), time, type, message },
      ...prev.slice(0, 19)
    ]);
  };

  // We log parent render effect
  useEffect(() => {
    console.log("Parent component rendered");
    addLog("parent", `Parent component rendered (Render #${currentParentRender})`);
  }, [count, name, currentParentRender]);

  // Stable callback with useCallback
  const stableHandleClick = useCallback(() => {
    console.log("Child button clicked");
    addLog("action", "Child button clicked");
  }, []);

  // Unstable callback (re-created on each render)
  const unstableHandleClick = () => {
    console.log("Child button clicked");
    addLog("action", "Child button clicked");
  };

  const activeHandleClick = useCallbackEnabled ? stableHandleClick : unstableHandleClick;

  const handleChildRender = () => {
    childRenderCountRef.current += 1;
    addLog("child", `Child component rendered (Render #${childRenderCountRef.current})`);
  };

  const clearLogs = () => {
    setLogs([]);
    parentRenderCountRef.current = 0;
    childRenderCountRef.current = 0;
  };

  return (
    <div className="lesson-container">
      {/* Lesson Header */}
      <header className="lesson-header">
        <div className="lesson-badge">Lesson 4 • Performance Optimization</div>
        <h1 className="lesson-title">useCallback</h1>
        <p className="lesson-subtitle">
          <code>useCallback</code> keeps a function's identity the same between renders, preventing memoized child components from re-rendering when unrelated parent state changes.
        </p>
        <div className="lesson-meta-chips">
          <span className="chip"><span className="chip-label">Problem:</span> Keeping a function reference stable between renders</span>
          <span className="chip"><span className="chip-label">Key APIs:</span> <code>useCallback</code>, <code>React.memo</code></span>
        </div>
      </header>

      {/* Main Grid: Interactive Demo & Real-Time Console Stream */}
      <div className="lesson-split-grid">
        {/* Left Column: Interactive Playground */}
        <div className="card glass-card">
          <div className="card-header">
            <h2 className="card-title">
              <span className="icon">⚡</span> Interactive Callback Playground
            </h2>
            <div className="mode-toggle-group">
              <span className="toggle-label">Mode:</span>
              <button
                type="button"
                className={`toggle-option-btn ${useCallbackEnabled ? "active" : ""}`}
                onClick={() => setUseCallbackEnabled(true)}
              >
                With useCallback (Memoized)
              </button>
              <button
                type="button"
                className={`toggle-option-btn ${!useCallbackEnabled ? "active-warning" : ""}`}
                onClick={() => setUseCallbackEnabled(false)}
              >
                Without useCallback
              </button>
            </div>
          </div>

          <div className="usecallback-stage">
            {/* Parent Component Container */}
            <div className="parent-box-container">
              <div className="box-header-row">
                <span className="box-title">Parent Component: <code>&lt;App /&gt;</code></span>
                <span className="render-meter-badge">
                  Parent Renders: <strong>{parentRenderCountRef.current}</strong>
                </span>
              </div>

              {/* State 1: Count */}
              <div className="state-control-card">
                <div className="state-info">
                  <span className="state-var">State: <code>count</code></span>
                  <span className="state-val-badge">{count}</span>
                </div>
                <button
                  type="button"
                  id="increase-count-btn"
                  className="btn-primary"
                  onClick={() => setCount((c) => c + 1)}
                >
                  ➕ Increase Count
                </button>
              </div>

              {/* State 2: Name */}
              <div className="state-control-card">
                <div className="state-info">
                  <span className="state-var">State: <code>name</code></span>
                  <span className="state-val-badge">"{name}"</span>
                </div>
                <button
                  type="button"
                  id="change-name-btn"
                  className="btn-secondary"
                  onClick={() => setName(name === "Rahul" ? "Amit" : "Rahul")}
                >
                  🔄 Change Name ({name === "Rahul" ? "Amit" : "Rahul"})
                </button>
              </div>

              <div className="divider-line">
                <span>Child Component boundary (<code>memo</code>)</span>
              </div>

              {/* Child Component Area */}
              <div className="child-container-row">
                <div className="child-render-meter">
                  Child Renders: <strong>{childRenderCountRef.current}</strong>
                  {useCallbackEnabled ? (
                    <span className="opt-tag success">Protected by useCallback</span>
                  ) : (
                    <span className="opt-tag warning">Re-rendering on every parent update!</span>
                  )}
                </div>

                <Child 
                  onClick={activeHandleClick} 
                  onRender={handleChildRender} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Console & Render Stream */}
        <div className="card glass-card">
          <div className="card-header">
            <h2 className="card-title">
              <span className="icon">📟</span> Live Render Activity Stream
            </h2>
            <button
              type="button"
              className="clear-logs-btn"
              onClick={clearLogs}
              title="Clear activity log"
            >
              Clear Log
            </button>
          </div>

          <div className="render-comparison-summary">
            <div className={`summary-card ${useCallbackEnabled ? "highlight-success" : "highlight-warning"}`}>
              <div className="summary-title">
                {useCallbackEnabled ? "🛡️ useCallback ACTIVE" : "⚠️ Plain Function ACTIVE"}
              </div>
              <p className="summary-desc">
                {useCallbackEnabled
                  ? "handleClick maintains a stable memory reference between renders. React.memo successfully skips re-rendering <Child />."
                  : "A new handleClick function is created on every parent render. Its memory reference changes, causing React.memo to fail and Child to re-render!"}
              </p>
            </div>
          </div>

          <div className="terminal-screen">
            <div className="terminal-header">
              <span className="terminal-dot red"></span>
              <span className="terminal-dot yellow"></span>
              <span className="terminal-dot green"></span>
              <span className="terminal-title">Console Output Stream</span>
            </div>
            <div className="terminal-body">
              {logs.length === 0 ? (
                <div className="terminal-empty">
                  Click "Increase Count" or "Change Name" above to observe render logs in real-time.
                </div>
              ) : (
                logs.map((log) => (
                  <div key={log.id} className={`log-line log-${log.type}`}>
                    <span className="log-time">[{log.time}]</span>{" "}
                    <span className="log-badge">{log.type.toUpperCase()}</span>{" "}
                    <span className="log-msg">{log.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="alert-box tip-alert mt-4">
            <div className="alert-title">💡 Demo Tip from Hands-On Guide</div>
            <p className="alert-text">
              Notice in the activity stream: with <code>useCallback</code>, clicking "Increase Count" only triggers "Parent component rendered". The child component render count stays frozen! Toggle to "Without useCallback" and notice Child re-renders immediately.
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step Breakdown */}
      <div className="card info-card">
        <h3 className="section-subtitle">How it works (Step-by-Step)</h3>
        <div className="steps-list">
          <div className="step-item">
            <div className="step-num">1</div>
            <div className="step-content">
              <strong>Normal React behavior:</strong> Every time <code>App</code> renders, React normally creates completely new copies of any functions defined inside it.
            </div>
          </div>
          <div className="step-item">
            <div className="step-num">2</div>
            <div className="step-content">
              <strong>useCallback stabilizes the reference:</strong> <code>useCallback</code> returns the exact same function reference across renders because its dependency array <code>[]</code> is empty.
            </div>
          </div>
          <div className="step-item">
            <div className="step-num">3</div>
            <div className="step-content">
              <strong>memo(Child) performs shallow comparison:</strong> <code>memo(Child)</code> compares previous props with new props. Since <code>handleClick</code> is identical by reference, React skips rendering <code>Child</code>!
            </div>
          </div>
          <div className="step-item">
            <div className="step-num">4</div>
            <div className="step-content">
              <strong>Verified in console:</strong> Clicking Increase Count or Change Name logs "Parent component rendered" but NOT "Child component rendered".
            </div>
          </div>
          <div className="step-item">
            <div className="step-num">5</div>
            <div className="step-content">
              <strong>Without useCallback:</strong> <code>handleClick</code> would be a new reference on each render, causing <code>Child</code> to re-render every time.
            </div>
          </div>
        </div>
      </div>

      {/* Code Viewer Section */}
      <div className="card glass-card">
        <div className="card-header">
          <h2 className="card-title">
            <span className="icon">💻</span> Lesson Code & File Structure
          </h2>
          <span className="file-tree-tag">src/App.jsx &amp; src/components/Child.jsx</span>
        </div>
        <CodeViewer files={lesson4Files} />
      </div>
    </div>
  );
}

export default Lesson4UseCallback;
