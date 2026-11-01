import { useState, useEffect } from "react";
import "./Dashboard.css";

const API_URL = "http://localhost:5000/api";

function Dashboard() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");

  const [applications, setApplications] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/login";
          return;
        }

        const response = await fetch(`${API_URL}/applications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Could not load applications.");
          return;
        }

        setApplications(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Could not connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const clearForm = () => {
    setEditingId(null);
    setCompany("");
    setRole("");
    setStatus("Applied");
    setShowForm(false);
  };

  const handleAddApplication = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/applications/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ company, role, status }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Could not add application.");
        return;
      }

      setApplications((previous) => [...previous, data.application]);

      clearForm();
      setMessage("Application added successfully.");
    } catch (err) {
      console.error(err);
      setError("Could not connect to the server.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateApplication = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/applications/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ company, role, status }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Could not update application.");
        return;
      }

      setApplications((previous) =>
        previous.map((application) =>
          application._id === editingId ? data.application : application,
        ),
      );

      clearForm();
      setMessage("Application updated successfully.");
    } catch (err) {
      console.error(err);
      setError("Could not connect to the server.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteApplication = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?",
    );

    if (!confirmed) return;

    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/applications/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Could not delete application.");
        return;
      }

      setApplications((previous) =>
        previous.filter((application) => application._id !== id),
      );

      setMessage("Application deleted.");
    } catch (err) {
      console.error(err);
      setError("Could not connect to the server.");
    }
  };

  const handleEditApplication = (application) => {
    setMessage("");
    setError("");
    setEditingId(application._id);
    setCompany(application.company);
    setRole(application.role);
    setStatus(application.status);
    setShowForm(true);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const total = applications.length;

  const interviews = applications.filter(
    (application) => application.status === "Interview",
  );

  const offers = applications.filter(
    (application) => application.status === "Selected",
  ).length;

  const responded = applications.filter((application) =>
    ["Interview", "Rejected", "Selected"].includes(application.status),
  ).length;

  const responseRate = total === 0 ? 0 : Math.round((responded / total) * 100);

  const filteredApplications = applications.filter((application) => {
    const companyName = (application.company || "").toLowerCase();
    const jobRole = (application.role || "").toLowerCase();
    const searchText = search.toLowerCase();

    const matchesSearch =
      companyName.includes(searchText) || jobRole.includes(searchText);

    const matchesStatus =
      filterStatus === "All" || application.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const recentApplications = [...applications].slice(-4).reverse();

  const getInitial = (name) => (name || "?").trim().charAt(0).toUpperCase();

  return (
    <div className="dashboard">
      <header className="topbar">
        <a className="brand" href="/dashboard">
          <span className="brand-icon">A</span>
          <span>ApplyMate</span>
        </a>

        <nav className="top-navigation">
          <a className="nav-link active" href="/dashboard">
            <span aria-hidden="true">⌂</span>
            Dashboard
          </a>
          <a className="nav-link" href="#applications">
            <span aria-hidden="true">▤</span>
            My Applications
          </a>
          <a className="nav-link" href="#applications">
            <span aria-hidden="true">⌕</span>
            Search Applications
          </a>
        </nav>

        <div className="topbar-actions">
          <button
            className="primary-button"
            onClick={() => {
              setMessage("");
              setError("");
              clearForm();
              setShowForm(true);
              document.getElementById("application-form")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            <span aria-hidden="true">＋</span> Add Job
          </button>

          <button className="avatar" title="Sign out" onClick={handleLogout}>
            {getInitial(localStorage.getItem("userName") || "User")}
          </button>
        </div>
      </header>

      <section className="welcome-section">
        <div>
          <h1>Welcome back, Job Seeker! 👋</h1>
          <p>Here's your job search overview.</p>
        </div>
      </section>

      <main className="dashboard-content">
        {message && (
          <div className="notice success" role="status">
            {message}
          </div>
        )}

        {error && (
          <div className="notice error" role="alert">
            {error}
          </div>
        )}

        <section className="stats-grid" aria-label="Application statistics">
          <article className="stat-card">
            <div className="stat-card-top">
              <span>Applications</span>
              <span className="stat-icon blue">▤</span>
            </div>
            <strong className="stat-number">{total}</strong>
            <p>Total tracked applications</p>
          </article>

          <article className="stat-card">
            <div className="stat-card-top">
              <span>Interviews</span>
              <span className="stat-icon blue">▣</span>
            </div>
            <strong className="stat-number">{interviews.length}</strong>
            <p>Applications at interview stage</p>
          </article>

          <article className="stat-card">
            <div className="stat-card-top">
              <span>Offers</span>
              <span className="stat-icon green">✓</span>
            </div>
            <strong className="stat-number">{offers}</strong>
            <p>Selected applications</p>
          </article>

          <article className="stat-card">
            <div className="stat-card-top">
              <span>Response Rate</span>
              <span className="stat-icon purple">▥</span>
            </div>
            <strong className="stat-number">{responseRate}%</strong>
            <p>
              {responded} of {total} applications responded to
            </p>
          </article>
        </section>

        {showForm && (
          <section className="form-panel" id="application-form">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">
                  {editingId ? "EDIT APPLICATION" : "NEW APPLICATION"}
                </span>
                <h2>{editingId ? "Update application" : "Add a job"}</h2>
              </div>

              <button className="text-button" onClick={clearForm}>
                Close ✕
              </button>
            </div>

            <form
              className="application-form"
              onSubmit={
                editingId ? handleUpdateApplication : handleAddApplication
              }
            >
              <div className="form-field">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  type="text"
                  placeholder="e.g. Google"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="role">Job title</label>
                <input
                  id="role"
                  type="text"
                  placeholder="e.g. Software Engineer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Selected">Selected</option>
                </select>
              </div>

              <div className="form-actions">
                <button
                  className="primary-button"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting
                    ? "Saving..."
                    : editingId
                      ? "Save Changes"
                      : "Add Application"}
                </button>

                <button
                  className="secondary-button"
                  type="button"
                  onClick={clearForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="dashboard-panels">
          <article className="content-panel">
            <div className="panel-heading">
              <div className="panel-title-group">
                <span className="panel-icon interview-icon">▣</span>
                <h2>Interview Applications</h2>
              </div>
              <a className="view-link" href="#applications">
                View All →
              </a>
            </div>

            <div className="panel-body">
              {loading ? (
                <p className="empty-state">Loading interviews...</p>
              ) : interviews.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">▣</span>
                  <strong>No interviews yet</strong>
                  <p>Applications marked as Interview will appear here.</p>
                </div>
              ) : (
                interviews.slice(0, 4).map((application) => (
                  <div className="mini-application" key={application._id}>
                    <div className="company-logo">
                      {getInitial(application.company)}
                    </div>
                    <div className="mini-application-info">
                      <strong>{application.role}</strong>
                      <span>{application.company}</span>
                      <small>Interview stage</small>
                    </div>
                    <span className="status-pill status-interview">
                      Interview
                    </span>
                  </div>
                ))
              )}
            </div>
          </article>

          <article className="content-panel">
            <div className="panel-heading">
              <div className="panel-title-group">
                <span className="panel-icon recent-icon">▤</span>
                <h2>Recent Applications</h2>
              </div>
              <a className="view-link" href="#applications">
                View All →
              </a>
            </div>

            <div className="panel-body">
              {loading ? (
                <p className="empty-state">Loading applications...</p>
              ) : recentApplications.length === 0 ? (
                <div className="empty-state">
                  <strong>No applications yet</strong>
                  <p>Add your first job to get started.</p>
                  <button
                    className="primary-button"
                    onClick={() => setShowForm(true)}
                  >
                    Add Job
                  </button>
                </div>
              ) : (
                recentApplications.map((application) => (
                  <div className="mini-application" key={application._id}>
                    <div className="company-logo">
                      {getInitial(application.company)}
                    </div>
                    <div className="mini-application-info">
                      <strong>{application.role}</strong>
                      <span>{application.company}</span>
                      <small>
                        <span
                          className={`status-dot status-${(
                            application.status || "Applied"
                          ).toLowerCase()}`}
                        />
                        {application.status}
                      </small>
                    </div>
                    <button
                      className="small-edit-button"
                      onClick={() => handleEditApplication(application)}
                    >
                      Edit
                    </button>
                  </div>
                ))
              )}
            </div>
          </article>
        </section>

        <section className="content-panel all-applications" id="applications">
          <div className="panel-heading applications-toolbar">
            <div>
              <span className="eyebrow">YOUR TRACKER</span>
              <h2>My Applications</h2>
              <p>Search and manage the jobs you've applied for.</p>
            </div>

            <span className="total-badge">{total} total</span>
          </div>

          <div className="filter-bar">
            <input
              type="search"
              placeholder="Search company or job title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search applications"
            />

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              aria-label="Filter by status"
            >
              <option value="All">All statuses</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
              <option value="Selected">Selected</option>
            </select>
          </div>

          <div className="panel-body application-list">
            {loading ? (
              <p className="empty-state">Loading applications...</p>
            ) : filteredApplications.length === 0 ? (
              <div className="empty-state">
                <strong>No matching applications</strong>
                <p>Try a different search or status filter.</p>
              </div>
            ) : (
              filteredApplications.map((application) => (
                <article className="application-row" key={application._id}>
                  <div className="company-logo">
                    {getInitial(application.company)}
                  </div>

                  <div className="application-info">
                    <strong>{application.role}</strong>
                    <span>{application.company}</span>
                  </div>

                  <span
                    className={`status-pill status-${(
                      application.status || "Applied"
                    ).toLowerCase()}`}
                  >
                    {application.status}
                  </span>

                  <div className="row-actions">
                    <button
                      className="small-edit-button"
                      onClick={() => handleEditApplication(application)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteApplication(application._id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        <footer className="dashboard-footer">
          Built for your next opportunity · ApplyMate
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;
