import { useState, useEffect } from "react";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";

// This is the API URL the backend must match exactly (as per the notes)
const API = "http://localhost:5000/api/students";

function App() {
  const [students, setStudents]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [formError, setFormError] = useState(null);
  const [success, setSuccess]     = useState(null);

  // ── Fetch all students ─────────────────────────────────────────────────────
  async function fetchStudents() {
    try {
      setLoading(true);
      setError(null);
      const res  = await fetch(API);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchStudents(); }, []);

  // ── Add a student ──────────────────────────────────────────────────────────
  async function handleAdd(formData) {
    setFormError(null);
    setSuccess(null);
    try {
      const res  = await fetch(API, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add student");
      setStudents((prev) => [...prev, data]);
      setSuccess(`${data.name} added successfully!`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setFormError(err.message);
    }
  }

  // ── Delete a student ───────────────────────────────────────────────────────
  async function handleDelete(id) {
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete");
      }
      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="app-root">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="app-header">
        <div className="header-inner">
          <div className="brand">
            <div className="brand-icon">🎓</div>
            <div>
              <h1 className="brand-title">StudentDesk</h1>
              <p className="brand-sub">Node.js · Express · MongoDB</p>
            </div>
          </div>
          <div className="header-badge">
            <span className="dot" />
            <span>{students.length} student{students.length !== 1 ? "s" : ""}</span>
          </div>
        </div>
      </header>

      <main className="main">
        {/* ── Add Student Form ──────────────────────────────────────────────── */}
        <section className="card form-card">
          <h2 className="section-title">
            <span className="title-icon">✚</span> Add Student
          </h2>
          {formError && (
            <div className="alert alert-error">
              <span>⚠</span> {formError}
            </div>
          )}
          {success && (
            <div className="alert alert-success">
              <span>✓</span> {success}
            </div>
          )}
          <StudentForm onAdd={handleAdd} />
        </section>

        {/* ── Students Table ─────────────────────────────────────────────────── */}
        <section className="card table-card">
          <div className="table-header-row">
            <h2 className="section-title">
              <span className="title-icon">📋</span> All Students
            </h2>
            <button
              id="btn-refresh"
              className="btn-refresh"
              onClick={fetchStudents}
              title="Refresh"
            >
              ⟳ Refresh
            </button>
          </div>

          {loading && (
            <div className="state-box">
              <div className="spinner" />
              <p>Loading students…</p>
            </div>
          )}
          {error && !loading && (
            <div className="alert alert-error" style={{ marginTop: "1rem" }}>
              <span>⚠</span> {error}
              <button className="btn-retry" onClick={fetchStudents}>Retry</button>
            </div>
          )}
          {!loading && !error && (
            <StudentTable students={students} onDelete={handleDelete} />
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>StudentDesk API → <code>http://localhost:5000/api/students</code></p>
      </footer>
    </div>
  );
}

export default App;
