function NameInput({ name, setName }) {
  return (
    <section className="demo-box input-section">
      <h3>Change Name</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
        className="form-input"
        id="name-input"
      />
    </section>
  );
}

export default NameInput;
