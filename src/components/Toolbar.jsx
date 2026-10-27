import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

function Toolbar() {
  const { dark, setDark } = useContext(ThemeContext);
  return (
    <section className="toolbar-section">
      <p className="theme-status">Current theme: <strong>{dark ? "Dark" : "Light"}</strong></p>
      <button 
        type="button"
        id="toggle-theme-btn"
        className="btn-primary theme-btn"
        onClick={() => setDark(!dark)}
      >
        {dark ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode"}
      </button>
    </section>
  );
}

export default Toolbar;
