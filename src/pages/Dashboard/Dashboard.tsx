import { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

interface Stats {
  total: number;
  open: number;
  inProgress: number;
  completed: number;
  blocked: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    open: 0,
    inProgress: 0,
    completed: 0,
    blocked: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/action-items/stats',
      );

      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total Action Items</h3>
          <h2>{stats.total}</h2>
        </div>

        <div className="stat-card">
          <h3>Open</h3>
          <h2>{stats.open}</h2>
        </div>

        <div className="stat-card">
          <h3>In Progress</h3>
          <h2>{stats.inProgress}</h2>
        </div>

        <div className="stat-card">
          <h3>Completed</h3>
          <h2>{stats.completed}</h2>
        </div>

        <div className="stat-card">
          <h3>Blocked</h3>
          <h2>{stats.blocked}</h2>
        </div>

      </div>
    </div>
  );
}