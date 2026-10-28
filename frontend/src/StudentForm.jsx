import { useState } from "react";

const DEPARTMENTS = ["CSE", "ISE", "ECE", "ME"];

const EMPTY = { name: "", usn: "", email: "", department: "CSE" };

function StudentForm({ onAdd }) {
  const [form, setForm]       = useState(EMPTY);
  const [submitting, setSub]  = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSub(true);
    await onAdd(form);
    setForm(EMPTY);
    setSub(false);
  }

  return (
    <form id="student-form" onSubmit={handleSubmit} className="student-form">
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="field-name">Full Name</label>
          <input
            id="field-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Asha Sharma"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="field-usn">USN</label>
          <input
            id="field-usn"
            type="text"
            name="usn"
            value={form.usn}
            onChange={handleChange}
            placeholder="e.g. 1RV23CS001"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="field-email">Email</label>
          <input
            id="field-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="e.g. asha@mail.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="field-department">Department</label>
          <select
            id="field-department"
            name="department"
            value={form.department}
            onChange={handleChange}
          >
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        id="btn-save"
        type="submit"
        className="btn-primary"
        disabled={submitting}
      >
        {submitting ? "Saving…" : "Save Student"}
      </button>
    </form>
  );
}

export default StudentForm;
