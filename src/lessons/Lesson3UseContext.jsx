import { useState } from "react";
import Toolbar from "../components/Toolbar";
import { ThemeContext } from "../ThemeContext";
import CodeViewer from "../components/CodeViewer";

const lesson3Files = [
  {
    filename: "src/App.jsx",
    code: `import { createContext, useState } from "react";
import Toolbar from "./components/Toolbar";

const ThemeContext = createContext();

function App() {
  const [dark, setDark] = useState(false);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <main
        style={{
          background: dark ? "#222" : "#fff",
          color: dark ? "#fff" : "#222",
          padding: "30px",
          minHeight: "250px"
        }}
      >
        <h1>useContext Demo</h1>
        <Toolbar />
      </main>
    </ThemeContext.Provider>
  );
}

export { ThemeContext };
export default App;`
  },
  {
    filename: "src/components/Toolbar.jsx",
    code: `import { useContext } from "react";
import { ThemeContext } from "../App";

function Toolbar() {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <section>
      <p>Current theme: {dark ? "Dark" : "Light"}</p>
      <button onClick={() => setDark(!dark)}>
        Toggle Theme
      </button>
    </section>
  );
}

export default Toolbar;`
  },
  {
    filename: "src/ThemeContext.js (Best Practice)",
    code: `import { createContext } from "react";

// Eliminates circular dependency between App.jsx and Toolbar.jsx
export const ThemeContext = createContext();

export default ThemeContext;`
  }
];

function Lesson3UseContext() {
  const [dark, setDark] = useState(false);

  return (
    <div className="lesson-container">
      {/* Lesson Header */}
      <header className="lesson-header">
        <div className="lesson-badge">Lesson 3 • Context API</div>
        <h1 className="lesson-title">useContext</h1>
        <p className="lesson-subtitle">
          <code>useContext</code> lets nested components read shared data without receiving it as props at every level, completely eliminating "prop drilling".
        </p>
        <div className="lesson-meta-chips">
          <span className="chip"><span className="chip-label">Problem:</span> Passing data through many levels of components</span>
          <span className="chip"><span className="chip-label">Key APIs:</span> <code>createContext</code>, <code>useContext</code></span>
        </div>
      </header>

      {/* Main Grid: Interactive Demo & Architecture */}
      <div className="lesson-split-grid">
        {/* Left Column: Live Interactive Demo */}
        <div className="card glass-card">
          <div className="card-header">
            <h2 className="card-title">
              <span className="icon">🎨</span> Live Theme Demo
            </h2>
            <span className="live-pill">Context Consumer</span>
          </div>

          <div className="context-demo-shell">
            <div className="provider-header-banner">
              <code>&lt;ThemeContext.Provider value=&#123;&#123; dark, setDark &#125;&#125;&gt;</code>
            </div>

            <ThemeContext.Provider value={{ dark, setDark }}>
              <div 
                className="theme-sandbox-screen"
                style={{
                  background: dark ? "#111827" : "#f8fafc",
                  color: dark ? "#f9fafb" : "#111827",
                  borderColor: dark ? "#374151" : "#e2e8f0"
                }}
              >
                <div className="demo-content-wrapper">
                  <div className="theme-meta-bar">
                    <span className="mode-tag">{dark ? "🌙 Dark Mode Active" : "☀️ Light Mode Active"}</span>
                    <span className="no-props-badge">0 Props Passed to Toolbar</span>
                  </div>

                  <h1 className="theme-demo-title">useContext Demo</h1>
                  <p className="theme-demo-desc">
                    Notice that the container styling and the nested <code>Toolbar</code> component both adapt smoothly when you click the button below!
                  </p>

                  <div className="toolbar-wrapper">
                    <Toolbar />
                  </div>
                </div>
              </div>
            </ThemeContext.Provider>

            <div className="provider-footer-banner">
              <code>&lt;/ThemeContext.Provider&gt;</code>
            </div>
          </div>
        </div>

        {/* Right Column: Prop Drilling vs Context Comparison */}
        <div className="card glass-card">
          <div className="card-header">
            <h2 className="card-title">
              <span className="icon">⚡</span> Prop Drilling vs Context
            </h2>
            <span className="badge-purple">Direct Broadcast</span>
          </div>

          <div className="context-comparison-grid">
            {/* Without Context */}
            <div className="comparison-box negative-box">
              <h4 className="comp-title">❌ Without Context (Prop Drilling)</h4>
              <div className="comp-tree">
                <div className="tree-node">App (holds theme state)</div>
                <div className="tree-arrow">↓ pass theme prop</div>
                <div className="tree-node middle-node">Layout (doesn't care about theme)</div>
                <div className="tree-arrow">↓ pass theme prop</div>
                <div className="tree-node middle-node">Header (doesn't care about theme)</div>
                <div className="tree-arrow">↓ pass theme prop</div>
                <div className="tree-node target-node">Toolbar (finally uses theme)</div>
              </div>
              <p className="comp-footnote">Every intermediate component is forced to accept and pass unused props.</p>
            </div>

            {/* With Context */}
            <div className="comparison-box positive-box">
              <h4 className="comp-title">✅ With Context (Direct Access)</h4>
              <div className="comp-tree">
                <div className="tree-node provider-node">&lt;ThemeContext.Provider&gt; (App)</div>
                <div className="tree-direct-bridge">⚡ Direct Teleportation via Context</div>
                <div className="tree-node middle-node ghost-node">Intermediate Components (Bypassed!)</div>
                <div className="tree-direct-bridge">⚡ Direct Teleportation via Context</div>
                <div className="tree-node target-node consumer-node">useContext(ThemeContext) (Toolbar)</div>
              </div>
              <p className="comp-footnote"><code>Toolbar</code> subscribes directly to the context value anywhere in the subtree.</p>
            </div>
          </div>

          <div className="alert-box tip-alert mt-4">
            <div className="alert-title">💡 Architecture Tip from Guide</div>
            <p className="alert-text">
              In a beginner example, <code>App.jsx</code> and <code>Toolbar.jsx</code> often import each other, which works but creates a circular dependency. In production apps, define the context in a dedicated file like <code>src/ThemeContext.js</code> and import it wherever needed!
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
              <strong>createContext():</strong> Creates a context object that will hold the theme state and updater function.
            </div>
          </div>
          <div className="step-item">
            <div className="step-num">2</div>
            <div className="step-content">
              <strong>Provider provides the value:</strong> <code>&lt;ThemeContext.Provider value=&#123;&#123; dark, setDark &#125;&#125;&gt;</code> makes the data accessible to any component in the child tree.
            </div>
          </div>
          <div className="step-item">
            <div className="step-num">3</div>
            <div className="step-content">
              <strong>useContext() reads the value:</strong> <code>const &#123; dark, setDark &#125; = useContext(ThemeContext)</code> reads the current value directly from the nearest provider.
            </div>
          </div>
          <div className="step-item">
            <div className="step-num">4</div>
            <div className="step-content">
              <strong>Button updates state:</strong> Clicking the button calls <code>setDark(!dark)</code>, updating the parent state in <code>App</code>.
            </div>
          </div>
          <div className="step-item">
            <div className="step-num">5</div>
            <div className="step-content">
              <strong>Consumer components re-render:</strong> React re-renders any component consuming <code>ThemeContext</code>, instantly updating the theme styling and text!
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
          <span className="file-tree-tag">src/App.jsx &amp; src/components/Toolbar.jsx</span>
        </div>
        <CodeViewer files={lesson3Files} />
      </div>
    </div>
  );
}

export default Lesson3UseContext;
