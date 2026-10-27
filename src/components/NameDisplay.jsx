function NameDisplay({ name }) {
  return (
    <section className="demo-box display-section">
      <h3>Greeting Output</h3>
      <h2 className="greeting-text">Hello, <span className="highlight-name">{name || "..."}</span>!</h2>
    </section>
  );
}

export default NameDisplay;
