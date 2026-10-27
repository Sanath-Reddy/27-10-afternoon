import { useState } from "react";
import NameInput from "../components/NameInput";
import NameDisplay from "../components/NameDisplay";
import CodeViewer from "../components/CodeViewer";

const lesson1Files = [
  {
    filename: "src/App.jsx",
    code: `import { useState } from "react";
import NameInput from "./components/NameInput";
import NameDisplay from "./components/NameDisplay";

function App() {
  const [name, setName] = useState("Rahul");

  return (
    <main>
      <h1>Lifting State Up</h1>
      <NameInput name={name} setName={setName} />
      <NameDisplay name={name} />
    </main>
  );
}

export default App;`
  },
  {
    filename: "src/components/NameInput.jsx",
    code: `function NameInput({ name, setName }) {
  return (
    <section>
      <h2>Change Name</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
    </section>
  );
}

export default NameInput;`
  },
  {
    filename: "src/components/NameDisplay.jsx",
    code: `function NameDisplay({ name }) {
  return <h2>Hello, {name}!</h2>;
}

export default NameDisplay;`
  }
];

function Lesson1LiftingState() {
  const [name, setName] = useState("Rahul");
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  const handleNameChange = (newName) => {
    setName(newName);
    setLastUpdated(Date.now());
  };

  return (
    <div className="lesson-container">
      {/* Lesson Header */}
      <header className="lesson-header">
        <div className="lesson-badge">Lesson 1 • State Management</div>
        <h1 className="lesson-title">Lifting State Up</h1>
        <p className="lesson-subtitle">
          Sibling components cannot share state directly. When two or more siblings need access to the same piece of data, lift the state up to their closest common parent and pass it down as props.
        </p>
        <div className="lesson-meta-chips">
          <span className="chip"><span className="chip-label">Problem:</span> Sibling components need the same data</span>
          <span className="chip"><span className="chip-label">Key APIs:</span> <code>useState</code>, <code>props</code></span>
        </div>
      </header>

      {/* Main Grid: Interactive Demo & Visual Architecture */}
      <div className="lesson-split-grid">
        {/* Left Column: Live Interactive Demo */}
        <div className="card glass-card">
          <div className="card-header">
            <h2 className="card-title">
              <span className="icon">🎮</span> Live Interactive Demo
            </h2>
            <span className="live-pill">Live Execution</span>
          </div>

          <div className="demo-stage parent-container-box">
            <div className="parent-tag">
              <span className="dot"></span> Parent Component: <code>&lt;App /&gt;</code>
              <span className="state-badge">state: <code>name = "{name}"</code></span>
            </div>

            <div className="sibling-grid">
              {/* Sibling 1 */}
              <div className="sibling-column">
                <div className="component-label">
                  Sibling 1: <code>&lt;NameInput /&gt;</code>
                </div>
                <NameInput name={name} setName={handleNameChange} />
                <div className="prop-flow-note">
                  Receives: <code>name</code> and <code>setName</code>
                </div>
              </div>

              {/* Sibling 2 */}
              <div className="sibling-column">
                <div className="component-label">
                  Sibling 2: <code>&lt;NameDisplay /&gt;</code>
                </div>
                <NameDisplay name={name} />
                <div className="prop-flow-note">
                  Receives: <code>name</code>
                </div>
              </div>
            </div>

            <div className="demo-controls-bar">
              <span className="quick-label">Try quick presets:</span>
              <button 
                type="button" 
                className="chip-btn" 
                onClick={() => handleNameChange("Rahul")}
              >
                Rahul
              </button>
              <button 
                type="button" 
                className="chip-btn" 
                onClick={() => handleNameChange("Aarav")}
              >
                Aarav
              </button>
              <button 
                type="button" 
                className="chip-btn" 
                onClick={() => handleNameChange("Priya")}
              >
                Priya
              </button>
              <button 
                type="button" 
                className="chip-btn" 
                onClick={() => handleNameChange("Ananya")}
              >
                Ananya
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Data Flow Diagram */}
        <div className="card glass-card">
          <div className="card-header">
            <h2 className="card-title">
              <span className="icon">🔄</span> Data Flow Architecture
            </h2>
            <span className="badge-purple">One-Way Data Flow</span>
          </div>

          <div className="architecture-diagram">
            <div className="diagram-node parent-node highlight-pulse">
              <div className="node-badge">Parent Component</div>
              <div className="node-title">App.jsx</div>
              <div className="node-detail">
                <code>const [name, setName] = useState("{name}")</code>
              </div>
            </div>

            <div className="diagram-arrows">
              <div className="arrow-branch left-branch">
                <span className="arrow-label">props: <code>name, setName</code> ↓</span>
                <div className="arrow-line"></div>
              </div>
              <div className="arrow-branch right-branch">
                <span className="arrow-label">props: <code>name</code> ↓</span>
                <div className="arrow-line"></div>
              </div>
            </div>

            <div className="diagram-children-grid">
              <div className="diagram-node child-node">
                <div className="node-badge">Sibling 1 (Writer)</div>
                <div className="node-title">&lt;NameInput /&gt;</div>
                <p className="node-desc">Calls <code>setName(newVal)</code> when the input changes.</p>
                <div className="arrow-reverse">↑ State update triggers re-render</div>
              </div>

              <div className="diagram-node child-node">
                <div className="node-badge">Sibling 2 (Reader)</div>
                <div className="node-title">&lt;NameDisplay /&gt;</div>
                <p className="node-desc">Re-renders automatically with fresh <code>name</code> prop.</p>
                <div className="output-chip">Displays: "Hello, {name}!"</div>
              </div>
            </div>
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
              <strong>App owns the state:</strong> <code>App</code> initializes <code>[name, setName]</code> using <code>useState("Rahul")</code>.
            </div>
          </div>
          <div className="step-item">
            <div className="step-num">2</div>
            <div className="step-content">
              <strong>Props pass down:</strong> <code>App</code> passes <code>name</code> and <code>setName</code> to <code>NameInput</code>, and passes <code>name</code> to <code>NameDisplay</code>.
            </div>
          </div>
          <div className="step-item">
            <div className="step-num">3</div>
            <div className="step-content">
              <strong>Input triggers update:</strong> When the user types into the input, <code>NameInput</code> calls <code>setName(e.target.value)</code>.
            </div>
          </div>
          <div className="step-item">
            <div className="step-num">4</div>
            <div className="step-content">
              <strong>React updates & re-renders:</strong> React updates the state in <code>App</code> and efficiently re-renders both child components.
            </div>
          </div>
          <div className="step-item">
            <div className="step-num">5</div>
            <div className="step-content">
              <strong>Display reflects change:</strong> <code>NameDisplay</code> receives the updated <code>name</code> prop and immediately reflects the new text.
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
          <span className="file-tree-tag">src/App.jsx &amp; src/components/</span>
        </div>
        <CodeViewer files={lesson1Files} />
      </div>
    </div>
  );
}

export default Lesson1LiftingState;
