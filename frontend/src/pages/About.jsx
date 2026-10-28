function About() {
  return (
    <div className="page-card about-page">
      <div className="page-icon">💡</div>
      <h1>About Page</h1>
      <p className="page-desc">
        This is the About view. React Router matched the <code>/about</code> path and rendered this component while the shell remained active.
      </p>
    </div>
  );
}

export default About;
