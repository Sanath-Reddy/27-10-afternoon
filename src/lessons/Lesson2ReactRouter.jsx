import { useState } from "react";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import CodeViewer from "../components/CodeViewer";

const lesson2Files = [
  {
    filename: "src/App.jsx",
    code: `import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>{" | "}
        <Link to="/about">About</Link>{" | "}
        <Link to="/contact">Contact</Link>
      </nav>
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;`
  },
  {
    filename: "src/pages/Home.jsx",
    code: `function Home() {
  return <h1>Home Page</h1>;
}

export default Home;`
  },
  {
    filename: "src/pages/About.jsx",
    code: `function About() {
  return <h1>About Page</h1>;
}

export default About;`
  },
  {
    filename: "src/pages/Contact.jsx",
    code: `function Contact() {
  return <h1>Contact Page</h1>;
}

export default Contact;`
  }
];

function Lesson2ReactRouter() {
  const [currentPath, setCurrentPath] = useState("/");
  const [history, setHistory] = useState(["/"]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const navigateTo = (path) => {
    if (path === currentPath) return;
    const newHistory = [...history.slice(0, historyIndex + 1), path];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentPath(path);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const newIdx = historyIndex - 1;
      setHistoryIndex(newIdx);
      setCurrentPath(history[newIdx]);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const newIdx = historyIndex + 1;
      setHistoryIndex(newIdx);
      setCurrentPath(history[newIdx]);
    }
  };

  // Render the matching route element
  const renderCurrentRoute = () => {
    switch (currentPath) {
      case "/":
        return <Home />;
      case "/about":
        return <About />;
      case "/contact":
        return <Contact />;
      default:
        return (
          <div className="page-card not-found-page">
            <h2>404 - Not Found</h2>
            <p>No route matched <code>{currentPath}</code></p>
          </div>
        );
    }
  };

  return (
    <div className="lesson-container">
      {/* Lesson Header */}
      <header className="lesson-header">
        <div className="lesson-badge">Lesson 2 • Client-Side Routing</div>
        <h1 className="lesson-title">React Router</h1>
        <p className="lesson-subtitle">
          React Router swaps which page component is shown based on the URL, while the React app stays loaded without a full browser reload.
        </p>
        <div className="lesson-meta-chips">
          <span className="chip"><span className="chip-label">Problem:</span> Multiple pages without full page reloads</span>
          <span className="chip"><span className="chip-label">Key APIs:</span> <code>BrowserRouter</code>, <code>Routes</code>, <code>Route</code>, <code>Link</code></span>
        </div>
      </header>

      {/* Main Grid: Interactive Router Simulator & Route Matching Table */}
      <div className="lesson-split-grid">
        {/* Left Column: Simulated Browser & Router Navigation */}
        <div className="card glass-card">
          <div className="card-header">
            <h2 className="card-title">
              <span className="icon">🌐</span> Interactive Router Sandbox
            </h2>
            <span className="live-pill">SPA Live Mode</span>
          </div>

          <div className="browser-mockup">
            {/* Simulated Browser Address Bar */}
            <div className="browser-bar">
              <div className="browser-nav-btns">
                <button 
                  type="button" 
                  className="browser-btn" 
                  onClick={handleBack} 
                  disabled={historyIndex <= 0}
                  title="Back"
                >
                  ←
                </button>
                <button 
                  type="button" 
                  className="browser-btn" 
                  onClick={handleForward} 
                  disabled={historyIndex >= history.length - 1}
                  title="Forward"
                >
                  →
                </button>
                <button 
                  type="button" 
                  className="browser-btn refresh-btn" 
                  onClick={() => {}}
                  title="SPA: No reload necessary!"
                >
                  ↻
                </button>
              </div>

              <div className="url-address-bar">
                <span className="protocol">https://react-demo.local</span>
                <span className="path-highlight">{currentPath}</span>
              </div>

              <span className="spa-indicator">0 Full Reloads</span>
            </div>

            {/* App Nav from Lesson Code */}
            <div className="router-app-body">
              <nav className="router-navigation-bar">
                <button
                  type="button"
                  className={`nav-link-btn ${currentPath === "/" ? "active" : ""}`}
                  onClick={() => navigateTo("/")}
                >
                  Home
                </button>
                <span className="nav-separator">|</span>
                <button
                  type="button"
                  className={`nav-link-btn ${currentPath === "/about" ? "active" : ""}`}
                  onClick={() => navigateTo("/about")}
                >
                  About
                </button>
                <span className="nav-separator">|</span>
                <button
                  type="button"
                  className={`nav-link-btn ${currentPath === "/contact" ? "active" : ""}`}
                  onClick={() => navigateTo("/contact")}
                >
                  Contact
                </button>
              </nav>

              <hr className="divider" />

              {/* Matched Route Viewport */}
              <div className="route-viewport-container">
                <div className="viewport-badge">
                  Active Route: <code>Route path="{currentPath}"</code>
                </div>
                {renderCurrentRoute()}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Key Concepts & Route Table */}
        <div className="card glass-card">
          <div className="card-header">
            <h2 className="card-title">
              <span className="icon">🗺️</span> How It Works: Piece &amp; Role
            </h2>
            <span className="badge-purple">Routing Architecture</span>
          </div>

          <div className="table-responsive">
            <table className="router-role-table">
              <thead>
                <tr>
                  <th>Piece</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="active-row">
                  <td><code>BrowserRouter</code></td>
                  <td>Enables browser-based client-side routing and history tracking.</td>
                  <td><span className="status-badge success">Active</span></td>
                </tr>
                <tr className="active-row">
                  <td><code>Link</code></td>
                  <td>Navigates between URLs without a full browser reload.</td>
                  <td><span className="status-badge success">Active</span></td>
                </tr>
                <tr className="active-row">
                  <td><code>Routes</code></td>
                  <td>Selects and renders the best single route matching current URL.</td>
                  <td><span className="status-badge success">Active</span></td>
                </tr>
                <tr className={currentPath === "/" ? "highlight-tr" : ""}>
                  <td><code>Route path="/"</code></td>
                  <td>Renders <code>&lt;Home /&gt;</code> when URL is root.</td>
                  <td>{currentPath === "/" ? <span className="status-badge matched">MATCHED</span> : "Idle"}</td>
                </tr>
                <tr className={currentPath === "/about" ? "highlight-tr" : ""}>
                  <td><code>Route path="/about"</code></td>
                  <td>Renders <code>&lt;About /&gt;</code> when URL is /about.</td>
                  <td>{currentPath === "/about" ? <span className="status-badge matched">MATCHED</span> : "Idle"}</td>
                </tr>
                <tr className={currentPath === "/contact" ? "highlight-tr" : ""}>
                  <td><code>Route path="/contact"</code></td>
                  <td>Renders <code>&lt;Contact /&gt;</code> when URL is /contact.</td>
                  <td>{currentPath === "/contact" ? <span className="status-badge matched">MATCHED</span> : "Idle"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="alert-box tip-alert mt-4">
            <div className="alert-title">💡 Version Note from Course Guide</div>
            <p className="alert-text">
              The example in the guide imports from <code>react-router</code>. In React Router v6 or standard projects, imports frequently come from <code>react-router-dom</code>. Both packages are fully configured and supported in this project!
            </p>
          </div>
        </div>
      </div>

      {/* Code Viewer Section */}
      <div className="card glass-card">
        <div className="card-header">
          <h2 className="card-title">
            <span className="icon">💻</span> Lesson Code & File Structure
          </h2>
          <span className="file-tree-tag">src/App.jsx &amp; src/pages/</span>
        </div>
        <CodeViewer files={lesson2Files} />
      </div>
    </div>
  );
}

export default Lesson2ReactRouter;
