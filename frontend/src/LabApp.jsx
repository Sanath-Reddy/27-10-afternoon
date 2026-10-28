import { useState } from "react";
import Lesson1LiftingState from "./lessons/Lesson1LiftingState";
import Lesson2ReactRouter from "./lessons/Lesson2ReactRouter";
import Lesson3UseContext from "./lessons/Lesson3UseContext";
import Lesson4UseCallback from "./lessons/Lesson4UseCallback";
import QuickReference from "./lessons/QuickReference";
import Lesson1App from "./lessons/standalone/Lesson1App";
import Lesson2App from "./lessons/standalone/Lesson2App";
import Lesson3App from "./lessons/standalone/Lesson3App";
import Lesson4App from "./lessons/standalone/Lesson4App";
import { ThemeContext } from "./ThemeContext";

// Re-export ThemeContext from App as required by the docx example (src/components/Toolbar.jsx imports from ../App)
export { ThemeContext };

function App() {
  const [activeTab, setActiveTab] = useState("lesson1"); // lesson1, lesson2, lesson3, lesson4, quickref, standalone
  const [standaloneLesson, setStandaloneLesson] = useState(1);

  return (
    <div className="app-wrapper">
      {/* Top Navbar */}
      <nav className="app-navbar">
        <div className="nav-inner">
          <div className="brand-section">
            <div className="brand-logo-icon">⚛️</div>
            <div className="brand-title-wrap">
              <h1>
                React Hands-On Lab
                <span className="brand-badge">Core Patterns</span>
              </h1>
            </div>
          </div>

          <div className="tab-navigation">
            <button
              type="button"
              id="tab-lesson1"
              className={`tab-btn ${activeTab === "lesson1" ? "active" : ""}`}
              onClick={() => setActiveTab("lesson1")}
            >
              <span>1.</span> Lifting State
            </button>
            <button
              type="button"
              id="tab-lesson2"
              className={`tab-btn ${activeTab === "lesson2" ? "active" : ""}`}
              onClick={() => setActiveTab("lesson2")}
            >
              <span>2.</span> React Router
            </button>
            <button
              type="button"
              id="tab-lesson3"
              className={`tab-btn ${activeTab === "lesson3" ? "active" : ""}`}
              onClick={() => setActiveTab("lesson3")}
            >
              <span>3.</span> useContext
            </button>
            <button
              type="button"
              id="tab-lesson4"
              className={`tab-btn ${activeTab === "lesson4" ? "active" : ""}`}
              onClick={() => setActiveTab("lesson4")}
            >
              <span>4.</span> useCallback
            </button>
            <button
              type="button"
              id="tab-quickref"
              className={`tab-btn ${activeTab === "quickref" ? "active" : ""}`}
              onClick={() => setActiveTab("quickref")}
            >
              📊 Quick Reference
            </button>
            <button
              type="button"
              id="tab-standalone"
              className={`tab-btn standalone-btn ${activeTab === "standalone" ? "active" : ""}`}
              onClick={() => setActiveTab("standalone")}
              title="Run verbatim isolated code as written in docx"
            >
              🧪 Standalone Mode
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === "lesson1" && <Lesson1LiftingState />}
        {activeTab === "lesson2" && <Lesson2ReactRouter />}
        {activeTab === "lesson3" && <Lesson3UseContext />}
        {activeTab === "lesson4" && <Lesson4UseCallback />}
        {activeTab === "quickref" && (
          <QuickReference
            onSelectLesson={(num) => setActiveTab(`lesson${num}`)}
          />
        )}
        {activeTab === "standalone" && (
          <div className="lesson-container">
            <header className="lesson-header">
              <div className="lesson-badge">Isolated Execution Mode</div>
              <h1 className="lesson-title">Standalone Verbatim Runners</h1>
              <p className="lesson-subtitle">
                Switch between exact, unadorned versions of each lesson's <code>App.jsx</code> matching the precise files and imports described in <code>react hands-on.docx</code>.
              </p>
            </header>

            <div className="standalone-mode-bar">
              <div className="standalone-mode-info">
                <h3>Select Isolated Lesson</h3>
                <p>Loads the exact minimal App component without surrounding laboratory chrome.</p>
              </div>

              <div className="standalone-buttons-row">
                <button
                  type="button"
                  className={`btn-secondary ${standaloneLesson === 1 ? "active" : ""}`}
                  onClick={() => setStandaloneLesson(1)}
                >
                  Lesson 1 (Lifting State)
                </button>
                <button
                  type="button"
                  className={`btn-secondary ${standaloneLesson === 2 ? "active" : ""}`}
                  onClick={() => setStandaloneLesson(2)}
                >
                  Lesson 2 (Router)
                </button>
                <button
                  type="button"
                  className={`btn-secondary ${standaloneLesson === 3 ? "active" : ""}`}
                  onClick={() => setStandaloneLesson(3)}
                >
                  Lesson 3 (useContext)
                </button>
                <button
                  type="button"
                  className={`btn-secondary ${standaloneLesson === 4 ? "active" : ""}`}
                  onClick={() => setStandaloneLesson(4)}
                >
                  Lesson 4 (useCallback)
                </button>
              </div>
            </div>

            <div className="standalone-viewport">
              {standaloneLesson === 1 && <Lesson1App />}
              {standaloneLesson === 2 && <Lesson2App />}
              {standaloneLesson === 3 && <Lesson3App />}
              {standaloneLesson === 4 && <Lesson4App />}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-inner">
          <div>
            <strong>React Hands-On Lab</strong> • Built from <code>react hands-on.docx</code>
          </div>
          <div>
            Four Practical React Patterns: <em>Lifting State Up, React Router, useContext, useCallback</em>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
