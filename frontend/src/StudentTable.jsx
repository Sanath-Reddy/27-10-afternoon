function StudentTable({ students, onDelete }) {
  if (students.length === 0) {
    return (
      <div className="state-box empty-state">
        <div className="empty-icon">📭</div>
        <p>No students yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="student-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>USN</th>
            <th>Email</th>
            <th>Dept</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, idx) => (
            <tr key={student._id} className="table-row">
              <td className="td-num">{idx + 1}</td>
              <td className="td-name">
                <div className="avatar">{student.name.charAt(0).toUpperCase()}</div>
                {student.name}
              </td>
              <td><code className="usn-code">{student.usn}</code></td>
              <td className="td-email">{student.email}</td>
              <td>
                <span className={`dept-badge dept-${student.department}`}>
                  {student.department}
                </span>
              </td>
              <td>
                <button
                  id={`btn-delete-${student._id}`}
                  className="btn-delete"
                  onClick={() => onDelete(student._id)}
                  title={`Delete ${student.name}`}
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
