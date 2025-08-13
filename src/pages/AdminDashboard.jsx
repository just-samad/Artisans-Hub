import React, { useState } from "react";
import "./AdminDashboard.css";
import { FaTrash, FaCheck, FaSignOutAlt } from "react-icons/fa";

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", reason: "Multiple fake accounts" },
    { id: 2, name: "Jane Smith", reason: "Spamming" },
  ]);

  const [reports, setReports] = useState([
    { id: 1, report: "Offensive content", user: "Mike Brown" },
    { id: 2, report: "Fraudulent activity", user: "Sara Lee" },
  ]);

  const [activities, setActivities] = useState([
    "Deleted user: John Doe",
    "Resolved report: Offensive content",
  ]);

  const handleDeleteUser = (id, name) => {
    setUsers(users.filter((u) => u.id !== id));
    setActivities([`Deleted user: ${name}`, ...activities]);
  };

  const handleResolveReport = (id, report) => {
    setReports(reports.filter((r) => r.id !== id));
    setActivities([`Resolved report: ${report}`, ...activities]);
  };

  return (
    <div className="admin-dashboard">
      {/* Navbar */}
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </header>

      {/* Stats */}
      <section className="stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>1,245</p>
        </div>
        <div className="stat-card">
          <h3>Reports</h3>
          <p>{reports.length}</p>
        </div>
        <div className="stat-card">
          <h3>Active Sessions</h3>
          <p>342</p>
        </div>
        <div className="stat-card">
          <h3>Revenue</h3>
          <p>$12,450</p>
        </div>
      </section>

      {/* Content */}
      <div className="dashboard-grid">
        {/* Suspicious Users */}
        <div className="card">
          <h2>Suspicious Accounts</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Reason</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.reason}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteUser(u.id, u.name)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Reports */}
        <div className="card">
          <h2>Reports</h2>
          <table>
            <thead>
              <tr>
                <th>Report</th>
                <th>User</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id}>
                  <td>{r.report}</td>
                  <td>{r.user}</td>
                  <td>
                    <button
                      className="resolve-btn"
                      onClick={() => handleResolveReport(r.id, r.report)}
                    >
                      <FaCheck /> Resolve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Activity Feed */}
        <div className="card">
          <h2>Activity Feed</h2>
          <ul className="activity-feed">
            {activities.map((a, index) => (
              <li key={index}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
