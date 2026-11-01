import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <nav className="home-navbar">
        <a href="/" className="home-brand">
          <span className="brand-mark">A</span>
          <span>ApplyMate</span>
        </a>

        <div className="home-nav-links">
          <a href="/login">Login</a>
          <a href="/register" className="home-nav-button">
            Get started
          </a>
        </div>
      </nav>

      <main>
        <section className="home-hero">
          <p className="hero-label">JOB APPLICATION TRACKER</p>

          <h1>
            Keep your job search
            <span> under control.</span>
          </h1>

          <p className="hero-description">
            ApplyMate gives you one simple place to track the jobs you've
            applied for, manage interview progress, and keep moving forward.
          </p>

          <div className="hero-actions">
            <a href="/register" className="hero-primary">
              Create your account
            </a>

            <a href="/login" className="hero-secondary">
              Sign in
            </a>
          </div>
        </section>

        <section className="home-features" aria-label="ApplyMate features">
          <article className="feature">
            <span className="feature-number">01</span>
            <h2>One place for every application</h2>
            <p>
              Keep your job applications organized in one simple tracker instead
              of scattered notes and spreadsheets.
            </p>
          </article>

          <article className="feature">
            <span className="feature-number">02</span>
            <h2>Know where you stand</h2>
            <p>
              Track applications by status and see your progress throughout your
              job search.
            </p>
          </article>

          <article className="feature">
            <span className="feature-number">03</span>
            <h2>Stay organized</h2>
            <p>
              Update application details, review your progress, and keep
              everything in one place.
            </p>
          </article>
        </section>
      </main>

      <footer className="home-footer">
        <span>© 2026 ApplyMate</span>
        <span>Built for a better job search.</span>
      </footer>
    </div>
  );
}

export default Home;
