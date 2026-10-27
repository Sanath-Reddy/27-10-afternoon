import { useState } from "react";
import Toolbar from "../../components/Toolbar";
import { ThemeContext } from "../../ThemeContext";

function Lesson3App() {
  const [dark, setDark] = useState(false);
  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <main
        className="standalone-app-container theme-preview-box"
        style={{
          background: dark ? "#18181b" : "#ffffff",
          color: dark ? "#fafafa" : "#18181b",
          padding: "30px",
          minHeight: "250px",
          borderRadius: "16px",
          border: dark ? "1px solid #27272a" : "1px solid #e4e4e7",
          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease"
        }}
      >
        <h1>useContext Demo</h1>
        <Toolbar />
      </main>
    </ThemeContext.Provider>
  );
}

export { ThemeContext };
export default Lesson3App;
